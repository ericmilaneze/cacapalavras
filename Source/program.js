var cacaPalavras = require("./lib/cacaPalavras").cacaPalavras;



var numeroDeLinhas = 25;
var numeroDeColunas = 21;

var jogoAtual = new cacaPalavras(numeroDeLinhas, numeroDeColunas, true, 10);

jogoAtual
	.adicionarPalavraHorizontal("ERIC")
	.adicionarPalavraHorizontal("ABEL")
	.adicionarPalavraHorizontal("UBIRAJARA")
	.adicionarPalavraHorizontal("ANTONIO")
	.adicionarPalavraHorizontal("THIAGO")
	.adicionarPalavraHorizontal("SUELEM")
	.adicionarPalavraHorizontal("MARCIA")
	.adicionarPalavraHorizontal("LAURA")
	.adicionarPalavraHorizontal("SELMA")
	.adicionarPalavraHorizontal("MIRIAN")
	.preencherLetrasRestantes();



console.log(jogoAtual.getPalavras());


console.log("\n");

	
console.log(jogoAtual.getShow(jogoAtual.getLetra, "|", " ", " ", true));


console.log("\n");


console.log(jogoAtual.getShow(jogoAtual.getLetraComPreenchimento, "+", " ", " ", true));