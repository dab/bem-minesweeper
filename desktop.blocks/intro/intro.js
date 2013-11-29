modules.define('i-bem__dom', ['jquery'], function(provide, $, DOM) {

    var CHANNEL_NAME = 'cells';
    var CHANNEL_EVENT_RESET = 'reset';
    var CHANNEL_EVENT_CHEAT = 'cheat';
    var CHANNEL_EVENT_VALIDATE = 'validate';

    DOM.decl('intro',
        {
            onSetMod : {
                'js' : {
                    'inited': function() {

                        this.bindTo('reset', 'click', function() {
                            DOM.channel(CHANNEL_NAME).trigger(CHANNEL_EVENT_RESET);
                        });

                        this.bindTo('cheat', 'click', function() {
                            this.toggleMod('cheat');
                            DOM.channel(CHANNEL_NAME).trigger(CHANNEL_EVENT_CHEAT);
                        });

                        this.bindTo('validate', 'click', function() {
                            DOM.channel(CHANNEL_NAME).trigger(CHANNEL_EVENT_VALIDATE);
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