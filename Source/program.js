var cacaPalavras = require("./lib/cacaPalavras").cacaPalavras;



function mostrar() {
	console.log(jogoAtual.getShowPalavras());
	
	console.log("\n");


	console.log(jogoAtual.getShow(jogoAtual.getLetra, " ", " ", " ", true));


	console.log("\n");


	console.log(jogoAtual.getShow(jogoAtual.getLetraComPreenchimento, "+", " ", " ", true));
	
	console.log("\n");
}



var jogoAtual = new cacaPalavras(24, 21, true, 5);

jogoAtual.adicionarPalavras({ palavrasParaAdicionar: ["Eric", "Thiago", "Marcia", "Selma", "Suelem", "Renan"], preenchimento: { mesmaLetraDasPalavras: true } });

mostrar();
jogoAtual.adicionarPalavra({ palavra: "Vinicius" }, 2, 2, 2, 2, { letrasAceitas: "X" });

mostrar();

jogoAtual.removerPalavra(jogoAtual.getPalavra({ palavra: "Renan" }));

mostrar();

jogoAtual.adicionarPalavra({ palavra: "Ubirajara", linhaInicial: 0, colunaInicial: 0 });

mostrar();

jogoAtual.adicionarPalavra({ palavra: "Abel", direcao: "horizontal", reverso: true });

mostrar();

jogoAtual.adicionarPalavraVertical({ palavra: "Mirian", reverso: false }, true);

mostrar();

jogoAtual.preencherLetrasRestantes({ mesmaLetraDasPalavras: true });

mostrar();

jogoAtual.adicionarPalavra({ palavra: "Antonia" }, 2, 2, 2, 2, "manterPreenchimento");

mostrar();