export class Utils {
	static toRadians(angle: number) {
		return angle * Math.PI / 180;
	}

	static normalizeAngle(angle: number) {
		if (angle > 360) return angle % 360;
		else if (angle < 0) return 360 + angle;

		return angle;
	}

	static distanceBetweenDots(x1: number, y1: number, x2: number, y2: number) {
		return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
	}
}
