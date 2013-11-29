modules.define('i-bem__dom', ['jquery', 'BEMHTML'], function(provide, $, BEMHTML, DOM){

    var CHANNEL_NAME = 'cells';
    var CHANNEL_EVENT_RESET = 'reset';
    var CHANNEL_EVENT_CHEAT = 'cheat';
    var CHANNEL_EVENT_VALIDATE = 'validate';

    DOM.decl('grid',{
        onSetMod: {
            'js': {
                'inited': function(){
                    this.setMod('reset', false);
                    this.setMod('state', 'gaming');
                    this.grid = [];
                    var cellsClosed = 0;
                    this._buildWorld();

                    DOM.channel(CHANNEL_NAME).on(CHANNEL_EVENT_RESET, {}, function () {
                        this.setMod('reset');
                    }, this);

                    DOM.channel(CHANNEL_NAME).on(CHANNEL_EVENT_CHEAT, {}, function () {
                        this.toggleMod('cheat');
                    }, this);

                    DOM.channel(CHANNEL_NAME).on(CHANNEL_EVENT_VALIDATE, {}, function () {
                        var markedCorrectMines = 0;
                        this.findBlocksInside('cell').forEach(function(cell){
                            if ((cell.hasMod('state', 'maybe')) && cell.params.mine ) markedCorrectMines++;
                        });
                        if ((markedCorrectMines === this.params.totalMines) ) this.setMod('state', 'won');
                    }, this);
                }
            },
            'state': {
                'gameover': function(){
                    var cells = this.findBlocksInside('cell');
                    cells.forEach(function(cell){
                        cell.params.mine && cell.setMod('state', 'mine');
                    });
                }
            },
            'reset': {
                true: function(){
                    var cheatReady =  (this.hasMod('cheat')) ? true : false;
                    DOM.replace(this.domElem, BEMHTML.apply({
                        block: 'grid',
                        js: this.params,
                        mods: { cheat: cheatReady }
                    }));
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
                    var currentCell = _this.grid[index][columnNum];
                    DOM.append(
                        this,
                        BEMHTML.apply({
                            block: 'cell',
                            content: '&nbsp;',
                            js: {
                                x: currentCell.x,
                                y: currentCell.y,
                                mine: currentCell.mine
                            }
                        })
                    )
                }

            });
        }
    },{

    });

    provide(DOM);
});