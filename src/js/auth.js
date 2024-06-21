import { authURL, reqpassURL } from "./config/url.js";

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

    const url = `${reqpassURL}/${username}`;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username })
    })
    .then(response => {
        if (!response.ok) {
            console.error('Response error:', response.status, response.statusText);
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Passkey request response data:', data);
        // Handle response data as needed
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Passkey request failed!');
    });
});

document.getElementById('submittwo').addEventListener('click', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const passkey = parseInt(document.getElementById('passkey').value);

    if (isNaN(passkey)) {
        alert("Please enter a valid passkey.");
        return;
    }

    const payload = {
        username: username,
        passkey: passkey
    };

    console.log('Sending payload:', payload);

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

        if (data.message === "Login successful" && data.token) {
            document.cookie = `token=${data.token}; path=/; secure`;
            alert('Login successful!');
        } else {
            alert('Login failed: ' + (data.message || 'Unknown error'));
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Login failed!');
    });
});
