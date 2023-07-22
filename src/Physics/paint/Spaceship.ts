import { SpaceshipCount } from '../count/Spaceship';

export class SpaceshipPaint {
	ctx: CanvasRenderingContext2D;
	count: SpaceshipCount;

	constructor(ctx: CanvasRenderingContext2D) {
		this.ctx = ctx;
		this.count = new SpaceshipCount();
	}

	draw() {
		const x = this.count.startX;
		const y = this.count.startY;
        console.log(x, y)
        this.drawPolygon(x, y, 3, 10, this.count.angle)
	}

	drawPolygon(
		centerX: number,
		centerY: number,
		sideCount: number,
		size: number,
		rotationDegrees: number
	) {
		const radians = (rotationDegrees * Math.PI) / 180;
		this.ctx.translate(centerX, centerY);
		this.ctx.rotate(radians);
		this.ctx.beginPath();
		this.ctx.moveTo(size * Math.cos(0), size * Math.sin(0));
		for (let i = 1; i <= sideCount; i += 1) {
			this.ctx.lineTo(
				size * Math.cos((i * 2 * Math.PI) / sideCount),
				size * Math.sin((i * 2 * Math.PI) / sideCount)
			);
		}
		this.ctx.closePath();
		this.ctx.fillStyle = '#FFF';
		this.ctx.strokeStyle = '#FFF';
		this.ctx.lineWidth = 1;
		this.ctx.stroke();
		this.ctx.fill();
		this.ctx.rotate(-radians);
		this.ctx.translate(-centerX, -centerY);
	}
}
