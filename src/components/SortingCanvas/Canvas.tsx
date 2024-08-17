import { FC, useEffect, useRef } from 'react'
import { CanvasController } from './CanvasController'
import { Colors } from '../../types/Colors'
import { SortDrawer } from './SortDrawer'
import { Algorithms, algsList } from '../../types/Algorithms'
interface CanvasProps {
    className: string
    options: CanvasOptions
    isStart: boolean
}

export interface CanvasOptions {
    colors: Colors
    selectionNumber: number
    alg: Algorithms
    fps: number
}

export const Canvas: FC<CanvasProps> = ({
    options: {
        colors = { accentColor: '#ff0000', backgroundColor: '#ffffff', defaultColor: '#00ff00' },
        alg = 'bubbleSort',
        selectionNumber = 100,
        fps = 5,
    },
    className,
    isStart = false,
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        const drawer = new CanvasController(canvasRef.current!, colors)
        const sortDrawer = new SortDrawer(drawer, selectionNumber, algsList[alg].alg)
        let lastTimestamp = 0
        let timer = 0

        const animate = (time: number) => {
            timer = requestAnimationFrame(animate)
            if (time - lastTimestamp < 1000 / fps) return
            sortDrawer.draw()
            lastTimestamp = time
        }

        timer = requestAnimationFrame(animate)

        return () => cancelAnimationFrame(timer)
    }, [colors, alg, selectionNumber, fps, isStart])

    return <canvas className={className} ref={canvasRef} />
}
