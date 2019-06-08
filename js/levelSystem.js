class LevelSystem {
    static playerStats = {
        level: +localStorage.getItem("playerLevel"),
        xp: +localStorage.getItem("playerXP"),
    };

    static nodes = {
        menuUserLevel: document.getElementById("menu_user_level"),
    };

    static SetLevel() {
        localStorage.setItem("playerLevel", this.playerStats.level);
        this.nodes.menuUserLevel.innerHTML = this.playerStats.level;
    }

    static AddLevel(lvl) {
        this.playerStats.level += lvl;

        this.SetLevel();
    }

    static SetXP() {
        localStorage.setItem("playerXP", this.playerStats.xp);
        document.documentElement.style.setProperty(
            '--player-level-in-percent',
            `${this.playerStats.xp}%`
        );
    }

    static AddXp(xp) {
        if (this.playerStats.xp + xp >= 100) {
            this.AddLevel((this.playerStats.xp + xp) / 100 | 0);
            this.playerStats.xp = (this.playerStats.xp + xp) % 100;
        } else {
            this.playerStats.xp += xp;
        }

        this.SetXP();
    }

    static Initialize() {
        if (this.playerStats.level === 0) {
            localStorage.setItem("playerLevel", "1");
            localStorage.setItem("playerXP", "0");

            this.playerStats.level = 1;
        }

        this.SetLevel();
        this.SetXP();
    }
}