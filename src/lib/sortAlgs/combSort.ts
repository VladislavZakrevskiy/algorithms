import { SelectionItem } from "../../components/SortingCanvas/SortDrawer";

export function combSort(
    arr: SelectionItem[],
    drawDefaultLines: () => void,
    drawAccentLines: (arrItem: SelectionItem, i: number) => void
) {
    let gap = arr.length
    const shrink = 1.3
    let sorted = false

    while (!sorted) {
        gap = Math.floor(gap / shrink)
        if (gap <= 1) {
            gap = 1
            sorted = true
        }

        for (let i = 0; i + gap < arr.length; i++) {
            if (arr[i].number > arr[i + gap].number) {
                drawDefaultLines()
                drawAccentLines(arr[i], i)
                drawAccentLines(arr[i + gap], i + gap)
                ;[arr[i], arr[i + gap]] = [arr[i + gap], arr[i]] // Swap
                break
            }
        }
    }

    return arr
}
