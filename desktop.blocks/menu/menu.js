modules.define('i-bem__dom', ['events__channels'], function(provide, channels, DOM) {

    var CHANNEL_NAME = 'cells';
    var CHANNEL_EVENT_RESET = 'reset';
    var CHANNEL_EVENT_CHEAT = 'cheat';
    var CHANNEL_EVENT_VALIDATE = 'validate';

DOM.decl('menu',
    {
        onSetMod : {
            'js' : {
                'inited': function() {

                    var channel = channels(CHANNEL_NAME);

                    this.bindTo('reset', 'click', function() {
                        channel.trigger(CHANNEL_EVENT_RESET);
                    });

                    this.bindTo('cheat', 'click', function() {
                        this.toggleMod('cheat');
                        channel.trigger(CHANNEL_EVENT_CHEAT);
                    });

                    this.bindTo('validate', 'click', function() {
                        channel.trigger(CHANNEL_EVENT_VALIDATE);
                    });
                }
            }
        }
        });

    provide(DOM);

});
