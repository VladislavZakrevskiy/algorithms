import { useRef, useEffect } from 'react'
import { MathOperation } from '../MathOperation'

const Roy_algorithm = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		let timer = 0
		if (canvasRef.current) {
			const canvas = canvasRef.current
			const ctx = canvas.getContext('2d')!
			const width = (canvas.width = window.innerWidth)
			const height = (canvas.height = window.innerHeight)
			const FPS = 20000000
			// const resourceNumber = 4
			const botsNumber = 800
			const view = 150
			const isLine = false

			class Bot {
				counters = {}
				x: number
				y: number
				angle: number
				speed: number
				viewBots: Bot[] = []
				goTo = 0
				burst: number

				constructor() {
					this.x = MathOperation.randomPointBetween(width)
					this.y = MathOperation.randomPointBetween(height)
					for (const resource of resources) {
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						//@ts-ignore
						this.counters[resource.name] = 0
					}
					this.goTo = Math.round(MathOperation.randomRange(0, resources.length - 1))
					this.speed = MathOperation.randomRange(0, 2)
					this.angle = Math.random() * 360
					this.burst = Math.random() > 0.5 ? 5 : -5
				}

				move() {
					const radians = MathOperation.toRadians(this.angle + this.burst)
					const cos = Math.cos(radians)
					const sin = Math.sin(radians)

					const x = this.x + cos * this.speed
					const y = this.y + sin * this.speed

					// const distance = MathOperation.distanceBetweenTwoPoints(this.x, this.y, x, y)
					const counters = Object.entries(this.counters)

					for (const [key] of counters) {
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						//@ts-ignore
						this.counters[key] += 1
					}

					if (x >= width || x <= 0) {
						// right
						this.x += Math.cos(Math.PI - radians) * this.speed
						this.y += Math.sin(Math.PI - radians) * this.speed
						this.angle = 180 - this.angle
					} else {
						this.x = x
					}
					if (y >= height || y <= 0) {
						// bottom
						this.x += Math.cos(2 * Math.PI - radians) * this.speed
						this.y += Math.sin(2 * Math.PI - radians) * this.speed
						this.angle = 360 - this.angle
					} else {
						this.y = y
					}
				}

				checkGoals() {
					for (const resource of resources) {
						if (
							resource.x - 20 <= this.x &&
							this.x <= resource.x + 20 &&
							this.y <= resource.y + 20 &&
							this.y >= resource.y - 20
						) {
							this.angle += 180
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							//@ts-ignore
							this.counters[resource.name] = 0

							if (resource.name === resources[this.goTo].name) {
								this.goTo = (this.goTo + 1) % resources.length
							}
						}
					}
				}

				checkView() {
					for (const bot of bots) {
						if (this.x !== bot.x && this.y !== bot.y) {
							if (MathOperation.distanceBetweenTwoPoints(this.x, this.y, bot.x, bot.y) <= view) {
								// if (bot.goTo === this.goTo) {
								this.viewBots.push(bot)
								// }
							}
						}
					}

					const line = () => {
						for (const bot of this.viewBots) {
							const name = resources[this.goTo].name
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							//@ts-ignore
							if (this.counters[name] >= +bot.counters[name] + 50) {
								if (isLine) {
									ctx.beginPath()
									ctx.moveTo(this.x, this.y)
									ctx.lineTo(bot.x, bot.y)
									ctx.strokeStyle = resources[this.goTo].color
									ctx.stroke()
								}
								this.counters[name] = +bot.counters[name] + 50
								const degrees = MathOperation.getAngleFromPoints(this.x, this.y, bot.x, bot.y)
								this.angle = (degrees * 180) / Math.PI
							}
						}
					}

					this.viewBots.length !== 0 ? line() : null
				}

				count() {
					// this.move()
					this.checkGoals()
					this.checkView()

					this.viewBots = []
				}
			}

			class Resource {
				x: number
				y: number
				name: string
				color: string
				vector: { x: number; y: number }

				constructor(x: number, y: number, name: string) {
					this.x = x
					this.y = height - y
					this.name = name
					this.color = MathOperation.randomColor()
					this.vector = {
						x: x + Math.cos(Math.random() * 2) * 50,
						y: height - y + Math.sin(Math.random() * 2) * 50,
					}
				}

				go() {
					const angle = MathOperation.getAngleFromPoints(
						this.x,
						this.y,
						this.vector.x,
						this.vector.y
					)
					const cos = Math.cos(angle)
					const sin = Math.sin(angle)

					this.x += cos * 0.5
					this.y += sin * 0.5
					this.vector.x += cos * 0.5
					this.vector.y += sin * 0.5

					if (
						MathOperation.distanceBetweenTwoPoints(this.x, this.y, this.vector.x, this.vector.y) >
						50
					) {
						this.vector.x -= 5
						this.vector.y -= 5
					}

					if (this.x >= width || this.x <= 0) {
						this.vector.x = -this.vector.x
					}
					if (this.y >= height || this.y <= 0) {
						this.vector.y = -this.vector.y
					}
				}
			}

			const resources: Resource[] = [
				new Resource(width / 5, height / 2, 'A'),
				new Resource((4 * width) / 5, height / 2, 'B'),
			]
			const bots: Bot[] = []
			for (let i = 0; i < botsNumber; i++) {
				bots.push(new Bot())
			}

			class Drawer {
				canvas: HTMLCanvasElement
				ctx: CanvasRenderingContext2D

				constructor(canvas: HTMLCanvasElement) {
					this.canvas = canvas
					this.ctx = canvas.getContext('2d')!
				}

				clearCanvas() {
					this.ctx.clearRect(0, 0, width, height)
				}

				drawBg() {
					this.ctx.beginPath()
					this.ctx.fillStyle = '#000'
					this.ctx.fillRect(0, 0, width, height)
					this.ctx.closePath()
				}

				drawResouces() {
					for (const resource of resources) {
						// resource.go()
						this.ctx.beginPath()
						this.ctx.arc(resource.x, resource.y, 20, 0, Math.PI * 2)
						// this.ctx.arc(resource.vector.x, resource.vector.y, 5, 0, Math.PI * 2)
						this.ctx.fillStyle = resource.color
						this.ctx.strokeStyle = resource.color
						this.ctx.fill()
						this.ctx.closePath()

						this.ctx.beginPath()
						this.ctx.fillStyle = '#000'
						this.ctx.font = '700 17px Arial'
						this.ctx.fillText(resource.name, resource.x - 5, resource.y + 5)
					}
				}

				drawBots() {
					for (const bot of bots) {
						bot.move()
					}

					for (const bot of bots) {
						bot.count()
						this.ctx.beginPath()
						this.ctx.arc(bot.x, bot.y, 2, 0, Math.PI * 2)
						this.ctx.fillStyle = resources[bot.goTo].color
						this.ctx.fill()
						this.ctx.closePath()

						// this.ctx.beginPath()
						// this.ctx.arc(bot.x, bot.y, 50, 0, Math.PI * 2)
						// this.ctx.fillStyle = 'rgba(255,255,255,0.1)'
						// this.ctx.fill()
						// this.ctx.closePath()
					}
				}

				drawGradient() {
					for (const bot of bots) {
						bot.move()
					}

					for (const bot of bots) {
						bot.count()
						this.ctx.beginPath()
						this.ctx.arc(bot.x, bot.y, 2, 0, Math.PI * 2)
						this.ctx.fillStyle = 'rgba(0,0,0,1)'
						this.ctx.fill()
						this.ctx.closePath()
					}
				}
			}

			class Game {
				render: Drawer

				constructor() {
					this.render = new Drawer(canvas)
				}

				animate() {
					let lastTimestamp = 0

					const loop = (time: number) => {
						requestAnimationFrame(loop)

						if (time - lastTimestamp < 1000 / FPS) return

						this.render.drawBg()
						this.render.clearCanvas()
						this.render.drawResouces()
						this.render.drawBots()

						lastTimestamp = time
					}
					timer = requestAnimationFrame(loop)
				}
			}

			const game = new Game()
			game.animate()
		}

		return () => cancelAnimationFrame(timer)
	}, [canvasRef])

	return <canvas ref={canvasRef} />
}

export default Roy_algorithm
