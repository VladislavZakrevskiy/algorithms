import { Colors } from '../../types/Colors'

export class CanvasController {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    defaultColor: string
    accentColor: string
    backgroundColor: string

    constructor(canvas: HTMLCanvasElement, { defaultColor, accentColor, backgroundColor }: Colors) {
        // Canvas
        this.canvas = canvas
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width
        canvas.height = rect.height

        // Ctx
        this.ctx = canvas.getContext('2d')!

        // Colors
        this.defaultColor = defaultColor
        this.accentColor = accentColor
        this.backgroundColor = backgroundColor
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    addRect(x: number, y: number, w: number, h: number, type: 'default' | 'accent' | 'background') {
        this.ctx.beginPath(); 
        this.ctx.fillStyle =
            type === 'default' ? this.defaultColor : type === 'accent' ? this.accentColor : this.backgroundColor
        this.ctx.rect(x, y, w, h)
        this.ctx.fill()
        this.ctx.closePath(); 

    }
}
