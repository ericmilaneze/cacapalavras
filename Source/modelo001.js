(function() {
    var configuracoesDeJogoPadrao = {"possuiBordas":true,"canvasWidth":250,"canvasHeight":250,"config":{}};

    var sectionJogoMouseOver = function() {
        var sectionAtual = this;
        var canvasJogo = this.querySelector("canvas.jogo");
                
        var divReconfigurar = sectionAtual.querySelector("div.reconfigurar");
        divReconfigurar.classList.remove("invisivel");
        divReconfigurar.style.top = (canvasJogo.height + (canvasJogo.getBoundingClientRect().top - sectionAtual.getBoundingClientRect().top) - 20) + "px";
        divReconfigurar.style.left = (canvasJogo.width + (canvasJogo.getBoundingClientRect().left - sectionAtual.getBoundingClientRect().left) - divReconfigurar.clientWidth) + "px";
        
        sectionAtual.classList.add("mouseover");
    };

    var sectionJogoMouseOut = function() {
        var sectionAtual = this;
                
        var divReconfigurar = sectionAtual.querySelector("div.reconfigurar");
        
        divReconfigurar.classList.add("invisivel");
        
        sectionAtual.classList.remove("mouseover");
    };

    var reconfigurarLinkClick = function() {
        var sectionAtual = this.parentElement.parentElement.parentElement;
        
        sectionAtual.removeEventListener("mouseover", sectionJogoMouseOver);
        sectionAtual.removeEventListener("mouseout", sectionJogoMouseOut);
        
        sectionAtual.querySelector("input.configJogo").style.display = "inline";
        sectionAtual.querySelector("input.botaoOk").style.display = "inline";
        
        this.parentElement.classList.add("invisivel");
        
        sectionAtual.classList.remove("mouseover");
    };
    
    var insertAfter = function(newElement, targetElement) {
        var parent = targetElement.parentNode;

        if(parent.lastchild === targetElement) 
            parent.appendChild(newElement);
        else
            parent.insertBefore(newElement, targetElement.nextSibling);
    };
    
    var criarNovaSecton = function() {
        var sectionAtual = this.parentElement;

        sectionAtual.innerHTML = "<div class=\"linha\"><div class=\"textoAcima\" style=\"display: none;\"></div><canvas class=\"jogo\" width=\"470\" height=\"456\"></canvas><div class=\"palavrasDoJogo\" style=\"display: none;\">Salma<br>Minas<br>Gerais<br>Marcia<br>Mirian<br>Ubirajara<br></div><div class=\"clear\"></div><div class=\"reconfigurar invisivel\" style=\"top: 444px; left: 445px;\"><a href=\"javascript:void(0)\"><img src=\"./imagens/edit.png\"></a></div></div><input type=\"text\" class=\"configJogo\"><input type=\"button\" value=\"Ok\" class=\"botaoOk\">";
        
        sectionAtual.classList.remove("naoAdicionado");
        sectionAtual.classList.add("sectionJogo");
        
        sectionAtual.style.width = "";
        sectionAtual.style.height = "";
        sectionAtual.style.lineHeight = "";
        
        init();
    };
    
    var criarNovaSectionVazia = function(sectionAtual, elementoAnterior, isPrimeiroDaLinha) {
        var height = (sectionAtual.getBoundingClientRect().bottom - sectionAtual.getBoundingClientRect().top);
        
        var newInsideLink = document.createElement("a");
        newInsideLink.attributes["href"] = "javascript:void(0)";
        newInsideLink.innerText = "Adicionar um novo.";
        newInsideLink.addEventListener("click", criarNovaSecton);
        
        var newSection = document.createElement("section");
        newSection.classList.add("sectionJogo");
        newSection.classList.add("naoAdicionado");
        newSection.appendChild(newInsideLink);
        newSection.style.width = sectionAtual.clientWidth + "px";
        newSection.style.height = height + "px";
        newSection.style.lineHeight = height + "px";
        
        if(isPrimeiroDaLinha)
            newSection.classList.add("primeiroDaLinha");
        
        insertAfter(newSection, elementoAnterior);
        
        return newSection;
    };
    
    var criarDivPularLinha = function(sectionRecemAdicionada) {
        var div = document.createElement("div");
        div.classList.add("clear");
        
        insertAfter(div, sectionRecemAdicionada);
        
        return div;
    };
    
    var botaoOkClick = function() {
        var sectionAtual = this.parentElement;
        var txtConfig = sectionAtual.querySelector("input.configJogo");

        $desenharJogo(sectionAtual, JSON.parse(txtConfig.value));
        
        txtConfig.style.display = "none";
        this.style.display = "none";
        
        sectionAtual.addEventListener("mouseover", sectionJogoMouseOver);
        sectionAtual.addEventListener("mouseout", sectionJogoMouseOut);
        
        sectionAtual.querySelector("div.reconfigurar > a").addEventListener("click", reconfigurarLinkClick);
        
        if(!sectionAtual.classList.contains("criado")) {
            var sectionRecemAdicionada = criarNovaSectionVazia(sectionAtual, sectionAtual, false);
            
            if(sectionAtual.classList.contains("primeiroDaLinha")) {
                var divPularLinha = criarDivPularLinha(sectionRecemAdicionada);
                
                criarNovaSectionVazia(sectionAtual, divPularLinha, true);
            }
        
            sectionAtual.classList.add("criado");
        };
    };
    
    (function() {
        var sectionsDeJogo = document.getElementsByClassName("sectionJogo");
        
        for (var i = 0; i < sectionsDeJogo.length; i++) {
            var sectionAtual = sectionsDeJogo[i];
            
            if(!sectionAtual.classList.contains("naoAdicionado") && !sectionAtual.classList.contains("desenhado")) {
                $desenharJogo(sectionAtual, configuracoesDeJogoPadrao);

                sectionAtual.querySelector("input.botaoOk").addEventListener("click", botaoOkClick);
                
                sectionAtual.classList.add("desenhado");
            }
        }
    })();
})();