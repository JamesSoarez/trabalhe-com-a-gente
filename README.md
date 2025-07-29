# Desafio de Busca de Repositórios GitHub

Projeto SPA desenvolvido em Angular como parte de um desafio técnico. A aplicação permite que usuários busquem por repositórios no GitHub, visualizem os resultados de forma paginada e interajam com informações de cada repositório.

---

## Funcionalidades

- ✅ **Busca de Repositórios:** Campo de busca inteligente com ícone integrado.
- ✅ **Resultados Detalhados:** Exibição dos resultados em cards, incluindo avatar do dono, descrição, tópicos e metadados.
- ✅ **Links Interativos:** Links diretos para as páginas de estrelas, issues e watchers de cada repositório.
- ✅ **Paginação Avançada:** Sistema de paginação completo no estilo do GitHub, com navegação por números, "anterior" e "próxima".
- ✅ **Design Moderno:** Interface com tema dark, construída com componentes do Angular Material.
- ✅ **Feedback ao Usuário:** Indicador de carregamento da página (spinner) durante as buscas e mensagens claras de erro ou de estado vazio.
- ✅ **Formatação de Dados:** Números grandes (estrelas, etc.) são abreviados com um Pipe customizado (ex: 123k, 1.5M).
- ✅ **Segurança:** A chave da API do GitHub é gerenciada de forma segura e não é exposta no repositório.
- ✅ **Qualidade de Código:** Cobertura de testes unitários (serviço) e de integração (componente) para garantir a robustez da aplicação.

---

## Tecnologias Utilizadas

- **Angular 18:** Framework principal para a construção da SPA.
- **Angular Material:** Biblioteca de componentes para uma UI moderna e consistente.
- **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
- **SCSS:** Preprocessador de CSS para estilos mais organizados e poderosos.
- **RxJS:** Para lidar com a programação assíncrona das chamadas de API.
- **Jasmine & Karma:** Para a escrita e execução dos testes.

---

## Configuração do Ambiente

Siga as instruções abaixo para configurar e rodar o projeto localmente.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 20.x ou superior)
- [Angular CLI](https://angular.io/cli) (versão 18.x)

### Instalação e Configuração

1.  **Clone o repositório:**

    ```sh
    git clone https://github.com/JamesSoarez/trabalhe-com-a-gente
    cd trabalhe-com-a-gente
    ```

2.  **Instale as dependências:**

    ```sh
    npm install
    ```

3.  **Configuração do Token da API (Passo Essencial):**
    Este projeto utiliza a API do GitHub, que requer um token de acesso para aumentar o limite de requisições.
    - Dentro da pasta `src/app/`, crie um novo arquivo chamado `api-keys.ts`.
    - Cole o seguinte conteúdo neste novo arquivo, substituindo `SEU_GITHUB_TOKEN_AQUI` por um [Personal Access Token (classic)](https://github.com/settings/tokens/new) do GitHub com escopo `repo`.

    ```typescript
    // src/app/api-keys.ts
    export const GITHUB_TOKEN = "SEU_GITHUB_TOKEN_AQUI";
    ```

---

## Rodando a Aplicação

1. Com o ambiente configurado, inicie o servidor de desenvolvimento:

   ```sh
   ng serve
   ```

2. Abra seu navegador e acesse `http://localhost:4200/`.

---

## Rodando os Testes

Para executar os testes unitários e de integração, use o seguinte comando no terminal:

```sh
ng test
```
