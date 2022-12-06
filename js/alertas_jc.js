//------------------------------------------------------------- Variables globales
let browser = false

function Msj(Id, Mensaje, color ='', ubicacion = 'above', error = false, duracion = 1500){
    switch (ubicacion) {
        case 'left':
            $(Id).feedback(Mensaje, { duration: duracion, left: true, type: color });
            $(Id).addClass("ui-state-error");
            break;
        case 'below':
            $(Id).feedback(Mensaje, { duration: duracion, below: true, type: color });
            $(Id).addClass("ui-state-error");
            break;
        case 'right':
            $(Id).feedback(Mensaje, { duration: duracion, right: true, type: color });
            $(Id).addClass("ui-state-error");
            break;
        case 'above':
            $(Id).feedback(Mensaje, { duration: duracion, above: true, type: color });
            $(Id).addClass("ui-state-error");
            break;
    }
    if (error)
        $(Id).focus()
}

(function() {
    jQuery.fn.feedback = function(msgtext, options) {
        var opts = jQuery.extend({
            type: "info",
            infoIcon: "ui-icon-info",
            infoClass: "ui-state-highlight ui-corner-all",
            errorIcon: "ui-icon-alert",
            errorClass: "ui-state-error ui-corner-all",
            duration: 2000,
            left: false,
            below: false,
            right: false,
            above: false,
            offsetX: 10,
            offsetY: 10,
            feedbackClass: "ui-feedback"
        }, options);

        var x = 0;
        var y = 0;
        var divclass = opts.feedbackClass; // Class for container div - error or info . 
        var iconclass = ""; // Icon class- alert or info. 

        if (!msgtext) var msgtext = "Something happened";

        return this.each(function() {
            // handle to the element(s):  
            var me = $(this);
            if (opts.type == "error") {
                divclass = divclass + " " + opts.errorClass;
                iconclass = opts.errorIcon;
            } else {
                divclass = divclass + " " + opts.infoClass;
                iconclass = opts.infoIcon;
            }

            // if the icon class starts with "ui-" assume it's a valid Jquery UI class:  
            if (iconclass.substr(0, 3) == "ui-") iconclass = "ui-icon " + iconclass;
            //alert(msgtext.length)
            // Create DOM elements of div, para (for text) and span (for image) and insert  after current DOM object: 
            var msg = $('<div></div>').css({ display: "none", position: "absolute", paddingRight: "3px" }).addClass(divclass);
            if (browser == true)
                msg = $('<div></div>').css({ display: "none", position: "absolute", paddingRight: "3px", width: msgtext.length * 8 + "px" }).addClass(divclass);
            msg.append('<p><span style="float:left;" class="' + iconclass + '"></span>' + msgtext + '</p>');


            //  var msgheight=document.defaultView.getComputedStyle(msg,null).getPropertyValue("height");

            //  console.log(msgheight); 

            // Insert after this DOM element: 
            me.after(msg);

            // Compute position of me and use as basis for the tip: 
            var p = me.position();
            var meWidth = me.outerWidth(); // Includes padding and border width.  
            var meHeight = me.outerHeight();
            var msgWidth = msg.outerWidth();
            var msgHeight = msg.outerHeight();

            // Put it to specified location of object
            // Left means the margin-offset, as a positive number, is subtracted from the absolute position of 'left' 
            // All are false in the opts object, by default. 
            // in which case, I assume you want the message to the right, on same horizontal plane as selected element. 

            if (opts.left)
                x = p.left - msgWidth - opts.offsetX - 3;
            else if (opts.right)
                x = p.left + meWidth + opts.offsetX;
            else
                x = p.left + meWidth + opts.offsetX;

            if (x < 0) x = 1;
            // Even if developer wants message on the right, if start + length of message exceeds document width, put it to the left: 

            if ((x + msgWidth) > document.body.clientWidth)
                x = p.left - msgWidth - opts.offsetX;

            // Calculate y (top) 
            // Also, if no left/right value specified, then place the message starting aligned with the element 
            if (opts.above) {
                y = p.top - msgHeight - opts.offsetY;
                if (y < 0) y = 0;
                if (!opts.left && !opts.right) x = p.left;
            } else if (opts.below) {
                y = p.top + meHeight + opts.offsetY;
                if (y > document.body.clientHeight) y = p.top;
            }
            // no top or bottom value - place it at same horizontal plane as element. 
            else {
                y = p.top;
            }

            y -= 22;
            console.log(p.top)
            if (browser == true)
                y = y - 180


            // After fadeout remove obsolete object (in a callback -ensures done after the fade): 

            msg.fadeIn("slow")
                .css({ left: x + 'px', top: y + 'px' })
                .animate({ opacity: 1.0 }, opts.duration)
                .fadeOut("slow", function() {
                    $(this).remove();
                });
        });
    };
})(jQuery);
