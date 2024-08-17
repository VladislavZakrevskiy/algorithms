import { SelectionItem } from "../../components/SortingCanvas/SortDrawer";

export function gnomeSort(arr: SelectionItem[], drawDefaultLines: () => void,  drawAccentLines: (arrItem: SelectionItem, i: number) => void) {
    let index = 0;

    while (index < arr.length) {
        if (index === 0 || arr[index].number >= arr[index - 1].number) {
            index++;
        } else {
            drawDefaultLines()
            drawAccentLines(arr[index], index)
            drawAccentLines(arr[index - 1], index - 1);
            [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]]; // Swap
            break
            index--;
        }
    }

    return arr;
}
