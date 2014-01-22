({
    block: 'page',
    title: 'BEM powered Minesweeper game.',
    favicon: '/favicon.ico',
    head: [
        { elem: 'css', url: '_index.css' },
        { elem: 'meta', attrs: { name: 'description', content: 'Minesweeper game, build with BEM on javascript.' }}
    ],
    content:[
        {
            block: 'grid',
            js: {
                width: 16,
                height: 16,
                totalMines: 40
            }
        },
        {
            block: 'menu',
            content: [
                { elem: 'reset', content: 'reset'  },
                { elem: 'validate', content: 'validate'  },
                { elem: 'cheat', content: 'cheat game' },
                {
                    elem: 'header',
                    content: [
                        { elem: 'name', content: 'minesweeper' }
                    ]
                },
                {
                    elem: 'subheader',
                    content: {
                        block: 'link',
                        url: 'https://github.com/dab/bem-minesweeper',
                        content: 'on GitHub'
                    }
                }
            ]
        },
        { elem: 'js', url: '_index.js' }
    ]
})
