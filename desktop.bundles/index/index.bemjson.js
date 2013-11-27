({
    block: 'page',
    title: 'BEM powered Minesweeper game.',
    favicon: '/favicon.ico',
    head: [
        { elem: 'css', url: '_index.css', ie: false },
        { elem: 'meta', attrs: { name: 'description', content: 'Minesweeper game, build with BEM on javascript.' }}
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
                    content: 'bem-minesweeper'
                },
                {
                    elem: 'subheader',
                    content: '\<a href="https://github.com/dab/bem-minesweeper"> on GitHub</a>'
                }
            ]
        },
        { elem: 'js', url: '_index.js' }
    ]
})
