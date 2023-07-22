import { Map } from './Map'
import { Ray } from './Ray'
import { Utils } from './Utils'

export class Camera {
	x = 40
	y = 40
	angle = 0
	angleSpeed = 4

	up = false
	down = false
	left = false
	right = false
	tileSize = 0

	map: Map
	schema: number[][]
	rays: Ray[] = []

	canvasGame: HTMLCanvasElement
	ctxGame: CanvasRenderingContext2D
	canvasMap: HTMLCanvasElement
	ctxMap: CanvasRenderingContext2D

	constructor(canvasGame: HTMLCanvasElement, canvasMap: HTMLCanvasElement) {
		this.canvasGame = canvasGame
		this.canvasMap = canvasMap
		this.ctxGame = canvasGame.getContext('2d')!
		this.ctxMap = canvasMap.getContext('2d')!
		this.map = new Map(canvasMap)
		this.schema = this.map.schema
		this.tileSize = this.canvasMap.width / this.schema.length
		this.listen()
	}

	listen() {
		window.onkeydown = this.onKeyDown.bind(this)
		window.onkeyup = this.onKeyUp.bind(this)
	}

	onKeyDown(e: KeyboardEvent) {
		switch (e.code) {
			case 'KeyW':
				this.up = true
				break
			case 'KeyS':
				this.down = true
				break
			case 'KeyD':
				this.right = true
				break
			case 'KeyA':
				this.left = true
				break
		}
	}

	onKeyUp(e: KeyboardEvent) {
		switch (e.code) {
			case 'KeyW':
				this.up = false
				break
			case 'KeyS':
				this.down = false
				break
			case 'KeyD':
				this.right = false
				break
			case 'KeyA':
				this.left = false
				break
		}
	}

	start() {
		for (let i = 0; i <= this.canvasGame.width; i++) {
			this.rays.push(new Ray(i * 0.085, this.map, this.canvasMap, this.canvasGame))
		}
	}

	move() {
		this.map.drawMap()
		const cos = Math.cos(Utils.toRadians(this.angle + 30))
		const sin = Math.sin(Utils.toRadians(this.angle + 30))
		if (this.up) {
			const x = Math.floor((this.x + cos) / this.tileSize)
			const y = Math.floor((this.y + sin) / this.tileSize)

			if (this.schema[y][x] == 0) {
				this.x += cos
				this.y += sin
			}
		} else if (this.down) {
			const x = Math.floor((this.x - cos * 2) / this.tileSize)
			const y = Math.floor((this.y - sin * 2) / this.tileSize)
			if (this.schema[y][x] == 0) {
				this.x -= cos
				this.y -= sin
			}
		}

		if (this.left) {
			this.angle -= this.angleSpeed
		} else if (this.right) {
			this.angle += this.angleSpeed
		}
		this.angle = Utils.normalizeAngle(this.angle)

		this.ctxMap.beginPath()
		this.ctxMap.fillStyle = 'green'
		this.ctxMap.arc(this.x, this.y, 3, 0, 2 * Math.PI)
		this.ctxMap.fill()
		this.ctxMap.closePath()

		this.ctxMap.beginPath()
		this.ctxMap.strokeStyle = 'red'
		this.ctxMap.moveTo(this.x, this.y)
		this.ctxMap.lineTo(this.x + cos * 17, this.y + sin * 17)
		this.ctxMap.stroke()
		this.ctxMap.closePath()

		for (let i = 0; i < this.canvasGame.width; i++) {
			for (let c = 0; c < 450; c++) {
				const cos = Math.cos(Utils.toRadians(this.angle + i * 0.085))
				const sin = Math.sin(Utils.toRadians(this.angle + i * 0.085))
				const x = Math.floor(this.x + cos * c)
				const y = Math.floor(this.y + sin * c)

				if (this.schema[Math.floor(y / this.tileSize)][Math.floor(x / this.tileSize)] !== 0) {
					this.ctxMap.fillStyle = 'red'
					this.ctxMap.imageSmoothingEnabled = true
					this.ctxGame.fillStyle = `rgba(255,255,255, ${0.6 - c / 450})`

					// this.ctxGame.drawImage(
					// 	image,
					// 	(x - Math.ceil(x)) * 700,
					// 	0,
					// 	1,
					// 	1000,
					// 	i,
					// 	this.canvasGame.height / 2,
					// 	1,
					// 	this.canvasGame.height * (1 / c) * 25
					// );
					// this.ctxGame.drawImage(
					// 	image,
					// 	i,
					// 	this.canvasGame.height / 2 - (this.canvasGame.height * (1 / c)) / 2,
					// 	1,
					// 	this.canvasGame.height * (1 / c) * 25
					// );

					this.ctxGame.fillRect(
						i,
						this.canvasGame.height / 2,
						1,
						this.canvasGame.height * (1 / c) * 25
					)
					this.ctxGame.fillRect(
						i,
						this.canvasGame.height / 2 - (this.canvasGame.height * (1 / c)) / 2,
						1,
						this.canvasGame.height * (1 / c) * 25
					)
					break
				}
			}
		}
	}

	wallDist(height: number, angle: number, distance: number) {
		const z = distance * Math.cos(angle)
		const wallHeight = (this.canvasGame.height * height) / z
		const bottom = (this.canvasGame.height / 2) * (1 + 1 / z)
		return {
			top: bottom - wallHeight,
			height: wallHeight,
		}
	}
}
