class PhonemeApp extends HTMLElement {
    constructor() {
        super();
        this.loginPopup = null;
        this.registerPopup = null;
    }

    connectedCallback() {
        this._scriptElements = [];
        const currentScript = document.currentScript || Array.from(document.getElementsByTagName('script')).find(s => s.src && s.src.includes('script.js'));
        let basePath = '';
        if (currentScript) {
            basePath = currentScript.src.substring(0, currentScript.src.lastIndexOf('/') + 1);
        }
        window.phonemeAppBasePath = basePath;
        const scripts = [
            { src: basePath + 'login-popup.js', id: 'login-popup-script' },
            { src: basePath + 'register-popup.js', id: 'register-popup-script' },
            { src: basePath + 'phoneme-sound-player.js', id: 'phoneme-sound-player-script' }
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
        // Detect domain
        const isServicesDomain = window.location.hostname === 'services.apnasite.in';
        if (isServicesDomain) {
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
        } else {
            // Show message and register button if not services.apnasite.in
            this.innerHTML = `
            <div class="text-center my-5">
                <div class="alert alert-warning mb-4">
                    Login/Register to access this content.
                </div>
                <a href="/auth/register" class="btn btn-secondary">Register</a>
            </div>
            `;
        }
    }

    cacheDom() {
        this.authContainer = this.querySelector('#auth-container');
        this.playerContainer = this.querySelector('#player-container');
        this.loginBtn = this.querySelector('#loginBtn');
        this.registerBtn = this.querySelector('#registerBtn');
        this.logoutBtn = this.querySelector('#logoutBtn');
    }

    addEventListeners() {
        // Only add login/register/logout logic if on services.apnasite.in
        if (window.location.hostname === 'services.apnasite.in') {
            if (this.loginBtn) this.loginBtn.onclick = () => this.showLoginPopup();
            if (this.registerBtn) this.registerBtn.onclick = () => this.showRegisterPopup();
            if (this.logoutBtn) this.logoutBtn.onclick = () => this.logout();
        }
    }

    showLoginPopup() {
        if (this.loginPopup) return;
        this.loginPopup = new LoginPopup();
        const origClose = this.loginPopup.close.bind(this.loginPopup);
        this.loginPopup.close = () => {
            origClose();
            this.loginPopup = null;
        };
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
        // Only run UI logic if on services.apnasite.in
        if (window.location.hostname === 'services.apnasite.in') {
            const token = localStorage.getItem('token');
            if (token) {
                if (this.authContainer) this.authContainer.style.display = 'none';
                if (this.playerContainer) this.playerContainer.style.display = '';
            } else {
                if (this.authContainer) this.authContainer.style.display = '';
                if (this.playerContainer) this.playerContainer.style.display = 'none';
            }
        }
    }
}

customElements.define('phoneme-app', PhonemeApp);

if (!window.customElementsList) window.customElementsList = [];
if (!window.customElementsList.find(item => item.component === 'phoneme-app')) {
    window.customElementsList.push({ component: 'phoneme-app', componentClass: PhonemeApp });
}