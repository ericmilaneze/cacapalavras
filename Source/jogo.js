var textBoxPalavraParaAdicionar = document.getElementById("palavraParaAdicionar");
var btnAdicionarPalavra = document.getElementById("adicionarPalavra");
var selectPalavrasEscolhidas = document.getElementById("palavrasEscolhidas");
var btnGerarJogo = document.getElementById("gerarJogo");
var textBoxNumeroDeLinhas = document.getElementById("numeroDeLinhas");
var textBoxNumeroDeColunas = document.getElementById("numeroDeColunas");
var textBoxResultado = document.getElementById("resultado");
var sectionEsbocoJogo = document.getElementById("esbocoJogo");

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

selectPalavrasEscolhidas.addEventListener("keydown", function(e) {
	var evt = e ? e : event;
	
	if(evt.keyCode && evt.keyCode === 46 || evt.which === 46) {
		var optionsSelecionados = selectPalavrasEscolhidas.querySelectorAll("option:checked");
		
		for(var i = 0; i < optionsSelecionados.length; i++)
			selectPalavrasEscolhidas.remove(optionsSelecionados[i].index);
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
        
        for (var i = 0; i < palavrasParaAdicionar.length; i++) {
            var palavra = palavrasParaAdicionar[i].trim();
            
            if(!isPalavraRepetida(palavra)) {
                var newOption = document.createElement("option");
                newOption.text = palavra;
                newOption.addEventListener("dblclick", function() {
                    selectPalavrasEscolhidas.remove(this.index);
                });
                
                selectPalavrasEscolhidas.add(newOption);
                
                textBoxPalavraParaAdicionar.value = "";
            }
            else {
                alert("Palavra já adicionada: \"" + palavra + "\"");
            }
        }   
	}
    
    textBoxPalavraParaAdicionar.focus();
});

btnGerarJogo.addEventListener("click", function() {
    var palavrasParaAdicionar = getPalavrasParaAdicionar();
    
    if(palavrasParaAdicionar.length > 0) {
        sectionEsbocoJogo.style.display = "inline";
        
        var configuracoesJogo = {};
        configuracoesJogo.numeroDeLinhas = textBoxNumeroDeLinhas.value;
        configuracoesJogo.numeroDeColunas = textBoxNumeroDeColunas.value;
        configuracoesJogo.podeCruzar = true;
        configuracoesJogo.chancesParaReverso = 6;
        configuracoesJogo.resposta = false;
        
        var jogoAtual = new cacaPalavras(configuracoesJogo.numeroDeLinhas, configuracoesJogo.numeroDeColunas, configuracoesJogo.podeCruzar, configuracoesJogo.chancesParaReverso);
        
        for (var i = 0; i < palavrasParaAdicionar.length; i++)
            jogoAtual.adicionarPalavra({ palavra: palavrasParaAdicionar[i] });
        
        configuracoesJogo.config = {};
        configuracoesJogo.config.palavrasParaAdicionar = jogoAtual.getPalavras();
        configuracoesJogo.config.chancesParaHorizontal = 2;
        configuracoesJogo.config.chancesParaVertical = 2;
        configuracoesJogo.config.chancesParaNoroesteSudeste = 2; 
        configuracoesJogo.config.chancesParaNordesteSudoeste = 2;
        configuracoesJogo.config.preenchimento = {};
        configuracoesJogo.config.preenchimento.mesmaLetraDasPalavras = false;
        configuracoesJogo.config.preenchimento.letrasAceitas = "";
        configuracoesJogo.config.preenchimento.previamenteDefinido = jogoAtual.getLetrasParaPreenchimento();
        

        textBoxResultado.value = JSON.stringify(configuracoesJogo);
        
        desenharJogo("jogo", configuracoesJogo);
    }
});

var desenharJogo = function(idCanvasJogo, configuracoesJogo) {
    var jogoAtual = new cacaPalavras(configuracoesJogo.numeroDeLinhas, configuracoesJogo.numeroDeColunas, configuracoesJogo.podeCruzar, configuracoesJogo.chancesParaReverso);
    
    jogoAtual.adicionarPalavras(configuracoesJogo.config);   
    
    var canvasResposta = document.getElementById(idCanvasJogo);
    var ctxCanvasResposta = canvasResposta.getContext("2d");
    
    ctxCanvasResposta.clearRect(0, 0, canvasResposta.width, canvasResposta.height);
    
    ctxCanvasResposta.font = "13px Arial";
    
    var pxEspacamentoColunas = 20;
    var pxEspacamentoLinhas = 20;
    
    var pxMargemEsquerda = 35;
    var pxMargemTop = 35;
    
    var pxColunaInicial = pxEspacamentoColunas;
    var pxLinhaInicial = pxMargemTop;
    
    for (var linha = 0; linha < configuracoesJogo.numeroDeLinhas; linha++) {
        pxColunaInicial = pxMargemEsquerda;
        
        for (var coluna = 0; coluna < configuracoesJogo.numeroDeColunas; coluna++) {
            var letra = jogoAtual.getLetraComPreenchimento(linha, coluna);
        
            ctxCanvasResposta.textAlign = "center";
            ctxCanvasResposta.strokeText(letra, pxColunaInicial, pxLinhaInicial);
            
            pxColunaInicial += pxEspacamentoColunas;
        }
        
        pxLinhaInicial += pxEspacamentoLinhas;
    }
    
};