(function() {
    var code = function() {
        //noinspection JSUnresolvedVariable
        var buildMsgHTML = TS.templates.builders.buildMsgHTML;

        //noinspection JSUnresolvedVariable
        TS.templates.builders.buildMsgHTML = function(O, h) {
            var $html = buildMsgHTML(O, h);
            try {
                var $div = $('<div>').html($html);
                var $url = $div.find('a.message_sender').attr('href');
                var $container = $div.find('div.action_hover_container');
                var $mention = $container.find('a[data-action="mention"]');
                if ($url && !$mention.length) {
                    $mention = $('<a>')
                        .attr('data-action', 'mention')
                        .attr('data-mention', $url.split('/')[2])
                        .addClass('ts_icon ts_icon_mentions')
                        .addClass('ts_tip ts_tip_top ts_tip_float ts_tip_delay_600 ts_tip_hidden')
                        .append($('<span>').addClass('ts_tip_tip').html('Mention'));
                    $container.prepend($mention);
                }

                return $div.html();
            } catch (e) {
                console.error(e);
                return $html;
            }
        };

        $(document).on('click', '[data-action="mention"]', function(e) {
            var $input = $("#message-input");
            var $msg = $input.val() + '@' + $(e.target).data('mention');

            $input.val($msg.trim() + ' ')
                .trigger("autosize")
                .trigger("autosize-resize")
                .focus();
        });
    };

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = '(' + code.toString() + ')();';
    document.body.appendChild(script);
})();