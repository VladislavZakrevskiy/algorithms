import { radius, scale, trail } from '../animation';
import { innerSolarSystem } from '../count/system';
import { AstroObject } from './AstroObject';

export class SlingshotAstroObject {
	canvasHTML: HTMLCanvasElement;
	mousePressX = 0;
	mousePressY = 0;
	currentMouseX = 0;
	currentMouseY = 0;
	dragging = false;

	constructor(canvasHTML: HTMLCanvasElement) {
		this.canvasHTML = canvasHTML;
		this.listen();
	}

	listen() {
		this.canvasHTML.onmousedown = this.onMouseDown.bind(this);
		this.canvasHTML.onmousemove = this.onMouseMove.bind(this);
		this.canvasHTML.onmouseup = this.onMouseUp.bind(this);
	}

	onMouseDown(e: MouseEvent) {
		this.mousePressX = e.clientX;
		this.mousePressY = e.clientY;
		this.dragging = true;
	}

	onMouseUp(e: MouseEvent) {
		const width = this.canvasHTML.width;
		const height = this.canvasHTML.height;
		const x = (this.mousePressX - width / 2) / scale;
		const y = (this.mousePressY - height / 2) / scale;
		const z = 0;
		const vectorX = (e.clientX - this.mousePressX) / 35;
		const vectorY = (e.clientY - this.mousePressY) / 35;
		const vectorZ = 0;

		innerSolarSystem.masses.push({
			name: '',
			acceleration: {
				x: 0,
				y: 0,
				z: 0,
			},
			massa: 3.0024584e-6,
			object: new AstroObject(this.canvasHTML.getContext('2d'), trail, radius),
			position: { x, y, z },
			vector: {
				x: vectorX,
				y: vectorY,
				z: vectorZ,
			},
		});

		this.dragging = false;
	}

	onMouseMove(e: MouseEvent) {
		this.currentMouseX = e.clientX;
		this.currentMouseY = e.clientY;
	}
}
