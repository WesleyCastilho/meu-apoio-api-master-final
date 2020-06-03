<h1 align="center">
  <img alt="GoBarber" title="GoBarber" src="src/img/logo.svg" width="200px" />
</h1>

# GoBarber-api
 <a href="https://github.com/lucaslamar/go-barber-react"><img alt="" src="https://img.shields.io/badge/Gobarber-Web-brightgreen"></a>
> O GoBarber é um sistema de gerenciamento de agendamementos

Com o Gobarber é possivel cadastrar com foto um usuario e dizer se o mesmo é um provedor de serviços ou não. O usuario comum pode cadastrar um agedamento para um dia especifico a um provider especifico o provider pode cancelar esse agendamento

 ## Começando

 <h3>Pré-requisitos</h3>

<ul>
    <li> <a href="https://nodejs.org/en/download/package-manager/"> NodeJS </a></li>
    <li> <a href="https://yarnpkg.com/en/docs/getting-started">Yarn</a> </li>
    <li> <a href="https://www.docker.com/get-started"> Docker </a> </li>
    <li> <a href="https://hub.docker.com/_/postgres">PostgreSQL</a> </li>
    <li> <a href="https://hub.docker.com/_/mongo">MongoDB</a> </li>
    <li> <a href="https://hub.docker.com/_/redis"> Redis </a> </li>
</ul>

<h4>REST API Client</h4>
<ul>
  <li><a href="https://insomnia.rest/">Insomnia</a></li>
  <li><a href="https://www.getpostman.com/">Postman</a></li>
  <li><a href="https://install.advancedrestclient.com/install">Advanced REST Client</a></li>
</ul>


## Configuração para Desenvolvimento

Depois de clonar repositorio e instalar os pre requisitos

- Run **`yarn`** to install dependencies;
- Crie uma **postgres** database;
- Crie uma **redis** database;
- Crie umm arquivo **`.env`** baseado **`.env.example`**;
- Ponha suas credencias **`.env`**;
- Rode **`yarn sequelize db:migrate`** para criar as migraçoes ;
- rode **`yarn sequelize db:seed:all`** para criar uma seed;
- rode **`yarn dev`** para iniciar a aplicação;
- rode **`yarn queue`** em outro terminal para iniciar as filas.

Agora você pode usar a REST API Client para testar "**GoBarber**".

## Construido com
<ul>
  <li>NodeJS</li>
  <li>Docker</li>
  <li>PostgreSQL</li>
  <li>Mailtrap.io</li>
  <li>Redis</li>
  <li>MongoDB</li>
</ul>

## Ferramentas
<ul>
  <li>Sucrase + Nodemon;</li>
  <li>ESLint + Prettier + EditorConfig;</li>
  <li>Sequelize</li>
</ul>
