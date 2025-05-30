class AgeCalculator extends HTMLElement {
    constructor() {
        super();
        // this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.calculateAge();
        });
    }

    render() {
        this.innerHTML = `
            <div class="d-flex flex-column justify-content-center w-50 mx-auto py-3">
            <h3 class="mb-4 text-primary">Age Calculator</h3>
            <form class="card card-body">
                <div class="mb-3">
                <label for="dob" class="form-label">Date of Birth:</label>
                <input type="date" id="dob" class="form-control" required>
                </div>
                <button type="submit" class="btn btn-primary w-100">Calculate</button>
            </form>
            <div id="result" class="alert alert-info mt-3" style="display:none;"></div>
            </div>
        `;
        // Show result div only when there is content
        const resultDiv = this.querySelector("#result");
        const observer = new MutationObserver(() => {
            resultDiv.style.display = resultDiv.textContent.trim() ? "block" : "none";
        });
        observer.observe(resultDiv, { childList: true, subtree: true });
    }

    calculateAge() {
        const dobInput = this.querySelector("#dob").value;
        if (!dobInput) {
            this.querySelector("#result").textContent = "Please select your date of birth.";
            return;
        }
        const birthYear = new Date(dobInput).getFullYear();
        fetch(`./calculate?birthYear=${birthYear}`)
            .then(response => response.json())
            .then(data => {
                if (typeof data.age === "number") {
                    this.querySelector("#result").textContent = `Your age is ${data.age} years.`;
                } else {
                    this.querySelector("#result").textContent = "Could not calculate age.";
                }
            })
            .catch(() => {
                this.querySelector("#result").textContent = "Error contacting server.";
            });
    }
}

if (!customElements.get('age-calculator')) customElements.define('age-calculator', AgeCalculator);

if (!window.customElementsList) window.customElementsList = [];

if (!window.customElementsList.find(item => item.component === 'age-calculator')) window.customElementsList.push({ component: 'age-calculator', componentClass: AgeCalculator })
