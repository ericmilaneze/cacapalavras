
//var jogoAtual = new cacaPalavras(24, 21, true, 5);

var textBoxPalavraParaAdicionar = document.getElementById("palavraParaAdicionar");
var botaoAdicionarPalavra = document.getElementById("adicionarPalavra");
var selectPalavrasEscolhidas = document.getElementById("palavrasEscolhidas");

var isPalavraRepetida = function(palavra) {
	var options = selectPalavrasEscolhidas.getElementsByTagName("option");
	
	for(var i = 0; i < options.length; i++)
		if(options[i].text.trim().toUpperCase() === palavra.trim().toUpperCase())
			return true;
		
	return false;
};

selectPalavrasEscolhidas.addEventListener("keydown", function(e) {
	var evt = e ? e : event;
	
	if(evt.keyCode && evt.keyCode == 46 || evt.which == 46) {
		var optionsSelecionados = selectPalavrasEscolhidas.querySelectorAll("option:checked");
		
		for(var i = 0; i < optionsSelecionados.length; i++)
			selectPalavrasEscolhidas.remove(optionsSelecionados[i].index);
	}
});

botaoAdicionarPalavra.addEventListener("click", function() {
	if(textBoxPalavraParaAdicionar.value.trim() !== "") {
		var newOption = document.createElement("option");
		newOption.text = textBoxPalavraParaAdicionar.value;
		newOption.addEventListener("dblclick", function() {
			selectPalavrasEscolhidas.remove(this.index);
		});
		
		selectPalavrasEscolhidas.add(newOption);
		
		textBoxPalavraParaAdicionar.value = "";
	}
});

