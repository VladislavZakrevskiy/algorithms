export class MathOperation {
	static distanceBetweenTwoPoints(x1: number, y1: number, x2: number, y2: number) {
		return Math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2)
	}

	static randomPointBetween(sideSize: number) {
		const randomPoint = Math.floor(Math.random() * sideSize)

		return randomPoint
	}

	// x1 and y1 - bot's x and y
	static getAngleFromPoints(x1: number, y1: number, x2: number, y2: number) {
		x2 -= x1
		y2 -= y1
		x1 = 0
		y1 = 0

		const angle = Math.atan2(y2, x2)
		// const degrees = (180 * angle) / Math.PI
		return angle
	}

	static toRadians(angle: number) {
		return (angle * Math.PI) / 180
	}

	static randomColor() {
		const letters = '0123456789ABCDEF'
		let color = '#'
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)]
		}
		return color
	}

	static randomRange(min: number, max: number) {
		return min - 0.5 + Math.random() * (max - min + 1)
	}
}
