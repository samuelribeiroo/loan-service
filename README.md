<h1 align='center'>BackEndBR - Challenge Serviço de empréstimo</h1>

<p align="center">
  <img src="https://avatars3.githubusercontent.com/u/30732658?v=4&s=200.jpg" alt="BackEndBR" width="230" />
</p>

## 🎯 Descrição
Este projeto é um serviço que analisa quais modalidades de empréstimo estão disponíveis para um cliente com de acordo com a análise de alguns dados como: idade, salário e localização.

## 📃 Documentação
O meu processo de entrega do challenge foi documentado no arquivo [takeaways](caderno.md) (conclusões).  Ali, eu relato como foi pensar na solução, selecionar ferramentas (database, linguagem, infra) e alguns insights sobre aprendizados durante a codificação. 

## ✅ Requisitos do Sistema
<p align='left'>Os requisitos para o desenvolvimento da API foram dividos em tres categorias: <strong>Requisitos Funcionais, Regras de Negócio e Requisitos Não Funcionais</strong>. Logo abaixo é descrito o que a aplicação visa entregar em cada categoria.</p>

## Requisitos Funcionais (RFs)
<!-- Funcionalidades da aplicação (o que o usuário poderá fazer) -->

- [x] Deve ser possível se cadastrar.
- [x] Deve ser possível o usuário atualizar a sua renda.
- [x] Deve ser possível o usuário solicitar um empréstimo.
- [x] Deve ser possível buscar usuário pelo ID.
- [x] Deve ser possível buscar todos os usuários criados na aplicação.

## Regras de Negócio (RNs)
<!-- Condições aplicadas a cada Requisito Funcional (if) -->

- [x] Conceder o empréstimo pessoal se o salário do cliente for igual ou inferior a R$ 3000.
- [x] Conceder o empréstimo pessoal se o salário do cliente estiver entre R$ 3000 e R$ 5000, se o cliente tiver menos de 30 anos e residir em São Paulo (SP).
- [x] Conceder o empréstimo consignado se o salário do cliente for igual ou superior a R$ 5000.
- [x] Conceder o empréstimo com garantia se o salário do cliente for igual ou inferior a R$ 3000.
- [x] Conceder o empréstimo com garantia se o salário do cliente estiver entre R$ 3000 e R$ 5000, se o cliente tiver menos de 30 anos e residir em São Paulo (SP).

## Requisitos Não Funcionais (RNFs)
<!-- Não parte do cliente -->
<!-- Requisitos mais técnicos (BD, estratégias - cache, paginação, etc) -->

- [x] A senha do usuário precisa estar criptografada
- [x] O mesmo CPF não pode se cadastrar duas vezes no sistema.
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL.
- [x] A aplicação deve ser conteinerizada via docker e deve conter o arquivo `docker-compose.yml` com todas as instruções pertinentes.
- [x] O usuário deve ser identificado por um ID (preferencialmente UUID).

## Exemplo de Funcionamento

### Requisição



**[POST]** `{{host}}/customer-loans`

```json
{
    "age": 26,
    "cpf": "275.484.389-23",
    "name": "Vuxaywua Zukiagou",
    "income": 7000.00,
    "location": "SP"
}
```

Seu serviço deve retornar uma resposta contendo o nome do cliente e uma lista de empréstimos aos quais ele tem acesso,
com os respectivos tipos e taxas de juros.

```
HTTP/1.1 200 Ok
```

```json
{
    "customer": "Vuxaywua Zukiagou",
    "loans": [
        {
            "type": "PERSONAL",
            "interest_rate": 4
        },
        {
            "type": "GUARANTEED",
            "interest_rate": 3
        },
        {
            "type": "CONSIGNMENT",
            "interest_rate": 2
        }
    ]
}
```


## Tecnologias e Ferramentas Utilizadas
<ul>
  <li><strong>Node.js</strong>: ^18.x</li>
  <li><strong>TypeScript</strong>: ^5.5.4</li>
  <li><strong>Express</strong>: ^4.19.2</li>
  <li><strong>Docker</strong>: ^3.9.0</li>
  <li><strong>Zod</strong>: ^3.23.8 (validação de entrada)</li>
  <li><strong>PostgreSQL</strong>: ^8.12.0</li>
  <li><strong>Jest</strong> e <strong>Supertest</strong>: Testes unitários e de integração</li>
</ul>


## 🎖 Extra mile
O que foi proposto no desafio era a validação de concessão de empréstimos baseado em condições informadas pelo usuário, porém, para treinar minhas habilidades adicioneis algumas features.

- [X] Criação de usuário e persistencia dos dados no banco.
- [X] Atualização da renda inicial informado.

  ## ⏳ O que mais poderia ser adicionado....  
- [ ] Estratégia de caching utilizando Redis...
- [ ] Deploy da API
- [ ] Utilização de ORM's como Sequeelize ou Prisma
- [ ] Autenticação via JWT.

## Instruções para rodar localmente o projeto.

## Como Usar

1. Clone o repositório:

   ```bash
   https://github.com/samuelribeiroo/loan-service.git

2. Instale as dependências
   
 ```bash
   npm install
 ```

3. Configure as variáveis de ambiente no arquivo .env:

<ul>
  <li><strong>DB_USER</strong></li>
  <li><strong>DB_PASSWORD</strong></li>
  <li><strong>DB_HOST</strong> (caso necessário)</li>
  <li><strong>DB_DATABASE</strong></li>
  <li>Entre outros</li>
</ul>

4. Inicie o Docker para configurar o banco de dados PostgreSQL com Docker Compose:
 ```bash
  docker-compose up -d
 ```

5. Para rodar o servidor localmente, use o comando:
 ```bash
npm run dev
 ```

## Scripts
- `dev`: Roda a aplicação em modo de desenvolvimento.
- `start`: Roda a aplicação em produção, após ser compilada.
- `test`: Roda todos os teste unitários da aplicação.


