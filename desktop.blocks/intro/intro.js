modules.define('i-bem__dom', ['jquery'], function(provide, $, DOM) {

    var CHANNEL_NAME = 'cells';
    var CHANNEL_EVENT_RESET = 'reset';
    var CHANNEL_EVENT_CHEAT = 'cheat';

    DOM.decl('intro',
        {
            onSetMod : {
                'js' : {
                    'inited': function() {

                        this.bindTo('reset', 'click', function(e) {
                            this.delMod('cheat');
                            DOM.channel(CHANNEL_NAME).trigger(CHANNEL_EVENT_RESET);
                        });

                        var _this = this;
                        this.bindTo('cheat', 'click', function(e) {
                            this.toggleMod('cheat');
                            DOM.channel(CHANNEL_NAME).trigger(CHANNEL_EVENT_CHEAT);
                        });

                    }
                }
            }
        },
        {
            /* статические методы */
        }
    );

    provide(DOM);

});