# Base GCP - CloudFunction

Estrutura base para criação de CloudFunction para GCP

## Configuração

#### env

Configuração de .ENV

- para carregar a .env no script, é necessário manter como primeira linha do arquivo index.ts `require("dotenv").config({ path: "./config/.env" });`
- as configurações do .env ficam em `<root>/config/.env`
- as configurações do .env da CloudFunction ficam em `<root>/config/.env.{dev|qa|prod}.yaml`

#### Deploy

As configuração para deploy se encontram em packege.json no nó `npm > package > config`

```sh
{
  ...
  "config": {
    "function_name": "nome da função exportada em index.ts",
    "lambda_name": "nome da lambda",
    "region": "us-east1",
    "gcp_project": "ID do projeto no GCP",
    "runtime": "nodejs16",
    "memory": "128MB",
    "timeout": 15
  },
  ...
}
```

## Scripts

#### Testes

Testes disponíveis

- `npm run test:verbose` - Executa os testes e mostra os erros ou consoles
- `npm run teste:unit` - Executa apenas os testes unitários
- `npm run teste:ci` - Executa todos os testes disponíveis na aplicação

#### Deploy

Envie o código desenvolvido para os ambientes.

- `npm run deploy:local` - Disponibiliza a aplicação localmente. Poderá ser acessada através da URL: http://localhost:8080/
- `npm run deploy:{dev|qa|prod}` - Disponibiliza a aplicação nos ambientes indicados

## Desenvolvimento

#### Validações

NA
`npm install class-validator class-transformer`

#### Rotas

As rotas são definidas em `<root>/src/main/routes`. Caso seja necessario usar outro arquivo de rotas alem do `custom-routes.ts`, inclua o apontamento em `<root>/src/main/config/routes.ts`

#### Injeção de dependencia

Utilize a injeção de dependencia colocando a anotação `@Service` na clase que será injetada

#### Serviços

NA

#### Repositórios

NA

#### Log

NA
`npm install winston`

## Outros

#### Problemas com porta

Execute os passas abaixo para liberar uma porta sendo usada

- `lsof -w -n -i tcp:8080`
- `kill -9 {PID}`

#### Links Simbolicos

- A pasta common contem diversos items que são comparitlhados entre projetos e não estão exportados como packages
- Esses intes devem receber links simbolicos (ls -s <pasta de origem> <atalho>)

- Itens que devem ser copiados:
- `common/infra`

- `common/util`

- `common/main/adapter`
- `common/main/config`
- `common/main/middlewares`

- `common/domain/data/auth`
- `common/domain/data/integrate`
- `common/domain/data/queue`
# webhook_workplace-rd
