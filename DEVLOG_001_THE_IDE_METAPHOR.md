# DevLog #001: The IDE Metaphor Transformation
**Data:** 15 de Fevereiro de 2026
**Autor:** Pablo Rosa Gomes (Pablit0rg)
**Status:** Planejamento / Arquitetura

## 1. O Conceito (Vision)
Transformar a UX do portfólio para mimetizar um Ambiente de Desenvolvimento Integrado (IDE) moderno (como Google IDX ou VS Code). O usuário não navega em um site comum; ele "explora" o código e a inteligência do desenvolvedor através de uma interface familiar e poderosa.

## 2. Nova Arquitetura de Layout (The 3-Column Holy Grail)
O layout deixará de ser uma landing page vertical (single column) para se tornar uma aplicação de tela cheia dividida em 3 painéis fixos (100vh):

### Painel Esquerdo: "The Explorer" (Navegação)
* **Comportamento:** Substitui os cards grandes atuais.
* **Estilo:** Lista vertical compacta, similar à árvore de arquivos do IDX.
* **Interação:**
    * **Categorias (Pastas):** Ex: `src/interface`, `src/backend`. Ao clicar, expande (accordion) mostrando o conteúdo.
    * **Tecnologias (Arquivos):** Ex: `react.tsx`, `n8n.json`. Indentação visual (padding-left) para hierarquia.
    * **Ícones:** Ícones de pasta (fechada/aberta) e ícones de arquivo (.ts, .tsx, .css).

### Painel Central: "The Viewport" (Conteúdo Principal)
* **Comportamento:** Onde a "mágica" acontece.
* **Header (Abas):** Sistema de abas no topo, mostrando o que está aberto (ex: `Welcome.md`, `Project_PrevDesk.tsx`).
* **Conteúdo:**
    * **Modo Docs:** Renderiza a descrição da tecnologia como se fosse um arquivo Markdown ou código comentado.
    * **Modo Browser:** Um `iframe` ou container simulando um navegador interno para mostrar o projeto rodando ao vivo sem sair do portfólio.
* **Empty State:** Quando nada está selecionado, mostra o logo "Stack Intelligence" ou um dashboard de métricas.

### Painel Direito: "The Copilot" (AI & Contato)
* **Objetivo:** Substituir o rodapé tradicional e formulários de contato.
* **Integração:** Chatbot alimentado por n8n.
* **UX:**
    * Sempre visível (ou colapsável).
    * Interface de chat vertical (igual ao Gemini no IDX).
    * O visitante "conversa" com o portfólio para saber sobre disponibilidade, orçamentos ou detalhes técnicos.

## 3. Diretrizes de Design (UI/UX)
* **Imersão:** O scroll da página inteira deve ser travado (`overflow: hidden` no body). O scroll acontece apenas dentro dos painéis (Explorer e Viewport).
* **Paleta:** Manter o "Preto de Luxo" (#000000, #0a0a0a). Bordas sutis (#333) para separar os painéis.
* **Responsividade:**
    * **Desktop:** 3 Colunas.
    * **Mobile:** Menu Hambúrguer abre o Explorer; Chat em botão flutuante.

## 4. Roadmap de Implementação
1.  **Refatoração Estrutural:** Criar o Grid de 3 colunas (`layout.tsx`).
2.  **Sidebar Component:** Migrar a lógica do `STACK_CONFIG` para uma árvore de arquivos recursiva.
3.  **Active Tab State:** Gerenciar qual conteúdo é renderizado no centro.
4.  **Integração n8n:** Implementar o widget de chat na direita.

---
*"Code is poetry, and the IDE is our canvas."*