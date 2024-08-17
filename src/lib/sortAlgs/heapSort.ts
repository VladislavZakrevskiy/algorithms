import { SelectionItem } from '../../components/SortingCanvas/SortDrawer'

export interface HeapSortState {
    arr: SelectionItem[]
    n: number
    i: number
    sorted: boolean
    phase: 'buildHeap' | 'sort'
}

export function heapSort(
    state: HeapSortState,
    drawDefaultLines: () => void,
    drawAccentLines: (arrItem: SelectionItem, i: number) => void
): HeapSortState {
    const { arr, n, i, phase } = state

    if (state.sorted) return state

    if (phase === 'buildHeap') {
        if (i >= 0) {
            heapify(arr, n, i, drawDefaultLines, drawAccentLines)
            state.i--
        } else {
            state.phase = 'sort'
            state.i = n - 1
        }
    } else if (phase === 'sort') {
        if (i > 0) {
            [arr[0], arr[i]] = [arr[i], arr[0]] // Swap
            heapify(arr, i, 0, drawDefaultLines, drawAccentLines)
            state.i--
        } else {
            state.sorted = true
        }
    }

    return state
}

function heapify(
    arr: SelectionItem[],
    n: number,
    i: number,
    drawDefaultLines: () => void,
    drawAccentLines: (arrItem: SelectionItem, i: number) => void
): void {
    let largest = i
    const left = 2 * i + 1
    const right = 2 * i + 2

    if (left < n && arr[left].number > arr[largest].number) {
        largest = left
    }

    if (right < n && arr[right].number > arr[largest].number) {
        largest = right
    }

    if (largest !== i) {
        drawDefaultLines()
        drawAccentLines(arr[i], i)
        drawAccentLines(arr[largest], largest)
        ;[arr[i], arr[largest]] = [arr[largest], arr[i]] // Swap
        heapify(arr, n, largest, drawDefaultLines, drawAccentLines)
    }
}
