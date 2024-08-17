import { SelectionItem } from "../../components/SortingCanvas/SortDrawer";

export interface SelectionSortState {
    arr: SelectionItem[]
    i: number
    sorted: boolean
}

export function selectionSort(
    state: SelectionSortState,
    drawDefaultLines: () => void,
    drawAccentLines: (arrItem: SelectionItem, i: number) => void
): SelectionSortState {
    const { arr, i } = state

    if (state.sorted) return state

    let minIdx = i
    for (let j = i + 1; j < arr.length; j++) {
        if (arr[j].number < arr[minIdx].number) {
            minIdx = j
        }
    }

    if (minIdx !== i) {
        drawDefaultLines()
        drawAccentLines(arr[i], i)
        drawAccentLines(arr[minIdx], minIdx)
        ;[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]] // Swap
    }

    state.i++

    if (state.i >= arr.length - 1) {
        state.sorted = true
    }

    return state
}
