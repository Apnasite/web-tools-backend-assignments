class PhonemeSoundPlayer extends HTMLElement {
    constructor() {
        super();
        this.soundMap = {};
        this.letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
        this.lastWord = '';
        this.isPlaying = false;
        this.soundQueue = [];
        this.queueAbortController = { abort: false };
        this.boundKeydown = this.handleKeydown.bind(this);
        this.boundResize = this.handleResize.bind(this);
    }

    async connectedCallback() {
        await this.loadSounds();
        this.render();
        this.createPhonemeButtons();
        this.addEventListeners();
        window.addEventListener('keydown', this.boundKeydown);
        window.addEventListener('resize', this.boundResize);
    }

    disconnectedCallback() {
        window.removeEventListener('keydown', this.boundKeydown);
        window.removeEventListener('resize', this.boundResize);
    }

    async loadSounds() {
        try {
            const res = await fetch('https://services.apnasite.in/web-tools-backend-assignments/Vilas_Shetkar__03-phoneme-sound-player/sounds.json');
            const soundMapRaw = await res.json();
            // Add prefix to all sound paths
            this.soundMap = {};
            for (const key in soundMapRaw) {
                if (Object.prototype.hasOwnProperty.call(soundMapRaw, key)) {
                    this.soundMap[key] = window.phonemeAppBasePath + soundMapRaw[key];
                }
            }
        } catch {
            alert('Could not load sounds.json');
        }
    }

    render() {
        this.innerHTML = `
        <div class="container">
            <h4 class="mb-3">Phoneme Sound Player</h4>
            <div class="row">
                <div class="col-md-8">
                    <div class="d-flex flex-wrap gap-2 justify-content-center mb-2">
                        <input id="wordInput" type="text" class="form-control form-control-lg text-center" placeholder="Enter a word..." autocomplete="off" />
                        <button class="btn btn-warning" id="backspaceBtn">Backspace</button>
                        <button class="btn btn-danger" id="clearBtn">Clear</button>
                        <button class="btn btn-primary" id="playBtn">Play Sounds</button>
                        <button class="btn btn-success" id="replayBtn">Play Again</button>
                    </div>
                    <div class="mb-2 col-8 d-grid mx-auto">
                        <button class="btn btn-secondary" id="spaceBtn">Space</button>
                    </div>
                    <div id="letter-buttons" class="mb-2"></div>
                </div>
                <div class="col-md-4 d-none d-md-block">
                    <div class="output-box mb-3 text-center">
                        <h4>Phonemes / Sounds</h4>
                        <div id="phonemeDisplay" class="d-flex flex-wrap justify-content-center gap-2"></div>
                    </div>
                    <div class="output-box text-center">
                        <h4>Pronounciation</h4>
                        <div id="ttsWord" class="fs-2 position-relative"></div>
                    </div>
                </div>
            </div>
        </div>
        <div id="stickyResultMobile" class="sticky-result-mobile d-md-none" style="display:none;">
            <button class="close-btn" id="closeStickyBtn">&times;</button>
            <div class="output-box mb-2 text-center">
                <h5 class="mb-1">Phonemes / Sounds</h5>
                <div id="phonemeDisplayMobile" class="d-flex flex-wrap justify-content-center gap-2"></div>
            </div>
            <div class="output-box text-center">
                <h5 class="mb-1">Pronounciation</h5>
                <div id="ttsWordMobile" class="fs-2 position-relative"></div>
            </div>
        </div>
        `;
    }

    createPhonemeButtons() {
        const container = this.querySelector('#letter-buttons');
        container.innerHTML = '';
        const vowels = ['a', 'e', 'i', 'o', 'u'].filter(v => this.soundMap[v]);
        const consonants = this.letters.filter(l => !vowels.includes(l) && this.soundMap[l]);
        const allPhonemes = Object.keys(this.soundMap);
        const otherPhonemes = allPhonemes.filter(ph => !this.letters.includes(ph));

        const createGroup = (title, arr) => {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'mb-2 card p-2';
            const label = document.createElement('div');
            label.className = 'fw-bold mb-1';
            label.innerText = title;
            groupDiv.appendChild(label);

            const btnRow = document.createElement('div');
            btnRow.className = 'd-flex flex-wrap gap-1 justify-content-center';
            arr.forEach(ph => {
                if (!this.soundMap[ph]) return;
                const btn = document.createElement('button');
                btn.className = 'btn btn-outline-secondary letter-btn fw-bold fs-4';
                btn.textContent = ph.toUpperCase() + " " + ph.toLowerCase();
                btn.onclick = () => {
                    this.querySelector('#wordInput').value += ph;
                    this.playPhoneticAndSound(ph);
                };
                btnRow.appendChild(btn);
            });
            groupDiv.appendChild(btnRow);
            container.appendChild(groupDiv);
        };

        createGroup('Vowels', vowels);
        createGroup('Consonants', consonants);
        createGroup('Other Phonemes', otherPhonemes);
    }

    addEventListeners() {
        const $ = id => this.querySelector('#' + id);
        $('clearBtn').onclick = () => { $('wordInput').value = ''; this.clearDisplays(); };
        $('spaceBtn').onclick = () => { $('wordInput').value += ' '; };
        $('backspaceBtn').onclick = () => { $('wordInput').value = $('wordInput').value.slice(0, -1); };
        $('replayBtn').onclick = () => { if (this.lastWord) { $('wordInput').value = this.lastWord; this.processWord(); } };
        $('playBtn').onclick = () => this.processWord();
        $('closeStickyBtn').onclick = () => this.hideStickyResult();
        $('wordInput').addEventListener('keydown', e => {
            if (e.key === 'Enter') { e.preventDefault(); this.processWord(); }
        });
    }

    clearDisplays() {
        this.querySelector('#phonemeDisplay').innerHTML = '';
        this.querySelector('#ttsWord').innerHTML = '';
        const displayMobile = this.querySelector('#phonemeDisplayMobile');
        const ttsDisplayMobile = this.querySelector('#ttsWordMobile');
        if (displayMobile) displayMobile.innerHTML = '';
        if (ttsDisplayMobile) ttsDisplayMobile.innerHTML = '';
    }

    showStickyResult() {
        const sticky = this.querySelector('#stickyResultMobile');
        if (sticky) sticky.style.display = 'block';
    }
    hideStickyResult() {
        const sticky = this.querySelector('#stickyResultMobile');
        if (sticky) sticky.style.display = 'none';
    }

    handleResize() {
        // Hide sticky result if switching to desktop
        if (window.innerWidth >= 768) {
            this.hideStickyResult();
        }
    }

    async processWord() {
        this.clearSoundQueue();
        const input = this.querySelector('#wordInput');
        const word = input.value.trim().toLowerCase();
        if (!word) return;
        this.lastWord = word;
        const display = this.querySelector('#phonemeDisplay');
        const ttsDisplay = this.querySelector('#ttsWord');
        display.innerHTML = '';
        ttsDisplay.innerHTML = '';

        // For mobile sticky
        const displayMobile = this.querySelector('#phonemeDisplayMobile');
        const ttsDisplayMobile = this.querySelector('#ttsWordMobile');
        if (displayMobile) displayMobile.innerHTML = '';
        if (ttsDisplayMobile) ttsDisplayMobile.innerHTML = '';

        const phonemes = this.splitToPhonemes(word);
        const cards = [];
        const cardsMobile = [];

        phonemes.forEach(ph => {
            // Desktop
            const btn = document.createElement('button');
            btn.className = 'btn btn-outline-primary phoneme-card px-3 py-2 m-1';
            btn.innerText = ph;
            btn.onclick = () => this.playSound(this.soundMap[ph]);
            display.appendChild(btn);
            cards.push(btn);

            // Mobile
            if (displayMobile) {
                const btnM = document.createElement('button');
                btnM.className = 'btn btn-outline-primary phoneme-card px-3 py-2 m-1';
                btnM.innerText = ph;
                btnM.onclick = () => this.playSound(this.soundMap[ph]);
                displayMobile.appendChild(btnM);
                cardsMobile.push(btnM);
            }
        });

        // Show sticky result on mobile if phonemes found
        if (phonemes.length && window.innerWidth < 768) {
            this.showStickyResult();
        }

        for (let i = 0; i < phonemes.length; i++) {
            const ph = phonemes[i];
            const card = cards[i];
            if (card) card.classList.add('playing');
            if (cardsMobile[i]) cardsMobile[i].classList.add('playing');
            await this.playSound(this.soundMap[ph]);
            if (card) card.classList.remove('playing');
            if (cardsMobile[i]) cardsMobile[i].classList.remove('playing');
        }

        await this.speakWord(word, ttsDisplay, ttsDisplayMobile);
        input.value = '';

        // Store activity with JWT token if available
        const token = localStorage.getItem('token');
        fetch('https://services.apnasite.in/web-tools-backend-assignments/Vilas_Shetkar__03-phoneme-sound-player/phoneme-activity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': 'Bearer ' + token } : {})
            },
            body: JSON.stringify({ word, phonemes, timestamp: new Date().toISOString() })
        });
    }

    splitToPhonemes(word) {
        let result = [];
        let i = 0;
        const allPhonemes = Object.keys(this.soundMap);
        const vowels = ['a', 'e', 'i', 'o', 'u'].filter(v => this.soundMap[v]);
        const consonants = this.letters.filter(l => !vowels.includes(l) && this.soundMap[l]);
        const otherPhonemes = allPhonemes.filter(ph => !this.letters.includes(ph));
        const sortedPhonemes = [...otherPhonemes, ...consonants, ...vowels].sort((a, b) => b.length - a.length);
        while (i < word.length) {
            let matched = false;
            for (const ph of sortedPhonemes) {
                if (word.substr(i, ph.length) === ph) {
                    result.push(ph);
                    i += ph.length;
                    matched = true;
                    break;
                }
            }
            if (!matched) {
                const ch = word[i];
                if (this.soundMap[ch]) result.push(ch);
                i++;
            }
        }
        return result;
    }

    async playPhoneticAndSound(phoneme) {
        if (!this.soundMap[phoneme]) return;
        this.soundQueue.push(phoneme);
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.queueAbortController.abort = false;
            while (this.soundQueue.length > 0 && !this.queueAbortController.abort) {
                const nextPhoneme = this.soundQueue.shift();
                await this.speakTTS(nextPhoneme);
                if (this.queueAbortController.abort) break;
                await this.playSound(this.soundMap[nextPhoneme]);
            }
            this.isPlaying = false;
        }
    }

    clearSoundQueue() {
        this.soundQueue = [];
        this.queueAbortController.abort = true;
    }

    speakTTS(text) {
        return new Promise(resolve => {
            const msg = new SpeechSynthesisUtterance(text);
            const voices = speechSynthesis.getVoices();
            const femaleVoice = voices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('zira') || v.name.toLowerCase().includes('samantha'));
            if (femaleVoice) msg.voice = femaleVoice;
            msg.rate = 1;
            msg.onend = resolve;
            speechSynthesis.speak(msg);
        });
    }

    playSound(path) {
        return new Promise(resolve => {
            const audio = new Audio(path);
            audio.onended = resolve;
            audio.onerror = resolve;
            audio.play();
        });
    }

    speakWord(word, ttsDisplay, ttsDisplayMobile) {
        return new Promise(resolve => {
            function doSpeak() {
                const msg = new SpeechSynthesisUtterance(word);
                const voices = speechSynthesis.getVoices();
                const femaleVoice = voices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('zira') || v.name.toLowerCase().includes('samantha'));
                if (femaleVoice) msg.voice = femaleVoice;
                msg.rate = 0.9;
                msg.onend = resolve;
                speechSynthesis.speak(msg);
            }

            // Desktop display with repeat button
            if (ttsDisplay) {
                ttsDisplay.innerHTML = `<span class="tts-highlight">
                    ${word.toUpperCase()}
                    <button id="repeatTTSBtn" title="Repeat" style="cursor:pointer;" class="position-absolute top-0 end-0 btn btn-link p-0 m-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#0d6efd" viewBox="0 0 24 24">
                            <path d="M17.65 6.35A7.95 7.95 0 0 0 12 4V1l-4 4 4 4V6c3.31 0 6 2.69 6 6 0 1.3-.42 2.5-1.13 3.47l1.46 1.46A7.938 7.938 0 0 0 20 12c0-2.21-.9-4.21-2.35-5.65zM6 12c0-1.3.42-2.5 1.13-3.47L5.67 7.07A7.938 7.938 0 0 0 4 12c0 2.21.9 4.21 2.35 5.65A7.95 7.95 0 0 0 12 20v3l4-4-4-4v3c-3.31 0-6-2.69-6-6z"/>
                        </svg>
                    </button>
                </span>`;
                const repeatBtn = this.querySelector('#repeatTTSBtn');
                if (repeatBtn) {
                    repeatBtn.onclick = () => {
                        this.speakWord(word, ttsDisplay, ttsDisplayMobile);
                    };
                }
            }

            // Mobile display with repeat button
            if (ttsDisplayMobile) {
                ttsDisplayMobile.innerHTML = `<span class="tts-highlight">
                    ${word.toUpperCase()}
                    <button id="repeatTTSBtnMobile" title="Repeat" style="cursor:pointer;" class="position-absolute top-0 end-0 btn btn-link p-0 m-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#0d6efd" viewBox="0 0 24 24">
                            <path d="M17.65 6.35A7.95 7.95 0 0 0 12 4V1l-4 4 4 4V6c3.31 0 6 2.69 6 6 0 1.3-.42 2.5-1.13 3.47l1.46 1.46A7.938 7.938 0 0 0 20 12c0-2.21-.9-4.21-2.35-5.65zM6 12c0-1.3.42-2.5 1.13-3.47L5.67 7.07A7.938 7.938 0 0 0 4 12c0 2.21.9 4.21 2.35 5.65A7.95 7.95 0 0 0 12 20v3l4-4-4-4v3c-3.31 0-6-2.69-6-6z"/>
                        </svg>
                    </button>
                </span>`;
                const repeatBtnMobile = this.querySelector('#repeatTTSBtnMobile');
                if (repeatBtnMobile) {
                    repeatBtnMobile.onclick = () => {
                        this.speakWord(word, ttsDisplay, ttsDisplayMobile);
                    };
                }
            }

            doSpeak();
        });
    }

    handleKeydown(e) {
        // Only handle if input is visible
        const input = this.querySelector('#wordInput');
        if (!input) return;
        if (e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) return;
        if (!e.key) return; // <-- Fix: check if key exists
        const key = e.key.toLowerCase();
        if (this.letters.includes(key) && this.soundMap[key]) {
            e.preventDefault();
            input.value += key;
            this.playPhoneticAndSound(key);
        } else if (key === ' ') {
            e.preventDefault();
            input.value += ' ';
        } else if (key === 'backspace') {
            e.preventDefault();
            input.value = input.value.slice(0, -1);
        }
    }
}

if (!customElements.get('phoneme-sound-player')) 
    customElements.define('phoneme-sound-player', PhonemeSoundPlayer);