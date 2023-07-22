import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { InteractionManager } from 'three.interactive'
import {FlyControls} from 'three/addons/controls/FlyControls.js'

const Cullular_automat = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		let timer = 0
		if (canvasRef.current) {
			const FPS = 1 / 10

			class MathOperation {
				static randomColor() {
					const letters = '0123456789ABCDEF'
					let color = '#'
					for (let i = 0; i < 6; i++) {
						color += letters[Math.floor(Math.random() * 16)]
					}
					return color
				}

				static isCloseCube(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number) {
					return Math.abs(x2 - x1) <= 1 && Math.abs(y2 - y1) <= 1 && Math.abs(z2 - z1) <= 1
				}

				static multiDimensionalUnique<T,>(arr: T[]): T[] {
					const uniques: T[] = []
					const itemsFound = {}
					for (let i = 0, l = arr.length; i < l; i++) {
						const stringified = JSON.stringify(arr[i])
						if (itemsFound[stringified]) {
							continue
						}
						uniques.push(arr[i])
						itemsFound[stringified] = true
					}
					return uniques
				}
			}

			class GeometryFabric {
				static createCube({ x, y, z }: {x: number, y: number, z: number}) {
					const geometry = new THREE.BoxGeometry()
					const material = new THREE.MeshLambertMaterial({ color: MathOperation.randomColor() })
					const cube = new THREE.Mesh(geometry, material)
					cube.position.set(x, y, z)

					return cube
				}
			}

			let cubes = [
				GeometryFabric.createCube({
					x: 0,
					y: 0,
					z: 0,
				}),
				GeometryFabric.createCube({
					x: 1,
					y: 0,
					z: 0,
				}),
				GeometryFabric.createCube({
					x: 0,
					y: 1,
					z: 0,
				}),
				GeometryFabric.createCube({
					x: 1,
					y: 1,
					z: 0,
				}),
				GeometryFabric.createCube({
					x: 0,
					y: 0,
					z: 1,
				}),
				GeometryFabric.createCube({
					x: 1,
					y: 0,
					z: 1,
				}),
				GeometryFabric.createCube({
					x: 0,
					y: 1,
					z: 1,
				}),
				GeometryFabric.createCube({
					x: 1,
					y: 1,
					z: 1,
				}),
			]

			class Cube {
				cube: {
                    position: {
                        x: number,
                        y: number,
                        z:number
                    },
                }
				x: number
				y: number
				z: number
				closeCount = 0
				willBirth = false

				constructor(cube: {
                    position: {
                        x: number,
                        y: number,
                        z:number
                    },
                }) {
					this.cube = cube
					this.x = cube.position.x
					this.y = cube.position.y
					this.z = cube.position.z
				}

				countCloseCubes() {
					for (let i = 0; i < cubes.length; i++) {
						const cube = cubes[i]
						const x2 = cube.position.x
						const y2 = cube.position.y
						const z2 = cube.position.z

						if (this.x !== x2 || this.y !== y2 || this.z !== z2) {
							if (MathOperation.isCloseCube(this.x, this.y, this.z, x2, y2, z2)) {
								this.closeCount += 1
							}
						}
					}
				}

				decideBirth(arr: number[]) {
					if (arr.includes(this.closeCount)) {
						this.willBirth = true
					}
				}
			}

			class CellularAutomaton {
                B: number[]
                S: number[]
				cubes: Cube[] = []

				constructor(B: string, S: string) {
					this.B = B.split(' ').map((number) => Number(number))
					this.S = S.split(' ').map((number) => Number(number))
				}

				countAllCubes() {
					for (let i = 0; i < cubes.length; i++) {
						for (let x = -1; x < 2; x++) {
							for (let y = -1; y < 2; y++) {
								for (let z = -1; z < 2; z++) {
									if (cubes[i].position) {
										this.cubes.push(
											new Cube({
												position: {
													x: cubes[i].position.x + x,
													y: cubes[i].position.y + y,
													z: cubes[i].position.z + z,
												},
											})
										)
									}
								}
							}
						}
					}

					this.cubes = MathOperation.multiDimensionalUnique(this.cubes)
				}

				iterationByCubes() {
					for (const cube of this.cubes) {
						cube.countCloseCubes()
						cube.decideBirth(this.B)
						cube.decideBirth(this.S)
					}
				}

				makeNewCubes() {
					for (let i = 0; i < cubes.length; i++) {
						const object = init.scene.getObjectByProperty('uuid', cubes[i].uuid)
						init.scene.remove(object)
					}

					cubes = []
					let count = 0

					console.log(this.cubes)
					for (let cube of this.cubes) {
						if (cube.willBirth) {
							count += 1
							const model = GeometryFabric.createCube({ x: cube.x, y: cube.y, z: cube.z })
							cubes.push(model)
							init.addToScene(model)
						}
					}
				}

				count() {
					this.countAllCubes()
					this.iterationByCubes()
					this.makeNewCubes()

					// console.log(cubes, this.cubes)
					this.cubes = []
				}
			}

			class Engine {
                renderer
                scene
                light
                camera
                controls
                interactionManager

				constructor() {
					this.renderer = this.createRenderer()
					this.scene = this.createScene()
					this.light = this.createLight()
					this.camera = this.createCamera()
					this.controls = this.createControl()

					this.interactionManager = new InteractionManager(
						this.renderer,
						this.camera,
						this.renderer.domElement
					)

					this.scene.add(this.light)
				}

				createControl() {
					const controls = new FlyControls(this.camera, this.renderer.domElement) 
					controls.dragToLook = true
					controls.movementSpeed = 3
					controls.rollSpeed = Math.PI / 2
					controls.autoForward = false
					return controls
				}

				createRenderer() {
					const renderer = new THREE.WebGLRenderer({ antialias: true })
					renderer.setSize(window.innerWidth, window.innerHeight)
					document.body.appendChild(renderer.domElement)
					return renderer
				}

				createScene() {
					const scene = new THREE.Scene()
					scene.background = new THREE.Color(0xffffff)
					return scene
				}

				createCamera() {
					const camera = new THREE.PerspectiveCamera(
						75,
						window.innerWidth / window.innerHeight,
						0.1,
						1000
					)
					camera.position.z = 5
					return camera
				}

				createLight() {
					const light = new THREE.PointLight(0xffffff, 1, 1000)
					light.position.set(0, 0, 10)
					return light
				}

				addToScene(object: THREE.Object3D) {
					this.scene.add(object)
				}

				addToManager(object: THREE.Object3D) {
					this.interactionManager.add(object)
				}

				animate() {
					let lt = new Date()
					let lastTimestamp = 0
					const game = new CellularAutomaton('1 2 3 4 5', '6 7 8 9 10 11')

					const loop = (time: number) => {
						const now = new Date(),
							secs = (+now - +lt) / 1000
						lt = now

						requestAnimationFrame(loop)

						this.renderer.render(this.scene, this.camera)
						this.interactionManager.update()
						this.controls.update(secs)

						if (time - lastTimestamp < 1000 / FPS) return

						game.count()

						lastTimestamp = time
					}
					timer = requestAnimationFrame(loop)
				}
			}

			const init = new Engine()

			for (const object of cubes) {
				init.addToManager(object)
				init.addToScene(object)
			}

			init.animate()
		}

		return () => cancelAnimationFrame(timer)
	}, [canvasRef])

	return <canvas ref={canvasRef} />
}

export default Cullular_automat
