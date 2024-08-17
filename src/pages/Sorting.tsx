import styles from './Sorting.module.css'
import { useState } from 'react'
import { CanvasOptions, Canvas } from '../components/SortingCanvas/Canvas'
import { Button, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Algorithms, algsList } from '../types/Algorithms'
import 'highlight.js/styles/atom-one-dark.min.css'
import { Code } from '../components/Code'

export function Sorting() {
    const [options, setOptions] = useState<CanvasOptions>({
        alg: 'bubbleSort',
        colors: { accentColor: '#ff0000', backgroundColor: '#ffffff', defaultColor: '#00ff00' },
        fps: 5,
        selectionNumber: 100,
    })
    const [isStart, setIsStart] = useState<boolean>(false)
    const { desc, difficulty, realization, name } = algsList[options.alg]

    return (
        <div className={styles.app}>
            <div className={styles.tools}>
                <Canvas className={styles.canvas} options={options} isStart={isStart} />

                <div className={styles.options}>
                    <Select
                        label="Алгоритм"
                        value={options.alg}
                        onChange={(e) => setOptions((prev) => ({ ...prev, alg: e.target.value as Algorithms }))}
                    >
                        <MenuItem value={'bubbleSort'}>Bubble sort</MenuItem>
                        <MenuItem value={'cocktailSort'}>Cocktail sort</MenuItem>
                        <MenuItem value={'combSort'}>Comb sort</MenuItem>
                        <MenuItem value={'gnomeSort'}>Gnome sort</MenuItem>
                        <MenuItem value={'heapSort'}>Heap sort</MenuItem>
                        <MenuItem value={'insertionSort'}>Insertion sort</MenuItem>
                        <MenuItem value={'mergeSort'}>Merge sort</MenuItem>
                        <MenuItem value={'quickSort'}>Quick sort</MenuItem>
                        <MenuItem value={'selectionSort'}>Selection sort</MenuItem>
                        <MenuItem value={'shellSort'}>Shell sort</MenuItem>
                    </Select>

                    <TextField
                        label="FPS (5)"
                        value={options.fps || ''}
                        type="number"
                        onChange={(e) => setOptions((prev) => ({ ...prev, fps: Number(e.target.value) }))}
                    />

                    <TextField
                        label="Количество чисел (100)"
                        value={options.selectionNumber || ''}
                        type="number"
                        onChange={(e) => setOptions((prev) => ({ ...prev, selectionNumber: Number(e.target.value) }))}
                    />

                    <div className={styles.colorItems}>
                        <div className={styles.colorItem}>
                            <Typography>Текст неизменяющихся блоков</Typography>
                            <TextField
                                type="color"
                                value={options.colors.defaultColor}
                                onChange={(e) =>
                                    setOptions((prev) => ({
                                        ...prev,
                                        colors: { ...prev.colors, defaultColor: e.target.value },
                                    }))
                                }
                            />
                        </div>

                        <div className={styles.colorItem}>
                            <Typography>Текст изменяющихся блоков</Typography>
                            <TextField
                                type="color"
                                value={options.colors.accentColor}
                                onChange={(e) =>
                                    setOptions((prev) => ({
                                        ...prev,
                                        colors: { ...prev.colors, accentColor: e.target.value },
                                    }))
                                }
                            />
                        </div>

                        <div className={styles.colorItem}>
                            <Typography>Текст фона</Typography>
                            <TextField
                                type="color"
                                value={options.colors.backgroundColor}
                                onChange={(e) =>
                                    setOptions((prev) => ({
                                        ...prev,
                                        colors: { ...prev.colors, backgroundColor: e.target.value },
                                    }))
                                }
                            />
                        </div>
                    </div>

                    <Button onClick={() => setIsStart((prev) => !prev)} size="large" variant="contained">
                        Старт
                    </Button>
                </div>
            </div>
            <div className={styles.desc}>
                <Typography variant="h4">{name}</Typography>
                <div className={styles.info}>
                    <div className={styles.mainInfo}>
                        <div className={styles.difficult}>
                            <Typography variant="h5">По времени: {difficulty.time}</Typography>
                            <Typography variant="h5">По памяти: {difficulty.memory}</Typography>
                        </div>
                        <Typography>{desc}</Typography>
                    </div>
                    <div className={styles.code}>
                        <Code languageLabel="C++" language="cpp">
                            {realization.CPlusPlus}
                        </Code>
                        <Code languageLabel="C#" language="csharp">
                            {realization.CSharp}
                        </Code>
                        <Code languageLabel="JS" language="js">
                            {realization.JS}
                        </Code>
                        <Code languageLabel="Java" language="java">
                            {realization.java}
                        </Code>
                        <Code languageLabel="Python" language="python">
                            {realization.python}
                        </Code>
                    </div>
                </div>
            </div>
        </div>
    )
}
