import { SelectionItem } from "../../components/SortingCanvas/SortDrawer";

export function insertionSort(
    arr: SelectionItem[],
    drawDefaultLines: () => void,
    drawAccentLines: (arrItem: SelectionItem, i: number) => void
) {
    for (let i = 1; i < arr.length; i++) {
        const key = arr[i]
        let j = i - 1
        while (j >= 0 && arr[j].number > key.number) {
            drawDefaultLines()
            drawAccentLines(arr[j+1], j+1)
            drawAccentLines(arr[i], i)
            arr[j + 1] = arr[j]
            j--
            break
        }
        arr[j + 1] = key
    }
    return arr
}
