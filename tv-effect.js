(function() {
    var SELECTOR_SCREEN_ELEMENT = '#screen';
    var SELECTOR_SWITCHER_TV = '#switcher-tv';
    
    var isTurnedOn = true;
    var timeline;
    
    function buildTimeline() {
        timeline = new TimelineMax({
            paused: true
        });
        
        // First, make the screen white
        timeline.to(SELECTOR_SCREEN_ELEMENT, 0.1, {
            background: '#ffffff',
            ease: Power2.easeOut
        })
        // Then close vertically (top and bottom meeting in middle)
        .to(SELECTOR_SCREEN_ELEMENT, 0.3, {
            height: '2px',
            top: '50%',
            marginTop: '-1px',
            ease: Power2.easeInOut
        })
        // Then close horizontally (sides meeting in middle)
        .to(SELECTOR_SCREEN_ELEMENT, 0.3, {
            width: '2px',
            left: '50%',
            marginLeft: '-1px',
            ease: Power2.easeInOut
        })
        // Finally, make it black and shrink to nothing
        .to(SELECTOR_SCREEN_ELEMENT, 0.1, {
            width: '0',
            height: '0',
            background: '#000000',
            ease: Power2.easeOut
        });
    }
    
    function toggleSwitcherTV() {
        if (isTurnedOn) {
            timeline.restart();
        } else {
            timeline.reverse();
        }
        
        isTurnedOn = !isTurnedOn;
    }
    
    // Initialize
    $(document).ready(function() {
        buildTimeline();
        
        // Bindings
        $(document).on('click', SELECTOR_SWITCHER_TV, function() {
            toggleSwitcherTV();
        });
    });
})(); 