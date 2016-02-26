var cacaPalavras = function(numeroDeLinhas, numeroDeColunas, podeCruzar, chancesParaReverso) {
	var palavras = [];
    var letras = [];
	var letrasParaPreenchimento = [];
	var letrasTudoPreenchido = [];
	
	var horizontal = "horizontal";
	var vertical = "vertical";
	var diagonalNoroesteSudeste = "diagonalNoroesteSudeste";
	var diagonalNordesteSudoeste = "diagonalNordesteSudoeste";
	
	var letraVazia = " ";
	
	var init = function() {
		letras = getInicializarLetras();
	};
	
	var getInicializarLetras = function() {
		var retorno = [];
		
		for(var i = 0; i < numeroDeLinhas; i++) {
			retorno[i] = [];
		
			for(var j = 0; j < numeroDeColunas; j++) {
				retorno[i][j] = letraVazia;
			}
		}
		
		return retorno;
	};
	
	var getCopiaLetras = function() {
		var retorno = [];
		
		for(var i = 0; i < letras.length; i++)
			retorno.push(letras[i].slice());
		
		return retorno;
	};
	
	var getCopiaPalavras = function() {
		var retorno = [];
		
		for(var i = 0; i < palavras.length; i++)
			retorno.push(palavras[i]);
		
		return retorno;
	};
	
	var getCopiaLetrasParaPreenchimento = function() {
		var retorno = [];
		
		for(var i = 0; i < letrasParaPreenchimento.length; i++)
			retorno.push(letrasParaPreenchimento[i]);
		
		return retorno;
	};
    
    var adicionarPalavraNovaTentativa = function(palavra, direcaoExcluida, preenchimento) {
		palavra.direcoesExcluidas = palavra.direcoesExcluidas === undefined ? [] : palavra.direcoesExcluidas;
					
		if(palavra.direcoesExcluidas.indexOf(direcaoExcluida) === -1)
			palavra.direcoesExcluidas.push(direcaoExcluida);
		

		return this.adicionarPalavra(
				palavra,
				palavra.direcoesExcluidas.indexOf(horizontal) === -1 ? 2 : -1,
				palavra.direcoesExcluidas.indexOf(vertical) === -1 ? 2 : -1,
				palavra.direcoesExcluidas.indexOf(diagonalNoroesteSudeste) === -1 ? 2 : -1,
				palavra.direcoesExcluidas.indexOf(diagonalNordesteSudoeste) === -1 ? 2 : -1,
				preenchimento
			);
	};
	
	var palavraJaExiste = function(palavra) {
		for(var i = 0; i < palavras.length; i++) {
			if(palavras[i].palavra.trim().toUpperCase() === palavra.palavra.trim().toUpperCase())
				return true;
		}
		
		return false;
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
	
	this.setPosicaoLetrasParaPreenchimentoPreviamenteDefinidas = function(preenchimento, linha, coluna, letra) {
		var preenchimentoInterno = preenchimento === undefined ? { previamenteDefinido: [] } : preenchimento;
		preenchimentoInterno.previamenteDefinido = preenchimentoInterno.previamenteDefinido === undefined ? [] : preenchimentoInterno.previamenteDefinido;
		
		for(var i = 0; i < numeroDeLinhas; i++) {
			if(preenchimentoInterno.previamenteDefinido[i] === undefined)
				preenchimentoInterno.previamenteDefinido[i] = [];
		
			for(var j = 0; j < numeroDeColunas; j++) {
				if(preenchimentoInterno.previamenteDefinido[i][j] === undefined)
					preenchimentoInterno.previamenteDefinido[i][j] = letraVazia;
			}
		}
		
		preenchimentoInterno.previamenteDefinido[linha][coluna] = letra;
		
		return preenchimentoInterno;
	}
	
	this.preencherLetrasRestantes = function(preenchimento) {
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
		var preenchimentoInterno = 
			preenchimento === undefined 
			? {}
			: 
				(
					preenchimento === "manterPreenchimento" 
					? { previamenteDefinido: getCopiaLetrasParaPreenchimento() } 
					: preenchimento
				);
		
		var letrasPossiveis = getLetrasPossiveis(preenchimentoInterno);
		
		if(preenchimentoInterno.previamenteDefinido === undefined || preenchimentoInterno.previamenteDefinido.length === 0) {
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
					if(preenchimentoInterno.previamenteDefinido[i][j] === undefined || preenchimentoInterno.previamenteDefinido[i][j].trim().toUpperCase() === letraVazia.trim().toUpperCase())
						letrasParaPreenchimento[i][j] = letrasPossiveis[Math.floor(Math.random() * letrasPossiveis.length)];
					else
						letrasParaPreenchimento[i][j] = preenchimentoInterno.previamenteDefinido[i][j];
				}
			}
		}
		
		return letrasParaPreenchimento;
	};
	
	var getLetrasPossiveis = function(preenchimento) {
		if(preenchimento !== undefined && preenchimento.mesmaLetraDasPalavras !== undefined && preenchimento.mesmaLetraDasPalavras === true) {
			var letrasParaAdicionar = "";
		
			for(var i = 0; i < palavras.length; i++) {
				for(var j = 0; j < palavras[i].palavra.length; j++) {
					letrasParaAdicionar += palavras[i].palavra[j];
				}
			}
			
			
			return letrasParaAdicionar + (preenchimento.letrasAceitas === undefined ? "" : preenchimento.letrasAceitas);
		}
		else if(preenchimento !== undefined && preenchimento.letrasAceitas !== undefined && preenchimento.letrasAceitas.trim() !== "") {
			return preenchimento.letrasAceitas;
		}
		
	
		return "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
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
	
	var tryAdicionarPalavraDiagonalNoroesteSudeste = function(palavra, reverso, linhaInicial, colunaInicial) {
		var j = 0;
		
		for(var i = colunaInicial; i < colunaInicial + palavra.length; i++) {
			if(letras[linhaInicial + j][i] !== letraVazia)
				if(!podeCruzar)
					return false;
				else if(letras[linhaInicial + j][i].toUpperCase() !== (reverso ? palavra.split("").reverse().join("")[i - colunaInicial] : palavra[i - colunaInicial]).toUpperCase())
					return false;
				
			j++;
		}
		
		return true;
	};
	
	var tryAdicionarPalavraDiagonalNordesteSudoeste = function(palavra, reverso, linhaInicial, colunaInicial) {
		var j = 0;
		
		for(var i = colunaInicial; i < colunaInicial + palavra.length; i++) {
			if(letras[linhaInicial - j][i] !== letraVazia)
				if(!podeCruzar)
					return false;
				else if(letras[linhaInicial - j][i].toUpperCase() !== (reverso ? palavra.split("").reverse().join("")[i - colunaInicial] : palavra[i - colunaInicial]).toUpperCase())
					return false;
				
			j++;
		}
		
		return true;
	};
	
	this.adicionarPalavraVertical = function(palavra, deveContinuarTentandoCasoCruzeErradoOutraPalavra, preenchimento) {
		if(palavra !== undefined && palavra.palavra !== undefined && !palavraJaExiste(palavra)) {
			var palavraInterno = palavra.palavra.trim();
			
			var deveContinuarTentandoCasoCruzeErradoOutraPalavraInterno = deveContinuarTentandoCasoCruzeErradoOutraPalavra === undefined ? false : deveContinuarTentandoCasoCruzeErradoOutraPalavra;
			
			if(palavra.linhaInicial > numeroDeLinhas - palavraInterno.length && !deveContinuarTentandoCasoCruzeErradoOutraPalavraInterno)
				return this;
			
			
			var linhaInicialInterno = (palavra.linhaInicial === undefined || palavra.linhaInicial > numeroDeLinhas - palavraInterno.length) ? (Math.floor(Math.random() * (numeroDeLinhas - palavraInterno.length + 1))) : palavra.linhaInicial;

			var colunaInicialInterno = (palavra.colunaInicial === undefined || palavra.colunaInicial >= numeroDeColunas) ? (Math.floor(Math.random() * numeroDeColunas)) : palavra.colunaInicial;

			var reversoInterno = palavra.reverso === undefined ? (Math.floor(Math.random() * (chancesParaReverso === undefined ? 2 : chancesParaReverso)) == 0 ? true : false) : palavra.reverso;

			
			if(palavraInterno.length <= letras.length) { // se o tamanho da palavraInterno for menor ou igual o tamanho da linha
				var linhaTentativa = linhaInicialInterno;
				var colunaTentativa = colunaInicialInterno;
				var tentativasFrustradasColunas = [];
				
				while(!tryAdicionarPalavraVertical(palavraInterno, reversoInterno, linhaTentativa, colunaTentativa) && deveContinuarTentandoCasoCruzeErradoOutraPalavraInterno) {
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
					
					palavras.push({ palavra: palavraInterno, linhaInicial: linhaTentativa, colunaInicial: colunaTentativa, reverso: reversoInterno, direcao: vertical });
					
					this.preencherLetrasRestantes(preenchimento);
				}
				else if(deveContinuarTentandoCasoCruzeErradoOutraPalavra) {
					return adicionarPalavraNovaTentativa(palavra, vertical, preenchimento);
				}
			}
		}
		
		return this;
	};
	
	this.adicionarPalavraHorizontal = function(palavra, deveContinuarTentandoCasoCruzeErradoOutraPalavra, preenchimento) {
		if(palavra !== undefined && palavra.palavra !== undefined && !palavraJaExiste(palavra)) {
			var palavraInterno = palavra.palavra.trim();
			
			var deveContinuarTentandoCasoCruzeErradoOutraPalavraInterno = deveContinuarTentandoCasoCruzeErradoOutraPalavra === undefined ? false : deveContinuarTentandoCasoCruzeErradoOutraPalavra;
			
			if(palavra.colunaInicial > numeroDeColunas - palavraInterno.length && !deveContinuarTentandoCasoCruzeErradoOutraPalavraInterno)
				return this;
			
			
			var linhaInicialInterno = (palavra.linhaInicial === undefined || palavra.linhaInicial >= numeroDeLinhas) ? (Math.floor(Math.random() * numeroDeLinhas)) : palavra.linhaInicial;

			var colunaInicialInterno = (palavra.colunaInicial === undefined || palavra.colunaInicial > numeroDeColunas - palavraInterno.length) ? (Math.floor(Math.random() * (numeroDeColunas - palavraInterno.length + 1))) : palavra.colunaInicial;

			var reversoInterno = palavra.reverso === undefined ? (Math.floor(Math.random() * (chancesParaReverso === undefined ? 2 : chancesParaReverso)) == 0 ? true : false) : palavra.reverso;
			
			if(palavraInterno.length <= letras[linhaInicialInterno].length) { // se o tamanho da palavraInterno for menor ou igual o tamanho da linha
				var linhaTentativa = linhaInicialInterno;
				var colunaTentativa = colunaInicialInterno;
				var tentativasFrustradasLinhas = [];
			
				while(!tryAdicionarPalavraHorizontal(palavraInterno, reversoInterno, linhaTentativa, colunaTentativa) && deveContinuarTentandoCasoCruzeErradoOutraPalavraInterno) {
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
					
					palavras.push({ palavra: palavraInterno, linhaInicial: linhaTentativa, colunaInicial: colunaTentativa, reverso: reversoInterno, direcao: horizontal });
					
					this.preencherLetrasRestantes(preenchimento);
				}
				else if(deveContinuarTentandoCasoCruzeErradoOutraPalavra) {
					return adicionarPalavraNovaTentativa(palavra, horizontal, preenchimento);
				}
			}
		}
		
		return this;
	};
	
	this.adicionarPalavraDiagonalNoroesteSudeste = function(palavra, deveContinuarTentandoCasoCruzeErradoOutraPalavra, preenchimento) {
		if(palavra !== undefined && palavra.palavra !== undefined && !palavraJaExiste(palavra)) {
			var palavraInterno = palavra.palavra.trim();
			
			var deveContinuarTentandoCasoCruzeErradoOutraPalavraInterno = deveContinuarTentandoCasoCruzeErradoOutraPalavra === undefined ? false : deveContinuarTentandoCasoCruzeErradoOutraPalavra;
			
			if(palavra.linhaInicial > numeroDeLinhas - palavraInterno.length && !deveContinuarTentandoCasoCruzeErradoOutraPalavraInterno)
				return this;
			
			if(palavra.colunaInicial > numeroDeColunas - palavraInterno.length && !deveContinuarTentandoCasoCruzeErradoOutraPalavraInterno)
				return this;
			
			var linhaInicialInterno = (palavra.linhaInicial === undefined || palavra.linhaInicial > numeroDeLinhas - palavraInterno.length) ? (Math.floor(Math.random() * (numeroDeLinhas - palavraInterno.length + 1))) : palavra.linhaInicial;

			var colunaInicialInterno = (palavra.colunaInicial === undefined || palavra.colunaInicial > numeroDeColunas - palavraInterno.length) ? (Math.floor(Math.random() * (numeroDeColunas - palavraInterno.length + 1))) : palavra.colunaInicial;

			var reversoInterno = palavra.reverso === undefined ? (Math.floor(Math.random() * (chancesParaReverso === undefined ? 2 : chancesParaReverso)) == 0 ? true : false) : palavra.reverso;
			
			if(palavraInterno.length <= letras.length && palavraInterno.length <= letras[linhaInicialInterno].length) { // se o tamanho da palavraInterno for menor ou igual o tamanho da linha
				var linhaTentativa = linhaInicialInterno;
				var colunaTentativa = colunaInicialInterno;
				var tentativasFrustradasLinhas = [];
				
				while(!tryAdicionarPalavraDiagonalNoroesteSudeste(palavraInterno, reversoInterno, linhaTentativa, colunaTentativa) && deveContinuarTentandoCasoCruzeErradoOutraPalavraInterno) {
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
					} while(!tryAdicionarPalavraDiagonalNoroesteSudeste(palavraInterno, reversoInterno, linhaTentativa, colunaTentativa));
					
					if(!tryAdicionarPalavraDiagonalNoroesteSudeste(palavraInterno, reversoInterno, linhaTentativa, colunaTentativa)) {
						tentativasFrustradasLinhas.push(linhaTentativa);
						
						if(tentativasFrustradasLinhas.length == (numeroDeLinhas - palavraInterno.length + 1)) {
							break;
						}
						else {
							while(tentativasFrustradasLinhas.indexOf(linhaTentativa) !== -1) {
								linhaTentativa = Math.floor(Math.random() * (numeroDeLinhas - palavraInterno.length + 1));
							}
						}
					}
				}
				
				if(tryAdicionarPalavraDiagonalNoroesteSudeste(palavraInterno, reversoInterno, linhaTentativa, colunaTentativa)) {
					var j = 0;
					
					for(var i = colunaTentativa; i < colunaTentativa + palavraInterno.length; i++) {
						letras[linhaTentativa + j][i] = reversoInterno ? palavraInterno.split("").reverse().join("")[i - colunaTentativa] : palavraInterno[i - colunaTentativa];
						
						j++;
					}
					
					palavras.push({ palavra: palavraInterno, linhaInicial: linhaTentativa, colunaInicial: colunaTentativa, reverso: reversoInterno, direcao: diagonalNoroesteSudeste });
					
					this.preencherLetrasRestantes(preenchimento);
				}
				else if(deveContinuarTentandoCasoCruzeErradoOutraPalavra) {
					return adicionarPalavraNovaTentativa(palavra, diagonalNoroesteSudeste, preenchimento);
				}
			}
		}
		
		return this;
	};
	
	this.adicionarPalavraDiagonalNordesteSudoeste = function(palavra, deveContinuarTentandoCasoCruzeErradoOutraPalavra, preenchimento) {
		if(palavra !== undefined && palavra.palavra !== undefined && !palavraJaExiste(palavra)) {
			var palavraInterno = palavra.palavra.trim();
			
			var deveContinuarTentandoCasoCruzeErradoOutraPalavraInterno = deveContinuarTentandoCasoCruzeErradoOutraPalavra === undefined ? false : deveContinuarTentandoCasoCruzeErradoOutraPalavra;
			
			if(palavraInterno.length > numeroDeLinhas)
				return this;
			
			if(palavra.linhaInicial < palavraInterno.length - 1 && !deveContinuarTentandoCasoCruzeErradoOutraPalavraInterno)
				return this;
			
			if(palavra.colunaInicial > numeroDeColunas - palavraInterno.length && !deveContinuarTentandoCasoCruzeErradoOutraPalavraInterno)
				return this;
			
			var linhaInicialInterno = (palavra.linhaInicial === undefined || palavra.linhaInicial < palavraInterno.length - 1) ? (palavraInterno.length - 1 + Math.floor(Math.random() * (numeroDeLinhas - palavraInterno.length + 1))) : palavra.linhaInicial;

			var colunaInicialInterno = (palavra.colunaInicial === undefined || palavra.colunaInicial > numeroDeColunas - palavraInterno.length) ? (Math.floor(Math.random() * (numeroDeColunas - palavraInterno.length + 1))) : palavra.colunaInicial;

			var reversoInterno = palavra.reverso === undefined ? (Math.floor(Math.random() * (chancesParaReverso === undefined ? 2 : chancesParaReverso)) == 0 ? true : false) : palavra.reverso;
			
			if(palavraInterno.length <= letras.length && palavraInterno.length <= letras[linhaInicialInterno].length) { // se o tamanho da palavraInterno for menor ou igual o tamanho da linha
				var linhaTentativa = linhaInicialInterno;
				var colunaTentativa = colunaInicialInterno;
				var tentativasFrustradasLinhas = [];
				
				while(!tryAdicionarPalavraDiagonalNordesteSudoeste(palavraInterno, reversoInterno, linhaTentativa, colunaTentativa) && deveContinuarTentandoCasoCruzeErradoOutraPalavraInterno) {
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
					} while(!tryAdicionarPalavraDiagonalNordesteSudoeste(palavraInterno, reversoInterno, linhaTentativa, colunaTentativa));
					
					if(!tryAdicionarPalavraDiagonalNordesteSudoeste(palavraInterno, reversoInterno, linhaTentativa, colunaTentativa)) {
						tentativasFrustradasLinhas.push(linhaTentativa);
						
						if(tentativasFrustradasLinhas.length == numeroDeLinhas - palavraInterno.length + 1) {
							break;
						}
						else {
							while(tentativasFrustradasLinhas.indexOf(linhaTentativa) !== -1) {
								linhaTentativa = (palavraInterno.length - 1 + Math.floor(Math.random() * (numeroDeLinhas - palavraInterno.length + 1)));
							}
						}
					}
				}
				
				if(tryAdicionarPalavraDiagonalNordesteSudoeste(palavraInterno, reversoInterno, linhaTentativa, colunaTentativa)) {
					var j = 0;
					
					for(var i = colunaTentativa; i < colunaTentativa + palavraInterno.length; i++) {
						letras[linhaTentativa - j][i] = reversoInterno ? palavraInterno.split("").reverse().join("")[i - colunaTentativa] : palavraInterno[i - colunaTentativa];
						
						j++;
					}
					
					palavras.push({ palavra: palavraInterno, linhaInicial: linhaTentativa, colunaInicial: colunaTentativa, reverso: reversoInterno, direcao: diagonalNordesteSudoeste });
					
					this.preencherLetrasRestantes(preenchimento);
				}
				else if(deveContinuarTentandoCasoCruzeErradoOutraPalavra) {
					return adicionarPalavraNovaTentativa(palavra, diagonalNordesteSudoeste, preenchimento);
				}
			}
		}
		
		return this;
	};
	
	this.adicionarPalavra = function(palavra, chancesParaHorizontal, chancesParaVertical, chancesParaNoroesteSudeste, chancesParaNordesteSudoeste, preenchimento) {
		if(palavra !== undefined && palavra.palavra !== undefined) {
			var possibilidades = [];
			
			if(palavra.direcao === undefined || palavra.direcao.trim().length === 0) {
				if(Math.floor((Math.random() * (chancesParaHorizontal === undefined ? 2 : chancesParaHorizontal))) === 0)
					possibilidades.push(horizontal);
				
				if(Math.floor((Math.random() * (chancesParaVertical === undefined ? 2 : chancesParaVertical))) === 0)
					possibilidades.push(vertical)
				
				if(Math.floor((Math.random() * (chancesParaNoroesteSudeste === undefined ? 2 : chancesParaNoroesteSudeste))) === 0)
					possibilidades.push(diagonalNoroesteSudeste)
				
				if(Math.floor((Math.random() * (chancesParaNordesteSudoeste === undefined ? 2 : chancesParaNordesteSudoeste))) === 0)
					possibilidades.push(diagonalNordesteSudoeste)
			}
			else {			
				possibilidades.push(palavra.direcao);
			}
			
			
			var adicionarEscolhido = possibilidades.length === 0 ? horizontal : possibilidades[Math.floor(Math.random() * possibilidades.length)];

			
			if(adicionarEscolhido === horizontal) {
				palavra.direcao = horizontal;
				
				return this.adicionarPalavraHorizontal(palavra, true, preenchimento);
			}
			else if(adicionarEscolhido === vertical) {
				palavra.direcao = vertical;
				
				return this.adicionarPalavraVertical(palavra, true, preenchimento);
			}
			else if(adicionarEscolhido === diagonalNoroesteSudeste) {
				palavra.direcao = diagonalNoroesteSudeste;
				
				return this.adicionarPalavraDiagonalNoroesteSudeste(palavra, true, preenchimento);
			}
			else if(adicionarEscolhido === diagonalNordesteSudoeste) {
				palavra.direcao = diagonalNordesteSudoeste;
				
				return this.adicionarPalavraDiagonalNordesteSudoeste(palavra, true, preenchimento);
			}
		}
		
		return this;
	};
	
	this.adicionarPalavras = function(config) {
		var configInterno = config !== undefined ? config : {
				palavrasParaAdicionar: [], 
				chancesParaHorizontal: 2, 
				chancesParaVertical: 2, 
				chancesParaNoroesteSudeste: 2, 
				chancesParaNordesteSudoeste: 2, 
				preenchimento: {
					mesmaLetraDasPalavras: false,
					letrasAceitas: "",
					previamenteDefinido: []
				}
			};
		
		if(configInterno.palavrasParaAdicionar !== undefined) {
			for(var i = 0; i < configInterno.palavrasParaAdicionar.length; i++)
				this.adicionarPalavra(
                        typeof configInterno.palavrasParaAdicionar[i] === "object" ? configInterno.palavrasParaAdicionar[i] : { palavra: configInterno.palavrasParaAdicionar[i] }, 
                        configInterno.chancesParaHorizontal, 
                        configInterno.chancesParaVertical, 
                        configInterno.chancesParaNoroesteSudeste, 
                        configInterno.chancesParaNordesteSudoeste, 
                        config.preenchimento
                    );
		}
		
		return this;
	};
	
	this.removerPalavra = function(palavra, preenchimento) {
		if(palavra !== undefined && palavra.palavra !== undefined) {
			var palavrasTemp = getCopiaPalavras();
			
			palavras = [];
			letras = getInicializarLetras();
			
			for(var i = 0; i < palavrasTemp.length; i++) {
				if(palavrasTemp[i].palavra.trim().toUpperCase() !== palavra.palavra.trim().toUpperCase())
					this.adicionarPalavra(palavrasTemp[i]);
			}
			
			this.preencherLetrasRestantes(preenchimento);
		}
	
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
	
	this.getPalavra = function(palavra) {
		if(palavra !== undefined) {
            var palavraInterno = (typeof palavra === "object" ? (palavra.palavra !== undefined ? palavra.palavra : "") : palavra);    
            
			for(var i = 0; i < palavras.length; i++) {
				if(palavraInterno.trim().toUpperCase() === palavras[i].palavra.trim().toUpperCase())
					return palavras[i];
			}
		}
	
		return null;
	};
	
	this.getLetrasParaPreenchimento = function() {
		return letrasParaPreenchimento;
	};
	
	
	init();
};




if(typeof exports !== "undefined")
	exports.cacaPalavras = cacaPalavras;