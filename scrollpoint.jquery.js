(function($) {
    $.scrollpoint = function(element, options) {
        var opts = $.extend({
            offset: 0,
            triggeredClass: '',
            animation: '',
            delay:0,
            loadAfter: false,
            beforeTrigger: function(){},
            onTrigger: function(){}
        }, options);
        var element = element[0];

        // add space before classname if one exists already
        if(element.className != ''){
            element.className += ' ';
        }
        element.className += 'scrollpoint';

        // add animation class
        if(opts.animation){
            element.className += ' '+opts.animation;
        }

        // start scroll/resize functionality to trigger animations
        $(window).on('scroll resize', function(){
            // define variables used.
            var scrollPos = window.pageYOffset;
                itemTop = element.getBoundingClientRect().top,
                itemBottom = element.getBoundingClientRect().bottom,
                windowHeight = window.innerHeight,
                bottomOfScreen = scrollPos+windowHeight,
                topOfScreen = scrollPos,
                scrollUpVisible = (itemBottom >= ((windowHeight*.1)+opts.offset)),
                scrollDownVisible = (itemTop <= (windowHeight - (windowHeight*.1)-opts.offset));

            // if the top of the item is higher than the bottom of the screen
            // and the bottom of the item is lower than the top of the screen,
            // that means it is viewable in the window. There's a defined offset
            // of 10% of the window size to make sure the animation is seen when
            // it happens, a slight "delay".
            if(
                (
                    scrollDownVisible
                    && scrollUpVisible
                    && !$(element).hasClass('sp-triggered')
                ) ||
                $(element).hasClass('sp-force-trigger')
            ) {
                if(opts.loadAfter){
                    // if the element it is dependant on has not been triggered, go back and trigger it, the user is scrolling up
                    if(!opts.loadAfter.hasClass('sp-triggered') && !opts.loadAfter.addClass('sp-force-trigger') && !opts.loadAfter.hasClass('sp-trigger-completed')){
                        opts.loadAfter.addClass('sp-force-trigger');
                    }
                    if(opts.loadAfter.hasClass('sp-trigger-completed')){
                        animateit(element, opts);
                    }
                } else {
                    animateit(element, opts);
                }
            }
        });
    }

    function animateit(element, opts){
        opts.beforeTrigger();
        $(element).removeClass('sp-force-trigger');
        // add the class name sp-triggered
        element.className = element.className.replace('sp-pre-triggered', '');
        element.className += ' sp-triggered';

        // if any custom classes are provided to add on trigger, they're added here
        if(opts.triggeredClass){element.className += ' '+opts.triggeredClass;}

        // trigger a window scroll to possibly load the next element if there is one
        $(window).trigger('scroll');

        $(element).on('transitionend webkitTransitionEnd', function(e){
            $(this).addClass('sp-trigger-completed');

            // trigger a window scroll to possibly load the next element if there is one
            $(window).trigger('scroll');
        });

        // fire the onTrigger function provided
        opts.onTrigger(element);
    }

    $.fn.scrollpoint = function(options) {
        return this.each(function() {
            if (undefined == $(this).data('scrollpoint')) {
                var plugin = new $.scrollpoint($(this), options);
                $(this).data('scrollpoint', plugin);
            }
        });
    }

    // this make sure any animations on screen already happen on load without having to wait for a scroll action
    $(document).ready(function(){
        $(window).trigger('scroll');
    });
    $(window).load(function(){
        $(window).trigger('scroll');
    });
})(jQuery);