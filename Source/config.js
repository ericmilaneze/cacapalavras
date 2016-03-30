(function() {
    var defaultFontSize = 16;
    var defaultFontFace = "Arial";
    var defaultIncreaseDecreaseFontSize = 1;
    var defaultPxEspacamentoColunas = 20;
    var defaultPxEspacamentoLinhas = 20;
    var defaultPxMargemEsquerda = 35;
    var defaultPxMargemTop = 35;
    var defaultIncreaseDecreaseMargemEsquerda = 2;
    var defaultIncreaseDecreaseMargemTop = 2;
    var defaultIncreaseDecreaseEspacamentoColunas = 2;
    var defaultIncreaseDecreaseEspacamentoLinhas = 2;
    var defaultCanvasWidth = 470;
    var defaultCanvasHeight = 476;
    var defaultIncreaseDecreaseCanvasWidth = 10;
    var defaultIncreaseDecreaseCanvasHeight = 10;

    var textBoxPalavraParaAdicionar = document.getElementById("palavraParaAdicionar");
    var btnAdicionarPalavra = document.getElementById("adicionarPalavra");
    var selectPalavrasEscolhidas = document.getElementById("palavrasEscolhidas");
    var btnGerarJogo = document.getElementById("gerarJogo");
    var textBoxNumeroDeLinhas = document.getElementById("numeroDeLinhas");
    var textBoxNumeroDeColunas = document.getElementById("numeroDeColunas");
    var textBoxResultado = document.getElementById("resultado");
    var sectionEsbocoJogo = document.getElementById("esbocoJogo");
    var cbMostrarResultado = document.getElementById("mostrarResultado");
    var btnRefazerPreenchimento = document.getElementById("refazerPreenchimento");
    var txtLetrasAceitas = document.getElementById("letrasAceitas");
    var rbPreenchimentoLetrasAceitas = document.getElementById("preenchimentoLetrasAceitas");
    var rbPreenchimentoMesmasLetras = document.getElementById("preenchimentoMesmasLetras");
    var cbPodeCruzar = document.getElementById("podeCruzar");
    var txtChancesParaReverso = document.getElementById("chancesParaReverso");
    var txtChancesParaHorizontal = document.getElementById("chancesParaHorizontal");
    var txtChancesParaVertical = document.getElementById("chancesParaVertical");
    var txtChancesParaDiagonalNordesteSudoeste = document.getElementById("chancesParaDiagonalNordesteSudoeste");
    var txtChancesParaDiagonalNoroesteSudeste = document.getElementById("chancesParaDiagonalNoroesteSudeste");
    var btnAumentarFonte = document.getElementById("aumentarFonte");
    var btnDiminuirFonte = document.getElementById("diminuirFonte");
    var selectFonte = document.getElementById("fonte");
    var btnAumentarMargemEsquerda = document.getElementById("aumentarMargemEsquerda");
    var btnDiminuirMargemEsquerda = document.getElementById("diminuirMargemEsquerda");
    var btnAumentarMargemSuperior = document.getElementById("aumentarMargemSuperior");
    var btnDiminuirMargemSuperior = document.getElementById("diminuirMargemSuperior");
    var btnDiminuirEspacamentoHorizontal = document.getElementById("diminuirEspacamentoHorizontal");
    var btnDiminuirEspacamentoVertical = document.getElementById("diminuirEspacamentoVertical");
    var btnAumentarEspacamentoHorizontal = document.getElementById("aumentarEspacamentoHorizontal");
    var btnAumentarEspacamentoVertical = document.getElementById("aumentarEspacamentoVertical");
    var btnAumentarLarguraTela = document.getElementById("aumentarLarguraTela");
    var btnDiminuirLarguraTela = document.getElementById("diminuirLarguraTela");
    var btnAumentarAlturaTela = document.getElementById("aumentarAlturaTela");
    var btnDiminuirAlturaTela = document.getElementById("diminuirAlturaTela");
    var cbMostrarBordas = document.getElementById("mostrarBordas");
    var cbPalavrasNaDireita = document.getElementById("palavrasNaDireita");
    var cbPalavrasNaEsquerda = document.getElementById("palavrasNaEsquerda");
    var txtTextoParaAdicionarAcima = document.getElementById("textoParaAdicionarAcima");

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

    txtTextoParaAdicionarAcima.addEventListener("keyup", function() {
        var configuracoesJogo = getConfiguracoesJogo();

        var divTextoAcima = document.getElementsByClassName("textoAcima")[0];

        if(this.value.trim() !== "") {
            var tagPalavraAbertura = "<span class=\"palavra\">";
            var tagPalavraFechamento = "</span>";

            var texto = this.value
                .replace(/<palavra>|<p>|<w>/g, tagPalavraAbertura)
                .toString()
                .replace(/<\/palavra>|<\/p>|<\/w>/g, tagPalavraFechamento)
                .toString()
                .replace(/#\w+/g, function f(p) { return tagPalavraAbertura + p.slice(1, p.length) + tagPalavraFechamento; });

            divTextoAcima.style.width = configuracoesJogo.canvasWidth + "px";
            divTextoAcima.style.display = "block";
            divTextoAcima.innerHTML = texto;

            configuracoesJogo.textoAcima = texto;
        }
        else {
            divTextoAcima.style.display = "none";
            configuracoesJogo.textoAcima = "";
        }

        textBoxResultado.value = JSON.stringify(configuracoesJogo);
    });

    cbPalavrasNaDireita.addEventListener("click", function() {
        if(this.checked)
            cbPalavrasNaEsquerda.checked = false;

        gerarJogo();
    });

    cbPalavrasNaEsquerda.addEventListener("click", function() {
        if(this.checked)
            cbPalavrasNaDireita.checked = false;

        gerarJogo();
    });

    btnAumentarLarguraTela.addEventListener("click", function() {
        var configuracoesJogo = getConfiguracoesJogo();

        configuracoesJogo.canvasWidth = (configuracoesJogo.canvasWidth !== undefined ? configuracoesJogo.canvasWidth + defaultIncreaseDecreaseCanvasWidth : defaultCanvasWidth + defaultIncreaseDecreaseCanvasWidth);

        textBoxResultado.value = JSON.stringify(configuracoesJogo);

        gerarJogo();
    });

    btnAumentarAlturaTela.addEventListener("click", function() {
        var configuracoesJogo = getConfiguracoesJogo();

        configuracoesJogo.canvasHeight = (configuracoesJogo.canvasHeight !== undefined ? configuracoesJogo.canvasHeight + defaultIncreaseDecreaseCanvasHeight : defaultCanvasHeight + defaultIncreaseDecreaseCanvasHeight);

        textBoxResultado.value = JSON.stringify(configuracoesJogo);

        gerarJogo();
    });

    btnDiminuirLarguraTela.addEventListener("click", function() {
        var configuracoesJogo = getConfiguracoesJogo();

        var novoWidth = (configuracoesJogo.canvasWidth !== undefined ? configuracoesJogo.canvasWidth - defaultIncreaseDecreaseCanvasWidth : defaultCanvasWidth - defaultIncreaseDecreaseCanvasWidth);

        if(novoWidth > 0)
            configuracoesJogo.canvasWidth = novoWidth;

        textBoxResultado.value = JSON.stringify(configuracoesJogo);

        gerarJogo();
    });

    btnDiminuirAlturaTela.addEventListener("click", function() {
        var configuracoesJogo = getConfiguracoesJogo();

        var novoHeight = (configuracoesJogo.canvasHeight !== undefined ? configuracoesJogo.canvasHeight - defaultIncreaseDecreaseCanvasHeight : defaultCanvasHeight - defaultIncreaseDecreaseCanvasHeight);

        if(novoHeight > 0)
            configuracoesJogo.canvasHeight = novoHeight;

        textBoxResultado.value = JSON.stringify(configuracoesJogo);

        gerarJogo();
    });

    selectFonte.addEventListener("change", function() {
        var configuracoesJogo = getConfiguracoesJogo();

        configuracoesJogo.fontFace = this.options[this.selectedIndex].innerHTML;

        textBoxResultado.value = JSON.stringify(configuracoesJogo);

        gerarJogo();
    });

    btnDiminuirEspacamentoHorizontal.addEventListener("click", function() {
        var configuracoesJogo = getConfiguracoesJogo();

        configuracoesJogo.pxEspacamentoColunas = (configuracoesJogo.pxEspacamentoColunas !== undefined ? configuracoesJogo.pxEspacamentoColunas - defaultIncreaseDecreaseEspacamentoColunas : defaultPxEspacamentoColunas - defaultIncreaseDecreaseEspacamentoColunas);

        textBoxResultado.value = JSON.stringify(configuracoesJogo);

        gerarJogo();
    });

    btnAumentarEspacamentoHorizontal.addEventListener("click", function() {
        var configuracoesJogo = getConfiguracoesJogo();

        configuracoesJogo.pxEspacamentoColunas = (configuracoesJogo.pxEspacamentoColunas !== undefined ? configuracoesJogo.pxEspacamentoColunas + defaultIncreaseDecreaseEspacamentoColunas : defaultPxEspacamentoColunas + defaultIncreaseDecreaseEspacamentoColunas);

        textBoxResultado.value = JSON.stringify(configuracoesJogo);

        gerarJogo();
    });

    btnDiminuirEspacamentoVertical.addEventListener("click", function() {
        var configuracoesJogo = getConfiguracoesJogo();

        configuracoesJogo.pxEspacamentoLinhas = (configuracoesJogo.pxEspacamentoLinhas !== undefined ? configuracoesJogo.pxEspacamentoLinhas - defaultIncreaseDecreaseEspacamentoLinhas : defaultPxEspacamentoLinhas - defaultIncreaseDecreaseEspacamentoLinhas);

        textBoxResultado.value = JSON.stringify(configuracoesJogo);

        gerarJogo();
    });

    btnAumentarEspacamentoVertical.addEventListener("click", function() {
        var configuracoesJogo = getConfiguracoesJogo();

        configuracoesJogo.pxEspacamentoLinhas = (configuracoesJogo.pxEspacamentoLinhas !== undefined ? configuracoesJogo.pxEspacamentoLinhas + defaultIncreaseDecreaseEspacamentoLinhas : defaultPxEspacamentoLinhas + defaultIncreaseDecreaseEspacamentoLinhas);

        textBoxResultado.value = JSON.stringify(configuracoesJogo);

        gerarJogo();
    });

    btnAumentarMargemEsquerda.addEventListener("click", function() {
        var configuracoesJogo = getConfiguracoesJogo();

        configuracoesJogo.pxMargemEsquerda = (configuracoesJogo.pxMargemEsquerda !== undefined ? configuracoesJogo.pxMargemEsquerda + defaultIncreaseDecreaseMargemEsquerda : defaultPxMargemEsquerda + defaultIncreaseDecreaseMargemEsquerda);

        textBoxResultado.value = JSON.stringify(configuracoesJogo);

        gerarJogo();
    });

    btnDiminuirMargemEsquerda.addEventListener("click", function() {
        var configuracoesJogo = getConfiguracoesJogo();

        configuracoesJogo.pxMargemEsquerda = (configuracoesJogo.pxMargemEsquerda !== undefined ? configuracoesJogo.pxMargemEsquerda - defaultIncreaseDecreaseMargemEsquerda : defaultPxMargemEsquerda - defaultIncreaseDecreaseMargemEsquerda);

        textBoxResultado.value = JSON.stringify(configuracoesJogo);

        gerarJogo();
    });

    btnAumentarMargemSuperior.addEventListener("click", function() {
        var configuracoesJogo = getConfiguracoesJogo();

        configuracoesJogo.pxMargemTop = (configuracoesJogo.pxMargemTop !== undefined ? configuracoesJogo.pxMargemTop + defaultIncreaseDecreaseMargemTop : defaultPxMargemTop + defaultIncreaseDecreaseMargemTop);

        textBoxResultado.value = JSON.stringify(configuracoesJogo);

        gerarJogo();
    });

    btnDiminuirMargemSuperior.addEventListener("click", function() {
        var configuracoesJogo = getConfiguracoesJogo();

        configuracoesJogo.pxMargemTop = (configuracoesJogo.pxMargemTop !== undefined ? configuracoesJogo.pxMargemTop - defaultIncreaseDecreaseMargemTop : defaultPxMargemTop - defaultIncreaseDecreaseMargemTop);

        textBoxResultado.value = JSON.stringify(configuracoesJogo);

        gerarJogo();
    });

    btnAumentarFonte.addEventListener("click", function() {
        var configuracoesJogo = getConfiguracoesJogo();

        configuracoesJogo.fontSize = (configuracoesJogo.fontSize !== undefined ? configuracoesJogo.fontSize + defaultIncreaseDecreaseFontSize : defaultFontSize + defaultIncreaseDecreaseFontSize);

        textBoxResultado.value = JSON.stringify(configuracoesJogo);

        gerarJogo();
    });

    btnDiminuirFonte.addEventListener("click", function() {
        var configuracoesJogo = getConfiguracoesJogo();

        configuracoesJogo.fontSize = (configuracoesJogo.fontSize !== undefined ? configuracoesJogo.fontSize - defaultIncreaseDecreaseFontSize : defaultFontSize - defaultIncreaseDecreaseFontSize);

        textBoxResultado.value = JSON.stringify(configuracoesJogo);

        gerarJogo();
    });

    cbMostrarResultado.addEventListener("click", function() {
        gerarJogo();
    });

    cbMostrarBordas.addEventListener("click", function() {
        gerarJogo();
    });

    cbPodeCruzar.addEventListener("click", function() {
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

                if(palavra != "") {
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
        if(isNaN(this.value) || parseInt(this.value) <= 0 || this.value.trim() === "")
            this.value = 1;

        gerarJogo();
    });

    textBoxNumeroDeLinhas.addEventListener("click", function() {
        gerarJogo();
    });

    textBoxNumeroDeColunas.addEventListener("keyup", function() {
        if(isNaN(this.value) || parseInt(this.value) <= 0 || this.value.trim() === "")
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
        configuracoesJogo.podeCruzar = cbPodeCruzar.checked;
        configuracoesJogo.possuiBordas = cbMostrarBordas.checked;
        configuracoesJogo.posicaoPalavras = (cbPalavrasNaDireita.checked ? "direita" : (cbPalavrasNaEsquerda.checked ? "esquerda" : ""));
        configuracoesJogo.chancesParaReverso = txtChancesParaReverso.value;
        configuracoesJogo.chancesParaNaoReverso = 10;
        configuracoesJogo.resposta = cbMostrarResultado.checked;
        configuracoesJogo.canvasWidth = (configuracoesJogo.canvasWidth !== undefined ? configuracoesJogo.canvasWidth : defaultCanvasWidth);
        configuracoesJogo.canvasHeight = (configuracoesJogo.canvasHeight !== undefined ? configuracoesJogo.canvasHeight : defaultCanvasHeight);
        configuracoesJogo.pxEspacamentoColunas = (configuracoesJogo.pxEspacamentoColunas !== undefined ? configuracoesJogo.pxEspacamentoColunas : defaultPxEspacamentoColunas);
        configuracoesJogo.pxEspacamentoLinhas = (configuracoesJogo.pxEspacamentoLinhas !== undefined ? configuracoesJogo.pxEspacamentoLinhas : defaultPxEspacamentoLinhas);
        configuracoesJogo.pxMargemEsquerda = (configuracoesJogo.pxMargemEsquerda !== undefined ? configuracoesJogo.pxMargemEsquerda : defaultPxMargemEsquerda);
        configuracoesJogo.pxMargemTop = (configuracoesJogo.pxMargemTop !== undefined ? configuracoesJogo.pxMargemTop : defaultPxMargemTop);
        configuracoesJogo.fontSize = (configuracoesJogo.fontSize !== undefined ? configuracoesJogo.fontSize : defaultFontSize);
        configuracoesJogo.fontFace = (configuracoesJogo.fontFace !== undefined ? configuracoesJogo.fontFace : defaultFontFace);
        configuracoesJogo.font = configuracoesJogo.fontSize + "px " + configuracoesJogo.fontFace;
        configuracoesJogo.config = configuracoesJogo.config !== undefined ? configuracoesJogo.config : {};
        configuracoesJogo.config.chancesParaHorizontal = txtChancesParaHorizontal.value;
        configuracoesJogo.config.chancesParaVertical = txtChancesParaVertical.value;
        configuracoesJogo.config.chancesParaNoroesteSudeste = txtChancesParaDiagonalNoroesteSudeste.value;
        configuracoesJogo.config.chancesParaNordesteSudoeste = txtChancesParaDiagonalNordesteSudoeste.value;
        configuracoesJogo.config.preenchimento = configuracoesJogo.config.preenchimento !== undefined ? configuracoesJogo.config.preenchimento : {};
        configuracoesJogo.config.preenchimento.mesmaLetraDasPalavras = rbPreenchimentoMesmasLetras.checked;
        configuracoesJogo.config.preenchimento.letrasAceitas = (rbPreenchimentoLetrasAceitas.checked ? txtLetrasAceitas.value : "");

        var jogoAtual = new $cacaPalavras(configuracoesJogo.numeroDeLinhas, configuracoesJogo.numeroDeColunas, configuracoesJogo.podeCruzar, configuracoesJogo.chancesParaReverso, configuracoesJogo.chancesParaNaoReverso);

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

        jogoAtual.desenharJogo(document.getElementById("esbocoJogo"), configuracoesJogo);

        sectionEsbocoJogo.style.display = "block";
    };

    btnRefazerPreenchimento.addEventListener("click", function() {
        var configuracoesJogo = getConfiguracoesJogo();

        if(configuracoesJogo.config !== undefined && configuracoesJogo.config.preenchimento !== undefined) {
            configuracoesJogo.config.preenchimento.previamenteDefinido = [];

            textBoxResultado.value = JSON.stringify(configuracoesJogo);

            gerarJogo();
        }
    });
})();