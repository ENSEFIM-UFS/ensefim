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

const programTabs = [...document.querySelectorAll('[data-program-day]')];
const selectProgramDay = (tab, focus = false) => {
  const day = tab.dataset.programDay;
  programTabs.forEach((item) => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
  });
  document.querySelectorAll('[data-program-panel]').forEach((panel) => {
    panel.hidden = panel.dataset.programPanel !== day;
  });
  if (focus) tab.focus();
};

programTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectProgramDay(tab));
  tab.addEventListener('keydown', (event) => {
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % programTabs.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + programTabs.length) % programTabs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = programTabs.length - 1;
    else return;
    event.preventDefault();
    selectProgramDay(programTabs[nextIndex], true);
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
  ariadny: {
    name: 'Ma. Ariadny Thayla Machado',
    role: 'Física Médica · Residente em Radiodiagnóstico',
    photo: 'assets/palestrantes/ariadny.png',
    lattes: 'http://lattes.cnpq.br/7313131968536741',
    bio: [
      'Bacharel em Física Médica pela Universidade Federal de Uberlândia (UFU). Mestre em Ciências pela mesma instituição, com bolsa CAPES e atuação na área de radiografia odontológica intraoral e extraoral.',
      'Atualmente, é residente do 2º ano em Física Médica do Radiodiagnóstico no HU-UFS, com experiência nas áreas de controle de qualidade em equipamentos de imagem, cálculo de blindagem e proteção radiológica.',
      'Desenvolve pesquisas na área de Física Médica, com ênfase em dosimetria e simulação computacional aplicada à mamografia digital e à tomossíntese mamária, especialmente na estimativa e avaliação da dose glandular média e na otimização de protocolos de aquisição de imagens.',
      'Idealizadora do Encontro Sergipano de Física Médica da Universidade Federal de Sergipe.'
    ]
  },
  laelia: {
    name: 'Profa. Dra. Laélia Campos',
    role: 'Física Médica · Coordenadora do Curso de Graduação de Física Médica · UFS',
    photo: 'assets/palestrantes/laelia.png',
    lattes: 'http://lattes.cnpq.br/2554422948649781',
    bio: [
      'Doutorado em co-tutela na área de Tecnologias Energéticas Nucleares pela Universidade Federal de Pernambuco e em Toxicologia no Departamento de Biofísica da Universidade Paris VII.',
      'Atualmente é professora da Universidade Federal de Sergipe e atua nas áreas de Física Médica, ensino de Física, dosimetria numérica e estatística aplicada.',
      'É membro do Programa de Pós-Graduação Profissional em Ensino de Física (MNPEF), Polo 11, e da Residência Multiprofissional em Física Médica – Radiodiagnóstico. Coordena o curso de graduação de Física Médica da Universidade Federal de Sergipe.'
    ]
  },
  alanna: {
    name: 'Alanna Santos',
    role: 'Física Médica · Residente em Radiodiagnóstico',
    photo: 'assets/palestrantes/alanna.png',
    lattes: 'http://lattes.cnpq.br/5515241480597136',
    bio: [
      'Bacharela em Física Médica pela Universidade Federal de Sergipe (UFS) e residente em Radiodiagnóstico no Hospital Universitário da Universidade Federal de Sergipe (HU-UFS).',
      'Possui experiência nas áreas de controle de qualidade em equipamentos de imagem, cálculo de blindagem e proteção radiológica.',
      'Atua como voluntária na Women in Nuclear (WiN) Brasil, organização não governamental vinculada à WiN Global, dedicada à promoção da representatividade feminina nas áreas de ciência e tecnologia nuclear.'
    ]
  },
  vital: {
    name: 'Vital Opportun Mevi',
    role: 'Física Médica · Residente em Radiodiagnóstico',
    photo: 'assets/palestrantes/vital.png',
    lattes: 'http://lattes.cnpq.br/8835830584425531',
    day: '07/11',
    time: '13:00',
    talkType: 'Visita guiada',
    talk: 'Visita Técnica no Radiodiagnóstico - HU-UFS',
    bio: [
      'Bacharel em Física Médica pela Universidade Federal de Uberlândia.',
      'Residente em Radiodiagnóstico no Hospital Universitário da Universidade Federal de Sergipe (HU-UFS).',
      'Possui experiência nas áreas de controle de qualidade em equipamentos de imagem e proteção radiológica.'
    ]
  },
  marcelo: {
    name: 'Marcelo Luis',
    role: 'Físico Médico · Residente do 1º ano em Radiodiagnóstico',
    photo: 'assets/palestrantes/marcelo.png',
    lattes: 'http://lattes.cnpq.br/9474735961921401',
    bio: [
      'Bacharel em Física Médica pela Universidade Federal de Sergipe.',
      'Residente do primeiro ano em Radiodiagnóstico no Hospital Universitário da Universidade Federal de Sergipe.',
      'Possui experiência nas áreas de controle de qualidade em equipamentos de imagem e proteção radiológica.'
    ]
  },
  joatan: {
    name: 'José Joatan Rodrigues Júnior',
    role: 'Professor Titular do Departamento de Física · UFS · Coordenador do departamento',
    photo: 'assets/palestrantes/joatan.png',
    lattes: 'http://lattes.cnpq.br/6756892429369226',
    bio: [
      'Possui graduação em Física pela Universidade Federal do Ceará, mestrado e doutorado em Física pela Universidade de São Paulo (USP). Realizou estágios de pós-doutorado no Departamento de Física da Universidade Federal de Pernambuco (UFPE), entre 2003 e 2004, e na Università di Pisa, Itália, entre 2018 e 2019.',
      'Foi professor da Universidade Federal do Vale do São Francisco (UNIVASF) no período de 2004 a 2009. Atualmente, é Professor Titular do Departamento de Física da Universidade Federal de Sergipe (UFS), atuando no ensino de graduação e no Programa de Pós-Graduação em Física. Integra o Instituto Nacional de Ciência e Tecnologia em Fotônica (INCT de Fotônica).',
      'Possui experiência na área de Física, com ênfase no estudo das propriedades ópticas de materiais e nas aplicações da óptica e da fotônica às ciências da saúde.'
    ]
  },
  luiz: {
    name: 'Luiz Eduardo',
    role: 'Físico Médico · Radioterapia · REDE ONCO',
    photo: 'assets/palestrantes/luiz.png',
    lattes: 'http://lattes.cnpq.br/8166933125449113',
    day: '06/11',
    time: '14:00',
    talk: 'Atuação do Físico Médico em radioterapia',
    bio: [
      'Licenciado em Física pela Universidade Federal de Sergipe (UFS), com especialização em Física Médica pelo Instituto Nacional de Câncer (INCA) e título de especialista em Física Médica, com habilitação em Radioterapia, pela Associação Brasileira de Física Médica (ABFM).',
      'Atua como Coordenador de Física Médica e Supervisor de Proteção Radiológica em Radioterapia no Complexo Hospitalar Manoel André. Possui ampla experiência em Física Médica, com ênfase em radioterapia, proteção radiológica, dosimetria e controle de qualidade, além de participação em pesquisas e publicações científicas na área.'
    ]
  },
  izabela: {
    name: 'Dra. Izabela Teles',
    role: 'Física Médica · Radioterapia · Hospital do Amor/Lagarto',
    photo: 'assets/palestrantes/izabela.png',
    lattes: 'http://lattes.cnpq.br/5643734964129586',
    day: '05/11',
    time: '13:00',
    talkType: 'Mesa redonda',
    talk: 'Câncer de mama: integração entre Radiodiagnóstico, Medicina Nuclear e Radioterapia sob o olhar da Física Médica',
    bio: [
      'Graduada em Física Médica pela Universidade Federal de Sergipe. Mestrado e doutorado pelo IPEN/USP. Residência em Radioterapia pela Unicamp.',
      'Supervisora em Proteção Radiológica pela CNEN e especialista em Radioterapia pela ABFM e CNEN.',
      'Atualmente é física responsável pelo setor de Radioterapia do Hospital do Amor da unidade de Lagarto.'
    ]
  },
  cassio: {
    name: 'Dr. Cássio Costa',
    role: 'Físico Médico · Radiodiagnóstico · HU-UFS/EBSERH\nCoordenador da Residência · HU-UFS',
    photo: 'assets/palestrantes/cassio-20261012.png',
    lattes: 'http://lattes.cnpq.br/5607878675613649',
    day: '05/11',
    time: '08:30',
    talkType: 'Mesa redonda',
    talk: 'Raios X no leito é realmente necessário?',
    bio: [
      'Graduado em Física Médica pela Universidade Federal de Sergipe (2004), doutor em Física pela UFS (2010), com pós-doutorado em Física (2011). Sua principal linha de pesquisa é dosimetria em tomografia computadorizada. Atua também em dosimetria numérica, radiodiagnóstico e controle de qualidade.',
      'Especialista em Física do Radiodiagnóstico pela ABFM, atuando como Físico Médico clínico em diversas clínicas e hospitais.',
      'Atualmente é Físico Médico da Unidade de Diagnóstico por Imagem do HU/UFS, Supervisor de Proteção Radiológica do HU/UFS e coordenador da Residência em Física Médica do Radiodiagnóstico do HU/UFS.'
    ]
  },
  marcela: {
    name: 'Ma. Marcela Costa',
    role: 'Física Médica · Radiodiagnóstico · HU-UFS/EBSERH',
    photo: 'assets/palestrantes/marcela-20261012.png',
    lattes: 'http://lattes.cnpq.br/4020200067609938',
    day: '05/11',
    time: '13:00',
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
    role: 'Física Médica · Medicina Nuclear · Clinradi',
    photo: 'assets/palestrantes/caroline.png',
    lattes: 'https://lattes.cnpq.br/8983669336500082',
    day: '07/11',
    time: '07:00',
    talkType: 'Visita guiada',
    talk: 'Visita Técnica na Medicina Nuclear - CLINRAD',
    subtitle: 'Física Médica responsável pela Visita Técnica à área de Medicina Nuclear da CLINRAD, conduzindo os participantes pelo serviço e apresentando, na prática, a rotina, os equipamentos e as principais aplicações da Física Médica no setor.',
    bio: [
      'Bacharel em Física Médica pela Universidade Federal de Sergipe.',
      'Pós-graduada em Física de Radiodiagnóstico e Medicina Nuclear – Radioproteção e Controle da Qualidade.',
      'Supervisora de Radioproteção em Medicina Nuclear certificada pela Comissão Nacional de Energia Nuclear (CNEN).'
    ]
  },
  danillo: {
    name: 'Me. Danillo Menezes',
    role: 'Físico Médico · Radiodiagnóstico · HUL-UFS/EBSERH',
    photo: 'assets/palestrantes/danillo.png',
    lattes: 'https://lattes.cnpq.br/7799351098704346',
    day: '06/11',
    time: '10:00',
    talk: 'Gestão da Proteção Radiológica em Serviços de Saúde',
    bio: [
      'Físico Médico da Unidade de Diagnóstico por Imagem do Hospital Universitário de Lagarto (HUL-UFS/EBSERH) e sócio do Instituto de Física Médica (IFM).',
      'Graduado em Física Médica pela UFS, mestre em Tecnologia Nuclear pela UFPE e especialista em Física Médica – Imagem pelo INCA.'
    ]
  },
  fabinara: {
    name: 'Ma. Fabinara Dantas',
    role: 'Física Perita criminal · Polícia Científica de Sergipe',
    photo: 'assets/palestrantes/fabinara.png',
    lattes: 'https://lattes.cnpq.br/4770001264896347',
    day: '06/11',
    time: '09:00',
    talk: 'Da Física à Perícia Criminal: Como a Ciência ajuda a desvendar crimes',
    bio: [
      'Possui graduação em Física – Licenciatura pelo Instituto Federal de Educação, Ciência e Tecnologia do Sertão Pernambucano (2012) e mestrado em Física pela Universidade Federal de Sergipe (2015).',
      'Perita Criminal da Polícia Científica do Estado de Sergipe desde 2015. Atua no Laboratório de Balística Forense do Instituto de Criminalística. Instrutora da Academia de Polícia Civil de Sergipe e professora colaboradora da Pós-Graduação em Perícia Criminal e Ciências Forenses da Universidade Tiradentes, em Aracaju.'
    ]
  },
  yklys: {
    name: 'Me. Yklys',
    role: 'Físico Médico COVISA/SES',
    photo: 'assets/palestrantes/yklys.png',
    lattes: 'http://lattes.cnpq.br/9601959592189180',
    day: '05/11',
    time: '08:30',
    talkType: 'Mesa redonda',
    talk: 'Raios X no leito é realmente necessário?',
    bio: [
      'Graduado em Física Médica pela Universidade Federal de Sergipe (UFS). Mestre em Tecnologia Nuclear pelo Instituto de Pesquisas Energéticas e Nucleares (IPEN/USP).',
      'Atualmente atua como Físico Médico na Coordenação de Vigilância Sanitária da Secretaria de Estado da Saúde (COVISA/SES), com experiência em inspeções sanitárias em serviços de diagnóstico por imagem, e é ponto focal do Projeto Nacional de Harmonização das Ações de Inspeção Sanitária em Serviços de Saúde e de Interesse para a Saúde da Agência Nacional de Vigilância Sanitária (ANVISA).'
    ]
  },
  jonas: {
    name: 'Jonas Prata',
    role: 'Técnico e Tecnólogo em Radiologia · Supervisor das Aplicações das Técnicas Radiológicas',
    photo: 'assets/palestrantes/jonas.png',
    lattes: 'http://lattes.cnpq.br/5858569619575537',
    day: '05/11',
    time: '08:30',
    talkType: 'Mesa redonda',
    talk: 'Raios X no leito é realmente necessário?',
    bio: [
      'Técnico e Tecnólogo em Radiologia, especialista em Tomografia Computadorizada, Gestão em Saúde e Docência.',
      'Atua como Supervisor das Aplicações das Técnicas Radiológicas no Hospital São Lucas - Rede D’Or, no Hospital Universitário de Sergipe - Universidade Federal de Sergipe (UFS) e no Centro de Acolhimento e Diagnóstico por Imagem (CADI/SES).',
      'É membro da CONAE - Comissão Nacional de Educação do Conselho Nacional de Técnicos em Radiologia (CONTER), Imortal da Academia Brasileira de Ciências Radiológicas, ocupando a Cadeira nº 56, e Diretor do INSPIRA Cursos.'
    ]
  },
  alinne: {
    name: 'Alinne Barreto',
    role: 'Supervisora de Radioproteção · Medicina Nuclear',
    photo: 'assets/palestrantes/alinne.png',
    lattes: 'http://lattes.cnpq.br/9773275808755205',
    day: '05/11',
    time: '13:00',
    talkType: 'Mesa redonda',
    talk: 'Câncer de mama: integração entre Radiodiagnóstico, Medicina Nuclear e Radioterapia sob o olhar da Física Médica',
    bio: [
      'Física Médica, graduada pela Universidade Federal de Sergipe (UFS), especialista em Medicina Nuclear pelo HCFMUSP e Supervisora de Proteção Radiológica em Medicina Nuclear.',
      'Possui mais de 12 anos de experiência na área, com atuação em instituições de referência como HC/USP, ICESP, InCor, Hospital Israelita Albert Einstein e Grupo Fleury.',
      'Ao longo de sua trajetória, acumulou experiência em diagnóstico por imagem, controle de qualidade, radioproteção, PET/CT, SPECT e capacitação de equipes.',
      'Atualmente, atua na interface entre saúde, tecnologia e inovação, como Executiva Comercial e de Relacionamento com o Cliente, trabalhando com soluções digitais e Inteligência Artificial aplicadas à Medicina Diagnóstica.'
    ]
  },
  naiara: {
    name: 'Naiara Sales',
    role: 'Supervisora de Proteção Radiológica · Medicina Nuclear · Hospital Aristides Maltês · Hospital Mater Dei Salvador',
    photo: 'assets/palestrantes/naiara.png',
    lattes: 'http://lattes.cnpq.br/6299684461378331',
    day: '06/11',
    time: '08:00',
    talk: 'Uma breve conversa sobre teranóstico',
    bio: [
      'Licenciada em Física pela Universidade Federal do Recôncavo da Bahia.',
      'Supervisora de Proteção Radiológica em Medicina Nuclear (CNEN) e Especialista em Medicina Nuclear (ABFM).',
      'Especialista em Gerenciamento de Rejeitos Radioativos (CDTN/MG).',
      'Supervisora de Proteção Radiológica Substituta no Hospital Aristides Maltês e no Hospital Mater Dei Salvador.',
      'Mestranda em Física na Universidade Federal de Sergipe (UFS).'
    ]
  },
  william: {
    name: 'Prof. Dr. William de Souza Santos',
    role: 'Físico Médico · Professor e pesquisador · UFS',
    photo: 'assets/palestrantes/william.png',
    lattes: 'https://lattes.cnpq.br/5150139546603006',
    day: '05/11',
    time: '14:20',
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
  document.addEventListener('click', (event) => {
    const button = event.target instanceof Element ? event.target.closest('[data-speaker]') : null;
    if (!button || button instanceof HTMLAnchorElement) return;
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
    const lattes = document.querySelector('#speaker-lattes');
    lattes.hidden = !speaker.lattes;
    if (speaker.lattes) {
      lattes.href = speaker.lattes;
    } else {
      lattes.removeAttribute('href');
    }
    document.querySelector('#speaker-talk-type').textContent = speaker.talkType || 'Palestra';
    document.querySelector('#speaker-talk-title').textContent = speaker.talk;
    document.querySelector('#speaker-day').textContent = speaker.day || 'A confirmar';
    document.querySelector('#speaker-time').textContent = speaker.time || 'A confirmar';
    const subtitle = document.querySelector('#speaker-talk-subtitle');
    subtitle.textContent = speaker.subtitle || '';
    subtitle.hidden = !speaker.subtitle;
    document.querySelector('#speaker-bio').replaceChildren(...speaker.bio.map((text) => {
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      return paragraph;
    }));
    if (typeof speakerDialog.showModal === 'function') {
      speakerDialog.showModal();
    } else {
      speakerDialog.classList.add('speaker-dialog-fallback');
      speakerDialog.setAttribute('open', '');
      document.body.classList.add('speaker-dialog-fallback-open');
    }
    speakerDialog.scrollTop = 0;
    document.body.classList.add('speaker-dialog-open');
  });

  const closeSpeakerDialog = () => {
    if (typeof speakerDialog.close === 'function') {
      speakerDialog.close();
      return;
    }
    speakerDialog.removeAttribute('open');
    speakerDialog.classList.remove('speaker-dialog-fallback');
    document.body.classList.remove('speaker-dialog-open', 'speaker-dialog-fallback-open');
    speakerTrigger?.focus({ preventScroll: true });
  };

  speakerDialog.querySelector('.speaker-close').addEventListener('click', closeSpeakerDialog);
  speakerDialog.addEventListener('click', (event) => {
    const bounds = speakerDialog.getBoundingClientRect();
    if (event.target === speakerDialog &&
        (event.clientX < bounds.left || event.clientX > bounds.right ||
         event.clientY < bounds.top || event.clientY > bounds.bottom)) closeSpeakerDialog();
  });
  speakerDialog.addEventListener('close', () => {
    speakerDialog.classList.remove('speaker-dialog-fallback');
    document.body.classList.remove('speaker-dialog-open', 'speaker-dialog-fallback-open');
    speakerTrigger?.focus({ preventScroll: true });
  });
}
const linkedSpeakerMatch = window.location.hash.match(/^#speaker-([a-z]+)$/);
if (linkedSpeakerMatch) {
  document.querySelector(`[data-speaker="${linkedSpeakerMatch[1]}"]`)?.click();
}
