Para saber mais: O que são mixins

Podemos resumir mixins em: classes que contêm métodos que podem ser utilizados por outras classes, sem a necessidade de herança direta. Dito de outra forma, um mixin fornece métodos que implementam um certo comportamento em objetos, sem poder ser utilizado sozinho, mas sim para adicionar esse comportamento a outras classes.

No Sequelize, temos uma diferença entre escopos de modelo, que são aplicados em chamadas estáticas ao modelo (como no exemplo que fizemos no vídeo, Pessoas.scope('todos').findAll()), e escopos de associação, que são uma regra, ou um conjunto de atributos que são automaticamente aplicados em instâncias do modelo, como em Pessoas.associate = function(models) {...}.

Escopos de associação se comportam da mesma forma que os escopos de modelo, no sentido que ambos aplicam palavras-chave como WHERE em chamadas ao banco; mas os mixins são métodos que existem somente nas instâncias dos modelos: Pessoas.getPessoasMatriculadas, Niveis.getNiveisPorTurma, etc.

A lista de métodos criados automaticamente com as instâncias de modelo são:

addModel()

addModels()

countModels()

createModel()

getModels()

hasModel()

hasModels()

removeModel()

removeModels()

setModels()

Lembrando que “Model” e “Models”, aqui, refere-se ao nome do modelo! 
Lembre-se também que o Sequelize cria os nomes automaticamente mas não entende muito bem o singular e plural em português, mas você pode definir nomes personalizados para seus mixins, como fizemos no vídeo.