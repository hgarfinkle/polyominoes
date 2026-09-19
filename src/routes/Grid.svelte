<script>
    const inset = 10
</script>

<svg width=600 height=600>
    <rect width=500 height=500 x={inset} y={inset} style="fill:white;stroke-width:4;stroke:black"/>
    {#each {length: 10}, row }
        {#each {length: 10}, column }
            <rect width=50 height=50 x={row * 50 + inset} y={column * 50 + inset} style="fill:white;stroke-width:1;stroke:black" />
        {/each}
    {/each}
</svg>