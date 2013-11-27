modules.define('i-bem__dom', ['BEMHTML'], function(provide, BEMHTML, DOM){

    var CHANNEL_NAME = 'cells';
    var CHANNEL_EVENT_OPEN_AROUND = 'around';

    DOM.decl('grid',{
        onSetMod: {
            'js': {
                'inited': function(){
                    this.setMod('state', 'gaming');
                    this.grid = [];
                    var cellsClosed = 0;
                    this._buildWorld();
                    DOM.channel(CHANNEL_NAME).on(CHANNEL_EVENT_OPEN_AROUND, {}, function (e, cell) {
                        this._openCellsAround(cell.params.x, cell.params.y);
                    }, this);
                }
            } ,
            'state': {
                'gameover': function(){
                    var cells = this.findBlocksInside('cell');
                    cells.forEach(function(cell){
                        if (cell.params.mine) cell.setMod('state', 'mine');
                    });
                }

            }
        },
        _buildWorld: function(){
            this.cellsClosed = this.params.width * this.params.height;
            this._buildGrid();
            this._addRandomMines();
            this._buildGridOnDOM();
        },
        _buildGrid: function(){
            for(var lines = 0; lines < this.params.height; ++lines){
                this.grid[lines] = [];
                for(var cols = 0; cols < this.params.width; ++cols){
                    this.grid[lines][cols] = {
                        x: cols,
                        y: lines,
                        mine: false
                    };
                }
            }
        },
        _addRandomMines: function(){
            var minesPushed = 0;
            while (minesPushed < this.params.totalMines) {
                var column = Math.floor(this.params.width * Math.random());
                var line = Math.floor(this.params.height * Math.random());
                var currentMine = this.grid[line][column].mine;
                if (!currentMine) {
                    this.grid[line][column].mine = true;
                    ++minesPushed;
                }
            }
        },
        _buildGridOnDOM: function(){

            for(var lineNum = 0; lineNum < this.params.height; ++lineNum){
                DOM.append(this.domElem, BEMHTML.apply({
                    block: 'grid',
                    elem: 'line'
                }));
            }


            // filling lines with boxes
            var _this = this;
            this.elem('line').each(function (index) {
                for (var columnNum = 0; columnNum < _this.params.width; ++columnNum) {
                    var mine = (_this.grid[index][columnNum].mine) ? '+' : '&nbsp;' ;
                    DOM.append(
                        this,
                        BEMHTML.apply({
                            block: 'cell',
                            content: mine,
                            js: {
                                x: _this.grid[index][columnNum].x,
                                y: _this.grid[index][columnNum].y,
                                mine: _this.grid[index][columnNum].mine
                            }
                        })
                    )
                }

            });
        },
        _openCellsAround: function(x, y){
            var grid = this.grid;
            for(var dy = -1; dy < 2; ++dy){
                for( var dx = -1; dx < 2; ++dx){
                    var line = y + dy;
                    var column = x + dx;
                    if (grid[line] && grid[line][column]) {
                        var cells = this.findBlocksInside('cell');
                        cells.forEach(function(cell){
                            if ((cell.params.x == column) && (cell.params.y == line)) cell.setMod('state', 'open');
                        });
                    }
                }
            }
        }

    },{

    });

    provide(DOM);
});