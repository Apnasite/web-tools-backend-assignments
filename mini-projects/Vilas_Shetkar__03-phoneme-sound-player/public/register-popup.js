class RegisterPopup {
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
                    <h5 class="modal-title">Register</h5>
                    <button type="button" class="btn-close" id="closePopup" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="registerForm" autocomplete="off">
                        <div class="mb-3">
                            <input type="text" id="username" class="form-control" placeholder="Username" required />
                        </div>
                        <div class="mb-3">
                            <input type="password" id="password" class="form-control" placeholder="Password" required />
                        </div>
                        <div class="mb-3">
                            <input type="text" id="mobile" class="form-control" placeholder="Mobile Number" required />
                        </div>
                        <div id="message" class="text-danger small mb-2"></div>
                        <button type="submit" class="btn btn-secondary w-100">Register</button>
                    </form>
                </div>
            </div>
        </div>
        `;
    }

    bindEvents() {
        this.popup.querySelector('#registerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.registerUser();
        });

        this.popup.querySelector('#closePopup').addEventListener('click', () => {
            this.close();
        });

        // Close modal on backdrop click
        this.popup.addEventListener('mousedown', (e) => {
            if (e.target === this.popup) this.close();
        });
    }

    async registerUser() {
        const username = this.popup.querySelector('#username').value;
        const password = this.popup.querySelector('#password').value;
        const mobile = this.popup.querySelector('#mobile').value;

        try {
            const response = await fetch('./register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, mobile }),
            });

            const result = await response.json();
            const messageDiv = this.popup.querySelector('#message');

            if (response.ok && result.success) {
                messageDiv.textContent = 'Registration successful! You can now log in.';
                messageDiv.classList.remove('text-danger');
                messageDiv.classList.add('text-success');
                this.clearForm();
            } else {
                messageDiv.textContent = result.error || 'Registration failed.';
                messageDiv.classList.remove('text-success');
                messageDiv.classList.add('text-danger');
            }
        } catch (err) {
            const messageDiv = this.popup.querySelector('#message');
            messageDiv.textContent = 'Registration error. Please try again.';
            messageDiv.classList.remove('text-success');
            messageDiv.classList.add('text-danger');
        }
    }

    clearForm() {
        this.popup.querySelector('#username').value = '';
        this.popup.querySelector('#password').value = '';
        this.popup.querySelector('#mobile').value = '';
    }

    close() {
        this.popup.remove();
        document.body.classList.remove('modal-open');
    }
}

// To use the RegisterPopup, create an instance when needed
// new RegisterPopup();