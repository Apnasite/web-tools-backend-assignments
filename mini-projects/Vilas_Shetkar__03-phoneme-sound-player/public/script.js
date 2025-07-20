class PhonemeApp extends HTMLElement {
    constructor() {
        super();
        this.loginPopup = null;
        this.registerPopup = null;
    }

    connectedCallback() {
        // Dynamically load required component scripts if not already loaded
        this._scriptElements = [];
        const scripts = [
            { src: 'login-popup.js', id: 'login-popup-script' },
            { src: 'register-popup.js', id: 'register-popup-script' },
            { src: 'phoneme-sound-player.js', id: 'phoneme-sound-player-script' }
        ];
        scripts.forEach(({ src, id }) => {
            if (!document.getElementById(id)) {
                const script = document.createElement('script');
                script.src = src;
                script.defer = true;
                script.id = id;
                document.head.appendChild(script);
                this._scriptElements.push(script);
            }
        });

        this.render();
        this.cacheDom();
        this.addEventListeners();
        this.updateUI();
    }

    disconnectedCallback() {
        // Remove dynamically added scripts
        if (this._scriptElements) {
            this._scriptElements.forEach(script => {
                if (script.parentNode) {
                    script.parentNode.removeChild(script);
                }
            });
            this._scriptElements = [];
        }
    }

    render() {
        this.innerHTML = `
        <div id="auth-container" class="text-center my-5">
            <button id="loginBtn" class="btn btn-primary m-2">Login</button>
            <button id="registerBtn" class="btn btn-secondary m-2">Register</button>
        </div>
        <div id="player-container" style="display:none;">
            <button id="logoutBtn" class="btn btn-outline-danger float-end m-2">Logout</button>
            <phoneme-sound-player></phoneme-sound-player>
        </div>
        `;
    }

    cacheDom() {
        this.authContainer = this.querySelector('#auth-container');
        this.playerContainer = this.querySelector('#player-container');
        this.loginBtn = this.querySelector('#loginBtn');
        this.registerBtn = this.querySelector('#registerBtn');
        this.logoutBtn = this.querySelector('#logoutBtn');
    }

    addEventListeners() {
        this.loginBtn.onclick = () => this.showLoginPopup();
        this.registerBtn.onclick = () => this.showRegisterPopup();
        if (this.logoutBtn) {
            this.logoutBtn.onclick = () => this.logout();
        }
    }

    showLoginPopup() {
        if (this.loginPopup) return;
        this.loginPopup = new LoginPopup();
        // Patch loginPopup close to clean up reference
        const origClose = this.loginPopup.close.bind(this.loginPopup);
        this.loginPopup.close = () => {
            origClose();
            this.loginPopup = null;
        };
        // Patch loginPopup login to update UI on success
        const origLogin = this.loginPopup.login.bind(this.loginPopup);
        this.loginPopup.login = async () => {
            await origLogin();
            if (localStorage.getItem('token')) {
                this.updateUI();
                this.loginPopup && this.loginPopup.close();
            }
        };
    }

    showRegisterPopup() {
        if (this.registerPopup) return;
        this.registerPopup = new RegisterPopup();
        // Patch registerPopup close to clean up reference
        const origClose = this.registerPopup.close.bind(this.registerPopup);
        this.registerPopup.close = () => {
            origClose();
            this.registerPopup = null;
        };
    }

    logout() {
        localStorage.removeItem('token');
        this.updateUI();
    }

    updateUI() {
        const token = localStorage.getItem('token');
        if (token) {
            this.authContainer.style.display = 'none';
            this.playerContainer.style.display = '';
        } else {
            this.authContainer.style.display = '';
            this.playerContainer.style.display = 'none';
        }
    }
}

customElements.define('phoneme-app', PhonemeApp);

if (!window.customElementsList) window.customElementsList = [];

if (!window.customElementsList.find(item => item.component === 'phoneme-app')) {
    window.customElementsList.push({ component: 'phoneme-app', componentClass: PhonemeApp });
}