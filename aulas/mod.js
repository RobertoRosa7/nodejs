/*
* Os módulos permitem isolar bloco de códigos para que possamos
* organizar toda a estrutura da aplicação, melhorarando assim sua execução
* sendo recorrente, portanto, quando queremos inserir um arquivo como módulo
* devemos importar com 'require' e exportar com 'module.exports'
*
* Os módulos podem retornar strings, arrays, objetos, funções e números
* quando exportamos uma função é necessário executá-la ao chamá-la, com parênteses
* require('nome_mod')();
*/

module.exports = function(){
    console.log('Módulo exportando uma função');
}