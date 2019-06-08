class GameBoard {
    constructor(gameBoardNode, columns, rows) {
        this.gameBoardNode = gameBoardNode;
        this.ClearBoard();

        this.columns = columns;
        this.rows = rows;

        this.spots = [];

        this.isGameStoped = false;

        document.documentElement.style.setProperty(
            '--game-board-columns',
            this.columns
        );
        document.documentElement.style.setProperty(
            '--game-board-rows',
            this.rows
        );

        for (let y = 0; y < this.rows; y++) {
            this.spots[y] = [];
            for (let x = 0; x < this.columns; x++) {
                this.spots[y].push(new Spot(x, y));
                if (Math.random() * 100 > 82) {
                    this.spots[y][x].SetNum(-1);
                }
            }
        }

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.columns; x++) {
                let bombsCount = 0;
                for (let iy = -1 + y; iy < 2 + y; iy++) {
                    for (let ix = -1 + x; ix < 2 + x; ix++) {
                        if (iy >= 0 && ix >= 0 && ix < this.columns && iy < this.rows) {
                            if (this.spots[ix][iy].num === -1) {
                                bombsCount++;
                            }
                        }
                    }
                }
                if (this.spots[x][y].num !== -1) {
                    this.spots[x][y].SetNum(bombsCount);
                }
            }
        }

        this.spots.forEach(s => s.forEach(ss => this.AddSpotRule(ss)));
        this.spots.forEach(s => s.forEach(ss => this.gameBoardNode.appendChild(ss.node)));
    }

    ClearBoard() {
        for (let i = this.gameBoardNode.children.length-1; i >= 0; i--) {
            this.gameBoardNode.removeChild(this.gameBoardNode.children[i]);
        }
    }

    AddSpotRule(spot) {
        spot.node.onclick = e => {
            if (!spot.isOpened && !this.isGameStoped) {
                if (!e.ctrlKey && !spot.isFlagSetted) {
                    if (spot.Open()) {
                        this.OpenBoard();
                        this.Lose();
                    } else {
                        if (spot.num === 0) {
                            for (let y = -1 + spot.y; y < 2 + spot.y; y++) {
                                for (let x = -1 + spot.x; x < 2 + spot.x; x++) {
                                    if (y >= 0 && x >= 0 && x < this.columns && y < this.rows) {
                                        if (this.spots[y][x].num !== spot && this.spots[y][x].num !== -1) {
                                            this.spots[y][x].node.click();
                                        }
                                    }
                                }
                            }
                        }
                        this.CheckForWin();
                    }
                } else {
                    spot.SetFlag();
                }
            }
        }
    }

    OpenBoard() {
        this.spots.forEach(s => s.forEach(ss => ss.Open()));
    }

    CheckForWin() {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.columns; x++) {
                if (this.spots[x][y].num !== -1 && !this.spots[x][y].isOpened)
                    return;
            }
        }

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.columns; x++) {
                if (this.spots[x][y].num === -1 && !this.spots[x][y].isFlagSetted)
                    this.spots[x][y].SetFlag();
            }
        }

        this.Win();
    }

    Win(){
        this.isGameStoped = true;
        document.getElementById("menu_option_play").innerHTML = "You won !<div></div>";

        setTimeout(()=>{
            WindowsManager.TargetWindow(WindowsManager.windows.menu);
        },3000);
    }

    Lose(){
        this.isGameStoped = true;
        document.getElementById("menu_option_play").innerHTML = "Try again ?<div></div>";

        setTimeout(()=>{
            WindowsManager.TargetWindow(WindowsManager.windows.menu);
        },3000);
    }
}