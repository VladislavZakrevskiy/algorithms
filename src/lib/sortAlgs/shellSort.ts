import { SelectionItem } from "../../components/SortingCanvas/SortDrawer";

export interface ShellSortState {
    arr: SelectionItem[]
    gap: number
    i: number
    j: number
    sorted: boolean
}

export function shellSort(
    state: ShellSortState,
    drawDefaultLines: () => void,
    drawAccentLines: (arrItem: SelectionItem, i: number) => void
): ShellSortState {
    const { arr, gap, j } = state

    if (state.sorted) return state

    if (j >= gap && arr[j - gap].number > arr[j].number) {
        drawDefaultLines()
        drawAccentLines(arr[j], j)
        drawAccentLines(arr[j - gap], j - gap)
        ;[arr[j], arr[j - gap]] = [arr[j - gap], arr[j]] // Swap
        state.j -= gap
    } else {
        state.i++
        state.j = state.i
    }

    if (state.i >= arr.length) {
        state.gap = Math.floor(state.gap / 2)
        state.i = state.gap
        state.j = state.i

        if (state.gap <= 0) {
            state.sorted = true
        }
    }

    return state
}
