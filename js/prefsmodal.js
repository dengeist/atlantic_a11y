function checkStorage() {
    if (!localStorage.getItem('contrast')) {
        populateStorage();
    } else {
        updateView();
    }
}

function populateStorage(e) {
    var prefName, prefVal;
    // if there is an event from the view
    if (e) {
        prefName = $(e.target).attr('name');
        prefVal = $(e.target).val();
        //set the appropriate storage prop with data from the view
        localStorage.setItem(prefName, prefVal);
    }
    updateView();
}

function updateView() {
    var contrast = localStorage.getItem('contrast');
    var userFont = localStorage.getItem('userFont');
    switch (contrast) {
        case "always":
            $('.contrast[value="always"]').attr('checked', 'checked');
            $('body').addClass('high-contrast');
            break;
        default:
            $('.contrast[value="standard"]').attr('checked', 'checked');
            $('body').removeClass('high-contrast');
    }
    switch (userFont) {
        case "dyslexiaFriendly":
            $('.typeface[value="dyslexiaFriendly"]').attr('checked', 'checked');
            $('body').addClass('dyslexia-friendly');
            break;
        default:
            $('.typeface[value="standard"]').attr('checked', 'checked');
            $('body').removeClass('dyslexia-friendly');
    }
}

$(document).ready(function() {
    var $window = $('window'),
        $prefsBtn = $('#prefs-btn'),
        $prefsModal = $('#prefs-modal'),
        $prefsHeading = $('#prefs-title'),
        $prefsForm = $('#prefs-form'),
        $prefsInputs = $('#prefs-form input'),
        $closeBtn = $('#prefs-form button');



    $prefsBtn.click(function(e) {
        e.preventDefault();
        $prefsModal.show();
        $prefsModal.attr('aria-hidden', 'false');
    });

    $prefsInputs.change(function(e) {
        e.preventDefault();
        populateStorage(e);
    });

    $prefsForm.submit(function(e) {
        e.preventDefault();
        $prefsModal.hide();
        $prefsModal.attr('aria-hidden', 'true');
    });

    $prefsModal.on('keydown', function(e){
        var tabPressed = (e.keycode === 9 || e.which === 9),
            shiftPressed = e.shiftKey;

        if (tabPressed && e.target === $closeBtn[0]) {
            e.preventDefault();
            $prefsHeading.focus();
        }
        if (tabPressed && shiftPressed && e.target === $prefsHeading[0]) {
            e.preventDefault();
            $closeBtn.focus();
        }
        if (e.keycode === 27 || e.which === 27) {
            $prefsModal.hide();
            $prefsModal.attr('aria-hidden', 'true');
        }
    });

    checkStorage();
});
