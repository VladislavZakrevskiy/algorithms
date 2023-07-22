import { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setCanvas, setContext } from '../store/reducers/canvasSlice'
import { isUndefined } from '../guards/isAppear'
import { innerSolarSystem } from '../Physics/count/system'
import { populateAstroObjects } from '../Physics/animation'
import { SlingshotAstroObject } from '../Physics/paint/SlingshotAstroObject'
import { SpaceshipPaint } from '../Physics/paint/Spaceship'

const Canvas = () => {
	const { canvasHTML, ctx } = useAppSelector((state) => state.canvasSlice)
	const canvasRef = useRef<HTMLCanvasElement>()
	const dispatch = useAppDispatch()
	const width = canvasHTML?.width
	const height = canvasHTML?.height
	populateAstroObjects(innerSolarSystem.masses, ctx!)
	const [slingshot, setSlingshot] = useState<SlingshotAstroObject>()
	const { G, dt, radius, scale, softeningConst, trail } = useAppSelector(
		(state) => state.constSlice
	)
	const [spaceship, setSpaceShip] = useState<SpaceshipPaint>()

	useEffect(() => {
		if (!isUndefined(canvasRef.current)) {
			dispatch(setCanvas(canvasRef.current))
			dispatch(setContext(canvasRef.current.getContext('2d')!))
			setSlingshot(new SlingshotAstroObject(canvasRef.current))
			setSpaceShip(new SpaceshipPaint(canvasRef.current.getContext('2d')))
		}
	}, [])

	useEffect(() => {
        let timer = 0

		if (ctx) {
			const animate = () => {
				innerSolarSystem.updatePosition().updateGravitationalInteraction().updateVectors()
				ctx!.clearRect(0, 0, width!, height!)
				const massesLength = innerSolarSystem.masses.length
				for (let i = 0; i < massesLength; i++) {
					const mass = innerSolarSystem.masses[i]

					const x = width! / 2 + mass.position.x * scale
					const y = height! / 2 + mass.position.y * scale

					mass.object?.draw(x, y)

					ctx!.font = `14px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`
					ctx!.fillText(mass.name, x + 12, y + 4)
					ctx!.fill()

					if (x < radius || x > width! - radius) {
						mass.vector.x = -mass.vector.x
					}
					if (y < radius || y > height! - radius) {
						mass.vector.y = -mass.vector.y
					}
				}

				if (slingshot?.dragging) {
					const middleX = (slingshot.currentMouseX + slingshot.mousePressX) / 2
					const middleY = (slingshot.currentMouseY + slingshot.mousePressY) / 2
					const firstQuaterX = (slingshot.currentMouseX + middleX) / 2
					const firstQuaterY = (slingshot.currentMouseY + middleY) / 2
					const secondQuaterX = (slingshot.mousePressX + middleX) / 2
					const secondQuaterY = (slingshot.mousePressY + middleY) / 2

					ctx.beginPath()
					ctx.arc(slingshot.mousePressX, slingshot.mousePressY, radius, 0, 2 * Math.PI)
					ctx.fillStyle = 'rgba(255,255,255, 0.2)'
					ctx.fill()

					ctx.beginPath()
					ctx.arc(secondQuaterX, secondQuaterY, radius, 0, 2 * Math.PI)
					ctx.fillStyle = 'rgba(255,255,255, 0.4)'
					ctx.fill()

					ctx.beginPath()
					ctx.arc(middleX, middleY, radius, 0, 2 * Math.PI)
					ctx.fillStyle = 'rgba(255,255,255, 0.6)'
					ctx.fill()

					ctx.beginPath()
					ctx.arc(firstQuaterX, firstQuaterY, radius, 0, 2 * Math.PI)
					ctx.fillStyle = 'rgba(255,255,255, 0.8)'
					ctx.fill()

					ctx.beginPath()
					ctx.arc(slingshot.currentMouseX, slingshot.currentMouseY, radius, 0, 2 * Math.PI)
					ctx.fillStyle = 'rgba(255,255,255, 1)'
					ctx.fill()
				}

				spaceship?.draw()

				timer = requestAnimationFrame(animate)
			}
			animate()
		}

        return () => cancelAnimationFrame(timer)
	}, [ctx, slingshot, spaceship])

	return (
		<div style={{ background: '#000' }}>
			<canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />
		</div>
	)
}

export default Canvas
