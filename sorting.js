export default function quicksort(canvas) {
    const dpr = Math.ceil(window.devicePixelRatio || 1);
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    const ctx = canvas.getContext("2d");
 
    const maxBarHeight = canvas.height * 1;
    
    const defaultColor = "white";
    const pivotColor = "red";
    const compareColor = "cyan";
    const sortedColor = "lightgreen";
    
    let runs = 0;
    let arraySizeGetter = (runs) => Math.round(Math.pow((runs + 4), 1.5))

    function makeArray(size) {
        array = Array.from({ length: size }, (_, i) => (i + 1) / (size + 1));
        return array.sort(() => Math.random() - 0.5);
    }

    let operations = [];

    let array;
    let barWidth;
    let isSorted;

    let stats = {}
    // Generate quicksort operations
    function quickSortOperations(arr, start, end) {
        if (start >= end) return;

        const pivotIndex = partition(arr, start, end);
        quickSortOperations(arr, start, pivotIndex - 1);
        quickSortOperations(arr, pivotIndex + 1, end);
    }

    function partition(arr, start, end) {
        const pivotValue = arr[end];
        let pivotIndex = start;

        operations.push({
            type: 'pivot',
            index: end,
            array: [...arr]
        });

        for (let i = start; i < end; i++) {
            operations.push({
                type: 'compare',
                indices: [i, end],
                array: [...arr]
            });

            if (arr[i] < pivotValue) {
                // Swap elements
                [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
                operations.push({
                    type: 'swap',
                    indices: [i, pivotIndex],
                    array: [...arr]
                });
                pivotIndex++;
            }
        }

        [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
        operations.push({
            type: 'swap',
            indices: [pivotIndex, end],
            array: [...arr]
        });

        return pivotIndex;
    }

    function clear() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function drawArray(currentOperation) {
        const displayArray = currentOperation ? currentOperation.array : array;
        
        displayArray.forEach((value, index) => {
            const barHeight = value * maxBarHeight;
            const x = index * barWidth;
            const y = canvas.height - barHeight;

            // Set color based on operation type
            if (currentOperation) {
                if (currentOperation.type === 'pivot' && index === currentOperation.index) {
                    ctx.fillStyle = pivotColor;
                } else if (currentOperation.type === 'compare' && currentOperation.indices.includes(index)) {
                    ctx.fillStyle = compareColor;
                } else if (currentOperation.type === 'sorted' && index <= currentOperation.index) {
                    ctx.fillStyle = sortedColor;
                } else {
                    ctx.fillStyle = defaultColor;
                }
            } else {
                ctx.fillStyle = defaultColor
            }

            ctx.fillRect(x, y, barWidth - 1, barHeight);
        });
    }

    function drawStats() {
        ctx.fillStyle = "darkgray";
        ctx.font = "16px Arial";
        let i = 0;
        for (let key in stats) {
            ctx.fillText(`${key}: ${stats[key]}`, 10, 20 + i * 20);
            i++;
        }
    }

    function update() {
        if (operations.length === 0) {
            array = makeArray(arraySizeGetter(runs));
            barWidth = canvas.width / array.length;
            isSorted = false;

            quickSortOperations(array, 0, array.length - 1);

            stats = {
                "Size": array.length,
            };
        }

        clear();

        let currentOperation = operations.shift();
        
        if (currentOperation && currentOperation.type !== 'sorted') {
            const humanReadableType = currentOperation.type.charAt(0).toUpperCase() + currentOperation.type.slice(1) + "s";
            stats[humanReadableType] = (stats[humanReadableType] || 0) + 1;
        }
        
        drawArray(currentOperation);
        drawStats();

        if (operations.length === 0 && !isSorted) {
            runs++;
            isSorted = true;
            
            for (let i = 0; i < array.length; i++) {
                operations.push({
                    type: 'sorted',
                    index: i,
                    array: [...array]
                });
            }

            for (let i = 0; i < 3; i++) {
                operations.push({
                    type: 'sorted',
                    index: array.length - 1,
                    array: [...array]
                });
            }
        }
    }

    return () => {
        update();
    };
}