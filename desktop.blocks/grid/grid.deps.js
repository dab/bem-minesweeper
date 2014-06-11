[
    {
        shouldDeps: [
            { block: 'cell' },
            {
                block: 'grid',
                elems: ['line'],
            },
            { mods: { state: ['gaming', 'intro', 'gameover', 'won'] } },
            { block: 'i-bem', elem: 'dom' },
            {block: 'events', elem: 'channels'}
        ]
    },
    {
        tech: 'js',
        mustDeps: [
            { block: 'i-bem', tech: 'bemhtml' }
        ],
        shouldDeps: [
            { block: 'grid', tech: 'bemhtml' }
        ]
    }

]
