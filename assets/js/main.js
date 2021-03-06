$(window).load(function () {
    // When the page has loaded
    $("body").fadeIn(1000);

    $('<label class="infoMsg">My site it has not completed yet.I will keep updating.</label> <i id="excm" class="fas fa-exclamation fa-3x"></i>').appendTo('#banner');

    setInterval(function () {
        $('.fa-exclamation').fadeIn(300).fadeOut(500);
    }, 500);

});

(function ($) {

    skel.breakpoints({
        xlarge: '(max-width: 1680px)',
        large: '(max-width: 1280px)',
        medium: '(max-width: 980px)',
        small: '(max-width: 736px)',
        xsmall: '(max-width: 480px)'
    });

    $(function () {

        var $window = $(window),
            $body = $('body');

        // Disable animations/transitions until the page has loaded.
        $body.addClass('is-loading');

        $window.on('load', function () {
            window.setTimeout(function () {
                $body.removeClass('is-loading');
            }, 100);
        });

        // Fix: Placeholder polyfill.
        $('form').placeholder();

        // Prioritize "important" elements on medium.
        skel.on('+medium -medium', function () {
            $.prioritize(
                '.important\\28 medium\\29',
                skel.breakpoint('medium').active
            );
        });

        // Navigation Panel Toggle.
        $('<a href="#navPanel" class="navPanelToggle"></a>')
            .appendTo($body);

        // Navigation Panel.
        $(
            '<div id="navPanel">' +
            $('#nav').html() +
            '<a href="#navPanel" class="close"></a>' +
            '</div>'
        )
            .appendTo($body)
            .panel({
                delay: 500,
                hideOnClick: true,
                hideOnSwipe: true,
                resetScroll: true,
                resetForms: true,
                side: 'left'
            });

        // Fix: Remove transitions on WP<10 (poor/buggy performance).
        if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
            $('#navPanel')
                .css('transition', 'none');

    });


})(jQuery);

// top page, bottom page, rotate logo
$(function () {


    $("#up").click(function () {
        $("html, body").animate({ scrollTop: 0 }, "fast");
        return false;
    });
    
    $("#down").click(function () {
        $('html,body').animate({ scrollTop: 9999 }, 'fast');
        return false;
    });


})

/*Added non-passive event listener to a scroll-blocking 'touchstart' event WITHOUT THIS CHROME REPORTS BUG */
jQuery.event.special.touchstart = {
    setup: function (_, ns, handle) {
        if (ns.includes("noPreventDefault")) {
            this.addEventListener("touchstart", handle, { passive: false });
        } else {
            this.addEventListener("touchstart", handle, { passive: true });
        }
    }
};
jQuery.event.special.touchmove = {
    setup: function (_, ns, handle) {
        if (ns.includes("noPreventDefault")) {
            this.addEventListener("touchmove", handle, { passive: false });
        } else {
            this.addEventListener("touchmove", handle, { passive: true });
        }
    }
};