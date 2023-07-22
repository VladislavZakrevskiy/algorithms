export class AstroObject {
    trajectory: {x: number; y: number}[] = []
    ctx: CanvasRenderingContext2D
    trail = 0
    radius = 0

    constructor(ctx: CanvasRenderingContext2D, trail: number, radius: number) {
        this.ctx = ctx
        this.trail = trail
        this.radius = radius
    }

    addPosition(x: number, y: number) {
        this.trajectory.push({x, y})

        if(this.trajectory.length > this.trail) {
            this.trajectory.shift()
        }
    }

    draw(x: number, y: number) {
        this.addPosition(x, y);
    
        const trajLength = this.trajectory.length;
    
        for (let i = 0; i < trajLength; i++) {
            let transparency;
            let circleScaleFactor;
        
            const scaleFactor = i / trajLength;
        
            if (i === trajLength - 1) {
                transparency = 1;
                circleScaleFactor = 1;
            } else {
                transparency = scaleFactor / 2;
                circleScaleFactor = scaleFactor;
            }
        
            this.ctx.beginPath();
            this.ctx.arc(
                this.trajectory[i].x,
                this.trajectory[i].y,
                circleScaleFactor * this.radius,
                0,
                2 * Math.PI
            );
            this.ctx.fillStyle = `rgb(255,255,255, ${transparency})`;
        
            this.ctx.fill();
        }
    }
}