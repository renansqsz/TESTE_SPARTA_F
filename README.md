# Desáfio Técnico - Sparta
Este projeto consiste em uma aplicação web desenvolvida em React com TypeScript, que apresenta dashboards de dados do IBGE e do Sistema IBGE de Recuperação Automática (SINDRA)

# Link de Deploy
A aplicação está publicada no Vercel: [https://desafiosparta.vercel.app/](https://desafiosparta.vercel.app/)

# Como rodar localmente
1. Clone o repositório:
`git clone https://github.com/renansqsz/TESTE_SPARTA_F.git`

2. Instale as depêndencias
`npm install`

3. Inicie a aplicação `npm run dev`
   
4. Aplicação estará disponível em `http://localhost:5173` (ou porta indicada pelo Vite).

# Principais Decisões Técnicas

- React e TypeScript: Garantia de tipagem estática e manutenção futura do código.
- Material-UI: Utilizado para aplicar um padrão visual moderno e consistente, aproveitando componentes prontos de interface.
- Arquivos Isolados: Todas as tabelas e o menu de navegação foram feitos isolados para futuras manutenções e melhor visualização do código.
- Filtragem e limpeza de dados: Exclusão de registros indisponíveis e informações que não eram úteis que a API retornava para melhorar a legibilidade das tabelas.
- Adaptação visual: O menu lateral se ajusta quando aberto ou fechado, e os elementos das tabelas ficam alinhados de forma clara e direta.
- Background em Valores e Status: Aplicado para destacar informações importantes da tabela, facilitando a leitura.
