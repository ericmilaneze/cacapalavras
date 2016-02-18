var cacaPalavras = require("./lib/cacaPalavras").cacaPalavras;

var jogoAtual = new cacaPalavras(25, 21, true, 5);

jogoAtual
	.adicionarPalavra("ERIC")
	.adicionarPalavra("ABEL")
	.adicionarPalavra("ICARO")
	.adicionarPalavra("UBIRAJARA")
	.adicionarPalavra("JOÃO")
	.adicionarPalavra("THIAGO")
	.adicionarPalavra("SUELEM")
	.adicionarPalavra("MARCIA")
	.adicionarPalavra("LAURA")
	.adicionarPalavra("SELMA")
	.adicionarPalavra("MIRIAN")
	.adicionarPalavra("LUPERCIA")
	.adicionarPalavra("VINICIUS")
	.adicionarPalavra("RENAN")
	.adicionarPalavra("MINA")
	.adicionarPalavra("KELVIN")
	.adicionarPalavra("FERNANDO")
	.adicionarPalavra("MARIANA")
	.adicionarPalavra("ALICE")
	//.preencherLetrasRestantes();
	.preencherLetrasRestantesComMesmasLetrasDasPalavrasAdicionadas();


console.log(jogoAtual.getPalavras());


console.log("\n");

	
console.log(jogoAtual.getShow(jogoAtual.getLetra, "|", " ", " ", true));


console.log("\n");


console.log(jogoAtual.getShow(jogoAtual.getLetraComPreenchimento, "+", " ", " ", true));