// filepath: phoneme-sound-player/public/login-popup.js
class LoginPopup {
    constructor() {
        this.popup = document.createElement('div');
        this.popup.className = 'modal fade show d-block';
        this.popup.tabIndex = -1;
        this.popup.style.background = 'rgba(0,0,0,0.3)';
        this.popup.innerHTML = this.getPopupHTML();
        document.body.appendChild(this.popup);
        document.body.classList.add('modal-open');
        this.bindEvents();
    }

    getPopupHTML() {
        return `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Login</h5>
                    <button type="button" class="btn-close" id="closePopup" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="loginForm" autocomplete="off">
                        <div class="mb-3">
                            <input type="text" id="username" class="form-control" placeholder="Username" required />
                        </div>
                        <div class="mb-3">
                            <input type="password" id="password" class="form-control" placeholder="Password" required />
                        </div>
                        <div id="loginMessage" class="text-danger small mb-2"></div>
                        <button type="submit" class="btn btn-primary w-100">Login</button>
                    </form>
                </div>
            </div>
        </div>
        `;
    }

    bindEvents() {
        const form = this.popup.querySelector('#loginForm');
        const closeButton = this.popup.querySelector('#closePopup');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.login();
        });

        closeButton.addEventListener('click', () => {
            this.close();
        });

        // Close modal on backdrop click
        this.popup.addEventListener('mousedown', (e) => {
            if (e.target === this.popup) this.close();
        });
    }

    async login() {
        const username = this.popup.querySelector('#username').value;
        const password = this.popup.querySelector('#password').value;

        try {
            const response = await fetch('./login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (response.ok && data.token) {
                localStorage.setItem('token', data.token);
                this.close();
                // Optionally: dispatch event for parent to update UI
                window.dispatchEvent(new CustomEvent('user-logged-in'));
            } else {
                this.showMessage(data.error || 'Login failed');
            }
        } catch (error) {
            this.showMessage('An error occurred. Please try again.');
        }
    }

    showMessage(message) {
        const messageDiv = this.popup.querySelector('#loginMessage');
        messageDiv.textContent = message;
    }

    close() {
        this.popup.remove();
        document.body.classList.remove('modal-open');
    }
}

// To use the LoginPopup, create an instance when needed
// new LoginPopup();