var mentionButtonCreateTimer = setInterval(function () {
    var activeCid = TS.model.active_cid;
    if (activeCid != null) {
        clearInterval(mentionButtonCreateTimer);
        var members = {};
        var channel = TS.channels.getChannelById(activeCid);
        channel = (channel == null) ? TS.mpims.getMpimById(activeCid): channel;

        if (channel == null) {
            channel = TS.ims.getImById(activeCid);
            if (channel == null) {
                console.error('Invalid channel id ' + activeCid);
                return;
            }

            members[channel.user] = channel.name;
        } else {
            channel.members.forEach(function (k) {
                members[k] = TS.members.getMemberById(k).name;
            });
        }

        if (!members) {
            console.error('Channel id ' + activeCid + ' doesn\'t have any members');
            return;
        }

        var messages = document.querySelectorAll('ts-message.message');
        for (var i = 0; i < messages.length; i++) {
            var action = 'mention';
            var message = messages[i];
            var actionHoverContainer = message.querySelector('div.action_hover_container');
            if (actionHoverContainer == null) {
                continue;
            }

            var mention = actionHoverContainer.querySelector('a[data-click="' + action + '"]');
            if (mention == null) {
                var sender = message.querySelector('div.message_content a.message_sender');
                if (sender == null) {
                    continue;
                }

                var id = sender.getAttribute('data-member-id');
                var mem = TS.members.getMemberById(id);
                if (mem == null) {
                    continue;
                }

                mention = document.createElement('a');
                mention.setAttribute('title', 'Mention');
                mention.setAttribute('data-click', action);
                mention.setAttribute('data-mention', mem.name);
                mention.setAttribute('class', 'ts_icon ts_icon_mentions ts_tip ts_tip_top ts_tip_float ts_tip_delay_600');
                mention.addEventListener('click', function (e) {
                    var input = document.querySelector('textarea#message-input');
                    if (input.getAttribute('disabled') != 'disabled') {
                        input.value = input.value.trim() + ' @' + e.target.getAttribute('data-mention') + ': ';
                        input.focus();
                    }
                });

                actionHoverContainer.insertBefore(mention, actionHoverContainer.firstChild);
            }
        }
    }
}, 1000);
