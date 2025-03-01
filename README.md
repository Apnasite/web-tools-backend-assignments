# Web Useful Tools for Everyone

## 📌 Project Overview

This project is developed and maintained by **Maha Mission Education and Career Council (NGO)** through learning projects on **ApnaGuru.in**. It is proudly supported by **Apnasite IT Services Pvt. Ltd.**, which provides: ✅ **Technical support**\
✅ **Mentorship**\
✅ **Deployment**\
✅ **Ongoing maintenance** of these projects

**🌐 Live URL:** [https://tools.apnasite.in](https://tools.apnasite.in)\
**📢 Join us:** [https://apnaguru.in](https://aapn.in/M7PM3JB5)\
**📌 Organization:** [https://mmeac.org](https://mmeac.org)\
**🏢 Company:** [https://apnasite.in](https://apnasite.in)\
**📞 Call/WhatsApp:** +91-8999417889

---

## 🚀 Project Purpose

The purpose of this project is to **enhance backend skills** of ApnaGuru students by giving them hands-on experience working on **live coding projects** in a **real-world IT environment**. It allows them to contribute to an open-source repository and gain **industry-level exposure**.

---

## 📂 Project Structure

The repository is structured as follows:

```
📦 web-tools-backend-assignments
 ┣ 📂 mini-projects
 ┃ ┣ 📂 [Developer_Name]__[assignmentnumber-tool-name]
 ┃ ┃ ┣ 📂 public  (Static assets like HTML, CSS, JS for the tool)
 ┃ ┃ ┣ 📜 index.js  (Mini-project's main Express.js application file)
 ┃ ┃ ┣ 📜 routes.js  (Defines all API routes for the mini-project)
 ┣ 📂 tools  (Contains assignment instructions in .docx format)
 ┣ 📜 user-assignments.xlsx  (Tracks assignments and their status)
 ┣ 📜 index.js  (Main Express.js app that integrates all mini-projects dynamically)
 ┣ 📜 routes.js  (Handles merging of all mini-projects' routes into main app)
 ┣ 📜 .env  (Stores environment variables, including ports)
 ┣ 📜 README.md  (Project documentation)
```

### 🔖 **Mini-Project Naming Convention**

- The mini-project folder must be named as:\
  **[Developer\_Name]\_\_[assignmentnumber-tool-name]**
- Example: If **Vilas Shetkar** is working on **01-age-calculator**, the folder name should be:\
  **Vilas\_Shetkar\_\_01-age-calculator**
- If the naming convention is not followed, **the assignment will be rejected.**

---

## 📜 How to Run a Mini-Project

### **Step 1: Clone the Repository**

```sh
 git clone https://github.com/Apnasite/web-tools-backend-assignments.git
 cd web-tools-backend-assignments
```

### **Step 2: Install Dependencies**

```sh
npm install
```

### **Step 3: Run a Mini-Project**

```sh
cd mini-projects/[Developer_Name]__[assignmentnumber-tool-name]
node index.js
```

> The application will run on the port specified in the **.env** file.

---

## 📤 How to Submit an Assignment on GitHub

### **Step 1: Fork the Repository**

- Go to [**GitHub Repo**](https://github.com/Apnasite/web-tools-backend-assignments.git)
- Click **Fork** (top-right corner)
- Clone your forked repository:

```sh
git clone https://github.com/YOUR_GITHUB_USERNAME/web-tools-backend-assignments.git
```

### **Step 2: Create Your Mini-Project Folder**

- Inside `mini-projects/`, create your folder using the **correct naming convention**.
- Add your project files (index.js, routes.js, public folder, etc.).

### **Step 3: Commit & Push Your Code**

```sh
git add .
git commit -m "Added [Developer_Name]__[assignmentnumber-tool-name]"
git push origin main
```

### **Step 4: Create a Pull Request**

- Go to the original repo: [**GitHub Repo**](https://github.com/Apnasite/web-tools-backend-assignments.git)
- Click **New Pull Request**
- Select your forked repository & branch
- Add a **title & description** (e.g., "Assignment Submission - [Developer\_Name]\_\_[assignmentnumber-tool-name]")
- Click **Create Pull Request**

---

## 🌍 Main Project Deployment Steps

### **Step 1: Clone the Repo on Server**

```sh
git clone https://github.com/Apnasite/web-tools-backend-assignments.git
cd web-tools-backend-assignments
```

### **Step 2: Install Dependencies**

```sh
npm install
```

### **Step 3: Set Up Environment Variables**

Create a `.env` file and configure:

```
PORT=3000
NODE_ENV=production
```

### **Step 4: Start the Application**

```sh
node index.js
```

> The main project will aggregate all mini-projects dynamically and serve them.

---

### **✅ Assignment Tracking**

All assignments are tracked in `user-assignments.xlsx`. Each student's progress is categorized as:

- **New**: Assignment not yet taken.
- **Assigned**: Assigned to a user.
- **Reassigned**: Reassigned due to rejection or changes.
- **Completed**: Fully implemented and working.
- **Published**: Merged into the main project.

---

## 🎯 Conclusion

This project is an opportunity for students to **learn backend development**, **integrate APIs**, and **gain real-world experience**. Follow the instructions carefully and **submit your mini-projects correctly**. 🚀

Happy coding! 🎉

