# **Backend Assignment: Age Calculator API**

### **Goal:**  
The goal of this assignment is to develop a RESTful API using **Node.js** and **Express.js** that calculates the age based on a given date of birth and current date. You will build this as a **mini-project** following best practices for Express.js application structure, routing, and environment configuration.  

### **Prerequisites:**  
1. Basic understanding of **Node.js** and **Express.js**.  
2. Familiarity with **REST API development** and **JavaScript ES6+**.  
3. Understanding of how to work with **environment variables** (`.env`) in Node.js.  
4. Basic experience with **Git** and **GitHub** for assignment submission.  

---

## **Assignment Instructions:**  

### **1. API Requirements**  
Develop an API endpoint that accepts a **date of birth (dob)** and **current date**, then calculates and returns the age in years, months, and days.  

#### **API Specifications:**  
- **Endpoint:** `POST /calculate-age`  
- **Request Format (JSON):**  
  ```json
  {
    "dob": "YYYY-MM-DD",
    "currentDate": "YYYY-MM-DD"
  }
  ```
- **Response Format (JSON):**  
  ```json
  {
    "years": 25,
    "months": 6,
    "days": 12
  }
  ```
- **Validations:**
  - `dob` should be a valid **past date**.
  - `currentDate` should be a valid **present or future date**.
  - Both dates should be in the **YYYY-MM-DD** format.

---

### **2. Project Structure and Implementation**
You will develop this API as a **mini-project** inside a main Express.js project that dynamically loads multiple tools.  

#### **Folder Structure:**  
```
mini-projects/
 ├── [Your_Name]__01-age-calculator/
 │   ├── public/                 # Frontend web component files
 │   ├── index.js                # Main entry point (Express app)
 │   ├── routes.js               # API routes for age calculator
 │   ├── controllers/
 │   │   ├── ageCalculatorController.js  # Logic for calculating age
 │   ├── .env                     # Port configuration
 │   ├── package.json             # Node.js dependencies
 │   ├── README.md                # Project documentation
```

#### **Key Implementation Steps:**  
1. **Initialize a new Node.js project** inside your mini-project folder.  
   ```bash
   npm init -y
   npm install express dotenv cors
   ```
2. **Create an Express.js server** in `index.js`, using `PORT` from `.env`.  
3. **Implement routing** in `routes.js`, exporting the router for integration.  
4. **Write the core logic** in `controllers/ageCalculatorController.js`.  
5. **Serve static files** from `public/`.  
6. **Test your API using Postman or curl** to verify responses.  

---

### **3. Submission Guidelines**  

#### **GitHub Repository:**  
- **Fork the main repository:** [Web Tools Backend Assignments](https://github.com/Apnasite/web-tools-backend-assignments.git)  
- **Clone your forked repository:**  
  ```bash
  git clone https://github.com/[Your_Username]/web-tools-backend-assignments.git
  ```
- **Create a folder for your assignment** using the correct naming convention:  
  ```
  mini-projects/[Developer_Name]__[01-age-calculator]
  ```
  Example:  
  ```
  mini-projects/Vilas_Shetkar__01-age-calculator/
  ```
- **Commit and push your changes** to your GitHub fork.  
  ```bash
  git add .
  git commit -m "Completed Age Calculator Assignment"
  git push origin main
  ```
- **Submit a Pull Request (PR)** to the original repository.  

---

### **Evaluation Criteria**  
✔️ **Proper API implementation** using Express.js.  
✔️ **Correct routing and controller structure.**  
✔️ **Usage of `.env` for port configuration.**  
✔️ **Input validation and error handling.**  
✔️ **Correct response format.**  
✔️ **Proper project structure and code readability.**  
✔️ **Successfully deployed mini-project that runs independently.**  

🚀 **Bonus Points:**  
⭐ If you add additional features like:  
- Returning the age in **hours, minutes, and seconds**.  
- Adding a **frontend UI (web component)** that interacts with the API.  

---

### **Deployment Instructions (Main Project)**  

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
   cd mini-projects/[Developer_Name]__01-age-calculator
   npm start
   ```
