var textBoxPalavraParaAdicionar = document.getElementById("palavraParaAdicionar");
var btnAdicionarPalavra = document.getElementById("adicionarPalavra");
var selectPalavrasEscolhidas = document.getElementById("palavrasEscolhidas");
var btnGerarJogo = document.getElementById("gerarJogo");
var textBoxNumeroDeLinhas = document.getElementById("numeroDeLinhas");
var textBoxNumeroDeColunas = document.getElementById("numeroDeColunas");
var textBoxResultado = document.getElementById("resultado");
var sectionEsbocoJogo = document.getElementById("esbocoJogo");
var cbMostrarResultado = document.getElementById("mostrarResultado");

textBoxPalavraParaAdicionar.focus();

var isPalavraRepetida = function(palavra) {
	var palavras = getPalavrasParaAdicionar();
	
	for(var i = 0; i < palavras.length; i++)
		if(palavras[i].trim().toUpperCase() === palavra.trim().toUpperCase())
			return true;
		
	return false;
};

var getPalavrasParaAdicionar = function() {
    var palavrasParaAdicionar = [];
    
    var options = selectPalavrasEscolhidas.getElementsByTagName("option");
    
    for(var i = 0; i < options.length; i++)
        palavrasParaAdicionar.push(options[i].text);
    
    return palavrasParaAdicionar;
};

cbMostrarResultado.addEventListener("click", function() {
    gerarJogo(); 
});

selectPalavrasEscolhidas.addEventListener("keydown", function(e) {
	var evt = e ? e : event;
	
	if(evt.keyCode && evt.keyCode === 46 || evt.which === 46) {
		var optionsSelecionados = selectPalavrasEscolhidas.querySelectorAll("option:checked");
		
		for(var i = 0; i < optionsSelecionados.length; i++)
			selectPalavrasEscolhidas.remove(optionsSelecionados[i].index);
        
        gerarJogo();
	}
});

textBoxPalavraParaAdicionar.addEventListener("keyup", function(e) {
    var evt = e ? e : event;
	
	if(evt.keyCode && evt.keyCode === 13)
        btnAdicionarPalavra.click();
});

btnAdicionarPalavra.addEventListener("click", function() {
	if(textBoxPalavraParaAdicionar.value.trim() !== "") {
        var palavrasParaAdicionar = textBoxPalavraParaAdicionar.value.trim()
            .replace(/;/g, ",")
            .split(",");
            
        var palavrasRepetidas = [];
        
        for (var i = 0; i < palavrasParaAdicionar.length; i++) {
            var palavra = palavrasParaAdicionar[i].trim();
            
            if(!isPalavraRepetida(palavra)) {
                var newOption = document.createElement("option");
                newOption.text = palavra;

                selectPalavrasEscolhidas.add(newOption);
                
                textBoxPalavraParaAdicionar.value = "";
            }
            else {
                palavrasRepetidas.push(palavra);
            }
        }
        
        if(palavrasRepetidas.length == 1) {
            alert("Palavra já adicionada: \"" + palavrasRepetidas[0] + "\"");
        }
        else if(palavrasRepetidas.length > 1) {
            var mensagem = "Palavras já adicionadas: \n";
            
            for (var i = 0; i < palavrasRepetidas.length; i++)
                mensagem += "\n\"" + palavrasRepetidas[i] + "\"";
            
            alert(mensagem);
        }
        
        gerarJogo();
	}    
    
    textBoxPalavraParaAdicionar.focus();
});

var getConfiguracoesJogo = function() {
    try {
        return JSON.parse(textBoxResultado.value);
    }
    catch(e) {
        return {};
    }
};

textBoxNumeroDeLinhas.addEventListener("keyup", function() {
    if(parseInt(this.value) === 0 || this.value.trim() === "")
        this.value = 1;
    
    gerarJogo();
});

textBoxNumeroDeLinhas.addEventListener("click", function() {
    gerarJogo();
});

textBoxNumeroDeColunas.addEventListener("keyup", function() {
    if(parseInt(this.value) === 0 || this.value.trim() === "")
        this.value = 1;
    
    gerarJogo();
});

textBoxNumeroDeColunas.addEventListener("click", function() {
    gerarJogo();
});

var gerarJogo = function() {
    var palavrasParaAdicionar = getPalavrasParaAdicionar();
    
    var configuracoesJogo = getConfiguracoesJogo();
    configuracoesJogo.numeroDeLinhas = textBoxNumeroDeLinhas.value;
    configuracoesJogo.numeroDeColunas = textBoxNumeroDeColunas.value;
    configuracoesJogo.podeCruzar = true;
    configuracoesJogo.chancesParaReverso = 1;
    configuracoesJogo.chancesParaNaoReverso = 10;
    configuracoesJogo.resposta = cbMostrarResultado.checked;
    configuracoesJogo.pxEspacamentoColunas = 20;
    configuracoesJogo.pxEspacamentoLinhas = 20;
    configuracoesJogo.pxMargemEsquerda = 35;
    configuracoesJogo.pxMargemTop = 35;
    configuracoesJogo.font = "13px Arial";
    configuracoesJogo.config = configuracoesJogo.config !== undefined ? configuracoesJogo.config : {};
    configuracoesJogo.config.chancesParaHorizontal = 3;
    configuracoesJogo.config.chancesParaVertical = 3;
    configuracoesJogo.config.chancesParaNoroesteSudeste = 1; 
    configuracoesJogo.config.chancesParaNordesteSudoeste = 1;
    configuracoesJogo.config.preenchimento = configuracoesJogo.config.preenchimento !== undefined ? configuracoesJogo.config.preenchimento : {};
    configuracoesJogo.config.preenchimento.mesmaLetraDasPalavras = false;
    configuracoesJogo.config.preenchimento.letrasAceitas = "";
    
    var jogoAtual = new cacaPalavras(configuracoesJogo.numeroDeLinhas, configuracoesJogo.numeroDeColunas, configuracoesJogo.podeCruzar, configuracoesJogo.chancesParaReverso, configuracoesJogo.chancesParaNaoReverso);
    
    // adicionar palavras que estão na memória, pois já foram adicionadas antes
    jogoAtual.adicionarPalavras(configuracoesJogo.config);
    
    for (var i = 0; i < palavrasParaAdicionar.length; i++) {
        jogoAtual.adicionarPalavra(
                { palavra: palavrasParaAdicionar[i] }, 
                configuracoesJogo.config.chancesParaHorizontal,
                configuracoesJogo.config.chancesParaVertical,
                configuracoesJogo.config.chancesParaNoroesteSudeste,
                configuracoesJogo.config.chancesParaNordesteSudoeste,
                configuracoesJogo.config.preenchimento
            );
    }

    var palavrasNoJogoAtual = jogoAtual.getPalavras();
    
    for (var i = 0; i < palavrasNoJogoAtual.length; i++) {
        if(palavrasParaAdicionar.indexOf(palavrasNoJogoAtual[i].palavra) === -1) {
            jogoAtual.removerPalavra(palavrasNoJogoAtual[i], configuracoesJogo.config.preenchimento);
        }
    }
    
    configuracoesJogo.config.palavrasParaAdicionar = jogoAtual.getPalavras();
    configuracoesJogo.config.preenchimento.previamenteDefinido = jogoAtual.getLetrasParaPreenchimento();
    
    textBoxResultado.value = JSON.stringify(configuracoesJogo);
    
    desenharJogo("jogo", configuracoesJogo);
    
    sectionEsbocoJogo.style.display = "block";
};

var desenharJogo = function(idCanvasJogo, configuracoesJogo) {
    if(configuracoesJogo !== undefined && configuracoesJogo.config !== undefined) {
        var jogoAtual = new cacaPalavras(configuracoesJogo.numeroDeLinhas, configuracoesJogo.numeroDeColunas, configuracoesJogo.podeCruzar, configuracoesJogo.chancesParaReverso, configuracoesJogo.chancesParaNaoReverso);
        
        jogoAtual.adicionarPalavras(configuracoesJogo.config);   
        
        var canvasResposta = document.getElementById(idCanvasJogo);
        var ctxCanvasResposta = canvasResposta.getContext("2d");
        
        ctxCanvasResposta.clearRect(0, 0, canvasResposta.width, canvasResposta.height);
        
        ctxCanvasResposta.font = configuracoesJogo.font;
        
        var pxColunaInicial = configuracoesJogo.pxEspacamentoColunas;
        var pxLinhaInicial = configuracoesJogo.pxMargemTop;
        
        for (var linha = 0; linha < configuracoesJogo.numeroDeLinhas; linha++) {
            pxColunaInicial = configuracoesJogo.pxMargemEsquerda;
            
            for (var coluna = 0; coluna < configuracoesJogo.numeroDeColunas; coluna++) {
                var letra = configuracoesJogo.resposta ? jogoAtual.getLetra(linha, coluna) : jogoAtual.getLetraComPreenchimento(linha, coluna);
            
                ctxCanvasResposta.textAlign = "center";
                ctxCanvasResposta.strokeText(letra, pxColunaInicial, pxLinhaInicial);
                
                pxColunaInicial += configuracoesJogo.pxEspacamentoColunas;
            }
            
            pxLinhaInicial += configuracoesJogo.pxEspacamentoLinhas;
        }
    }
};