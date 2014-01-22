modules.define('i-bem__dom', ['jquery', 'BEMHTML'], function(provide, $, BEMHTML, DOM){

    var CHANNEL_NAME = 'cells';
    var CHANNEL_EVENT_RESET = 'reset';
    var CHANNEL_EVENT_CHEAT = 'cheat';
    var CHANNEL_EVENT_VALIDATE = 'validate';

    DOM.decl('grid',{
        onSetMod: {
            'js': {
                'inited': function(){
                    this.delMod('reset')
                        .setMod('state', 'gaming');

                    this.grid = [];
                    this.buildWorld();

                    var channel = DOM.channel(CHANNEL_NAME);
                    var cellsClosed = 0;

                    this.cells = DOM.blocks.cell;

                    channel.on(CHANNEL_EVENT_RESET, {}, function () {
                        this.setMod('reset');
                    }, this);

                    channel.on(CHANNEL_EVENT_CHEAT, {}, function () {
                        this.toggleMod('cheat');
                    }, this);

                    channel.on(CHANNEL_EVENT_VALIDATE, {}, function () {
                        var markedCorrectMines = 0;
                        this.cells.forEach(function(cell){
                            if ((cell.hasMod('state', 'maybe')) && cell.params.mine ) markedCorrectMines++;
                        });
                        if ((markedCorrectMines === this.params.totalMines) ) this.setMod('state', 'won');
                    }, this);
                }
            },
            'state': {
                'gameover': function(){
                    this.cells.forEach(function(cell){
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
        buildWorld: function(){
            this.cellsClosed = this.params.width * this.params.height;
            this.buildGrid();
            this.addRandomMines();
            this.buildGridOnDOM();
        },
        buildGrid: function(){
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
        addRandomMines: function(){
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
        buildGridOnDOM: function(){
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