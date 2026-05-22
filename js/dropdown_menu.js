$(function() {
    "use strict"; // And enable strict mode for this library

    $('.drop-down-trigger').each(function() {
        var trigger = this;
        var target = $($(this).attr('data-target'));
        var mask = $($(this).attr('data-mask'));

        // Align dropdown's left edge with the trigger's left edge.
        // Computed at open time so the nav can be reordered freely.
        var position_target = function() {
            var rect = trigger.getBoundingClientRect();
            target.css({left: rect.left + 'px', right: 'auto'});
        };

        var toggle_menu = function() {
            position_target();
            $(trigger).toggleClass('active');
            $(target).toggleClass('open');
            $(mask).toggleClass('active');
        };

        $(this).on('click', function() {
            toggle_menu();
        });

        $(mask).on('click', function() {
            toggle_menu();
        });
    });

    // Bind to the click events on the mobile nav buttons
    $('.mobile-nav-button.mobile-links').on('click', function() {
        $('.mobile-nav.mobile-nav-links').toggleClass('in');

        if ($('.mobile-nav.mobile-user-links').hasClass('in')) {
            $('.mobile-nav.mobile-user-links').toggleClass('in');
        }
    });

    $('.mobile-nav-button.mobile-user').on('click', function() {
        $('.mobile-nav.mobile-user-links').toggleClass('in');

        if ($('.mobile-nav.mobile-nav-links').hasClass('in')) {
            $('.mobile-nav.mobile-nav-links').toggleClass('in');
        }
    });
});