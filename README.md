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
