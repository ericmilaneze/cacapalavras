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
	
	// .adicionarPalavraHorizontal({ palavra: "TANIA", reverso: false, linhaInicial: 0, colunaInicial: 0 }, true)
	// .adicionarPalavraVertical({ palavra: "MARIAN", reverso: true, linhaInicial: 0, colunaInicial: 2 }, true)
	//.adicionarPalavraDiagonalNordesteSudoeste({ palavra: "THIAGO", reverso: false, linhaInicial: 4, colunaInicial: 0 }, true)
	// .adicionarPalavraDiagonalNoroesteSudeste({ palavra: "LUPERCIA" }, true)
	.preencherLetrasRestantes(jogoAtual.setPosicaoLetrasParaPreenchimentoPreviamenteDefinidas(
			{ mesmaLetraDasPalavras: true, previamenteDefinido: [["a", "b"],["C", "D"]] }
		, 1, 4, "Z"));


console.log(jogoAtual.getShowPalavras());


console.log("\n");

	
console.log(jogoAtual.getShow(jogoAtual.getLetra, " ", " ", " ", true));


console.log("\n");


console.log(jogoAtual.getShow(jogoAtual.getLetraComPreenchimento, "+", " ", " ", true));