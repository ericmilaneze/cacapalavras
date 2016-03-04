var desenharJogo = function(sectionJogo, configuracoesJogo) {
    if(configuracoesJogo !== undefined && configuracoesJogo.config !== undefined) {
        var divPalavrasDoJogo = sectionJogo.querySelector("div.palavrasDoJogo");
        var canvasJogo = sectionJogo.querySelector("canvas.jogo");
        var divTextoAcima = sectionJogo.querySelector("div.textoAcima");
        
        canvasJogo.width = configuracoesJogo.canvasWidth;
        canvasJogo.height = configuracoesJogo.canvasHeight;
        
        divPalavrasDoJogo.innerHTML = "";
        
        if(configuracoesJogo.textoAcima !== undefined && configuracoesJogo.textoAcima.trim() !== "") {
            divTextoAcima.style.width = configuracoesJogo.canvasWidth + "px";
            divTextoAcima.style.display = "block";
            divTextoAcima.innerHTML = configuracoesJogo.textoAcima;
        }
        else {
            divTextoAcima.style.display = "none";
            configuracoesJogo.textoAcima = "";
        }
        
        var ctxCanvasResposta = canvasJogo.getContext("2d");
        
        ctxCanvasResposta.clearRect(0, 0, canvasJogo.width, canvasJogo.height);
        
        if(configuracoesJogo.possuiBordas)
            ctxCanvasResposta.strokeRect(0, 0, canvasJogo.width, canvasJogo.height);
        
        ctxCanvasResposta.font = configuracoesJogo.font;

        var jogoAtual = new cacaPalavras(configuracoesJogo.numeroDeLinhas, configuracoesJogo.numeroDeColunas, configuracoesJogo.podeCruzar, configuracoesJogo.chancesParaReverso, configuracoesJogo.chancesParaNaoReverso);
        jogoAtual.adicionarPalavras(configuracoesJogo.config);
        
        var pxColunaInicial = configuracoesJogo.pxEspacamentoColunas;
        var pxLinhaInicial = configuracoesJogo.pxMargemTop;
        
        for (var linha = 0; linha < configuracoesJogo.numeroDeLinhas; linha++) {
            pxColunaInicial = configuracoesJogo.pxMargemEsquerda;
            
            for (var coluna = 0; coluna < configuracoesJogo.numeroDeColunas; coluna++) {
                var letra = configuracoesJogo.resposta ? jogoAtual.getLetra(linha, coluna) : jogoAtual.getLetraComPreenchimento(linha, coluna);
            
                ctxCanvasResposta.textAlign = "center";
                ctxCanvasResposta.fillText(letra, pxColunaInicial, pxLinhaInicial);
                
                pxColunaInicial += configuracoesJogo.pxEspacamentoColunas;
            }
            
            pxLinhaInicial += configuracoesJogo.pxEspacamentoLinhas;
        }
        
        var palavras = jogoAtual.getPalavras();
        
        for (var i = 0; i < palavras.length; i++)
            divPalavrasDoJogo.innerHTML += palavras[i].palavra + "<br />"
        
        if(configuracoesJogo.posicaoPalavras !== undefined && configuracoesJogo.posicaoPalavras.trim() !== "") {
            divPalavrasDoJogo.style.display = "block";
            canvasJogo.style.float = (configuracoesJogo.posicaoPalavras === "direita" ? "left" : "right"); // ao contrário mesmo
        }
        else {
            divPalavrasDoJogo.style.display = "none";
        }
    }
};