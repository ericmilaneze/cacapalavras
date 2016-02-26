var textBoxPalavraParaAdicionar = document.getElementById("palavraParaAdicionar");
var btnAdicionarPalavra = document.getElementById("adicionarPalavra");
var selectPalavrasEscolhidas = document.getElementById("palavrasEscolhidas");
var btnGerarJogo = document.getElementById("gerarJogo");
var textBoxNumeroDeLinhas = document.getElementById("numeroDeLinhas");
var textBoxNumeroDeColunas = document.getElementById("numeroDeColunas");
var textBoxResultado = document.getElementById("resultado");

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
	
	if(evt.keyCode && evt.keyCode == 46 || evt.which == 46) {
		var optionsSelecionados = selectPalavrasEscolhidas.querySelectorAll("option:checked");
		
		for(var i = 0; i < optionsSelecionados.length; i++)
			selectPalavrasEscolhidas.remove(optionsSelecionados[i].index);
	}
});

btnAdicionarPalavra.addEventListener("click", function() {
	if(textBoxPalavraParaAdicionar.value.trim() !== "" && !isPalavraRepetida(textBoxPalavraParaAdicionar.value.trim())) {
        var newOption = document.createElement("option");
		newOption.text = textBoxPalavraParaAdicionar.value.trim();
		newOption.addEventListener("dblclick", function() {
			selectPalavrasEscolhidas.remove(this.index);
		});
		
		selectPalavrasEscolhidas.add(newOption);
		
		textBoxPalavraParaAdicionar.value = "";
	}
    else if(isPalavraRepetida(textBoxPalavraParaAdicionar.value.trim())) {
        alert("Palavra já adicionada.");
        
        textBoxPalavraParaAdicionar.focus();
    }
});

btnGerarJogo.addEventListener("click", function() {
    var palavrasParaAdicionar = getPalavrasParaAdicionar();
    
    if(palavrasParaAdicionar.length > 0) {
        var configuracoesJogo = {};
        configuracoesJogo.numeroDeLinhas = textBoxNumeroDeLinhas.value;
        configuracoesJogo.numeroDeColunas = textBoxNumeroDeColunas.value;
        configuracoesJogo.podeCruzar = true;
        configuracoesJogo.chancesParaReverso = 6;
        
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
        
        desenharJogo("jogo",  "resposta", configuracoesJogo);
    }
});

var desenharJogo = function(idCanvasJogo, idCanvasResposta, configuracoesJogo) {
    var jogoAtual = new cacaPalavras(configuracoesJogo.numeroDeLinhas, configuracoesJogo.numeroDeColunas, configuracoesJogo.podeCruzar, configuracoesJogo.chancesParaReverso);
    
    jogoAtual.adicionarPalavras(configuracoesJogo.config);
    
    document.getElementById(idCanvasJogo).value = jogoAtual.getShow(jogoAtual.getLetraComPreenchimento, "+", " ", " ", false);
    
    document.getElementById(idCanvasResposta).value = jogoAtual.getShow(jogoAtual.getLetra, "|", " ", " ", false);
};