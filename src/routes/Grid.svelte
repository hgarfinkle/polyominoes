<script>
    const inset = 10
    const squareSize = 50
    const gridSize = 10
</script>

<svg width={squareSize * gridSize + 2 * inset} height={squareSize * gridSize + 2 * inset}>
    <svg x={inset} y={inset}>   
    <rect width={squareSize * gridSize} height={squareSize * gridSize} x={inset} y={inset} style="fill:white;stroke-width:4;stroke:black" />  
        {#each {length: gridSize}, row }
            {#each {length: gridSize}, column }
                <rect width={squareSize} height={squareSize} x={row * squareSize} y={column * squareSize} style="fill:white;stroke-width:1;stroke:black" />
            {/each}
        {/each}
    </svg>
</svg>