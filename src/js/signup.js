import { signupURL } from "./config/url.js";

function fadeInStepOne() {
    document.getElementById('stepone').hidden = false;
    document.getElementById('stepone').classList.add('fade-in');
}

window.addEventListener('DOMContentLoaded', function() {
    fadeInStepOne();
});

document.getElementById('submitone').addEventListener('click', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;

    if (username.trim() === "") {
        alert("Please enter your username.");
        return;
    }

    document.getElementById('stepone').classList.add('fade-out');

    setTimeout(function() {
        document.getElementById('stepone').hidden = true;
        document.getElementById('steptwo').hidden = false;

        document.getElementById('steptwo').classList.add('fade-in');
    }, 500);
});

document.getElementById('submittwo').addEventListener('click', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const passkey = document.getElementById('passkey').value;
    const passkeyConfirm = document.getElementById('passkey-confirm').value;

    // Password verification
    if (passkey !== passkeyConfirm) {
        alert("Passwords do not match. Please try again.");
        return;
    }

    if (!verifyPassword(passkey)) {
        alert("Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
        return;
    }

    const payload = {
        username: username,
        password: passkey
    };

    fetch(signupURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        console.log('Raw response:', response);
        if (!response.ok) {
            console.error('Response error:', response.status, response.statusText);
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data) {
            window.location.href = 'https://syncro.herobuxx.me/login';
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
        alert('An error occurred while trying to log in.');
    });
});

function verifyPassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
}