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
    var street = document.getElementById('street').value;
    var street2 = document.getElementById('street2').value;

    if (street != "" || street2 != "") {
        window.location.reload();
    } else {
        if (e.target.id = "quoteSubmit") {
            document.getElementById('quoteForm').submit();
        } else {
            document.getElementById('referralForm').submit();
        }
    }
}
