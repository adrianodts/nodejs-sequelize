# nodejs-sequelize
Curso de NodeJS com Sequelize ORM.


# Criando usuários

Caso seu usuário atual do sistema não seja um usuário sudoer (ou seja, um usuário com privilégios de “administrador”) pode ser necessário o sudo no início do comando: sudo mysql -u [usuário] -p (você vai precisar da senha correspondente)

mysql> CREATE USER '[seu nome de usuário]'@'localhost' IDENTIFIED BY '[sua senha]'; - substitua as infos dentro dos colchetes pelas de sua preferência e não esqueça de deletar somente os colchetes - as aspas simples fazem parte do código.

Em seguida, dê ao novo usuário privilégios:

GRANT ALL PRIVILEGES ON * . * TO '[seu nome de usuário]'@'localhost';COPIAR CÓDIGO
Importante: Veja que o comando acima dá ao usuário recém-criado privilégios totais de acesso! Ao mesmo tempo que isso é OK enquanto se trabalha localmente, não é o que costuma acontecer quando se trabalha em um projeto com acesso de diversos usuários e informações sensíveis no banco, por razões de segurança.

Por último, rode o comando: FLUSH PRIVILEGES; para recarregar as permissões.

#Para iniciarmos o projeto, já recebemos um diagrama de tabelas. Isso foi feito para que possamos focar no principal, que é o desenvolvimento da API!
Diagrama de banco de dados composto por quatro tabelas: Pessoas, Níveis, Turmas e Matrículas.

A tabela Pessoas é composta pelas colunas:
ID: dado do tipo inteiro
nome: dado do tipo string
ativo: dado do tipo boolean
email: dado do tipo string
role: dado do tipo string

A tabela Niveis é composta pelas colunas:
ID: dado do tipo inteiro
descr_nivel: dado do tipo string

A tabela Turmas é composta pelas colunas:
ID: dado do tipo inteiro
docente_id: dado do tipo ID/inteiro
data_inicio: dado do tipo dateonly
nivel_id: dado do tipo ID/inteiro 

A tabela Matriculas é composta pelas colunas:
ID: dado do tipo inteiro
status: dado do tipo string
estudante_id: dado do tipo ID/inteiro
turma_id: dado do tipo ID/inteiro

A tabela Pessoas está relacionada à tabela Turmas através de uma FK, ou chave estrangeira, na coluna "docente_id". Também está ligada à tabela Matrículas através de chave estrangeira na coluna "estudante_id". As duas relações são do tipo "um para muitos": uma Pessoa para muitas Turmas e uma pessoa para muitas Matrículas.
A tabela Níveis está relacionada à tabela Turmas através de uma chave estrangeira na coluna "nivel_id". É uma relação de "um nível para muitas Turmas".
A tabela Turmas está relacionada à tabela Matrículas através de uma chave estrangeira na coluna "turma_id". É uma relação de "uma Turma para muitas Matrículas".

O diagrama vai servir como base e guia para desenvolvermos: como vão funcionar os modelos, quais serão os atributos de cada tabela e como cada tabela vai utilizar informações de outras para termos dados que façam sentido.

A aplicação que estamos desenvolvendo é voltada para uma escola de inglês, então as tabelas (ou entidades relacionais) refletem o funcionamento de uma escola: as pessoas que fazem partes dela, os conteúdos ensinados (a escola de inglês trabalha com níveis de proficiência - básico, intermediário e avançado), as turmas de cada nível e os registros de matrícula controlam tudo. Se pararmos para pensar, há muitas formas de “expressar” um negócio em tabelas. Como você faria isso?

Alguns jeitos de criar tabelas funcionam melhor do que outros, quando falamos de performance de banco, repetição desnecessária de informações, etc. O processo de otimizar as tabelas de acordo com a necessidade do negócio é o que chamamos de normalização.

# Setup

Para esse curso, vamos continuar de onde paramos no curso anterior. Se você já fez o curso anterior e quiser continuar direto com o mesmo projeto, pode pular essa parte; mas se precisar ou preferir começar com um projeto novo, baixe o repositório com a seguinte estrutura e arquivos iniciais:
.
├── api
│   ├── config
│   │   └── config.json
│   ├── controllers
│   │   ├── NivelController.js
│   │   ├── PessoaController.js
│   │   └── TurmaController.js
│   ├── index.js
│   ├── migrations
│   │   ├── 20200505131114-create-pessoas.js
│   │   ├── 20200526194618-create-niveis.js
│   │   ├── 20200526194804-create-turmas.js
│   │   └── 20200526194858-create-matriculas.js
│   ├── models
│   │   ├── index.js
│   │   ├── matriculas.js
│   │   ├── niveis.js
│   │   ├── pessoas.js
│   │   └── turmas.js
│   ├── routes
│   │   ├── index.js
│   │   ├── niveisRoute.js
│   │   ├── pessoasRoute.js
│   │   └── turmasRoute.js
│   └── seeders
│       ├── 20200505161755-demo-pessoa.js
│       ├── 20200601170039-demo-nivel.js
│       ├── 20200601170107-demo-turmas.js
│       └── 20200601170115-demo-matriculas.js
├── diagrama de banco - descricao da imagem.txt
├── Diagrama Relacional - escola de inglês.pdf
├── .gitignore
├── package.json
├── package-lock.json
├── requisitos.md
└── .sequelizercCOPIAR CÓDIGO
Agora siga os seguintes passos de instalação:

Navegue pelo terminal até o diretório do projeto e instale as dependências com o comando npm install.

Se você ainda não criou um banco de dados local para trabalhar nesse projeto, vai precisar fazer isso agora. No curso usamos o MySQL; caso precise pode seguir as instruções que usamos no curso anterior para criar um novo banco de dados chamado escola_ingles e conectar-se nele. Durante os cursos vamos fazer as consultas direto no terminal do MySQL, mas se você quiser pode usar algum cliente, como o MySQL Workbench.

Uma vez criado o banco, confira os dados no arquivo api/config/config.json:

{
 "development": {
   "username": "alura",  //utilize seu nome de user
   "password": "admin123", //sua senha, se existir
   "database": "escola_ingles",
   "host": "127.0.0.1",
   "dialect": "mysql",
   "operatorsAliases": false
 },
//restante do código
}COPIAR CÓDIGO
Se for o caso, troque o nome e senha de usuário para os que você estiver usando em seu banco local. Se quiser usar outro banco que o Sequelize dê suporte, como SQLite, MSSQL Server, MariaDB ou PostgreSQL, modifique também essa informação conforme a documentação do Sequelize:

dialect: 'mysql' | 'mariadb' | 'postgres' | 'mssql'COPIAR CÓDIGO
E faça a instalação da dependência:

$ npm install --save pg pg-hstore # Postgres
$ npm install --save mysql2
$ npm install --save mariadb
$ npm install --save sqlite3
$ npm install --save tedious # Microsoft SQL ServerCOPIAR CÓDIGO
Rode os comandos de migração do Sequelize no terminal para criar as tabelas no banco: npx sequelize-cli db:migrate Você pode conferir se as tabelas foram criadas com sucesso através do comando show tables; no terminal do MySQL.

Você pode usar os arquivos de seed que estão na pasta seeders do projeto para popular as tabelas com dados de teste. Vamos usar bastante esses dados durante o curso, então é super recomendável que você faça este passo para que o seu banco tenha dados pra serem trabalhados no projeto. Você pode usar o comando no terminal npx sequelize-cli db:seed:all.

Rode na pasta raiz do projeto o comando de terminal npm start para subir o servidor local. O Express fará a conexão em localhost:3000/, caso queira modificar a porta você pode alterar no arquivo api/index.js, que é o ponto de entrada da aplicação.

Faça o teste no Postman das rotas, por exemplo GET localhost:3000/pessoas para trazer do banco os registros da tabela Pessoas, além das demais rotas que estão na pasta api/routes.

Neste projeto utilizamos um linter para cuidar do estilo do código. Caso não queira utilizar, basta deletar a dependência e o arquivo .eslintrc da raiz do projeto:

 "devDependencies": {
   "eslint": "^7.4.0", //delete esta linha
   "nodemon": "^2.0.4"
 }COPIAR CÓDIGO
Caso queira utilizar o Linter, faça a instalação e confira se o script do eslint está adicionado no package.json: "scripts": { "lint": "eslint api --fix", "start": "nodemon ./api/index.js "npm run lint"" },

Com o ambiente configurado, podemos seguir em frente!