(function($) {
    
    var slide = function(ele,options) {
        var $ele = $(ele);
        // basic setting option
        var setting = {
        		//animation speed control
            speed: 1000,
            // rrelay speed
            interval: 2000,
            
        };
        // object merge
        $.extend(true, setting, options);
        // picture position, status
        var states = [
            { $zIndex: 1, width: 170, height: 170, top: 69, left: 134, $opacity: 0.2 },
            { $zIndex: 2, width: 180, height: 180, top: 59, left: 0, $opacity: 0.4 },
            { $zIndex: 3, width: 220, height: 220, top: 35, left: 110, $opacity: 0.7 },
            { $zIndex: 4, width: 274, height: 274, top: 0, left: 263, $opacity: 1 },
            { $zIndex: 3, width: 220, height: 220, top: 35, left: 470, $opacity: 0.7 },
            { $zIndex: 2, width: 180, height: 180, top: 59, left: 620, $opacity: 0.4 },
            { $zIndex: 1, width: 170, height: 170, top: 69, left: 500, $opacity: 0.2 }
        ];

        var $lis = $ele.find('li');
        var timer = null;

        // event
        $ele.find('.hi-next').on('click', function() {
            next();
        });
        $ele.find('.hi-prev').on('click', function() {
            states.push(states.shift());
            move();
        });
        $ele.on('mouseenter', function() {
            clearInterval(timer);
            timer = null;
        }).on('mouseleave', function() {
            autoPlay();
        });

        move();
        autoPlay();

        // each li combined with above status
        // let li unfold from the center
        function move() {
            $lis.each(function(index, element) {
                var state = states[index];
                $(element).css('zIndex', state.$zIndex).finish().animate(state, setting.speed).find('img').css('opacity', state.$opacity);
            });
        }

        // switch to next
        function next() {
            // Principle: Move the last element of an array to the first element
            states.unshift(states.pop());
            move();
        }

        function autoPlay() {
            timer = setInterval(next, setting.interval);
        }
    }
    // Locate the root label of the rotational graph to be rotated and call slide()
    $.fn.hiSlide = function(options) {
        $(this).each(function(index, ele) {
            slide(ele,options);
        });
        // Returns a value to support chain calls
        return this;
    }
})(jQuery);
