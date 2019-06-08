class WindowsManager {
    static windows = {
        menu: document.getElementById("menu"),
        game: document.getElementById("game"),
        scores: document.getElementById("scores"),
        settings: document.getElementById("settings"),
    };

    static TargetWindow(window) {
        for (let node in this.windows) {
            if (window === this.windows[node]) {
                this.windows[node].style.visibility = null;
                this.windows[node].style.zIndex = "100";
            } else {
                this.windows[node].style.visibility = "hidden";
                this.windows[node].style.zIndex = "-100";
            }
        }
    }
}