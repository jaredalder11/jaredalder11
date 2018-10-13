function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function() {
    let form = document.getElementById('redirect');
    let form2 = document.getElementById('redirect2');
    let redirectElement = document.createElement('input');
    redirectElement.setAttribute('name', '*redirect');
    redirectElement.setAttribute('type', 'hidden');

    // If the site is local, it won't set the redirect element of form
    if (window.location.href.substring(0, 4) === 'http') {
        redirectElement.setAttribute('value', 'https://www.alderpestcontrol.com/thanks.html');
        form.appendChild(redirectElement);
        form2.appendChild(redirectElement);
    }

    // Set event listener for mobile nav
    document.getElementById('mobile-nav-trigger').addEventListener('click', showMobileNav);
    window.addEventListener('resize', closeMobileNav);

    // Add the year
    let d = new Date();
    document.getElementById('year').textContent = d.getFullYear();

    // Add Event Listener to close mobile nav when link is clicked
    let anchors = document.getElementById('mobile-nav-dropdown').getElementsByTagName('a');
    for (let i = 0; i < anchors.length; i++) {
        anchors[i].addEventListener('click', closeMobileNav);
    }
});

function showMobileNav() {
    let nav = document.getElementById('mobile-nav-dropdown');

    if (nav.style.display == 'flex') {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'flex';
    }
}

function closeMobileNav() {
    document.getElementById('mobile-nav-dropdown').style.display = 'none';
}
