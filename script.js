
document.addEventListener('DOMContentLoaded', () => {
    const showPasswordCheckbox = document.getElementById('showPassword');
    const passwordField = document.getElementById('password');
    const loginForm = document.getElementById('loginForm');
    const loadingSpinner = document.getElementById('loadingSpinner');

    // Toggle password visibility
    showPasswordCheckbox.addEventListener('change', () => {
        if (showPasswordCheckbox.checked) {
            passwordField.type = 'text';
        } else {
            passwordField.type = 'password';
        }
    });

    // Handle form submission
    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        // Clear previous errors
        document.getElementById('usernameError').innerText = '';
        document.getElementById('passwordError').innerText = '';
        document.getElementById('responseMessage').innerText = '';

        // Get form values
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        let valid = true;

        // Validate username
        if (!username || !/^\S+@\S+\.\S+$/.test(username)) {
            document.getElementById('usernameError').innerText = 'Please enter a valid email.';
            valid = false;
        }

        // Validate password
        if (!password || password.length < 6) {
            document.getElementById('passwordError').innerText = 'Password must be at least 6 characters long.';
            valid = false;
        }

        if (valid) {
            // Show loading spinner
            loadingSpinner.style.display = 'block';

            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                });

                if (response.ok) {
                    document.getElementById('responseMessage').innerText = 'Login successful!';
                    document.getElementById('responseMessage').style.color = 'green';
                } else {
                    document.getElementById('responseMessage').innerText = 'Login failed!';
                    document.getElementById('responseMessage').style.color = 'red';
                }
            } catch (error) {
                document.getElementById('responseMessage').innerText = 'An error occurred. Please try again.';
                document.getElementById('responseMessage').style.color = 'red';
            } finally {
                // Hide loading spinner
                loadingSpinner.style.display = 'none';
            }
        }
    });
});
