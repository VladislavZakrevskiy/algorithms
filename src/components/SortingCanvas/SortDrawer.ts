import { ramdomNumber } from '../../lib/helpers/randomNumber'
import { HeapSortState, MergeSortState, QuickSortState, SelectionSortState, ShellSortState } from '../../lib/sortAlgs'
import { Algorithm } from '../../types/Algorithms'
import { CanvasController } from './CanvasController'

export interface SelectionItem {
    id: string
    number: number
}

export class SortDrawer {
    selectionNumbers: SelectionItem[]
    mergeState: MergeSortState = {
        arr: [],
        currSize: 1,
        leftStart: 0,
        sorted: false,
    }
    heapState: HeapSortState = {
        arr: [],
        n: 0,
        i: 0,
        sorted: false,
        phase: 'buildHeap',
    }
    quickState: QuickSortState = {
        arr: [],
        stack: [{ low: 0, high: 0 }],
        sorted: false,
    }
    selectionState: SelectionSortState = {
        arr: [],
        i: 0,
        sorted: false,
    }
    shellState: ShellSortState = {
        arr: [],
        gap: 0,
        i: 0,
        j: 0,
        sorted: false,
    }
    selectionLength: number
    drawer: CanvasController
    alg: Algorithm

    constructor(drawer: CanvasController, selection: number | SelectionItem[], alg: Algorithm) {
        this.drawer = drawer
        this.alg = alg

        if (typeof selection === 'number') {
            const selectionNumbers: SelectionItem[] = []
            for (let i = 0; i < selection; i++) {
                selectionNumbers.push({ id: '', number: ramdomNumber(drawer.canvas.height - 20) })
            }
            this.selectionNumbers = selectionNumbers

            this.mergeState.arr = selectionNumbers

            this.heapState.arr = selectionNumbers
            this.heapState.n = selectionNumbers.length
            this.heapState.i = Math.floor(selectionNumbers.length / 2) - 1

            this.quickState.arr = selectionNumbers
            this.quickState.stack = [{ low: 0, high: this.quickState.arr.length - 1 }]

            this.selectionState.arr = selectionNumbers

            this.shellState = {
                arr: selectionNumbers,
                gap: Math.floor(selectionNumbers.length / 2),
                i: Math.floor(selectionNumbers.length / 2),
                j: Math.floor(selectionNumbers.length / 2),
                sorted: false,
            }

            this.selectionLength = selection
        } else {
            this.selectionNumbers = selection
            this.selectionLength = selection.length
        }
    }

    draw() {
        const rectWidth = this.drawer.canvas.width / this.selectionLength

        const drawDefaultLines = () => {
            this.drawer.addRect(0, 0, this.drawer.canvas.width, this.drawer.canvas.height, 'background')

            for (let i = 0; i < this.selectionNumbers.length; i++) {
                const selectionItem = this.selectionNumbers[i]

                this.drawer.addRect(
                    i * rectWidth,
                    this.drawer.canvas.height - selectionItem.number + 10,
                    rectWidth,
                    selectionItem.number,
                    'default'
                )
            }
        }

        const drawAccentLines = (selectionItem: SelectionItem, i: number) => {
            this.drawer.addRect(
                i * rectWidth,
                this.drawer.canvas.height - selectionItem.number + 10,
                rectWidth,
                selectionItem.number,
                'accent'
            )
        }

        if (this.alg.name === 'shellSort') {
            const shellSort = this.alg(this.shellState, drawDefaultLines, drawAccentLines) as ShellSortState
            this.shellState = shellSort
        } else if (this.alg.name === 'selectionSort') {
            const selectionState = this.alg(
                this.selectionState,
                drawDefaultLines,
                drawAccentLines
            ) as SelectionSortState
            this.selectionState = selectionState
        } else if (this.alg.name === 'quickSort') {
            const quickState = this.alg(this.quickState, drawDefaultLines, drawAccentLines) as QuickSortState
            this.quickState = quickState
        } else if (this.alg.name === 'heapSort') {
            const heapState = this.alg(this.heapState, drawDefaultLines, drawAccentLines) as HeapSortState
            this.heapState = heapState
        } else if (this.alg.name === 'mergeSort') {
            const mergeState = this.alg(this.mergeState, drawDefaultLines, drawAccentLines) as MergeSortState
            this.mergeState = mergeState
        } else {
            const newSelectionNumber = this.alg(this.selectionNumbers, drawDefaultLines, drawAccentLines)
            this.selectionNumbers = newSelectionNumber as SelectionItem[]
        }
    }
}
