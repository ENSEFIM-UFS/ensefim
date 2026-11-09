# ENSEFIM

Home page do I Encontro Sergipano de Física Médica, com identidade visual inspirada nos elementos enviados: azul petróleo, azul claro, laranja solar e formas orgânicas ligadas a Sergipe e à Física Médica.

## Certificados

A página `certificados.html` permite encontrar e baixar certificados pelo nome ou código e validar a autenticidade apenas pelo código. Os trabalhos são vinculados ao apresentador. A base pública não contém e-mails nem hashes de e-mails. Consulte [CERTIFICADOS.md](CERTIFICADOS.md) para atualizar os certificados de palestrantes, apresentações orais e de pôster e incluir as demais categorias.

## Executar
O projeto é estático e não exige instalação. Abra `index.html` diretamente no navegador.

Para desenvolvimento local com Node.js, também pode ser servido por qualquer servidor estático, por exemplo:

```bash
npx serve .
```

## Próximas áreas

A navegação inclui a seção Patrocinadores, reservada para inclusão futura, e a página Programação. A página Palestrantes, acessível pelo menu, apresenta os convidados confirmados e abre seus detalhes na própria página. A opção Inscrição abre a página de cadastro, e Trabalhos científicos reúne o cronograma e as regras de submissão.

## Palestrantes

Os cards ficam em `palestrantes.html`, as fotos em `assets/palestrantes/` e os currículos, títulos das palestras e links do Lattes no objeto `speakers` de `script.js`. Para adicionar um convidado, inclua seu card e um registro com a mesma chave em `data-speaker`. Os horários estão como “a confirmar” até a definição da programação. O modal utiliza um diálogo nativo, com fechamento por botão, Esc ou clique no fundo e retorno do foco ao card.

## Segurança

O site é estático e não coleta dados de visitantes. A consulta de certificados usa uma base pública de titulares, códigos, trabalhos e links de PDFs, sem e-mails. As inscrições são enviadas ao Google Forms; consulte [INSCRICOES.md](INSCRICOES.md) para acompanhar e exportar as respostas. A política de segurança em index.html e inscricao.html limita scripts, estilos, fontes e imagens às origens necessárias. Ao adicionar serviços externos, revise essa política antes de publicar.

Não coloque tokens, senhas nem dados privados no HTML ou JavaScript: o código do site pode ser visto por qualquer visitante.

## Trabalhos científicos

A página 	rabalhos.html está preparada para receber o link do formulário oficial. Enquanto o formulário não estiver disponível, os botões informam a data de abertura das submissões sem coletar dados.
