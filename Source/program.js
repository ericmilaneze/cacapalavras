var cacaPalavras = require("./lib/cacaPalavras").cacaPalavras;

var jogoAtual = new cacaPalavras(25, 21, true, 5);

jogoAtual
	.adicionarPalavras([ 
		'Eric',
		'Abel',
		'Ícaro',
		'Ubirajara',
		'João',
		'Thiago',
		'Suelem',
		'Marcia',
		'Laura',
		'Selma',
		'Mirian',
		'Lupércia',
		'Vinicius',
		'Renan',
		'Mina',
		'Kelvin',
		'Fernando',
		'Mariana',
		'Alice' 
	])
	.preencherLetrasRestantes({mesmaLetraDasPalavras: true, previamenteDefinido: [["a", "b"],["C", "D"]]});


console.log(jogoAtual.getShowPalavras());


console.log("\n");

	
console.log(jogoAtual.getShow(jogoAtual.getLetra, "|", " ", " ", true));


console.log("\n");


console.log(jogoAtual.getShow(jogoAtual.getLetraComPreenchimento, "+", " ", " ", true));