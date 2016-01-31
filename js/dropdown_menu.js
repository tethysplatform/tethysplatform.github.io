$(function() {
    $('.drop-down-trigger').each(function() {
        var trigger = this;
        var target = $($(this).attr('data-target'));
        var mask = $($(this).attr('data-mask'));

        var toggle_menu = function() {
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
    })
});