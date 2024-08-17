import { SelectionItem } from "../../components/SortingCanvas/SortDrawer";

export function cocktailSort(
    arr: SelectionItem[],
    drawDefaultLines: () => void,
    drawAccentLines: (arrItem: SelectionItem, i: number) => void
) {
    let swapped = true
    let start = 0
    let end = arr.length

    while (swapped) {
        swapped = false

        for (let i = start; i < end - 1; i++) {
            if (arr[i].number > arr[i + 1].number) {
                drawDefaultLines()
                drawAccentLines(arr[i], i)
                drawAccentLines(arr[i + 1], i + 1)
                ;[arr[i], arr[i + 1]] = [arr[i + 1], arr[i]] // Swap
                swapped = true
                break
            }
        }

        if (!swapped) break

        swapped = false
        end--

        for (let i = end - 1; i > start; i--) {
            if (arr[i].number < arr[i - 1].number) {
                drawDefaultLines()
                drawAccentLines(arr[i], i)
                drawAccentLines(arr[i - 1], i - 1)
                ;[arr[i], arr[i - 1]] = [arr[i - 1], arr[i]] // Swap
                swapped = true
                break
            }
        }

        start++
    }

    return arr
}
