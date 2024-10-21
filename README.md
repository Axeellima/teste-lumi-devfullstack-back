# Documentação do Back-end

**Link de Deploy:**  
🌐 [https://teste-lumi-70pi8ux9u-axeellimas-projects.vercel.app](https://teste-lumi-70pi8ux9u-axeellimas-projects.vercel.app)

**Descrição do Projeto:**  
Este foi um teste prático da Lumi para a vaga de desenvolvedor pleno. O back-end foi desenvolvido por **Axel Lima** e tem como objetivo criar um extrator de dados para contas de luz, que faz a extração de informações e as armazena em um banco de dados PostgreSQL.

**Tecnologias Utilizadas:**

- 📦 pdf-parse
- 🌐 express
- 💻 typescript
- 🗄️ typeorm

## Instruções para Rodar o Projeto

1. **Clone este repositório:**

   ```bash
   git clone https://github.com/Axeellima/teste-lumi-devfullstack-back
   ```

2. **Navegue até o diretório do projeto:**

   ```bash
   cd teste-lumi-devfullstack-back
   ```

3. **Instale as dependências:**

   ```bash
   npm install
   ```

4. **Configurar ENV:**  
   O projeto possui um arquivo `.env.example` que contém as variáveis necessárias para popular os dados locais da base de dados. Renomeie-o para `.env` e preencha com as informações apropriadas.

5. **Execute as migrações do banco de dados:**

   ```bash
   yarn typeorm migration:run -d src/data-source.ts
   ```

6. **Inicie o servidor em modo de desenvolvimento:**
   ```bash
   npm run dev
   ```
