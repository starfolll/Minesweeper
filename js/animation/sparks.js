class Sparks extends Animation {
    constructor(addSparkSize = 5, lifeSize = 70) {
        super();
        this.addSparkSize = addSparkSize;

        this.sparks = new Set();

        this.mouseX = 0;
        this.mouseY = 0;

        this.lifeSize = lifeSize;

        document.onclick = () => {
            this.sparks.add(new Spark(
                this.mouseX,
                this.mouseY,
                this.addSparkSize
            ));
        };

        document.onmousemove = e => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        };
    }

    Play(ctx) {
        ctx.beginPath();
        ctx.rect(0, 0, window.innerWidth, window.innerHeight);
        ctx.fillStyle = "rgba(0,0,0,0.1)";
        ctx.fill();

        this.sparks.forEach(s => {
            s.Show(ctx);
            s.Update();
        });

        this.sparks.forEach(s => {
            if (s.size > this.lifeSize){
                this.sparks.delete(s);
            }
        });
    }
}