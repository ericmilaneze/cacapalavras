var cacaPalavras = function(numeroDeLinhas, numeroDeColunas, podeCruzar, chancesParaReverso) {
	var adicionarPalavraCallbacks = [],
		adicionandoPalavraCallbacks = [];
		var palavras = [],
		letras = [],
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
	}
	
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

		return output;
	}
	
	this.preencherLetrasRestantes = function(letrasAceitas) {
		var letrasAceitasInterno = ((letrasAceitas == undefined || letrasAceitas.trim() === "") ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : letrasAceitas).toUpperCase();
		
		letrasTudoPreenchido = getCopiaLetras();
		
		for(var i = 0; i < numeroDeLinhas; i++) {
			for(var j = 0; j < numeroDeColunas; j++) {
				if(letras[i][j] === letraVazia) {
					if(letrasAceitasInterno.length === 1) {
						letrasTudoPreenchido[i][j] = letrasAceitasInterno;
					}
					else {
						var random = Math.floor(Math.random() * letrasAceitasInterno.length);
						
						letrasTudoPreenchido[i][j] = letrasAceitasInterno[random];
					}
				}
			}
		}
		
		return this;
	};
	
	this.preencherLetrasRestantesComMesmasLetrasDasPalavrasAdicionadas = function(maisLetras) {
		var letrasParaAdicionar = "";
		
		for(var i = 0; i < palavras.length; i++) {
			for(var j = 0; j < palavras[i].length; j++) {
				letrasParaAdicionar += palavras[i][j];
			}
		}
		
		return this.preencherLetrasRestantes(letrasParaAdicionar + (maisLetras === undefined ? "" : maisLetras));
	};
	
	var tryAdicionarPalavraHorizontal = function(palavra, reverso, linhaInicial, colunaInicial) {
		for(var i = colunaInicial; i < colunaInicial + palavra.length; i++) {
			if(letras[linhaInicial][i] !== letraVazia)
				if(!podeCruzar)
					return false;
				else if(letras[linhaInicial][i] !== (reverso ? palavra.split("").reverse().join("")[i - colunaInicial] : palavra[i - colunaInicial]))
					return false;
		}
		
		return true;
	};
	
	this.adicionarPalavraHorizontal = function(palavra, linhaInicial, colunaInicial, reverso) {
		if(palavra !== undefined) {
			var palavraInterno = palavra.trim();
			
			var linhaInicialInterno = (linhaInicial === undefined || linhaInicial >= numeroDeLinhas) ? (Math.floor(Math.random() * numeroDeLinhas)) : linhaInicial;

			var colunaInicialInterno = (colunaInicial === undefined || colunaInicial > numeroDeColunas - palavraInterno.length) ? (Math.floor(Math.random() * (numeroDeColunas - palavraInterno.length + 1))) : colunaInicial;

			var reversoInterno = reverso === undefined ? (Math.floor(Math.random() * (chancesParaReverso === undefined ? 2 : chancesParaReverso)) == 0 ? true : false) : reverso;
			
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
					
					palavras.push(palavraInterno);
				}
			}
		}
		
		return this;
	};
	
	this.getLetra = function(linha, coluna) {
		return letras[linha][coluna];
	};
	
	this.getLetraComPreenchimento = function(linha, coluna) {
		return letrasTudoPreenchido[linha][coluna];
	};
	
	this.getLetras = function() {
		return letras;
	};
	
	this.getPalavras = function() {
		return palavras;
	};
	
	// this.onAdicionarPalavra = function(callback) {
		// adicionarPalavraCallbacks.push(callback);
	// };
	
	// this.onAdicionandoPalavra = function(callback) {
		// adicionandoPalavraCallbacks.push(callback);
	// };
};




if(exports !== undefined)
	exports.cacaPalavras = cacaPalavras;