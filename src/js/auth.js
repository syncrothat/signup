import { authURL } from "./config/url.js";

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

    const payload = {
        username: username,
        password: passkey
    };

    fetch(authURL, {
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
        console.log('Response data:', data);
    
        if (data.token) {
            document.cookie = `token=${data.token}; path=/; secure`;
            window.location.href = 'https://syncroapp.github.io/Desk';
        } else {
            alert('Login failed: ' + (data.message || 'Unknown error'));
        }
    })
});
