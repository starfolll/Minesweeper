class Spot {
    constructor(x, y, num) {
        this.num = num;
        this.isOpened = false;
        this.isFlagSetted = false;
        this.x = x;
        this.y = y;

        this.node = document.createElement("div");
        this.p = document.createElement("p");

        this.node.setAttribute("class", "game-spot");

        this.node.appendChild(this.p);
    }

    SetNum(num) {
        this.num = num;
        this.p.innerHTML = this.num === 0 ? "" : this.num;
    }

    Open() {
        this.isOpened = true;
        if (this.num === -1) {
            this.node.setAttribute("class", "game-spot spot-bomb");
            return true;
        } else {
            this.node.setAttribute("class", "game-spot spot-locked");
            return false;
        }
    }

    SetFlag() {
        if (!this.isFlagSetted) {
            this.isFlagSetted = !this.isFlagSetted;
            this.node.setAttribute("class", "game-spot spot-flag");
        } else {
            this.isFlagSetted = !this.isFlagSetted;
            this.node.setAttribute("class", "game-spot");
        }
    }
}