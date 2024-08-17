/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SelectionItem } from "../../components/SortingCanvas/SortDrawer";

export interface MergeSortState {
    arr: SelectionItem[]
    currSize: number
    leftStart: number
    sorted: boolean
}

export function mergeSort(
    state: MergeSortState,
    drawDefaultLines: () => void,
    drawAccentLines: (arrItem: SelectionItem, i: number) => void
): MergeSortState {
    const n = state.arr.length

    if (state.sorted) return state

    if (state.leftStart < n - 1) {
        const mid = Math.min(state.leftStart + state.currSize - 1, n - 1)
        const rightEnd = Math.min(state.leftStart + 2 * state.currSize - 1, n - 1)

        merge(state.arr, state.leftStart, mid, rightEnd, drawDefaultLines, drawAccentLines)

        state.leftStart += 2 * state.currSize
    } else {
        state.currSize *= 2
        state.leftStart = 0

        if (state.currSize >= n) {
            state.sorted = true
        }
    }

    return state
}

function merge(
    arr: SelectionItem[],
    left: number,
    mid: number,
    right: number,
    drawDefaultLines: () => void,
    drawAccentLines: (arrItem: SelectionItem, i: number) => void
): void {
    const n1 = mid - left + 1
    const n2 = right - mid

    const leftArr: SelectionItem[] = new Array(n1)
    const rightArr: SelectionItem[] = new Array(n2)

    for (let i = 0; i < n1; i++) leftArr[i] = arr[left + i]
    for (let j = 0; j < n2; j++) rightArr[j] = arr[mid + 1 + j]

    let i = 0,
        j = 0,
        k = left
    while (i < n1 && j < n2) {
        if (leftArr[i].number <= rightArr[j].number) {
            drawDefaultLines()
            drawAccentLines(arr[k], k)
            drawAccentLines(leftArr[i], i)

            arr[k] = leftArr[i]
            i++
        } else {
            drawDefaultLines()
            drawAccentLines(arr[k], k)
            drawAccentLines(rightArr[j], j)

            arr[k] = rightArr[j]
            j++
        }
        k++
    }

    while (i < n1) {
        drawDefaultLines()
        drawAccentLines(arr[k], k)
        drawAccentLines(leftArr[i], i)

        arr[k] = leftArr[i]
        i++
        k++
    }

    while (j < n2) {
        drawDefaultLines()
        drawAccentLines(arr[k], k)
        drawAccentLines(rightArr[j], j)

        arr[k] = rightArr[j]
        j++
        k++
    }
}
