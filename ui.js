document.getElementById('sumbitone').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get the username input value
    const username = document.getElementById('username').value;

    // Check if the username is filled
    if (username.trim() === "") {
        alert("Please enter your username.");
        return;
    }

    // Add fade-out class to stepone
    document.getElementById('stepone').classList.add('fade-out');

    // Wait for the fade-out animation to complete
    setTimeout(function() {
        // Hide stepone and show steptwo
        document.getElementById('stepone').hidden = true;
        document.getElementById('steptwo').hidden = false;

        // Add fade-in class to steptwo
        document.getElementById('steptwo').classList.add('fade-in');
    }, 500); // Duration of the fade-out animation
});
