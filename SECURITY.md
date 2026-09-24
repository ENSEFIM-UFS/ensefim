# Segurança do ENSEFIM

## Como comunicar um problema

Não abra uma issue pública para relatar uma vulnerabilidade ou expor dados pessoais. Use a opção **Report a vulnerability** na aba **Security** do repositório. Se essa opção não estiver disponível, entre em contato diretamente com a organização do ENSEFIM.

Inclua no relato a página afetada, uma descrição do problema e os passos mínimos para reproduzi-lo. Não inclua senhas, tokens, respostas de formulários ou dados pessoais de participantes.

## Proteção do repositório

O arquivo `.github/CODEOWNERS` define a responsável por revisar todas as alterações. Para que essa regra seja obrigatória, a branch `main` deve ter uma ruleset ativa no GitHub com:

- pull request obrigatório antes de mesclar;
- uma aprovação obrigatória;
- revisão obrigatória da pessoa definida em `CODEOWNERS`;
- descarte de aprovações quando novos commits forem enviados;
- resolução obrigatória de todas as conversas;
- bloqueio de force push e de exclusão da branch;
- aplicação das regras também aos administradores;
- autenticação de dois fatores obrigatória para membros da organização.

Conceda acesso de escrita somente a quem realmente publica o site e revise periodicamente a lista em **Settings > Collaborators and teams**.

## Cuidados com os dados

Este é um site estático. Tokens, senhas, respostas de formulários e outros dados privados nunca devem ser adicionados ao HTML, CSS, JavaScript ou histórico Git. As respostas de inscrição e de submissão permanecem nos formulários externos da organização.
