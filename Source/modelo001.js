(function() {
    var configuracoesDeJogoPadrao = {"possuiBordas":true,"canvasWidth":250,"canvasHeight":250,"config":{}};
    var sectionsDeJogo = document.getElementsByClassName("sectionJogo");

    var sectionJogoMouseOver = function() {
        var sectionAtual = this;
        var canvasJogo = this.querySelector("canvas.jogo");
                
        var divReconfigurar = sectionAtual.querySelector("div.reconfigurar");
        divReconfigurar.classList.remove("invisivel");
        divReconfigurar.style.top = (canvasJogo.height - 15) + "px";
        divReconfigurar.style.left = (canvasJogo.width + (canvasJogo.getBoundingClientRect().left - sectionAtual.getBoundingClientRect().left) - divReconfigurar.clientWidth - 15) + "px";
        
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

    for (var i = 0; i < sectionsDeJogo.length; i++) {
        var sectionAtual = sectionsDeJogo[i];
        
        if(!sectionAtual.classList.contains("naoAdicionado")) {
            desenharJogo(sectionAtual, configuracoesDeJogoPadrao);

            sectionAtual.querySelector("input.botaoOk").addEventListener("click", function() {
                var sectionAtual = this.parentElement;
                var txtConfig = sectionAtual.querySelector("input.configJogo");

                desenharJogo(sectionAtual, JSON.parse(txtConfig.value));
                
                txtConfig.style.display = "none";
                this.style.display = "none";
                
                sectionAtual.addEventListener("mouseover", sectionJogoMouseOver);
                sectionAtual.addEventListener("mouseout", sectionJogoMouseOut);
                
                sectionAtual.querySelector("div.reconfigurar > a").addEventListener("click", reconfigurarLinkClick);
            });
        }
        else {
            
        }
    }    
})();