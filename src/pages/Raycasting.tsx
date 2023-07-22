import { useRef, useEffect } from 'react'
import { Camera } from '../RayCasting/Camera'
import { Box, Typography } from '@mui/material'

const Raycasting = () => {
	const gameRef = useRef<HTMLCanvasElement | null>(null)
	const mapRef = useRef<HTMLCanvasElement | null>(null)

	useEffect(() => {
		let timer = 0
		if (gameRef.current && mapRef.current) {
			const gameCanvas = gameRef.current
			gameCanvas.width = window.innerWidth - 350
			gameCanvas.height = window.innerHeight
			const mapCanvas = mapRef.current
			const gameCtx = gameCanvas.getContext('2d')
			const mapCtx = mapCanvas.getContext('2d')
			const camera = new Camera(gameCanvas, mapCanvas)

			mapCanvas.addEventListener('click', (ev) => {
				const rect = mapCanvas.getBoundingClientRect()
				camera.map.changeMap(ev.clientX - rect.left, ev.clientY - rect.top)
			})

			const animate = () => {
				gameCtx?.clearRect(0, 0, gameCanvas.width, gameCanvas.height)
				mapCtx?.clearRect(0, 0, mapCanvas.width, mapCanvas.height)

				gameCtx!.fillStyle = 'rgba(17, 51, 119, 0.7)'
				gameCtx?.fillRect(0, 0, gameCanvas.width, gameCanvas.height / 2)
				gameCtx!.fillStyle = 'rgba(0,0,0, 0.8)'
				gameCtx?.fillRect(0, gameCanvas.height / 2, gameCanvas.width, gameCanvas.height / 2)

				camera.move()

				timer = requestAnimationFrame(animate)
			}
			camera.start()
			animate()

			return () => cancelAnimationFrame(timer)
		}
	}, [mapRef, gameRef])

	return (
		<Box sx={{ display: 'flex', gap: 1, justifyContent: 'center'  }}>
			<Box>
				<canvas
					ref={gameRef}
					// style={{ width: 700, height: 700 }}
					width={700}
					height={700}
				/>
			</Box>
			<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
				<canvas
					ref={mapRef}
					style={{ width: 350, height: 350 }}
					width={350}
					height={350}
				/>
				<Typography>To change map click to minimap</Typography>
			</Box>
		</Box>
	)
}

export default Raycasting
