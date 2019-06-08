class Spark {
    constructor(px, py, addSize) {
        this.px = px;
        this.py = py;
        this.size = 0;
        this.addSize = addSize;
    }

    Show(ctx) {
        ctx.beginPath();
        ctx.ellipse(
            this.px,
            this.py,
            this.size,
            this.size,
            0,
            0,
            Math.PI * 2
        );
        ctx.strokeStyle = "#6a5acd";
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    Update() {
        this.size += this.addSize;
    }
}