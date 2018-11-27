function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function() {
    var form = document.getElementById('redirect');
    var form2 = document.getElementById('redirect2');
    var redirectElement = document.createElement('input');
    redirectElement.setAttribute('name', '*redirect');
    redirectElement.setAttribute('type', 'hidden');
    var redirectElement2 = document.createElement('input');
    redirectElement2.setAttribute('name', '*redirect');
    redirectElement2.setAttribute('type', 'hidden');

    // If the site is local, it won't set the redirect element of form
    if (window.location.href.substring(0, 4) === 'http') {
        redirectElement.setAttribute('value', 'https://www.alderpestcontrol.com/thanks.html');
        redirectElement2.setAttribute('value', 'https://www.alderpestcontrol.com/thanks.html');
        form.appendChild(redirectElement);
        form2.appendChild(redirectElement2);
    }

    // Set event listener for mobile nav
    document.getElementById('mobile-nav-trigger').addEventListener('click', showMobileNav);
    window.addEventListener('resize', closeMobileNav);

    // Add the year
    var d = new Date();
    document.getElementById('year').textContent = d.getFullYear();

    // Add Event Listener to close mobile nav when link is clicked
    var anchors = document.getElementById('mobile-nav-dropdown').getElementsByTagName('a');
    for (var i = 0; i < anchors.length; i++) {
        anchors[i].addEventListener('click', closeMobileNav);
    }

    // Event Listeners for submit buttons
    document.getElementById('quoteSubmit').addEventListener('click', submitForm);
    document.getElementById('referSubmit').addEventListener('click', submitForm);
});

function showMobileNav() {
    var nav = document.getElementById('mobile-nav-dropdown');

    if (nav.style.display == 'flex') {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'flex';
    }
}

function closeMobileNav() {
    document.getElementById('mobile-nav-dropdown').style.display = 'none';
}

function submitForm(e) {
    e.preventDefault();

    var form_data = {}

    if (e.target.id == "quoteSubmit") {
        document.getElementById('quoteRing').style.display = 'block';
        form_data.formName = "quoteForm";
        form_data.name = document.getElementById('name').value;
        form_data.phone = document.getElementById('phone').value;
        form_data.email = document.getElementById('email').value;
        form_data.message = document.getElementById('message').value,
        form_data.captcha = grecaptcha.getResponse();
    } else {
        document.getElementById('referralRing').style.display = 'block';
        form_data.formName = "referralForm";
        form_data.referrer_name = document.getElementById('r_name').value;
        form_data.referrer_email = document.getElementById('r_email').value;
        form_data.friend_name = document.getElementById('r_friend_name').value;
        form_data.friend_phone = document.getElementById('r_friend_phone').value;
        form_data.friend_email = document.getElementById('r_friend_email').value;
        form_data.message = document.getElementById('r_message').value;
        form_data.captcha = grecaptcha.getResponse();
    }

    $.ajax({
      method: 'POST',
      url: 'https://openwhisk.ng.bluemix.net/api/v1/web/kory.hutchison%40icloud.com_dev/AlderPestControl/request_refer_form.json',
      dataType: 'json',
      accepts: 'application/json',
      data: form_data,
      success: function(data) { window.location.href = data.url; },
      error: function(err) { window.location.href = err.url }
    });
}
