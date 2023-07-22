import { useRef, useEffect } from 'react'
import { MathOperation } from '../MathOperation'

interface IRoyBar {
    width: number
    height: number
}

const RoyBar = ({width, height}: IRoyBar) => {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const points: Point[] = []

    class Point {
        ctx: CanvasRenderingContext2D

        x: number
        y: number
    
        vector = { x: 0, y: 0 }
    
        angle = 2 * Math.PI * Math.random()
        speed = 5
    
        width: number
        height: number
    
        constructor(width: number, height: number, ctx: CanvasRenderingContext2D) {
            this.x = width * Math.random()
            this.y = height * Math.random()
    
            this.vector.x = this.x + this.speed * Math.cos(this.angle)
            this.vector.y = this.y + this.speed * Math.sin(this.angle)
    
            this.width = width
            this.height = height

            this.ctx = ctx
        }
    
        move() {
            const angle = MathOperation.getAngleFromPoints(this.x, this.y, this.vector.x, this.vector.y)
            const cos = Math.cos(angle)
            const sin = Math.sin(angle)

            const random = Math.random()
    
            this.x += cos * 0.5 + (random < 0.5 ? .1 : -.1)
            this.y += sin * 0.5 + (random < 0.5 ? .1 : -.1)
            this.vector.x += cos * 0.5 + (random < 0.5 ? .1 : -.1)
            this.vector.y += sin * 0.5 + (random < 0.5 ? .1 : -.1)
    
            if (MathOperation.distanceBetweenTwoPoints(this.x, this.y, this.vector.x, this.vector.y) > 50) {
                this.vector.x -= 5
                this.vector.y -= 5
            }
    
            if (this.x >= this.width || this.x <= 0) {
                this.vector.x = -this.vector.x
            }
            if (this.y >= this.height || this.y <= 0) {
                this.vector.y = -this.vector.y
            }

            this.ctx.beginPath()
            this.ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI)
            this.ctx.fillStyle = '#3f51b5'
            this.ctx.fill()
        }
    
        paintClosestPoints () {
            for (const point of points) {
                if (MathOperation.distanceBetweenTwoPoints(this.x, this.y, point.x, point.y) <= 30) {
                    this.ctx.beginPath()
                    this.ctx.moveTo(this.x, this.y)
                    this.ctx.lineTo(point.x, point.y)
                    this.ctx.strokeStyle = '#757de8'
                    this.ctx.stroke()
                }
            }
        }
    }

	useEffect(() => {
        let timer = 0
		if (canvasRef.current && points) {
			const canvas = canvasRef.current
			const ctx = canvas.getContext('2d')!

            canvas.width = width
            canvas.height = height

            canvas.onmousemove = (ev) => {
                const rect = canvas.getBoundingClientRect()
                const mouseX = ev.clientX - rect.left
                const mouseY = ev.clientY - rect.top

                ctx.beginPath()
                ctx.fillStyle = '#757de8'
                ctx.arc(mouseX, mouseY, 10, 0, 2 * Math.PI)
                ctx.fill()

                for (const point of points) {
                    if (MathOperation.distanceBetweenTwoPoints(mouseX, mouseY, point.x, point.y) <= 49) {
                        point.vector = {x: mouseX, y: mouseY}
                    }
                }
            }

			for (let i = 0; i < 100; i++) {
				points.push(new Point(canvas.width, canvas.height, ctx))
			}

			const animate = () => {
				ctx.clearRect(0, 0, canvas.width, canvas.height)

				for (const point of points) {
					point.move()
					point.paintClosestPoints()
				}

				timer = requestAnimationFrame(animate)
			}
			animate()
		}

        return () => cancelAnimationFrame(timer)
	}, [canvasRef])

	return <canvas ref={canvasRef} />
}

export default RoyBar
