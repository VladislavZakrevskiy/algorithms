// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { SelectionItem } from '../components/SortingCanvas/SortDrawer'
import {
    bubbleSort,
    cocktailSort,
    combSort,
    gnomeSort,
    HeapSortState,
    insertionSort,
    mergeSort,
    MergeSortState,
    quickSort,
    selectionSort,
    shellSort,
    heapSort,
    QuickSortState,
    SelectionSortState,
} from '../lib/sortAlgs'

export type Algorithm = (
    arr: SelectionItem[] | MergeSortState | HeapSortState | QuickSortState | SelectionSortState,
    drawDefaultLines: () => void,
    drawAccentLines: (selectionItem: SelectionItem, i: number) => void
) => SelectionItem[] | MergeSortState | HeapSortState | QuickSortState | SelectionSortState

type AlgorithmItem = {
    alg: Algorithm
    name: string
    difficulty: {
        time: string
        memory: string
    }
    desc: string
    realization: {
        java: string
        CSharp: string
        CPlusPlus: string
        JS: string
        python: string
    }
}

export type Algorithms =
    | 'bubbleSort'
    | 'cocktailSort'
    | 'combSort'
    | 'gnomeSort'
    | 'heapSort'
    | 'insertionSort'
    | 'mergeSort'
    | 'quickSort'
    | 'selectionSort'
    | 'shellSort'

export const algsList: Record<Algorithms, AlgorithmItem> = {
    bubbleSort: {
        alg: bubbleSort,
        name: 'Bubble Sort',
        desc: 'Bubble Sort сравнивает попарно элементы массива и меняет их местами, если они стоят в неправильном порядке. Этот процесс повторяется до тех пор, пока массив не станет полностью отсортированным.',
        difficulty: {
            time: 'O(n²)',
            memory: 'O(1)',
        },
        realization: {
            CPlusPlus: `#include <iostream>
#include <vector>

void bubbleSort(std::vector<int>& arr) {
    for (int i = 0; i < arr.size() - 1; i++) {
        for (int j = 0; j < arr.size() - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
            }
        }
    }
}
`,
            CSharp: `class BubbleSort {
    public static void Sort(int[] arr) {
        for (int i = 0; i < arr.Length - 1; i++) {
            for (int j = 0; j < arr.Length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
}
`,
            java: `public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        for (int i = 0; i < arr.length - 1; i++) {
            for (int j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
}
`,
            JS: `function bubbleSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
}
`,
            python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
`,
        },
    },
    cocktailSort: {
        alg: cocktailSort,
        name: 'Cocktail Sort',
        desc: 'Cocktail Sort — это модификация сортировки пузырьком. Он выполняет сортировку в обоих направлениях: сначала слева направо, а затем справа налево. Это позволяет быстрее обнаружить и переместить элементы в правильное положение, особенно при сортировке почти отсортированных массивов.',
        difficulty: {
            time: 'O(n²)',
            memory: 'O(1)',
        },
        realization: {
            CPlusPlus: `#include <iostream>
#include <vector>

void cocktailSort(std::vector<int>& arr) {
    bool swapped = true;
    int start = 0;
    int end = arr.size() - 1;

    while (swapped) {
        swapped = false;

        // Проходим слева направо
        for (int i = start; i < end; i++) {
            if (arr[i] > arr[i + 1]) {
                std::swap(arr[i], arr[i + 1]);
                swapped = true;
            }
        }

        if (!swapped) break;
        swapped = false;
        end--;

        // Проходим справа налево
        for (int i = end; i > start; i--) {
            if (arr[i] < arr[i - 1]) {
                std::swap(arr[i], arr[i - 1]);
                swapped = true;
            }
        }

        start++;
    }
}
`,
            CSharp: `using System;

class CocktailSort {
    public static void Sort(int[] arr) {
        bool swapped = true;
        int start = 0;
        int end = arr.Length - 1;

        while (swapped) {
            swapped = false;

            // Проходим слева направо
            for (int i = start; i < end; i++) {
                if (arr[i] > arr[i + 1]) {
                    int temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
                    swapped = true;
                }
            }

            if (!swapped) break;
            swapped = false;
            end--;

            // Проходим справа налево
            for (int i = end; i > start; i--) {
                if (arr[i] < arr[i - 1]) {
                    int temp = arr[i];
                    arr[i] = arr[i - 1];
                    arr[i - 1] = temp;
                    swapped = true;
                }
            }

            start++;
        }
    }
}
`,
            java: `public class CocktailSort {
    public static void cocktailSort(int[] arr) {
        boolean swapped = true;
        int start = 0;
        int end = arr.length - 1;

        while (swapped) {
            swapped = false;

            // Проходим слева направо
            for (int i = start; i < end; i++) {
                if (arr[i] > arr[i + 1]) {
                    int temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
                    swapped = true;
                }
            }

            // Если не было обменов, массив отсортирован
            if (!swapped) break;

            swapped = false;
            end--;

            // Проходим справа налево
            for (int i = end; i > start; i--) {
                if (arr[i] < arr[i - 1]) {
                    int temp = arr[i];
                    arr[i] = arr[i - 1];
                    arr[i - 1] = temp;
                    swapped = true;
                }
            }

            start++;
        }
    }
}
`,
            JS: `function cocktailSort(arr) {
    let swapped = true;
    let start = 0;
    let end = arr.length - 1;

    while (swapped) {
        swapped = false;

        // Проходим слева направо
        for (let i = start; i < end; i++) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
            }
        }

        if (!swapped) break;
        swapped = false;
        end--;

        // Проходим справа налево
        for (let i = end; i > start; i--) {
            if (arr[i] < arr[i - 1]) {
                [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
                swapped = true;
            }
        }

        start++;
    }
}
`,
            python: `def cocktail_sort(arr):
    swapped = True
    start = 0
    end = len(arr) - 1

    while swapped:
        swapped = False

        # Проходим слева направо
        for i in range(start, end):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True

        if not swapped:
            break

        swapped = False
        end -= 1

        # Проходим справа налево
        for i in range(end, start, -1):
            if arr[i] < arr[i - 1]:
                arr[i], arr[i - 1] = arr[i - 1], arr[i]
                swapped = True

        start += 1
`,
        },
    },
    combSort: {
        alg: combSort,
        name: 'Comb Sort',
        desc: 'Comb Sort улучшает сортировку пузырьком, используя шаги, которые постепенно уменьшаются. Вместо сравнения и обмена соседних элементов, Comb Sort сравнивает и обменивает элементы на фиксированном расстоянии, которое постепенно уменьшается. Это позволяет быстрее перемещать элементы, которые находятся далеко от своей конечной позиции.',
        difficulty: {
            time: 'O(n²)',
            memory: 'O(1)',
        },
        realization: {
            CPlusPlus: `#include <iostream>
#include <vector>

void combSort(std::vector<int>& arr) {
    int n = arr.size();
    int gap = n;
    const double shrink = 1.3;
    bool swapped = true;

    while (gap > 1 || swapped) {
        gap = static_cast<int>(gap / shrink);
        if (gap < 1) gap = 1;
        swapped = false;

        for (int i = 0; i + gap < n; i++) {
            if (arr[i] > arr[i + gap]) {
                std::swap(arr[i], arr[i + gap]);
                swapped = true;
            }
        }
    }
}
`,
            CSharp: `using System;

class CombSort {
    public static void Sort(int[] arr) {
        int n = arr.Length;
        int gap = n;
        const double shrink = 1.3;
        bool swapped = true;

        while (gap > 1 || swapped) {
            gap = (int)(gap / shrink);
            if (gap < 1) gap = 1;
            swapped = false;

            for (int i = 0; i + gap < n; i++) {
                if (arr[i] > arr[i + gap]) {
                    int temp = arr[i];
                    arr[i] = arr[i + gap];
                    arr[i + gap] = temp;
                    swapped = true;
                }
            }
        }
    }
}
`,
            java: `public class CombSort {
    public static void combSort(int[] arr) {
        int gap = arr.length;
        boolean swapped = true;
        final double shrink = 1.3;

        while (gap > 1 || swapped) {
            gap = (int) (gap / shrink);
            if (gap < 1) gap = 1;
            swapped = false;

            for (int i = 0; i + gap < arr.length; i++) {
                if (arr[i] > arr[i + gap]) {
                    int temp = arr[i];
                    arr[i] = arr[i + gap];
                    arr[i + gap] = temp;
                    swapped = true;
                }
            }
        }
    }
}
`,
            JS: `function combSort(arr) {
    let n = arr.length;
    let gap = n;
    const shrink = 1.3;
    let swapped = true;

    while (gap > 1 || swapped) {
        gap = Math.floor(gap / shrink);
        if (gap < 1) gap = 1;
        swapped = false;

        for (let i = 0; i + gap < n; i++) {
            if (arr[i] > arr[i + gap]) {
                [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
                swapped = true;
            }
        }
    }
}
`,
            python: `def comb_sort(arr):
    n = len(arr)
    gap = n
    shrink = 1.3
    swapped = True

    while gap > 1 or swapped:
        gap = int(gap / shrink)
        if gap < 1:
            gap = 1
        swapped = False

        for i in range(n - gap):
            if arr[i] > arr[i + gap]:
                arr[i], arr[i + gap] = arr[i + gap], arr[i]
                swapped = True
`,
        },
    },
    gnomeSort: {
        alg: gnomeSort,
        name: 'Gnome Sort',
        desc: 'Gnome Sort — это простейший алгоритм сортировки, напоминающий сортировку вставками, но с подходом, аналогичным тому, что используется в алгоритме "гнома". Он перемещается по массиву, сравнивая и меняя местами элементы. Если элементы находятся в правильном порядке, он перемещается вправо. Если нет, он перемещается влево, чтобы повторно проверить элементы.',
        difficulty: {
            time: 'O(n²)',
            memory: 'O(1)',
        },
        realization: {
            CPlusPlus: `#include <iostream>
#include <vector>

void gnomeSort(std::vector<int>& arr) {
    int index = 0;
    int n = arr.size();

    while (index < n) {
        if (index == 0 || arr[index] >= arr[index - 1]) {
            index++;
        } else {
            std::swap(arr[index], arr[index - 1]);
            index--;
        }
    }
}
`,
            CSharp: `using System;

class GnomeSort {
    public static void Sort(int[] arr) {
        int index = 0;
        int n = arr.Length;

        while (index < n) {
            if (index == 0 || arr[index] >= arr[index - 1]) {
                index++;
            } else {
                int temp = arr[index];
                arr[index] = arr[index - 1];
                arr[index - 1] = temp;
                index--;
            }
        }
    }
}
`,
            java: `public class GnomeSort {
    public static void gnomeSort(int[] arr) {
        int index = 0;
        int n = arr.length;

        while (index < n) {
            if (index == 0 || arr[index] >= arr[index - 1]) {
                index++;
            } else {
                int temp = arr[index];
                arr[index] = arr[index - 1];
                arr[index - 1] = temp;
                index--;
            }
        }
    }
}
`,
            JS: `function gnomeSort(arr) {
    let index = 0;
    let n = arr.length;

    while (index < n) {
        if (index === 0 || arr[index] >= arr[index - 1]) {
            index++;
        } else {
            [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]];
            index--;
        }
    }
}
`,
            python: `def gnome_sort(arr):
    index = 0
    n = len(arr)

    while index < n:
        if index == 0 or arr[index] >= arr[index - 1]:
            index += 1
        else:
            arr[index], arr[index - 1] = arr[index - 1], arr[index]
            index -= 1
`,
        },
    },
    heapSort: {
        alg: heapSort,
        name: 'Heap Sort',
        desc: 'Heap Sort строит бинарную кучу (макс-куча), а затем извлекает наибольший элемент (корень кучи) и перемещает его в конец массива. Процесс повторяется для оставшейся части массива.',
        difficulty: {
            time: 'O(n log n)',
            memory: 'O(1)',
        },
        realization: {
            CPlusPlus: `#include <iostream>
#include <vector>

void heapify(std::vector<int>& arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest != i) {
        std::swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n - 1; i >= 0; i--) {
        std::swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}
`,
            CSharp: `class HeapSort {
    public static void Sort(int[] arr) {
        int n = arr.Length;
        for (int i = n / 2 - 1; i >= 0; i--) Heapify(arr, n, i);
        for (int i = n - 1; i >= 0; i--) {
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            Heapify(arr, i, 0);
        }
    }

    private static void Heapify(int[] arr, int n, int i) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) largest = left;
        if (right < n && arr[right] > arr[largest]) largest = right;
        if (largest != i) {
            int swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;
            Heapify(arr, n, largest);
        }
    }
}
`,
            java: `public class HeapSort {
    public static void heapSort(int[] arr) {
        int n = arr.length;
        for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
        for (int i = n - 1; i >= 0; i--) {
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            heapify(arr, i, 0);
        }
    }

    private static void heapify(int[] arr, int n, int i) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) largest = left;
        if (right < n && arr[right] > arr[largest]) largest = right;
        if (largest != i) {
            int swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;
            heapify(arr, n, largest);
        }
    }
}
`,
            JS: `function heapify(arr, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}

function heapSort(arr) {
    let n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(arr, n, i);
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }
}
`,
            python: `def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2

    if left < n and arr[i] < arr[left]:
        largest = left

    if right < n and arr[largest] < arr[right]:
        largest = right

    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)
`,
        },
    },
    insertionSort: {
        alg: insertionSort,
        name: 'Insertion Sort',
        desc: 'Insertion Sort проходит через массив и постепенно создает отсортированную последовательность, вставляя каждый элемент на его правильное место. На каждой итерации он берет один элемент из неотсортированной части и вставляет его в отсортированную часть.',
        difficulty: {
            time: 'O(n²)',
            memory: 'O(1)',
        },
        realization: {
            CPlusPlus: `#include <iostream>
#include <vector>

void insertionSort(std::vector<int>& arr) {
    for (int i = 1; i < arr.size(); i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}
`,
            CSharp: `class InsertionSort {
    public static void Sort(int[] arr) {
        for (int i = 1; i < arr.Length; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }
}
`,
            java: `public class InsertionSort {
    public static void insertionSort(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }
}
`,
            JS: `function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}
`,
            python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
`,
        },
    },
    mergeSort: {
        alg: mergeSort,
        name: 'Merge Sort',
        desc: 'Merge Sort делит массив пополам, рекурсивно сортирует каждую половину, а затем сливает две отсортированные половины. Он использует принцип "разделяй и властвуй", разделяя задачу на более мелкие подзадачи, которые проще решать.',
        difficulty: {
            time: 'O(n log n)',
            memory: 'O(n)',
        },
        realization: {
            CPlusPlus: `#include <iostream>
#include <vector>

void merge(std::vector<int>& arr, int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    std::vector<int> L(n1), R(n2);

    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(std::vector<int>& arr, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}
`,
            CSharp: `class MergeSort {
    public static void Sort(int[] array) {
        if (array.Length < 2) return;
        int mid = array.Length / 2;
        int[] left = new int[mid];
        int[] right = new int[array.Length - mid];

        Array.Copy(array, 0, left, 0, mid);
        Array.Copy(array, mid, right, 0, array.Length - mid);

        Sort(left);
        Sort(right);
        Merge(array, left, right);
    }

    private static void Merge(int[] array, int[] left, int[] right) {
        int i = 0, j = 0, k = 0;
        while (i < left.Length && j < right.Length) {
            if (left[i] <= right[j]) array[k++] = left[i++];
            else array[k++] = right[j++];
        }
        while (i < left.Length) array[k++] = left[i++];
        while (j < right.Length) array[k++] = right[j++];
    }
}
`,
            java: `public class MergeSort {
    public static void mergeSort(int[] array) {
        if (array.length < 2) return;
        int mid = array.length / 2;
        int[] left = new int[mid];
        int[] right = new int[array.length - mid];

        System.arraycopy(array, 0, left, 0, mid);
        System.arraycopy(array, mid, right, 0, array.length - mid);

        mergeSort(left);
        mergeSort(right);
        merge(array, left, right);
    }

    private static void merge(int[] array, int[] left, int[] right) {
        int i = 0, j = 0, k = 0;
        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                array[k++] = left[i++];
            } else {
                array[k++] = right[j++];
            }
        }
        while (i < left.length) array[k++] = left[i++];
        while (j < right.length) array[k++] = right[j++];
    }
}
`,
            JS: `function mergeSort(arr) {
    if (arr.length < 2) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    let result = [], i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) result.push(left[i++]);
        else result.push(right[j++]);
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
}
`,
            python: `def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        left_half = arr[:mid]
        right_half = arr[mid:]

        merge_sort(left_half)
        merge_sort(right_half)

        i = j = k = 0

        while i < len(left_half) and j < len(right_half):
            if left_half[i] < right_half[j]:
                arr[k] = left_half[i]
                i += 1
            else:
                arr[k] = right_half[j]
                j += 1
            k += 1

        while i < len(left_half):
            arr[k] = left_half[i]
            i += 1
            k += 1

        while j < len(right_half):
            arr[k] = right_half[j]
            j += 1
            k += 1
`,
        },
    },
    quickSort: {
        alg: quickSort,
        name: 'Quick Sort',
        desc: 'Quick Sort выбирает опорный элемент (pivot) и делит массив на две части: элементы, меньшие опорного, и элементы, большие опорного. Затем он рекурсивно сортирует обе части.',
        difficulty: {
            time: 'O(n log n)',
            memory: 'O(log n)',
        },
        realization: {
            CPlusPlus: `#include <iostream>
#include <vector>

int partition(std::vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            std::swap(arr[i], arr[j]);
        }
    }
    std::swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(std::vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}
`,
            CSharp: `class QuickSort {
    public static void Sort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = Partition(arr, low, high);
            Sort(arr, low, pi - 1);
            Sort(arr, pi + 1, high);
        }
    }

    private static int Partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp1 = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp1;
        return i + 1;
    }
}
`,
            java: `public class QuickSort {
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = (low - 1);
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }
}
`,
            JS: `function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

function quickSort(arr, low, high) {
    if (low < high) {
        let pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}
`,
            python: `def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

def quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)
`,
        },
    },

    selectionSort: {
        alg: selectionSort,
        name: 'Selection Sort',
        desc: 'Selection Sort находит наименьший элемент в неотсортированной части массива и меняет его местами с первым элементом этой части. Этот процесс повторяется, перемещая границу отсортированной части массива.',
        difficulty: {
            time: 'O(n²)',
            memory: 'O(1)',
        },
        realization: {
            CPlusPlus: `#include <iostream>
#include <vector>

void selectionSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        std::swap(arr[minIdx], arr[i]);
    }
}
`,
            CSharp: `class SelectionSort {
    public static void Sort(int[] arr) {
        for (int i = 0; i < arr.Length - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < arr.Length; j++) {
                if (arr[j] < arr[minIdx]) minIdx = j;
            }
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }
    }
}
`,
            java: `public class SelectionSort {
    public static void selectionSort(int[] arr) {
        for (int i = 0; i < arr.length - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[minIdx]) minIdx = j;
            }
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }
    }
}
`,
            JS: `function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
}
`,
            python: `def selection_sort(arr):
    for i in range(len(arr) - 1):
        min_idx = i
        for j in range(i + 1, len(arr)):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
`,
        },
    },
    shellSort: {
        alg: shellSort,
        name: 'Shell Sort',
        desc: 'Shell Sort является обобщением сортировки вставками. Он начинает с большого промежутка между сравниваемыми элементами, постепенно уменьшая этот промежуток. Это улучшает производительность сортировки вставками за счет уменьшения количества перемещений элементов.',
        difficulty: {
            time: 'O(n²)',
            memory: 'O(1)',
        },
        realization: {
            CPlusPlus: `#include <iostream>
#include <vector>

void shellSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
            }
            arr[j] = temp;
        }
    }
}
`,
            CSharp: `class ShellSort {
    public static void Sort(int[] arr) {
        for (int gap = arr.Length / 2; gap > 0; gap /= 2) {
            for (int i = gap; i < arr.Length; i++) {
                int temp = arr[i];
                int j;
                for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                    arr[j] = arr[j - gap];
                }
                arr[j] = temp;
            }
        }
    }
}
`,
            java: `public class ShellSort {
    public static void shellSort(int[] arr) {
        for (int gap = arr.length / 2; gap > 0; gap /= 2) {
            for (int i = gap; i < arr.length; i++) {
                int temp = arr[i];
                int j;
                for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                    arr[j] = arr[j - gap];
                }
                arr[j] = temp;
            }
        }
    }
}
`,
            JS: `function shellSort(arr) {
    let n = arr.length;
    let gap = Math.floor(n / 2);

    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            let temp = arr[i];
            let j;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
            }
            arr[j] = temp;
        }
        gap = Math.floor(gap / 2);
    }
}
`,
            python: `def shell_sort(arr):
    n = len(arr)
    gap = n // 2

    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            arr[j] = temp
        gap //= 2
`,
        },
    },
}
