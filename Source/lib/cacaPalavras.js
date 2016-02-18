var cacaPalavras = function(numeroDeLinhas, numeroDeColunas, podeCruzar, chancesParaReverso) {	var palavras = [],
		letras = [],
		letrasParaPreenchimento = []
		letrasTudoPreenchido = [];
	
	var letraVazia = " ";

	for(var i = 0; i < numeroDeLinhas; i++) {
		letras[i] = [];
	
		for(var j = 0; j < numeroDeColunas; j++) {
			letras[i][j] = letraVazia;
		}
	}
	
	var getCopiaLetras = function() {
		var retorno = [];
		
		for(var i = 0; i < letras.length; i++)
			retorno.push(letras[i].slice());
		
		return retorno;
	};
	
	this.getShow = function getShow(getLetraCallback, preencherEspacoEmBranco, caracteresEsquerda, caracteresDireita, mostrarLinhas) {
		var output = "";

		for(var i = 0; i < numeroDeLinhas; i++) {
			output += mostrarLinhas ? ("000" + (i + 1)).slice(("000" + (i + 1)).length - 3, ("000" + (i + 1)).length) + ": " : "";
			
			for(var j = 0; j < numeroDeColunas; j++) {
				output += 
					((caracteresEsquerda === undefined) ? "" : caracteresEsquerda) +
					((getLetraCallback(i, j).trim() === "") ? (preencherEspacoEmBranco === undefined ? "+" : preencherEspacoEmBranco) : getLetraCallback(i, j)) +
					((caracteresDireita === undefined) ? "" : caracteresDireita);
			}

			output += "\r\n";
		}

		return output.toUpperCase();
	};
	
	this.getShowPalavras = function() {
		var output = "";
		
		for(var i = 0; i < palavras.length; i++) {
			output += palavras[i].palavra + (i < palavras.length - 1 ? "\n" : "");
		}
		
		return output;
	};
	
	this.preencherLetrasRestantes = function(preenchimento) { //letrasAceitas) {
		formarLetrasParaPreenchimento(preenchimento);
		
		letrasTudoPreenchido = getCopiaLetras();
		
		for(var i = 0; i < numeroDeLinhas; i++) {
			for(var j = 0; j < numeroDeColunas; j++) {
				if(letras[i][j] === letraVazia) {
					letrasTudoPreenchido[i][j] = letrasParaPreenchimento[i][j];
				}
			}
		}
		
		return this;
	};
	
	var formarLetrasParaPreenchimento = function(preenchimento) {
		var preenchimentoInterno = preenchimento === undefined ? {} : preenchimento;
		
		var letrasPossiveis = getLetrasPossiveis(preenchimento);
		
		if(preenchimentoInterno.previamenteDefinido === undefined) {
			for(var i = 0; i < numeroDeLinhas; i++) {
				letrasParaPreenchimento[i] = [];
			
				for(var j = 0; j < numeroDeColunas; j++)
					letrasParaPreenchimento[i][j] = letrasPossiveis[Math.floor(Math.random() * letrasPossiveis.length)];
			}
		}
		else {
			for(var i = 0; i < numeroDeLinhas; i++) {
				letrasParaPreenchimento[i] = [];
				
				if(preenchimentoInterno.previamenteDefinido[i] === undefined)
					preenchimentoInterno.previamenteDefinido[i] = [];
			
				for(var j = 0; j < numeroDeColunas; j++) {
					if(preenchimentoInterno.previamenteDefinido[i][j] === undefined)
						letrasParaPreenchimento[i][j] = letrasPossiveis[Math.floor(Math.random() * letrasPossiveis.length)];
					else
						letrasParaPreenchimento[i][j] = preenchimentoInterno.previamenteDefinido[i][j];
				}
			}
		}
		
		return letrasParaPreenchimento;
	};
	
	var getLetrasAceitas = function(preenchimento) {
		return (preenchimento.letrasAceitas === undefined || preenchimento.letrasAceitas.trim() === "") ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : preenchimento.letrasAceitas;
	};
	
	var getLetrasPossiveis = function(preenchimento) {
		if(preenchimento.mesmaLetraDasPalavras !== undefined && preenchimento.mesmaLetraDasPalavras === true)
			return getLetrasComMesmasLetrasDasPalavrasAdicionadas(preenchimento.letrasAceitas);
		else
			return getLetrasAceitas(preenchimento);
	};
	
	getLetrasComMesmasLetrasDasPalavrasAdicionadas = function(maisLetras) {
		var letrasParaAdicionar = "";
		
		for(var i = 0; i < palavras.length; i++) {
			for(var j = 0; j < palavras[i].palavra.length; j++) {
				letrasParaAdicionar += palavras[i].palavra[j];
			}
		}
		
		return letrasParaAdicionar + (maisLetras === undefined ? "" : maisLetras);
	};
	
	var tryAdicionarPalavraHorizontal = function(palavra, reverso, linhaInicial, colunaInicial) {
		for(var i = colunaInicial; i < colunaInicial + palavra.length; i++) {
			if(letras[linhaInicial][i] !== letraVazia)
				if(!podeCruzar)
					return false;
				else if(letras[linhaInicial][i].toUpperCase() !== (reverso ? palavra.split("").reverse().join("")[i - colunaInicial] : palavra[i - colunaInicial]).toUpperCase())
					return false;
		}
		
		return true;
	};
	
	var tryAdicionarPalavraVertical = function(palavra, reverso, linhaInicial, colunaInicial) {
		for(var i = linhaInicial; i < linhaInicial + palavra.length; i++) {
			if(letras[i][colunaInicial] !== letraVazia)
				if(!podeCruzar)
					return false;
				else if(letras[i][colunaInicial].toUpperCase() !== (reverso ? palavra.split("").reverse().join("")[i - linhaInicial] : palavra[i - linhaInicial]).toUpperCase())
					return false;
		}
		
		return true;
	};
	
	this.adicionarPalavraVertical = function(palavra) {
		if(palavra !== undefined && palavra.palavra !== undefined) {
			var palavraInterno = palavra.palavra.trim();
			
			var linhaInicialInterno = (palavra.linhaInicial === undefined || palavra.linhaInicial > numeroDeLinhas - palavraInterno.length) ? (Math.floor(Math.random() * (numeroDeLinhas - palavraInterno.length + 1))) : linhaInicial;

			var colunaInicialInterno = (palavra.colunaInicial === undefined || palavra.colunaInicial >= numeroDeColunas) ? (Math.floor(Math.random() * numeroDeColunas)) : palavra.colunaInicial;

			var reversoInterno = palavra.reverso === undefined ? (Math.floor(Math.random() * (chancesParaReverso === undefined ? 2 : chancesParaReverso)) == 0 ? true : false) : palavra.reverso;
			
			if(palavraInterno.length <= letras.length) { // se o tamanho da palavraInterno for menor ou igual o tamanho da linha
				var linhaTentativa = linhaInicialInterno;
				var colunaTentativa = colunaInicialInterno;
				var tentativasFrustradasColunas = [];
				
				while(!tryAdicionarPalavraVertical(palavraInterno, reversoInterno, linhaTentativa, colunaTentativa)) {
					var tentativasFrustradasMesmaColuna = [];
					
					do {	
						tentativasFrustradasMesmaColuna.push(linhaTentativa);

						if(tentativasFrustradasMesmaColuna.length == (numeroDeLinhas - palavraInterno.length + 1)) {
							break;
						}
						else {
							do { // linha não tentada ainda
								linhaTentativa = Math.floor(Math.random() * (numeroDeLinhas - palavraInterno.length + 1));
							} while(tentativasFrustradasMesmaColuna.indexOf(linhaTentativa) !== -1)
						}
					} while(!tryAdicionarPalavraVertical(palavraInterno, reversoInterno, linhaTentativa, colunaTentativa));
					
					if(!tryAdicionarPalavraVertical(palavraInterno, reversoInterno, linhaTentativa, colunaTentativa)) {
						tentativasFrustradasColunas.push(colunaTentativa);
						
						if(tentativasFrustradasColunas.length == numeroDeColunas) {
							break;
						}
						else {
							while(tentativasFrustradasColunas.indexOf(colunaTentativa) !== -1) {
								colunaTentativa = Math.floor(Math.random() * numeroDeColunas);
							}
						}
					}
				}
			
				if(tryAdicionarPalavraVertical(palavraInterno, reversoInterno, linhaTentativa, colunaTentativa)) {
					for(var i = linhaTentativa; i < linhaTentativa + palavraInterno.length; i++) {
						letras[i][colunaTentativa] = reversoInterno ? palavraInterno.split("").reverse().join("")[i - linhaTentativa] : palavraInterno[i - linhaTentativa];
					}
					
					palavras.push({ palavra: palavraInterno, linhaInicial: linhaTentativa, colunaInicial: colunaTentativa, reverso: reversoInterno });
				}
			}
		}
		
		return this;
	}
	
	this.adicionarPalavraHorizontal = function(palavra) {
		if(palavra !== undefined && palavra.palavra !== undefined) {
			var palavraInterno = palavra.palavra.trim();
			
			var linhaInicialInterno = (palavra.linhaInicial === undefined || palavra.linhaInicial >= numeroDeLinhas) ? (Math.floor(Math.random() * numeroDeLinhas)) : palavra.linhaInicial;

			var colunaInicialInterno = (palavra.colunaInicial === undefined || palavra.colunaInicial > numeroDeColunas - palavraInterno.length) ? (Math.floor(Math.random() * (numeroDeColunas - palavraInterno.length + 1))) : palavra.colunaInicial;

			var reversoInterno = palavra.reverso === undefined ? (Math.floor(Math.random() * (chancesParaReverso === undefined ? 2 : chancesParaReverso)) == 0 ? true : false) : palavra.reverso;
			
			if(palavraInterno.length <= letras[linhaInicialInterno].length) { // se o tamanho da palavraInterno for menor ou igual o tamanho da linha
				var linhaTentativa = linhaInicialInterno;
				var colunaTentativa = colunaInicialInterno;
				var tentativasFrustradasLinhas = [];
			
				while(!tryAdicionarPalavraHorizontal(palavraInterno, reversoInterno, linhaTentativa, colunaTentativa)) {
					var tentativasFrustradasMesmaLinha = [];
					
					do {	
						tentativasFrustradasMesmaLinha.push(colunaTentativa);

						if(tentativasFrustradasMesmaLinha.length == (numeroDeColunas - palavraInterno.length + 1)) {
							break;
						}
						else {
							do { // coluna não tentada ainda
								colunaTentativa = Math.floor(Math.random() * (numeroDeColunas - palavraInterno.length + 1));
							} while(tentativasFrustradasMesmaLinha.indexOf(colunaTentativa) !== -1)
						}
					} while(!tryAdicionarPalavraHorizontal(palavraInterno, reversoInterno, linhaTentativa, colunaTentativa));
					
					if(!tryAdicionarPalavraHorizontal(palavraInterno, reversoInterno, linhaTentativa, colunaTentativa)) {
						tentativasFrustradasLinhas.push(linhaTentativa);
						
						if(tentativasFrustradasLinhas.length == numeroDeLinhas) {
							break;
						}
						else {
							while(tentativasFrustradasLinhas.indexOf(linhaTentativa) !== -1) {
								linhaTentativa = Math.floor(Math.random() * numeroDeLinhas);
							}
						}
					}
				}
				
				if(tryAdicionarPalavraHorizontal(palavraInterno, reversoInterno, linhaTentativa, colunaTentativa)) {
					for(var i = colunaTentativa; i < colunaTentativa + palavraInterno.length; i++) {
						letras[linhaTentativa][i] = reversoInterno ? palavraInterno.split("").reverse().join("")[i - colunaTentativa] : palavraInterno[i - colunaTentativa];
					}
					
					palavras.push({ palavra: palavraInterno, linhaInicial: linhaTentativa, colunaInicial: colunaTentativa, reverso: reversoInterno });
				}
			}
		}
		
		return this;
	};
	
	this.adicionarPalavra = function(palavra, chancesParaHorizontal, chancesParaVertical) {
		if(palavra !== undefined && palavra.palavra !== undefined) {
			var possibilidades = [];
			
			if(Math.floor((Math.random() * (chancesParaHorizontal === undefined ? 2 : chancesParaHorizontal))) === 0)
				possibilidades.push("horizontal");
			
			if(Math.floor((Math.random() * (chancesParaVertical === undefined ? 2 : chancesParaVertical))) === 0)
				possibilidades.push("vertical")
			
			var adicionarEscolhido = possibilidades[Math.floor(Math.random() * possibilidades.length)];
			
			if(adicionarEscolhido === "horizontal")
				return this.adicionarPalavraHorizontal(palavra);
			else if(adicionarEscolhido === "vertical")
				return this.adicionarPalavraVertical(palavra);
			
			return this.adicionarPalavraHorizontal(palavra);
		}
		
		return this;
	};
	
	this.adicionarPalavras = function(palavrasParaAdicionar) {
		for(var i = 0; i < palavrasParaAdicionar.length; i++)
			this.adicionarPalavra({ palavra: palavrasParaAdicionar[i] });
		
		return this;
	};
	
	this.getLetra = function(linha, coluna) {
		return letras[linha][coluna];
	};
	
	this.getLetraComPreenchimento = function(linha, coluna) {
		return letrasTudoPreenchido[linha][coluna];
	};
	
	this.getPalavras = function() {
		return palavras;
	};
};




if(exports !== undefined)
	exports.cacaPalavras = cacaPalavras;