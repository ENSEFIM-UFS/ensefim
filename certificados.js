(() => {
  const normalizeName = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().replace(/\s+/g, ' ').toLocaleUpperCase('pt-BR');
  const normalizeCode = value => String(value).trim().toUpperCase();
  const records = window.ENSEFIM_CERTIFICADOS || [];
  const counts = new Map();
  records.forEach(item => counts.set(normalizeCode(item.codigo), (counts.get(normalizeCode(item.codigo)) || 0) + 1));
  const valid = records.filter(item => counts.get(normalizeCode(item.codigo)) === 1 && item.situacao === 'emitido');
  const appendText = (parent, tag, content) => {
    const element = document.createElement(tag); element.textContent = content; parent.append(element); return element;
  };
  document.querySelectorAll('[data-certificate-form]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const validation = form.dataset.certificateForm === 'validate';
      const input = form.querySelector('input').value;
      const status = document.getElementById(validation ? 'validation-status' : 'search-status');
      const results = document.getElementById(validation ? 'validation-results' : 'search-results');
      results.replaceChildren();
      const nameQuery = normalizeName(input);
      const nameParts = nameQuery.split(' ').filter(Boolean);
      if (!validation && nameQuery.length < 3) {
        status.textContent = 'Digite pelo menos 3 caracteres do nome ou o código completo do certificado.';
        return;
      }
      const matches = valid.filter(item => normalizeCode(item.codigo) === normalizeCode(input) ||
        (!validation && nameParts.length > 0 && nameParts.every(part => normalizeName(item.nome).includes(part))));
      status.textContent = matches.length
        ? (validation ? 'Certificado válido. Compare os dados abaixo com o documento apresentado.' : `${matches.length} certificado(s) encontrado(s).`)
        : (validation ? 'Código não encontrado na base de certificados publicados. Confira o código ou entre em contato com a organização.' : 'Nenhum certificado encontrado. Tente parte do seu nome ou o código completo do certificado. Novas categorias serão liberadas pela organização.');
      matches.forEach(item => {
        const card = document.createElement('article'); card.className = 'certificate-card';
        appendText(card, 'p', item.tipo).className = 'certificate-type';
        appendText(card, 'h3', item.nome);
        if (item.trabalho) appendText(card, 'p', item.trabalho);
        appendText(card, 'p', `Código: ${item.codigo}`);
        if (item.cargaHoraria) appendText(card, 'p', `Carga horária: ${item.cargaHoraria}`);
        if (/^[A-Za-z0-9_-]+$/.test(item.arquivoId)) {
          const links = document.createElement('div'); links.className = 'certificate-links';
          [['Ver certificado ↗', `https://drive.google.com/file/d/${item.arquivoId}/view`], ['Baixar PDF ↓', `https://drive.google.com/uc?export=download&id=${item.arquivoId}`]].forEach(([label, href]) => {
            const link = appendText(links, 'a', label); link.href = href; link.target = '_blank'; link.rel = 'noopener noreferrer';
          });
          card.append(links);
        }
        results.append(card);
      });
    });
  });
  const code = new URLSearchParams(window.location.search).get('codigo');
  if (code && code.length <= 100) {
    document.getElementById('validation-code').value = code;
    document.querySelector('[data-certificate-form="validate"]').requestSubmit();
  }
})();
