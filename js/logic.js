WindowsManager.TargetWindow(WindowsManager.windows.menu);

const CANVAS_MANAGER = new CanvasManager(
    document.getElementById("animation"),
    window.innerWidth,
    window.innerHeight
);

CANVAS_MANAGER.AddAnimation(new Sparks());
CANVAS_MANAGER.SetResizeEventListener();
CANVAS_MANAGER.PlayAnimations();

// MENU EVENTS
document.getElementById("menu_option_scores").onclick = () =>
    WindowsManager.TargetWindow(WindowsManager.windows.scores);

let GAME_BOARD;
document.getElementById("menu_option_play").onclick = () => {
    WindowsManager.TargetWindow(WindowsManager.windows.game);

    GAME_BOARD = new GameBoard(
        document.getElementById("gameBoard"),
        10,
        10
    );

};

// SCORES EVENTS
document.getElementById("scores_back").onclick = () =>
    WindowsManager.TargetWindow(WindowsManager.windows.menu);

