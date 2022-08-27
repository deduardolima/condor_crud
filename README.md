# Condor Crud

Esta API Rest consiste em 7 endpoints sendo:
- Sign Up > para cadastro de novos usuarios com algumas regras que não premite utilizar o mesmo email para novo usuário. Senha com minímo de 6 caracteres. Após cadastrado com sucesso 
retorna token de autenticado necessario para o CRUD
- Login > permite logar na aplicação, retorna token autenticado necessario para o CRUD. Caso alguma informação seja passada incorretamente, como email ou senha. Retorna mensagem de erro clara.
- Create Banner > para cadastrar novo banner, necessario informar os dados: name, image, customerID, endAt, starAt, status. Sendo que é necessario informar token pelo headers.
Caso alguma informação seja passada incorretamente, como data final menor que data inicial ou data inicial menor que data atual, retorna uma mensagem de erro clara.
- Read All Banner > endpoint retorna dos os banners cadastrados. Sendo que é necessario informar token pelo headers.
- Read Banner By ID > Endpoint retorna banner com ID informado atraves do body. Caso, ID esteja errado retorna uma mensagem clara de erro. Sendo que é necessario informar token pelo headers.
- Update Banner > endpoint para alterar algumas informações do banner como : name, image e status. Necessario informar token pelo headers e ID pelo body. 
Caso, ID esteja errado retorna uma mensagem clara de erro. Em caso de sucesso retorna messagem: "Banner alterado com sucesso".
- Deletar Banner > endpoint para deletar banner, necessário informar ID pelo body e token atraves do headers. Em caso de sucesso retorna messagem: "Banner deletado com sucesso".
Caso, ID esteja errado retorna uma mensagem clara de erro.

## Tecnologias
- Typescript
- Node.js
- Express.js
- Knex
- Jest
- MySQL

<h2 id="link">🔗 Link base da API</h2>

#### https://condorcrud.herokuapp.com
<h2 id="documentação">📃 Documentação</h2>

- Na documentação você encontra todas informações sobre como usar cada endpoint da API. Você pode clicar em "Run in Postman" para testar os endpoints na versão web do postman.
- [Documentação](https://documenter.getpostman.com/view/20352107/VUxKSU2B)


<h2 id="postmam"> <img src="https://user-images.githubusercontent.com/98994187/182048033-f81fac19-1c26-45c0-96da-a5ffbc0defec.svg" height="20" width="20" alt="javascript logo"  /> Postmam</h2>

Voçê pode testar a API com Postman.
- O Postman é um API Client que facilita aos desenvolvedores criar, compartilhar, testar e documentar APIs. Isso é feito, permitindo aos usuários criar e salvar       solicitações HTTP e HTTPs simples e complexas, bem como ler suas respostas.
- [Download do Postamam](https://www.postman.com/downloads/)

### Pre-Requisitos

- Para rodar o projeto você vai precisar do [Node.JS](https://nodejs.org/en/download/),
- Uma instancia de um banco de dados MySQL
- Um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### Como instalar e Rodar
* Para baixar o projeto
```
1. git clone https://github.com/deduardolima/condor_crud.git
2. cd condor_crud
```
* Para instalar e rodar o projeto
```
3. npm install
4. npm dev
    ou
3. yarn install
4. yarn dev
```
* Para rodar os testes 
```
5. npm test
5. yarn test
```

Renomeie o arquivo ```.env.example```  para ```.env``` e preencha as variáveis com seus dados do banco de dados MySQL. É muito importante para a execução do servidor.


