const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.main-nav a')];
const scrollSpyLinks = navLinks.filter((link) => link.getAttribute('href')?.startsWith('#'));

const updateActiveLink = () => {
  if (sections.length === 0 || scrollSpyLinks.length === 0) return;
  const scrollPosition = window.scrollY + 140;
  let activeId = 'inicio';

  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop) activeId = section.id;
  });

  scrollSpyLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
  });
};

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

const speakers = {
  cassio: {
    name: 'Dr. Cássio Costa',
    role: 'Físico médico · HU-UFS/EBSERH\nCoordenador da Residência · HU-UFS',
    photo: 'assets/palestrantes/cassio.png',
    lattes: 'http://lattes.cnpq.br/5607878675613649',
    talkType: 'Mesa redonda',
    talk: 'Raios X no leito é realmente necessário?',
    bio: [
      'Graduado em Física Médica pela Universidade Federal de Sergipe (2004), doutor em Física pela UFS (2010), com pós-doutorado em Física (2011). Sua principal linha de pesquisa é dosimetria em tomografia computadorizada. Atua também em dosimetria numérica, radiodiagnóstico e controle de qualidade.',
      'Especialista em Física do Radiodiagnóstico pela ABFM, atuando como físico médico clínico em diversas clínicas e hospitais.',
      'Atualmente é Físico Médico da Unidade de Diagnóstico por Imagem do HU/UFS, Supervisor de Proteção Radiológica do HU/UFS e coordenador da Residência em Física Médica do Radiodiagnóstico do HU/UFS.'
    ]
  },
  marcela: {
    name: 'Ma. Marcela Costa',
    role: 'Física médica · HU/UFS/EBSERH',
    photo: 'assets/palestrantes/marcela.png',
    lattes: 'http://lattes.cnpq.br/4020200067609938',
    talkType: 'Mesa redonda',
    talk: 'Câncer de mama: integração entre Radiodiagnóstico, Medicina Nuclear e Radioterapia sob o olhar da Física Médica',
    bio: [
      'Graduada em Física Médica pela Universidade Federal de Sergipe – UFS (2007). Mestra em Tecnologia Nuclear pelo Instituto de Pesquisas Energéticas e Nucleares – IPEN/USP (2009).',
      'Supervisora de Radioproteção em Medidores Nucleares (CNEN MN-1234). Especialista em Física do Radiodiagnóstico pela ABFM.',
      'Atualmente exerce sua atividade como Física Médica no Hospital Universitário de Sergipe (HU/UFS/EBSERH), inclusive desempenhando a função de preceptora da residência multiprofissional em Física Médica do HU/UFS. Também exerce a função de Diretora da MCA – Soluções em Radioproteção e Radiodiagnóstico.'
    ]
  },
  caroline: {
    name: 'Caroline Fernandes',
    role: 'Física Médica · Clinradi',
    photo: 'assets/palestrantes/caroline.png',
    lattes: 'https://lattes.cnpq.br/8983669336500082',
    talk: 'Visita Técnica na Medicina Nuclear.',
    subtitle: 'Física Médica responsável pela Visita Técnica à área de Medicina Nuclear da CLINRAD, conduzindo os participantes pelo serviço e apresentando, na prática, a rotina, os equipamentos e as principais aplicações da Física Médica no setor.',
    bio: [
      'Bacharel em Física Médica pela Universidade Federal de Sergipe.',
      'Pós-graduada em Física de Radiodiagnóstico e Medicina Nuclear – Radioproteção e Controle da Qualidade.',
      'Supervisora de Radioproteção em Medicina Nuclear certificada pela Comissão Nacional de Energia Nuclear (CNEN).'
    ]
  },
  danillo: {
    name: 'Me. Danillo Menezes',
    role: 'Físico médico · HUL-UFS/EBSERH',
    photo: 'assets/palestrantes/danillo.png',
    lattes: 'https://lattes.cnpq.br/7799351098704346',
    talk: 'Gestão da Proteção Radiológica em Serviços de Saúde',
    bio: [
      'Físico Médico da Unidade de Diagnóstico por Imagem do Hospital Universitário de Lagarto (HUL-UFS/EBSERH) e sócio do Instituto de Física Médica (IFM).',
      'Graduado em Física Médica pela UFS, mestre em Tecnologia Nuclear pela UFPE e especialista em Física Médica – Imagem pelo INCA.'
    ]
  },
  fabinara: {
    name: 'Ma. Fabinara Dantas',
    role: 'Perita criminal · Polícia Científica de Sergipe',
    photo: 'assets/palestrantes/fabinara.png',
    lattes: 'https://lattes.cnpq.br/4770001264896347',
    talk: 'Da Física à Perícia Criminal: como a ciência ajuda a desvendar crimes',
    bio: [
      'Possui graduação em Física – Licenciatura pelo Instituto Federal de Educação, Ciência e Tecnologia do Sertão Pernambucano (2012) e mestrado em Física pela Universidade Federal de Sergipe (2015).',
      'Perita Criminal da Polícia Científica do Estado de Sergipe desde 2015. Atua no Laboratório de Balística Forense do Instituto de Criminalística. Instrutora da Academia de Polícia Civil de Sergipe e professora colaboradora da Pós-Graduação em Perícia Criminal e Ciências Forenses da Universidade Tiradentes, em Aracaju.'
    ]
  },
  william: {
    name: 'Prof. Dr. William de Souza Santos',
    role: 'Professor e pesquisador · UFS',
    photo: 'assets/palestrantes/william.png',
    lattes: 'https://lattes.cnpq.br/5150139546603006',
    talk: 'Monte Carlo na Física Médica: Dosimetria, Imagem e Proteção Radiológica',
    bio: [
      'Professor Adjunto da Universidade Federal de Sergipe (UFS) e bolsista de produtividade do CNPq (PQ Nível C). Atua também na Residência em Física Médica em Radiodiagnóstico do Hospital Universitário (HU-UFS) e como docente permanente nos Programas de Pós-Graduação em Física (UFS) e em Engenharia Biomédica (PPGEB/UFU).',
      'É licenciado em Física pela UESB (2007), mestre (2010) e doutor (2014) pela UFS, com três pós-doutorados realizados no IPEN/USP. É líder do grupo de pesquisa Ionizing Radiation Dosimetry in Medicine e participa de projetos de pesquisa nacionais e internacionais em Física Médica.',
      'Possui experiência na orientação de alunos de graduação e pós-graduação nas áreas de Física Médica e Física Ambiental, atuando principalmente em dosimetria em radiodiagnóstico, dosimetria numérica e ambiental, proteção radiológica e simulação Monte Carlo.'
    ]
  }
};

// Ordena pelo nome, preservando os títulos apenas na apresentação.
const speakerSortName = (name) => name.trim().replace(
  /^(?:(?:professor(?:a)?|prof(?:a|ª|º)?|doutor(?:a)?|dr(?:a|ª|º)?|mestre|mestra|me|ma|ms|msc|esp)\.?\s+)+/iu,
  ''
);
const speakerGrid = document.querySelector('.speakers-grid');
if (speakerGrid) {
  const collator = new Intl.Collator('pt-BR', { sensitivity: 'base' });
  const cards = [...speakerGrid.querySelectorAll('[data-speaker]')];
  const nameForCard = (card) => speakerSortName(
    speakers[card.dataset.speaker]?.name || card.querySelector('strong').textContent
  );
  cards.sort((a, b) => collator.compare(nameForCard(a), nameForCard(b)));
  speakerGrid.append(...cards);
}

const speakerDialog = document.querySelector('#speaker-dialog');

if (speakerDialog) {
  let speakerTrigger;
  document.querySelectorAll('[data-speaker]').forEach((button) => {
    button.addEventListener('click', () => {
      const speaker = speakers[button.dataset.speaker];
      if (!speaker) return;
      speakerTrigger = button;
      document.querySelector('#speaker-name').textContent = speaker.name;
      document.querySelector('#speaker-role').textContent = speaker.role;
      const photo = document.querySelector('#speaker-photo');
      const placeholder = document.querySelector('#speaker-placeholder');
      photo.hidden = !speaker.photo;
      placeholder.hidden = Boolean(speaker.photo);
      placeholder.textContent = speaker.initials || '';
      if (speaker.photo) {
        photo.src = speaker.photo;
        photo.alt = speaker.name;
      } else {
        photo.removeAttribute('src');
        photo.alt = '';
      }
      document.querySelector('#speaker-lattes').href = speaker.lattes;
      document.querySelector('#speaker-talk-type').textContent = speaker.talkType || 'Palestra';
      document.querySelector('#speaker-talk-title').textContent = speaker.talk;
      const subtitle = document.querySelector('#speaker-talk-subtitle');
      subtitle.textContent = speaker.subtitle || '';
      subtitle.hidden = !speaker.subtitle;
      document.querySelector('#speaker-bio').replaceChildren(...speaker.bio.map((text) => {
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        return paragraph;
      }));
      speakerDialog.showModal();
      speakerDialog.scrollTop = 0;
      document.body.classList.add('speaker-dialog-open');
    });
  });

  speakerDialog.querySelector('.speaker-close').addEventListener('click', () => speakerDialog.close());
  speakerDialog.addEventListener('click', (event) => {
    const bounds = speakerDialog.getBoundingClientRect();
    if (event.target === speakerDialog &&
        (event.clientX < bounds.left || event.clientX > bounds.right ||
         event.clientY < bounds.top || event.clientY > bounds.bottom)) speakerDialog.close();
  });
  speakerDialog.addEventListener('close', () => {
    document.body.classList.remove('speaker-dialog-open');
    speakerTrigger?.focus({ preventScroll: true });
  });
}
