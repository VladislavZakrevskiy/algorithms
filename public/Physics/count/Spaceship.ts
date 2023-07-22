export class SpaceshipCount {
    startX = -4.614285714285714
    startY = 2.907142857142857
    angle = 0

    constructor () {
        this.listen()
    }

    listen () {
        window.onkeydown = this.onKeyDown.bind(this)
    }

    onKeyDown (e: KeyboardEvent) {
        if (e.code == 'KeyS') {
            this.startY += 1
            if(this.angle > 270) this.angle -= 10
            if(this.angle < 270) this.angle += 1
        }
        if (e.code == 'KeyA') {
            this.startX -= 1
            if(this.angle > 180) this.angle -= 10
            if(this.angle < 180) this.angle += 10
        }
        if (e.code == 'KeyW') {
            this.startY -= 1
            if(this.angle > 90) this.angle -= 10
            if(this.angle < 90) this.angle += 10
        }
        if (e.code == 'KeyW' && e.code == 'KeyA') {
            this.startX += 1
            // if(this.angle > 0) this.angle -= 10
            // if(this.angle < 0) this.angle += 10
        }
        if (e.code == 'KeyW') {
            this.startX += 1
            // if(this.angle > 0) this.angle -= 10
            // if(this.angle < 0) this.angle += 10
        }
        if (e.code == 'KeyS') {
            this.startX += 1
            // if(this.angle > 0) this.angle -= 10
            // if(this.angle < 0) this.angle += 10
        }
        if (e.code == 'KeyS') {
            this.startX += 1
            // if(this.angle > 0) this.angle -= 10
            // if(this.angle < 0) this.angle += 10
        }
    }
}