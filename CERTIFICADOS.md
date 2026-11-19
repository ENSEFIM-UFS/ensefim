# Certificados do ENSEFIM

A página `certificados.html` funciona no site estático, sem Apps Script. A base inclui certificados das comissões científica e organizadora, de palestrantes, de apresentações orais e de pôsteres, de participação e de visitas técnicas. Os registros vêm da planilha da organização e são conferidos nas respectivas pastas do Drive.

## Consultas

- **Meus certificados:** nome ou código. A busca pelo nome ignora acentos, maiúsculas e espaços repetidos, e exige o primeiro nome e pelo menos um sobrenome ou segundo nome, com palavras completas em qualquer ordem. Preposições e palavras repetidas não contam como a segunda parte. O código é comparado integralmente.
- **Valide o certificado:** apenas código. Mostra o titular, a categoria e o título do trabalho, para comparação com o documento.
- Cada resultado oferece visualização no Drive e download do PDF.
- Nos trabalhos, o titular é a coluna **Apresentador**, nunca a lista de coautores. Outros certificados podem usar a coluna **Nome**.
- Um QR Code pode apontar para `https://SEU-DOMINIO/certificados.html?codigo=20260401`.

## Atualizar e acrescentar categorias

As fontes estão em `certificados-fontes.json`, com tipo, ID da planilha, ID da aba (`gid`, opcional) e ID da pasta.

Cada planilha precisa ter **NÚMERO DO CERTIFICADO**, uma coluna com o nome do titular e **LINK DO CERTIFICADO**. Nas abas de trabalhos, o titular é **Apresentador**. As abas de palestrantes, participação e visitas técnicas usam **PALESTRANTE**. O importador também aceita **Nome** ou a coluna indicada na configuração da fonte. **TÍTULO DO TRABALHO** e **TÍTULO DA PALESTRA** são opcionais. Os códigos devem ser exclusivos entre todas as categorias. Os links devem apontar para PDFs na pasta pública correspondente.

Execute na raiz do projeto:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File tools/sync-certificados.ps1
```

O importador confirma a presença dos IDs dos PDFs na listagem pública da pasta e gera `certificados-dados.js`. Erros de importação impedem a substituição da base anterior. O formato da listagem do Google Drive pode mudar; se a conferência falhar, o importador deve ser revisado. Ele não altera permissões nem lê o conteúdo dos PDFs.

Revise o diff e publique os arquivos alterados pelo Git. A atualização é feita nessa etapa de sincronização; o navegador não consulta a planilha ao vivo. Para revogar um certificado, remova sua linha da planilha, execute o importador e publique novamente. Para revogar o último registro, remova-o manualmente de `certificados-dados.js`, pois o importador bloqueia a substituição por uma base vazia.

## Dados e autenticidade

A base pública contém somente código, nome do titular, categoria, trabalho, ID do PDF e situação. Não exporta e-mails, hashes de e-mails nem a lista de coautores. Os dados publicados e PDFs são públicos, conforme necessário para consulta sem login. A validação confirma o cadastro oficial publicado; não compara o conteúdo binário de um PDF apresentado pelo visitante. É necessário conferir os dados retornados com o documento. Códigos duplicados e registros sem situação `emitido` não são aceitos na página.

Os PDFs são abertos e baixados diretamente do Google Drive; a organização deve manter os arquivos acessíveis. Alterações de permissões ou exclusões posteriores à sincronização exigem nova conferência e publicação.

As fontes das comissões científica e organizadora usam a coluna **Avaliador** como nome do titular, conforme os cabeçalhos atuais das abas. Essa correspondência é declarada em colunaNome na configuração de cada fonte, preservando a categoria da respectiva comissão. Nenhum e-mail dessa aba é exportado.
