import { Box, Button } from '@mui/material'
import { useRef, useEffect } from 'react'

const Ant_alg = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const clearRef = useRef<HTMLButtonElement>(null)
    const startRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        if (canvasRef.current && clearRef.current && startRef.current) {
            const canvas = canvasRef.current

            canvas.width = window.innerWidth - 100
            canvas.height = window.innerHeight - 100

            const ctx = canvas.getContext('2d')!

            const vertexes: number[][] = []
            // const size = 600
            //let lengthOfChromosome; // without start vertex in the end
            const numberOfGenerations = 100000
            const alpha = 1
            const beta = 1
            let pheromones: number[][]
            let distance
            const desires = []
            const Q = 200
            const evaporation = 0.64

            // ctx.moveTo(0, 0) // border for canvas
            // ctx.lineTo(size, 0)
            // ctx.moveTo(size, 0)
            // ctx.lineTo(size, size)
            // ctx.moveTo(0, 0)
            // ctx.lineTo(0, size)
            // ctx.moveTo(0, size)
            // ctx.lineTo(size, size)
            // ctx.stroke()

            const clearFunc = () => {
                location.reload()
            }

            const mouseClick = (e: MouseEvent) => {
                const clientX = e.pageX - e.target.offsetLeft
                const clientY = e.pageY - e.target.offsetTop

                ctx.beginPath()
                if (vertexes.length >= 1) {
                    for (const vert of vertexes) {
                        const vertX = vert[0]
                        const vertY = vert[1]

                        const vector = [clientX - vertX, clientY - vertY]
                        const s = Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1])
                        ctx.moveTo(vertX + (vector[0] * 10) / s, vertY + (vector[1] * 10) / s)

                        ctx.lineTo(clientX, clientY)
                        ctx.strokeStyle = 'rgba(243,243,243,0.34)'
                        ctx.stroke()
                    }
                }

                ctx.beginPath()
                ctx.arc(clientX, clientY, 10, 0, 2 * Math.PI, false)
                ctx.fillStyle = '#a8a1a1'
                ctx.fill()

                vertexes.push([clientX, clientY])
                redrawVertexes()
            }

            const redrawVertexes = () => {
                for (let i = 0; i < vertexes.length; ++i) {
                    ctx.beginPath()
                    ctx.arc(vertexes[i][0], vertexes[i][1], 10, 0, 2 * Math.PI, false)
                    ctx.fillStyle = '#000'
                    ctx.fill()
                }
            }

            const drawTheLines = (from: number[][], to: number[][]) => {
                const a = from.slice()
                a.push(a[0].slice())

                for (let i = 0; i < a.length - 1; ++i) {
                    ctx.beginPath()
                    const vector = [a[i + 1][0] - a[i][0], a[i + 1][1] - a[i][1]]
                    const s = Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1])

                    ctx.moveTo(a[i][0] + (vector[0] * 10) / s, a[i][1] + (vector[1] * 10) / s)
                    ctx.lineTo(a[i + 1][0] - (vector[0] * 10) / s, a[i + 1][1] - (vector[1] * 10) / s)
                    ctx.strokeStyle = 'rgb(255,255,255)'
                    ctx.lineWidth = 2
                    ctx.stroke()

                    ctx.moveTo(a[i][0] + (vector[0] * 10) / s, a[i][1] + (vector[1] * 10) / s)
                    ctx.lineTo(a[i + 1][0] - (vector[0] * 10) / s, a[i + 1][1] - (vector[1] * 10) / s)
                    ctx.strokeStyle = 'rgba(243,243,243,0.34)'
                    ctx.lineWidth = 1
                    ctx.stroke()
                }

                const b = to.slice()
                b.push(b[0].slice())

                for (let i = 0; i < b.length - 1; ++i) {
                    ctx.beginPath()
                    const vector = [b[i + 1][0] - b[i][0], b[i + 1][1] - b[i][1]]
                    const s = Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1])
                    ctx.moveTo(b[i][0] + (vector[0] * 10) / s, b[i][1] + (vector[1] * 10) / s)
                    ctx.lineTo(b[i + 1][0] - (vector[0] * 10) / s, b[i + 1][1] - (vector[1] * 10) / s)
                    ctx.strokeStyle = 'rgb(250,142,142)'
                    ctx.lineWidth = 1
                    ctx.stroke()
                }
            }

            const drawFinishPath = (bestPath: number[][], color: string) => {
                console.log(bestPath)
                bestPath.push(bestPath[0].slice())
                for (let i = 0; i < bestPath.length - 1; ++i) {
                    ctx.beginPath()
                    const vector = [bestPath[i + 1][0] - bestPath[i][0], bestPath[i + 1][1] - bestPath[i][1]]
                    const s = Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1])

                    ctx.moveTo(bestPath[i][0] + (vector[0] * 10) / s, bestPath[i][1] + (vector[1] * 10) / s)
                    ctx.lineTo(bestPath[i + 1][0] - (vector[0] * 10) / s, bestPath[i + 1][1] - (vector[1] * 10) / s)
                    ctx.strokeStyle = 'rgb(255,255,255)'
                    ctx.lineWidth = 2
                    ctx.stroke()

                    ctx.moveTo(bestPath[i][0] + (vector[0] * 10) / s, bestPath[i][1] + (vector[1] * 10) / s)
                    ctx.lineTo(bestPath[i + 1][0] - (vector[0] * 10) / s, bestPath[i + 1][1] - (vector[1] * 10) / s)
                    ctx.strokeStyle = color
                    ctx.lineWidth = 1
                    ctx.stroke()
                }
            }

            const wait = (time: number) => {
                return new Promise((resolve) => setTimeout(resolve, time))
            }

            const distanceBetweenTwoPoints = (first: number[], second: number[]) => {
                return Math.sqrt(Math.pow(first[0] - second[0], 2) + Math.pow(first[1] - second[1], 2))
            }

            const allDistanceForPath = (path_idx: number[]) => {
                let dist = 0
                for (let i = 0; i < path_idx.length - 1; ++i) {
                    dist += distanceBetweenTwoPoints(vertexes[path_idx[i]].slice(), vertexes[path_idx[i + 1]].slice())
                }
                dist += distanceBetweenTwoPoints(
                    vertexes[path_idx[path_idx.length - 1]].slice(),
                    vertexes[path_idx[0]].slice()
                )
                return dist
            }

            const addToPopulation = (allWays: number[][], path: number[]) => {
                if (!allWays.length) {
                    allWays.push(path.slice())
                } else {
                    let added = false
                    for (let i = 0; i < allWays.length; ++i) {
                        if (path[path.length - 1] < allWays[i][allWays[i].length - 1]) {
                            allWays.splice(i, 0, path)
                            added = true
                            break
                        }
                    }
                    if (!added) {
                        allWays.push(path.slice())
                    }
                }
            }

            const antAlgorithm = async () => {
                const vertexesLength = vertexes.length
                let bestAnt: [number[][], number[], number][] = [] // [[vertexes], [idx_vertexes], length of path]

                const b = vertexes.slice(0)

                const qwe: number[] = []
                for (let i = 0; i < vertexes.length; ++i) {
                    qwe.push(i)
                }

                bestAnt.push(b, qwe, allDistanceForPath(qwe))

                pheromones = []
                distance = []

                for (let i = 0; i < vertexesLength; ++i) {
                    pheromones[i] = new Array(vertexesLength) as number[]
                    distance[i] = new Array(vertexesLength)
                }

                for (let i = 0; i < vertexes.length - 1; ++i) {
                    for (let j = i + 1; j < vertexes.length; ++j) {
                        distance[i][j] = Q / distanceBetweenTwoPoints(vertexes[i].slice(), vertexes[j].slice())
                        pheromones[i][j] = 0.2
                    }
                }

                let end = vertexesLength * 2

                for (let generation = 0; generation < numberOfGenerations; ++generation) {
                    if (end === 0) {
                        drawFinishPath(bestAnt[0], 'rgb(142,250,142)')
                        break
                    }

                    const ways: number[] = []
                    let path: number[][] = []
                    let path_idx: number[] = []

                    for (let ant = 0; ant < vertexes.length; ++ant) {
                        path = []
                        path_idx = []

                        let startVertex_idx = ant
                        let startVertex = vertexes[startVertex_idx].slice()

                        path.push(startVertex)
                        path_idx.push(startVertex_idx)

                        while (path.length !== vertexes.length) {
                            let sumOfDesires = 0

                            let p = []
                            for (let j = 0; j < vertexes.length; ++j) {
                                if (path_idx.indexOf(j) !== -1) {
                                    continue
                                }
                                const min = Math.min(startVertex_idx, j)
                                const max = Math.max(startVertex_idx, j)
                                const desire =
                                    Math.pow(pheromones[min][max], alpha) * Math.pow(distance[min][max], beta)
                                p.push([j, desire])
                                sumOfDesires += desire
                            }

                            for (let i = 0; i < p.length; ++i) {
                                p[i][1] /= sumOfDesires
                            }

                            for (let j = 1; j < p.length; ++j) {
                                p[j][1] += p[j - 1][1]
                            }

                            const rand = Math.random()
                            let choice
                            for (let i = 0; i < p.length; ++i) {
                                if (rand < p[i][1]) {
                                    choice = p[i][0]
                                    break
                                }
                            }
                            startVertex_idx = choice

                            startVertex = vertexes[startVertex_idx].slice()
                            path.push(startVertex.slice())
                            path_idx.push(startVertex_idx)
                        }
                        ways.push([path.slice(), path_idx.slice(), allDistanceForPath(path_idx)])
                    }

                    ways.sort(function (a, b) {
                        return a[2] - b[2]
                    })

                    for (let i = 0; i < vertexesLength - 1; ++i) {
                        for (let j = i + 1; j < vertexesLength; ++j) {
                            pheromones[i][j] *= evaporation
                        }
                    }

                    for (let i = 0; i < ways.length; ++i) {
                        const idx_path = ways[i][1].slice()
                        const lenOfPath = ways[i][2]
                        for (let j = 0; j < vertexesLength - 1; ++j) {
                            const min = Math.min(idx_path[j], idx_path[j + 1])
                            const max = Math.max(idx_path[j], idx_path[j + 1])
                            pheromones[min][max] += Q / lenOfPath
                        }
                    }

                    const newBestAnt = ways[0].slice()

                    if (newBestAnt[2] < bestAnt[2]) {
                        drawTheLines(bestAnt[0], newBestAnt[0])
                        bestAnt = newBestAnt.slice()
                        redrawVertexes()
                        end = vertexesLength * 2
                    }

                    end -= 1
                    console.log(generation)
                    await wait(1)
                }
            }

            canvas.addEventListener('click', mouseClick)
            clearRef.current.onclick = clearFunc
            startRef.current.onclick = antAlgorithm
        }
    }, [canvasRef, clearRef, startRef])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box>
                <Button ref={clearRef}>Clear</Button>
                <Button ref={startRef}>Start</Button>
            </Box>
            <canvas style={{ border: '1px solid rgba(0,0,0,0.5)', margin: 50 }} ref={canvasRef} />
        </Box>
    )
}

export default Ant_alg
