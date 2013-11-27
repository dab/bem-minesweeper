({
    block: 'page',
    title: 'Game of BEM',
    favicon: '/favicon.ico',
    head: [
        { elem: 'css', url: '_index.css', ie: false },
        { elem: 'meta', attrs: { name: 'description', content: '' }}
    ],
    content:[
        {
            block: 'grid',
            js: {
                width: 8,
                height: 8,
                totalMines: 10
            }
        },
        {
            block: 'intro',
            content: [
                {
                    elem: 'header',
                    content: 'Minesweeper'
                },
                {
                    elem: 'subheader',
                    content: 'BEM powered'
                }
            ]
        },
        {
            block: 'gameover'
        },
        { elem: 'js', url: '_index.js' }
    ]
})
