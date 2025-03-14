**Title: Palindrome Checker**

**Tool Details:**
- **Backend:** Node.js with Express.js
- **Frontend:** Web Components (vanilla JavaScript, no frameworks)
- **Database:** Not required
- **AI Integration:** Dynamically check if a word or phrase is a palindrome

**Goal:**
Candidates will learn how to build an Express.js backend and integrate it with a WebComponent-based frontend. They will practice API request handling, string manipulation, and dynamically updating the UI based on API responses.

**Assignment Description:**
Candidates will create a Palindrome Checker where users can input a word or phrase, and the system will determine if it is a palindrome. The frontend form collects the input and sends it to the backend via an API request. The backend processes the request, checks if the input is a palindrome, and returns the result to the frontend. The frontend then displays whether the input is a palindrome or not.

**Tasks & Steps:**
1. **Backend Development:**
   - Set up an Express.js server.
   - Create an API endpoint to accept user input (word or phrase).
   - Process the input to check if it is a palindrome (ignoring case, spaces, and special characters).
   - Return the result (true/false) to the frontend.

2. **Frontend Development:**
   - Create a Web Component for the input form (text field for user input and a check button).
   - Send the user input to the backend via a fetch API request.
   - Receive the response and update the UI dynamically by displaying whether the input is a palindrome.

3. **Result Display:**
   - Show a message indicating whether the input is a palindrome.
   - Provide an option to reset the form.
   
**Mathematical Calculation/Steps:**
- Convert input to lowercase.
- Remove non-alphanumeric characters.
- Reverse the string and compare it with the original processed input.

**Third-Party Packages (if required):**
- `express` (for backend server)
- `cors` (to allow frontend-backend communication)
- `body-parser` (to handle JSON requests)

**Acceptance Criteria:**
- The backend should correctly check if an input is a palindrome.
- The frontend should capture user input and dynamically update the UI.
- The API should return the correct palindrome validation.
- The Web Component should encapsulate form logic and interaction.
- The check should ignore case, spaces, and special characters.

**Submission Guidelines:**
1. Fork the provided repository.
2. Create a folder with your name inside the repo.
3. Implement both backend and frontend in the designated folder.
4. Push the completed code to your forked repo.
5. Submit a pull request for review.

The assignment is complete when the backend correctly processes input and returns valid palindrome results, and the frontend successfully updates the UI based on API responses.

