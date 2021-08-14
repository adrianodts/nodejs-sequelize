Para saber mais: Validação de dados únicos

A documentação do Sequelize utiliza o termo restrição (constraint). Constraints são como regras que regem as tabelas; são usados para limitar os tipos de dados que podem ser inseridos em uma tabela/coluna e garantir a integridade e confiabilidade dos dados que estão em um banco. Eles podem ser aplicados tanto em colunas individuais como de forma geral para toda a tabela. Eles podem ser definidos diretamente no modelo, como por exemplo, unique:true é um constraint que serve para garantir que o nome de User de quem for utilizar o sistema seja sempre único:

const Pessoa = sequelize.define('Pessoa', {
 nomeUser: {
   type: DataTypes.STRING,
   unique: true
 },
 .
 .
 .
}COPIAR CÓDIGO
Para o exemplo acima funcionar, a tabela deve ser criada com Sequelize a partir desse modelo, ou já existir no banco com essa constraint. Se não for o caso, você pode utilizar o método findOrCreate(), que verifica se o registro existe no banco antes de fazer qualquer outra ação. Existe uma diferença entre validações, que são feitas pelo Sequelize, em JavaScript, antes de qualquer query ser enviada para o banco, e constraints, que são regras definidas no SQL - tanto que podem ser definidos usando a sintaxe do SQL, como no caso da constraint NOT NULL abaixo:

CREATE TABLE Pessoa
(
ID int(6) NOT NULL,
NOME varchar(25) NOT NULL,
EMAIL varchar(20)
);COPIAR CÓDIGO
Diferente das validações, na verificação de constraints é executada uma query, e quem devolve o erro para o JavaScript é o SQL.

São constraints em SQL:

NOT NULL - garante que não exista nenhum valor NULL na coluna;

UNIQUE - Garante que não existam valores iguais em uma coluna;

PRIMARY KEY - Identifica cada linha em uma tabela através de um valor único (junção de NOT NULL e UNIQUE);

FOREIGN KEY - Identifica um valor único em outra tabela como chave;

CHECK - Garante que todos os valores em uma coluna satisfazem uma condição específica;

DEFAULT - Determina um valor padrão caso nenhum valor seja informado;

INDEX - Para criar índices e facilitar o acesso a determinados conjuntos de dados.