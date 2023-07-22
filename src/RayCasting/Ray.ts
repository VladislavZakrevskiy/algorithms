import { Map } from './Map'
import { Utils } from './Utils'

export class Ray {
	tileSize = 0
	i = 0
	map: Map
	schema: number[][]
	dist = 0
	endX = 0
	endY = 0

	canvasMap: HTMLCanvasElement
	canvasGame: HTMLCanvasElement
	ctxMap: CanvasRenderingContext2D
	ctxGame: CanvasRenderingContext2D

	constructor(i: number, map: Map, canvasMap: HTMLCanvasElement, canvasGame: HTMLCanvasElement) {
		this.i = i
		this.map = map
		this.schema = map.schema

		this.canvasMap = canvasMap
		this.canvasGame = canvasGame
		this.ctxGame = canvasGame.getContext('2d')!
		this.ctxMap = canvasMap.getContext('2d')!

		this.tileSize = this.canvasMap.width / this.schema.length
	}

	countDist(startX: number, startY: number, angle: number) {
		for (let c = 0; c < 10; c++) {
			const cos = Math.cos(Utils.toRadians(angle + this.i))
			const sin = Math.sin(Utils.toRadians(angle + this.i))

			const x = Math.floor((startX + cos * c) / this.tileSize)
			const y = Math.floor((startY + sin * c) / this.tileSize)

			this.ctxMap.fillStyle = 'red'
			this.ctxMap.fillRect(startX + cos, startY + sin, 1, 1)

			if (this.schema[y][x] !== 0) {
				this.dist = c
				this.endX = startX + cos
				this.endY = startY + sin
				break
			}
		}
	}

	drawMap(x: number, y: number) {
		this.ctxMap.beginPath()
		this.ctxMap.fillStyle = 'red'
		this.ctxMap.moveTo(x, y)
		this.ctxMap.lineTo(this.endX, this.endY)
		this.ctxMap.stroke()
		this.ctxMap.closePath()
	}

	// draw3D() {}
}
