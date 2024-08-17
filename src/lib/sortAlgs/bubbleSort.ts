import { SelectionItem } from "../../components/SortingCanvas/SortDrawer";

export function bubbleSort(
    arr: SelectionItem[],
    drawDefaultLines: () => void,
    drawAccentLines: (arrItem: SelectionItem, i: number) => void
) {
    const n = arr.length

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j].number > arr[j + 1].number) {
                drawDefaultLines()
                drawAccentLines(arr[j], j)
                drawAccentLines(arr[j + 1], j + 1)
                ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
                
                break
            }
        }
    }

    return arr
}
