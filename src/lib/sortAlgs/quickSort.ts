import { SelectionItem } from "../../components/SortingCanvas/SortDrawer";

export interface QuickSortState {
    arr: SelectionItem[]
    stack: { low: number; high: number }[]
    sorted: boolean
}

export function quickSort(
    state: QuickSortState,
    drawDefaultLines: () => void,
    drawAccentLines: (arrItem: SelectionItem, i: number) => void
): QuickSortState {
    const { arr, stack } = state

    if (stack.length === 0) {
        state.sorted = true
        return state
    }

    const { low, high } = stack.pop()!

    const pivotIndex = partition(arr, low, high, drawDefaultLines, drawAccentLines)

    if (pivotIndex - 1 > low) {
        stack.push({ low, high: pivotIndex - 1 })
    }

    if (pivotIndex + 1 < high) {
        stack.push({ low: pivotIndex + 1, high })
    }

    return state
}

function partition(
    arr: SelectionItem[],
    low: number,
    high: number,
    drawDefaultLines: () => void,
    drawAccentLines: (arrItem: SelectionItem, i: number) => void
): number {
    const pivot = arr[high]
    let i = low - 1

    for (let j = low; j < high; j++) {
        if (arr[j].number < pivot.number) {
            i++
            drawDefaultLines()
            drawAccentLines(arr[i], i)
            drawAccentLines(arr[j], j)
            ;[arr[i], arr[j]] = [arr[j], arr[i]] // Swap
        }
    }
    drawDefaultLines()
    drawAccentLines(arr[i + 1], i + 1)
    drawAccentLines(arr[high], high)
    ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]] // Swap
    return i + 1
}
