(function($desenharJogo, window) {
    var configuracoesDeJogoPadrao = {"possuiBordas":true,"canvasWidth":250,"canvasHeight":250,"config":{}};

    var inicializarSection = function(sectionAtual) {
        if(!sectionAtual.classList.contains("naoAdicionado") && !sectionAtual.classList.contains("desenhado")) {
            $desenharJogo(sectionAtual, configuracoesDeJogoPadrao);

            sectionAtual.querySelector("input.botaoOk").addEventListener("click", botaoOkClick);
            
            sectionAtual.classList.add("desenhado");
        }
    };
    
    var criarDivClear = function() {
        var divClear = document.createElement("div");
        divClear.classList.add("clear");
        
        return divClear;
    };
    
    var criarNovaSection = function() {
        var novaSection = document.createElement("section");
        novaSection.classList.add("sectionJogo");
        
        var divLinha = document.createElement("div");
        divLinha.classList.add("linha");
        
        var divTextoAcima = document.createElement("div");
        divTextoAcima.classList.add("textoAcima");
        
        var canvasJogo = document.createElement("canvas");
        canvasJogo.classList.add("jogo");
        
        var divPalavrasDoJogo = document.createElement("div");
        divPalavrasDoJogo.classList.add("palavrasDoJogo");

        var aReconfigurar = document.createElement("a");
        aReconfigurar.href = "javascript:void(0)";
        aReconfigurar.classList.add("reconfigurar");
        
        var imgEdit = document.createElement("img");
        imgEdit.src = "./imagens/edit.png";
        
        var imgRemove = document.createElement("img");
        imgRemove.src = "./imagens/remove.png";
        
        var imgNewDown = document.createElement("img");
        imgNewDown.src = "./imagens/new_down.png";
        
        var imgNewRight = document.createElement("img");
        imgNewRight.src = "./imagens/new_right.png";

        var botaoConfigJogo = document.createElement("input");
        botaoConfigJogo.type = "text";
        botaoConfigJogo.classList.add("configJogo");
        
        var botaoOk = document.createElement("input");
        botaoOk.type = "button";
        botaoOk.value = "Ok";
        botaoOk.classList.add("botaoOk");
        
        var divConfigurar = document.createElement("div");
        divConfigurar.classList.add("configurar");
        divConfigurar.classList.add("invisivel");
        
        var aExcluir = document.createElement("a");
        aExcluir.href = "javascript:void(0)";
        aExcluir.classList.add("excluir");
        aExcluir.appendChild(imgRemove);
        
        var aNovoAbaixo = document.createElement("a");
        aNovoAbaixo.href = "javascript:void(0)";
        aNovoAbaixo.classList.add("novoAbaixo");
        aNovoAbaixo.appendChild(imgNewDown);
        
        var aNovoDireita = document.createElement("a");
        aNovoDireita.href = "javascript:void(0)";
        aNovoDireita.classList.add("novoDireita");
        aNovoDireita.appendChild(imgNewRight);
        
        aReconfigurar.appendChild(imgEdit);
        divConfigurar.appendChild(aExcluir);
        divConfigurar.appendChild(aNovoAbaixo);
        divConfigurar.appendChild(aNovoDireita);
        divConfigurar.appendChild(aReconfigurar);
        divLinha.appendChild(divTextoAcima);
        divLinha.appendChild(canvasJogo);
        divLinha.appendChild(divPalavrasDoJogo);
        divLinha.appendChild(criarDivClear());
        divLinha.appendChild(divConfigurar);
        novaSection.appendChild(divLinha);
        novaSection.appendChild(botaoConfigJogo);
        novaSection.appendChild(botaoOk);
        
        return novaSection;
    };
    
    var atualizarLinhaDeJogosWidth = function(section) {
        var linhaDeJogos = section.parentElement;
        
        var todosCanvas = linhaDeJogos.querySelectorAll("section.sectionJogo div.linha canvas.jogo");
        var todosPalavrasDoJogo = linhaDeJogos.querySelectorAll("section.sectionJogo div.linha div.palavrasDoJogo");
        
        var widthTotal = 0;
        
        for(var i = 0; i < todosCanvas.length; i++)
            widthTotal += 
                todosCanvas[i].offsetWidth + parseInt(window.getComputedStyle(todosCanvas[i])["marginLeft"]) + parseInt(window.getComputedStyle(todosCanvas[i])["marginRight"]) +
                todosPalavrasDoJogo[i].offsetWidth + parseInt(window.getComputedStyle(todosPalavrasDoJogo[i])["marginLeft"]) + parseInt(window.getComputedStyle(todosPalavrasDoJogo[i])["marginRight"]);
        
        linhaDeJogos.style.width = widthTotal + "px";
    };

    var sectionJogoMouseOver = function() {
        var sectionAtual = this;
        var canvasJogo = this.querySelector("canvas.jogo");
                
        var divConfigurar = sectionAtual.querySelector("div.configurar");
        divConfigurar.classList.remove("invisivel");
        divConfigurar.style.top = (canvasJogo.height + (canvasJogo.getBoundingClientRect().top - sectionAtual.getBoundingClientRect().top) - 20) + "px";
        divConfigurar.style.left = (canvasJogo.width + (canvasJogo.getBoundingClientRect().left - sectionAtual.getBoundingClientRect().left) - divConfigurar.clientWidth) + "px";
    };

    var sectionJogoMouseOut = function() {
        var sectionAtual = this;
                
        var divConfigurar = sectionAtual.querySelector("div.configurar");
        
        divConfigurar.classList.add("invisivel");
    };

    var reconfigurarLinkClick = function() {
        var sectionAtual = this.parentElement.parentElement.parentElement;
        
        sectionAtual.removeEventListener("mouseover", sectionJogoMouseOver);
        sectionAtual.removeEventListener("mouseout", sectionJogoMouseOut);
        this.parentElement.classList.add("invisivel");
        
        sectionAtual.querySelector("input.configJogo").style.display = "inline";
        sectionAtual.querySelector("input.botaoOk").style.display = "inline";
    };
    
    var novoDireitaLinkClick = function() {
        var sectionAtual = this.parentElement.parentElement.parentElement;
        var linhaDeJogos = sectionAtual.parentElement;
        
        // inserir ao lado direito
        var novaSection = criarNovaSection();
        sectionAtual.parentElement.insertBefore(novaSection, sectionAtual.nextSibling);
        
        inicializarSection(novaSection);

        atualizarLinhaDeJogosWidth(novaSection);
        
        atualizarLinhaDeJogosWidth(novaSection);
    };
    
    var novoAbaixoLinkClick = function() {
        var sectionAtual = this.parentElement.parentElement.parentElement;
        var linhaDeJogos = sectionAtual.parentElement;
        
        
        var novaLinhaDeJogos = document.createElement("div");
        novaLinhaDeJogos.classList.add("linhaDeJogos");
        
        // inserir abaixo
        var novoDivClear = criarDivClear();
        
        linhaDeJogos.parentElement.insertBefore(novoDivClear, linhaDeJogos.nextSibling);
        novoDivClear.parentElement.insertBefore(novaLinhaDeJogos, novoDivClear.nextSibling);
        
        
        var novaSection = criarNovaSection();

        novaLinhaDeJogos.appendChild(novaSection);

        inicializarSection(novaSection);
        
        atualizarLinhaDeJogosWidth(novaSection);
    };
    
    var excluirLinkClick = function() {
        var sectionAtual = this.parentElement.parentElement.parentElement;
        var linhaDeJogos = sectionAtual.parentElement;
        
        var sectionExistente = linhaDeJogos.querySelectorAll("section.sectionJogo");

        if(sectionExistente.length !== 1) {
            linhaDeJogos.removeChild(sectionAtual);
            
            atualizarLinhaDeJogosWidth(sectionExistente);
        }
    };
    
    var botaoOkClick = function() {
        var sectionAtual = this.parentElement;
        var txtConfig = sectionAtual.querySelector("input.configJogo");

        $desenharJogo(sectionAtual, JSON.parse(txtConfig.value));
        
        txtConfig.style.display = "none";
        this.style.display = "none";
        
        sectionAtual.addEventListener("mouseover", sectionJogoMouseOver);
        sectionAtual.addEventListener("mouseout", sectionJogoMouseOut);
        
        sectionAtual.querySelector("div.configurar > a.reconfigurar").addEventListener("click", reconfigurarLinkClick);
        sectionAtual.querySelector("div.configurar > a.novoDireita").addEventListener("click", novoDireitaLinkClick);
        sectionAtual.querySelector("div.configurar > a.novoAbaixo").addEventListener("click", novoAbaixoLinkClick);
        sectionAtual.querySelector("div.configurar > a.excluir").addEventListener("click", excluirLinkClick);
        
        atualizarLinhaDeJogosWidth(sectionAtual);
    };
    
    (function() {
        var sectionsDeJogo = document.getElementsByClassName("sectionJogo");
        
        for (var i = 0; i < sectionsDeJogo.length; i++) {
            var sectionAtual = sectionsDeJogo[i];
            
            inicializarSection(sectionAtual);
        }
    })();
})($desenharJogo, window);