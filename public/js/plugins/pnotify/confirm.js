// see config.pnotify.js

'use strict';

$(function () {
    var showConfirmDialog = function (title, text, callback, buttons) {
        if (typeof buttons !== 'object') {
            buttons = {
                'Yes': true,
                'No': false
            };
        }

        var notice;

        text = $('<div>' + text + '<br style="clear: both;" /><div class="button-container" style="margin-top: 10px; text-align: right;"></div></div>');

        $.each(buttons, function(b, val) {
            text.find('div.button-container').append($('<button style="margin-left: 5px;" class="btn btn-default btn-small">' + b + '</button>').click(function() {
                notice.remove();
                callback.call(notice, val);
            }));
        });
        
        notice = new PNotify({
            title: title,
            text: text,
            insert_brs: false,
            closer: false,
            sticker: false,
            hide: false,
            history: false,
            icon: 'glyphicon glyphicon-question-sign',
            addclass: PNotify.customConfig.stack.class,
            stack: PNotify.customConfig.stack.position
        });
    };

    $(document).on('click', '[data-notify=confirm]', function (e) {
        e.preventDefault();
        var that = $(e.currentTarget);
        var message = that.data().notifyMessage || 'Do you really want to proceed?';
        showConfirmDialog('Confirm', message, function(isConfirmed) {
            if (isConfirmed) {
                window.location = that.attr('href');
            }
        });        
    });
});