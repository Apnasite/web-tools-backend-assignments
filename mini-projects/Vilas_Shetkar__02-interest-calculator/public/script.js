class InterestCalculator extends HTMLElement {
    constructor() {
        super();
        // No shadow DOM
    }

    connectedCallback() {
        this.render();
        this.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.calculateInterest();
        });
    }

    render() {
        this.innerHTML = `
            <div class="d-flex flex-column justify-content-center w-50 mx-auto py-3">
                <h3 class="mb-4 text-primary">Interest Calculator</h3>
                <form class="card card-body">
                    <div class="mb-3">
                        <label for="principal" class="form-label">Principal Amount:</label>
                        <input type="number" id="principal" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="rate" class="form-label">Rate of Interest (% per year):</label>
                        <input type="number" id="rate" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="time" class="form-label">Time (years):</label>
                        <input type="number" id="time" class="form-control" required>
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

    calculateInterest() {
        const principal = parseFloat(this.querySelector("#principal").value);
        const rate = parseFloat(this.querySelector("#rate").value);
        const time = parseFloat(this.querySelector("#time").value);

        fetch(`/calculate?principal=${principal}&rate=${rate}&time=${time}`)
            .then(response => response.json())
            .then(data => {
                this.querySelector("#result").textContent = `Interest: ₹${data.interest.toFixed(2)}`;
            })
            .catch(() => {
                this.querySelector("#result").textContent = "Error calculating interest.";
            });
    }
}

if (!customElements.get('interest-calculator')) customElements.define('interest-calculator', InterestCalculator);

if (!window.customElementsList) window.customElementsList = [];

if (!window.customElementsList.find(item => item.component === 'interest-calculator')) window.customElementsList.push({ component: 'interest-calculator', componentClass: InterestCalculator });