modules.define('i-bem__dom', ['jquery'], function (provide, jquery, DOM) {

    var CHANNEL_NAME = 'cells';
    var CHANNEL_EVENT_OPEN_AROUND = 'around';

    DOM.decl('cell',
        {
            onSetMod: {
                'js': {
                    'inited': function () {
                        this.setMod('state', 'closed');

                        this.bindTo('click', function() {
                            if(this.params.mine) {
                                this.setMod('state', 'mine');
                            } else this.setMod('state', 'open');
                        });

                        this.bindTo('contextmenu', function() {
                            if (!this.hasMod('state', 'open')) this.toggleMod('state', 'maybe', 'closed');
                            return false;
                        });

                    }
                },
                'state':{
                    'mine': function(){
                        console.log('BIG BA-DA-BOOOOM! BANG!');
                        this.findBlockOutside('grid').
                            setMod('state', 'gameover');
                    },
                    'open': function(){
                        // надо посчитать мины вокруг, если ноль - открыть все ячейки вокруг
                        var grid = this.findBlockOutside('grid');
                        grid.cellsClosed--;
                        var minesNumber = this._countMinesAround();
                        if (minesNumber == 0) {
                            DOM.channel(CHANNEL_NAME).trigger(CHANNEL_EVENT_OPEN_AROUND, {target: grid, params: this.params});
                        } else this.domElem[0].textContent = minesNumber;

                        if (grid.cellsClosed == grid.params.totalMines) grid.setMod('state', 'won');
                    }
                }

            },
            _countMinesAround: function(){
                var grid = this.findBlockOutside('grid').grid;
                var minesAround = 0;
                for(var dy = -1; dy < 2; ++dy){
                    for(var dx = -1; dx < 2; ++dx){
                        var line = this.params.y + dy;
                        var column = this.params.x + dx;
                        if (grid[line] && grid[line][column] && grid[line][column].mine) minesAround++;
                    }
                }
                return minesAround;
            }
        },{});


    provide(DOM);

});