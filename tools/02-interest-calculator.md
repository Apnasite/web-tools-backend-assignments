# **Backend Assignment: Interest Calculator API**  

### **Goal:**  
The goal of this assignment is to develop a RESTful API using **Node.js** and **Express.js** that calculates **Simple Interest (SI) and Compound Interest (CI)** based on user inputs. You will build this as a **mini-project** following best practices for Express.js application structure, routing, and environment configuration.  

---

## **Prerequisites:**  
1. Basic understanding of **Node.js** and **Express.js**.  
2. Familiarity with **REST API development** and **JavaScript ES6+**.  
3. Understanding of how to work with **environment variables** (`.env`) in Node.js.  
4. Basic experience with **Git** and **GitHub** for assignment submission.  

---

## **Assignment Instructions:**  

### **1. API Requirements**  
Develop an API endpoint that accepts **Principal Amount (P)**, **Rate of Interest (R)**, **Time (T in years)**, and **Type of Interest (simple/compound)**. The API should return the calculated interest and total amount.  

#### **Formulas:**  
- **Simple Interest (SI)** = (P × R × T) / 100  
- **Compound Interest (CI)** = P × (1 + R/100) ^ T - P  

---

### **2. API Specifications:**  
- **Endpoint:** `POST /calculate-interest`  
- **Request Format (JSON):**  
  ```json
  {
    "principal": 10000,
    "rate": 5,
    "time": 2,
    "type": "simple"
  }
  ```
- **Response Format (JSON) for Simple Interest:**  
  ```json
  {
    "interest": 1000,
    "totalAmount": 11000
  }
  ```
- **Response Format (JSON) for Compound Interest:**  
  ```json
  {
    "interest": 1025,
    "totalAmount": 11025
  }
  ```
- **Validations:**  
  - `principal` should be a positive number.  
  - `rate` should be a positive percentage (e.g., 5 for 5%).  
  - `time` should be a positive number in years.  
  - `type` should be either **"simple"** or **"compound"**.  

---

## **3. Project Structure and Implementation**
You will develop this API as a **mini-project** inside a main Express.js project that dynamically loads multiple tools.  

#### **Folder Structure:**  
```
mini-projects/
 ├── [Your_Name]__02-interest-calculator/
 │   ├── public/                 # Frontend web component files
 │   ├── index.js                # Main entry point (Express app)
 │   ├── routes.js               # API routes for interest calculator
 │   ├── controllers/
 │   │   ├── interestCalculatorController.js  # Logic for interest calculation
 │   ├── .env                     # Port configuration
 │   ├── package.json             # Node.js dependencies
 │   ├── README.md                # Project documentation
```

---

### **4. Key Implementation Steps**  
1. **Initialize a new Node.js project** inside your mini-project folder.  
   ```bash
   npm init -y
   npm install express dotenv cors
   ```
2. **Create an Express.js server** in `index.js`, using `PORT` from `.env`.  
3. **Implement routing** in `routes.js`, exporting the router for integration.  
4. **Write the core logic** in `controllers/interestCalculatorController.js`.  
5. **Serve static files** from `public/`.  
6. **Test your API using Postman or curl** to verify responses.  

---

## **5. Submission Guidelines**  

#### **GitHub Repository:**  
- **Fork the main repository:** [Web Tools Backend Assignments](https://github.com/Apnasite/web-tools-backend-assignments.git)  
- **Clone your forked repository:**  
  ```bash
  git clone https://github.com/[Your_Username]/web-tools-backend-assignments.git
  ```
- **Create a folder for your assignment** using the correct naming convention:  
  ```
  [Developer_Name]__[02-interest-calculator]
  ```
  Example:  
  ```
  Vilas_Shetkar__02-interest-calculator/
  ```
- **Commit and push your changes** to your GitHub fork.  
  ```bash
  git add .
  git commit -m "Completed Interest Calculator Assignment"
  git push origin main
  ```
- **Submit a Pull Request (PR)** to the original repository.  

---

## **6. Evaluation Criteria**  
✔️ **Proper API implementation** using Express.js.  
✔️ **Correct routing and controller structure.**  
✔️ **Usage of `.env` for port configuration.**  
✔️ **Input validation and error handling.**  
✔️ **Correct response format.**  
✔️ **Proper project structure and code readability.**  
✔️ **Successfully deployed mini-project that runs independently.**  

🚀 **Bonus Points:**  
⭐ If you add additional features like:  
- Supporting different compounding periods (**monthly, quarterly, yearly**).  
- Adding a **frontend UI (web component)** that interacts with the API.  

---

## **7. Deployment Instructions (Main Project)**  

1. Clone the main project repository:  
   ```bash
   git clone https://github.com/Apnasite/web-tools-backend-assignments.git
   cd web-tools-backend-assignments
   npm install
   ```
2. **Run the main project** to integrate all mini-projects:  
   ```bash
   npm start
   ```
3. **Run your mini-project independently** (using `.env` for port configuration):  
   ```bash
   cd mini-projects/[Developer_Name]__02-interest-calculator
   npm start
   ```
