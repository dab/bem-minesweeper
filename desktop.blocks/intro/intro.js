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
                            DOM.channel(CHANNEL_NAME).trigger(CHANNEL_EVENT_RESET);
                        });

                        this.bindTo('cheat', 'click', function(e) {
                            DOM.channel(CHANNEL_NAME).trigger(CHANNEL_EVENT_CHEAT);

                        });

                    }
                }
            },
            onElemSetMod: {

            }
        },
        {
            /* статические методы */
        }
    );

    provide(DOM);

});