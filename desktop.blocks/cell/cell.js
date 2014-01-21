modules.define('i-bem__dom', ['jquery'], function (provide, jquery, DOM) {

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

                        this.params.mine && this.setMod('che');


                    }
                },
                'state':{
                    'mine': function(){
                        console.log('BIG BA-DA-BOOOOM! BANG!');
                        this.findBlockOutside('grid').
                            setMod('state', 'gameover');
                    },
                    'open': function(){
                        var grid = this.findBlockOutside('grid');
                        grid.cellsClosed--;
                        var minesNumber = this.countMinesAround();
                        if (minesNumber === 0) {
                            this.openCellsAround(this.params);
                        } else this.domElem[0].textContent = minesNumber;

                        grid.cellsClosed === grid.params.totalMines && grid.setMod('state', 'won');
                    }
                }

            },
            countMinesAround: function(){
                var grid = this.findBlockOutside('grid').grid;
                var minesAround = 0;
                for(var dy = -1; dy < 2; ++dy){
                    var line = this.params.y + dy;
                    for(var dx = -1; dx < 2; ++dx){
                        var column = this.params.x + dx;
                        if (grid[line] && grid[line][column] && grid[line][column].mine) minesAround++;
                    }
                }
                return minesAround;
            },
            openCellsAround: function(params){
                var parent = this.findBlockOutside('grid');
                var grid = parent.grid;
                for(var dy = -1; dy < 2; ++dy){
                    var line = params.y + dy;
                    for(var dx = -1; dx < 2; ++dx) {
                        var column = params.x + dx;
                        if (grid[line] && grid[line][column]) {
                            parent.findBlocksInside('cell').forEach(function(currentCell) {
                                if ((currentCell.params.x === column) && (currentCell.params.y === line)) {
                                    currentCell.setMod('state', 'open');
                                    return;
                                }
                            });
                        }
                    }
                }
            }
        },
        {});


    provide(DOM);

});