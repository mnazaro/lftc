
/*
Esta classe lida com o desenho de elementos na tela e
entrada do usuário na tela.
*/
let FAScene = class {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.ctx.font = "20px serif";

        this.mousePressed = false;
        this.ctrlPressed = false;
        this.selected = [];

        //Contem os diferentes tipos de menus.
        this.menuContainer = null;
        this.menuContainer = document.createElement("div");
        this.menuContainer.style.position = "absolute";

        //O menu padrão é usado quando o usuário clica com o botão direito em um local vazio no canvas.
        //Ele contém apenas a opção "Add State".

        let addStateOption = document.createElement("div");
        addStateOption.className = "menuItem";
        addStateOption.innerHTML = "Adicionar Estado";
        addStateOption.style.cursor = "pointer";

        this.defaultMenu = document.createElement("div");
        this.defaultMenu.appendChild(addStateOption);

        //O menu de estado é usado quando o usuário clica com o botão direito em um estado.
        //Ele contém opções para adicionar uma transição, alterar a aceitação deste estado,
        //definir este como o estado inicial e excluir este estado.

        let addTransitionOption = document.createElement("div");
        addTransitionOption.className = "menuItem";
        addTransitionOption.innerHTML = "Adicionar Transição";

        let setStartOption = document.createElement("div");
        setStartOption.className = "menuItem";
        setStartOption.innerHTML = "Inicial";

        let changeAcceptOption = document.createElement("div");
        changeAcceptOption.className = "menuItem";
        changeAcceptOption.innerHTML = "Final";

        let deleteStateOption = document.createElement("div");
        deleteStateOption.className = "menuItem";
        deleteStateOption.innerHTML = "Excluir Estado";


        this.stateMenu = document.createElement("div");
        this.stateMenu.appendChild(addTransitionOption);
        this.stateMenu.appendChild(changeAcceptOption);
        this.stateMenu.appendChild(setStartOption);
        this.stateMenu.appendChild(deleteStateOption);

        //O menu transição é usado quando o usuário clica com o botão direito em uma transição.
        //Ele tem opções para excluir esta transição.

        let deleteTransitionOption = document.createElement("div");
        deleteTransitionOption.className = "menuItem";
        deleteTransitionOption.innerHTML = "Excluir Transição";

        this.transitionMenu = document.createElement("div");
        this.transitionMenu.appendChild(deleteTransitionOption);

        // PAREI AQUI

        //O Menu de Adicionar Estado é usado para a criação de estados

        let addStateTitle = document.createElement("div");
        addStateTitle.innerHTML = "Adicionar Estado";

        let stateLabelDiv = document.createElement("div");
        let stateLabelText = document.createElement("label");
        stateLabelText.innerHTML = "Estado: ";
        let stateLabelInput = document.createElement("input");
        stateLabelInput.id = "stateLabelInput";
        stateLabelInput.maxLength = "1";
        stateLabelInput.style.width = "1rem";
        stateLabelDiv.appendChild(stateLabelText);
        stateLabelDiv.appendChild(stateLabelInput);

        let stateAcceptDiv = document.createElement("div");
        let stateAcceptText = document.createElement("label");
        stateAcceptText.innerHTML = "Final";
        let stateAcceptInput = document.createElement("input");
        stateAcceptInput.type = "checkbox";
        stateAcceptInput.id = "stateAcceptInput";
        stateAcceptDiv.appendChild(stateAcceptText);
        stateAcceptDiv.appendChild(stateAcceptInput);

        let stateStartDiv = document.createElement("div");
        let stateStartText = document.createElement("label");
        stateStartText.innerHTML = "Inicial";
        let stateStartInput = document.createElement("input");
        stateStartInput.type = "checkbox";
        stateStartInput.id = "stateStartInput";
        stateStartDiv.appendChild(stateStartText);
        stateStartDiv.appendChild(stateStartInput);

        let stateButtonDiv = document.createElement("div");
        let stateCreateButton = document.createElement("button");
        stateCreateButton.innerHTML = "Criar";
        stateCreateButton.id = "stateCreateButton";
        let stateCancelButton = document.createElement("button");
        stateCancelButton.innerHTML = "Cancelar";
        stateCancelButton.id = "stateCancelButton";
        stateButtonDiv.appendChild(stateCreateButton);
        stateButtonDiv.appendChild(stateCancelButton);

        this.addStateMenu = document.createElement("div");
        this.addStateMenu.className = "menuItem";
        this.addStateMenu.appendChild(addStateTitle);
        this.addStateMenu.appendChild(stateLabelDiv);
        this.addStateMenu.appendChild(stateAcceptDiv);
        this.addStateMenu.appendChild(stateStartDiv);
        this.addStateMenu.appendChild(stateButtonDiv);

        //O Menu Adicionar Transição é usado para a criação de transições

        let addTransitionTitle = document.createElement("div");
        addTransitionTitle.innerHTML = "Adicionar Transição";

        let targetLabelDiv = document.createElement("div");
        let targetLabelText = document.createElement("label");
        targetLabelText.innerHTML = "Para o estado: ";
        let targetInput = document.createElement("input");
        targetInput.maxLength = "1";
        targetInput.style.width = "1rem";
        targetInput.id = "targetInput";
        targetLabelDiv.appendChild(targetLabelText);
        targetLabelDiv.appendChild(targetInput);

        let symbolDiv = document.createElement("div");
        let symbolText = document.createElement("label");
        symbolText.innerHTML = "Simbolo(s): ";
        let symbolInput = document.createElement("input");
        symbolInput.style.width = "1rem";
        symbolInput.id = "symbolInput";
        symbolDiv.appendChild(symbolText);
        symbolDiv.appendChild(symbolInput);

        let transitionButtonDiv = document.createElement("div");
        let transitionCreateButton = document.createElement("button");
        transitionCreateButton.innerHTML = "Criar";
        transitionCreateButton.id = "transitionCreateButton";
        let transitionCancelButton = document.createElement("button");
        transitionCancelButton.innerHTML = "Cancelar";
        transitionCancelButton.id = "transitionCancelButton";
        transitionButtonDiv.appendChild(transitionCreateButton);
        transitionButtonDiv.appendChild(transitionCancelButton);

        this.addTransitionMenu = document.createElement("div");
        this.addTransitionMenu.className = "menuItem";
        this.addTransitionMenu.appendChild(addTransitionTitle);
        this.addTransitionMenu.appendChild(targetLabelDiv);
        this.addTransitionMenu.appendChild(symbolDiv);
        this.addTransitionMenu.appendChild(transitionButtonDiv);

        //Funções de manipulação de eventos	
        this.drawAll = this.drawAll.bind(this);
        this.mouseUpHandle = this.mouseUpHandle.bind(this);
        this.mouseDownHandle = this.mouseDownHandle.bind(this);
        this.mouseMoveHandle = this.mouseMoveHandle.bind(this);
        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.createState = this.createState.bind(this);
        this.checkForElement = this.checkForElement.bind(this);
        this.openAddStateMenu = this.openAddStateMenu.bind(this);
        this.cancelStateCreate = this.cancelStateCreate.bind(this);
        this.cancelTransitionCreate = this.cancelTransitionCreate.bind(this);
        this.changeAccept = this.changeAccept.bind(this);
        this.makeStart = this.makeStart.bind(this);
        this.openAddTransitionMenu = this.openAddTransitionMenu.bind(this);
        this.createTransition = this.createTransition.bind(this);
        this.deleteState = this.deleteState.bind(this);
        this.deleteTransition = this.deleteTransition.bind(this);
        this.ctrlDown = this.ctrlDown.bind(this);
        this.ctrlUp = this.ctrlUp.bind(this);

        //Registro de manipuladores de eventos
        this.canvas.addEventListener("mousemove", this.mouseMoveHandle);
        this.canvas.addEventListener("mousedown", this.mouseDownHandle);
        this.canvas.addEventListener("mouseup", this.mouseUpHandle);
        this.canvas.addEventListener("contextmenu",this.openMenu);
        document.getElementsByTagName("html")[0].addEventListener("keydown", this.ctrlDown);
        document.getElementsByTagName("html")[0].addEventListener("keyup", this.ctrlUp);

        addStateOption.addEventListener("click", this.openAddStateMenu);
        stateCreateButton.addEventListener("click", this.createState);
        stateCancelButton.addEventListener("click", this.cancelStateCreate);
        changeAcceptOption.addEventListener("click",this.changeAccept);
        setStartOption.addEventListener("click", this.makeStart);
        addTransitionOption.addEventListener("click", this.openAddTransitionMenu);
        transitionCreateButton.addEventListener("click", this.createTransition);
        transitionCancelButton.addEventListener("click", this.cancelTransitionCreate);
        deleteStateOption.addEventListener("click", this.deleteState);
        deleteTransitionOption.addEventListener("click", this.deleteTransition);
    }

    //Verifica onde o botão direito do mouse foi clicado,
    //e abre o menu apropriado.
    openMenu(e) {
        e.preventDefault();
        this.menuContainer.x = e.offsetX;
        this.menuContainer.y = e.offsetY;
        this.menuContainer.selected = this.checkForElement(e.offsetX,e.offsetY);

        if(this.menuContainer.selected == null) {
            this.menuContainer.appendChild(this.defaultMenu);
        }
        else if(this.menuContainer.selected instanceof State) {
            this.menuContainer.appendChild(this.stateMenu);
        }
        else if(this.menuContainer.selected instanceof Transition) {
            this.menuContainer.appendChild(this.transitionMenu);
        }

        this.menuContainer.style.top = String(e.offsetY) + "px";
        this.menuContainer.style.left = String(e.offsetX) + "px";

        document.getElementById("canvasDiv").appendChild(this.menuContainer);
        this.drawAll()
    }

    closeMenu() {
        if(this.menuContainer.parentNode) {
            this.menuContainer.parentNode.removeChild(this.menuContainer);
            this.menuContainer.removeChild(this.menuContainer.firstChild);
        }
    }

    openAddStateMenu() {
        this.closeMenu();
        this.menuContainer.appendChild(this.addStateMenu);
        document.getElementById("canvasDiv").appendChild(this.menuContainer);
        this.drawAll();
    }

    createState() {
        let label = document.getElementById("stateLabelInput").value;
        document.getElementById("stateLabelInput").value = "";
        let accept = document.getElementById("stateAcceptInput").checked;
        document.getElementById("stateAcceptInput").checked = false;
        let start = document.getElementById("stateStartInput").checked;
        document.getElementById("stateStartInput").checked = false;
        let s = FA.findState(label);
        if(label == "") {
            alert("ERRO: Não existe nome para o estado.")
        }
        else if(s != null) {
            alert("Error: Existe um estado com esse nome " + label + ".");
        }
        else {
            FA.addState(this.menuContainer.x,this.menuContainer.y,start,accept,label);
        }
        this.drawAll();
        this.closeMenu();
    }

    //Cancela a criação tanto para o addStateMenu
    cancelStateCreate() {
        //Limpar entradas addStateMenu
        document.getElementById("stateLabelInput").value = "";
        document.getElementById("stateAcceptInput").checked = false;
        document.getElementById("stateStartInput").checked = false;
        this.closeMenu();
    }

    changeAccept() {
        this.menuContainer.selected.accept = !this.menuContainer.selected.accept;
        this.drawAll();
        this.closeMenu();
    }

    makeStart() {
        FA.setStart(this.menuContainer.selected);
        this.drawAll();
        this.closeMenu();
    }

    //Deleta todas as transições conectadas ao estado selecionado,
    //então deleta o estado.
    deleteState() {
        FA.removeState(this.menuContainer.selected);
        this.drawAll();
        this.closeMenu();
    }

    openAddTransitionMenu() {
        this.closeMenu();
        this.menuContainer.appendChild(this.addTransitionMenu);
        document.getElementById("canvasDiv").appendChild(this.menuContainer);
        this.drawAll();
    }

    createTransition() {
        let toStateLabel = document.getElementById("targetInput").value;
        document.getElementById("targetInput").value = "";
        let toState = FA.findState(toStateLabel);
        let symbols = document.getElementById("symbolInput").value;
        document.getElementById("symbolInput").value = "";
        if(toStateLabel == "") {
            alert("ERRO: ERRO: O nome do estado não pode estar em branco.");
        }
        else if(symbols == "") {
            alert("ERRO: Deve haver pelo menos um símbolo na transição.");
        }
        else if(toState == null) {
            alert("ERRO: Não existe estado com o nome " + toStateLabel +".");
        }
        else {
            FA.addTransition(this.menuContainer.selected, toState, symbols);
        }
        this.drawAll();
        this.closeMenu();
    }

    cancelTransitionCreate() {
        //Limpar entradas addTransitionMenu
        document.getElementById("targetInput").value = "";
        document.getElementById("symbolInput").value = "";
        this.closeMenu();
    }

    //Deleta a transição selecionada
    deleteTransition() {
        FA.removeTransition(this.menuContainer.selected);
        this.drawAll();
        this.closeMenu();
    }

    //Limpa o canvas e desenha todos os componentes do AF.
    drawAll() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        for(let s of FA.states) {
            s.draw(this.ctx);
        }
        for(let t of FA.transitions) {
            t.draw(this.ctx);
        }
        if(this.selectionBoxX != null) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.selectionBoxX,this.selectionBoxY);
            this.ctx.lineTo(this.selectionBoxX,this.lastY);
            this.ctx.lineTo(this.lastX,this.lastY);
            this.ctx.lineTo(this.lastX,this.selectionBoxY);
            this.ctx.lineTo(this.selectionBoxX,this.selectionBoxY);
            this.ctx.stroke();
        }
    }

    mouseUpHandle(e) {
        if(this.selectionBoxX != null) {
            this.checkForElements(this.selectionBoxX,this.selectionBoxY,this.lastX,this.lastY);
            this.selectionBoxX = null;
            this.selectionBoxY = null;
        }
        else if(!this.ctrlPressed) {
            this.selected.length = 0;
        }
        this.mousePressed = false;
    }

    mouseMoveHandle(e) {
        this.deltaX = e.offsetX-this.lastX;
        this.deltaY = e.offsetY-this.lastY;
        this.lastX = e.offsetX;
        this.lastY = e.offsetY;
        if(this.mousePressed) {
            for(let element of this.selected) {
                element.move(element.x + (this.deltaX),element.y + (this.deltaY));
            }
            this.drawAll();
        }
    }

    mouseDownHandle(e) {
        this.closeMenu();
        if(e.button != 0) {return;}
        this.mousePressed = true;
        let target = this.checkForElement(e.offsetX,e.offsetY);
        if(target != null && !this.selected.includes(target)) {
            this.selected.push(target)
        }
        else if(!this.ctrlPressed) {
            this.selected.length = 0;
            this.selectionBoxX = e.offsetX;
            this.selectionBoxY = e.offsetY;
        }
    }

    ctrlDown(e) {
        if(e.key == "Control") {
            this.ctrlPressed = true;
        }
    }

    ctrlUp(e) {
        if(e.key == "Control") {
            this.selected.length = 0;
            this.ctrlPressed = false;
            this.drawAll();
        }
    }

    checkForElement(x,y) {
        for(let c of FA.states) {
            if(x < (c.x+c.radius) && x > (c.x-c.radius)
                && y < (c.y+c.radius) && y > (c.y-c.radius)) {
                    return c;
                }
        }
        for(let t of FA.transitions) {
            if(x < (t.x + (t.symbols.length*10)/2) && x > (t.x-(t.symbols.length*10)/2)
            && y < (t.y + 6) && y > (t.y - 6)) {
                return t;
            }
        }
        return null;
    }

    checkForElements(x1,y1,x2,y2) {
        let xMin = Math.min(x1,x2);
        let yMin = Math.min(y1,y2);
        let xMax = Math.max(x1,x2);
        let yMax = Math.max(y1,y2);
        for(let c of FA.states) {
            if(xMin < c.x && c.x < xMax
                && yMin < c.y && c.y < yMax) {
                    this.selected.push(c);
                }
        }
        for(let t of FA.transitions) {
            if(xMin < t.x && t.x < xMax
                && yMin < t.y && t.y < yMax) {
                this.selected.push(t);
            }
        }
    }
}