**Title: Binary to Decimal Converter**

**Tool Details:**
- **Backend:** Node.js with Express.js
- **Frontend:** Web Components (vanilla JavaScript, no frameworks)
- **Database:** Not required (processing happens in memory)
- **AI Integration:** Convert binary numbers to decimal dynamically

**Goal:**
Candidates will learn how to build an Express.js backend that converts binary numbers to decimal and integrate it with a WebComponent-based frontend. They will practice API request handling, user input validation, and real-time UI updates.

**Assignment Description:**
Candidates will create a Binary to Decimal Converter where users can input a binary number, send it to the backend via an API request, and receive the converted decimal number. The frontend will dynamically display the conversion result.

**Tasks & Steps:**
1. **Backend Development:**
   - Set up an Express.js server.
   - Create an API endpoint that receives a binary number and converts it to decimal.
   - Validate input to ensure only valid binary numbers are accepted.
   - Return the decimal conversion result.

2. **Frontend Development:**
   - Create a Web Component with an input field for entering a binary number and a convert button.
   - Send the binary number to the backend via a fetch API request.
   - Receive the response and dynamically display the decimal result.

3. **Result Display:**
   - Show the binary number entered by the user.
   - Display the converted decimal number dynamically when the API responds.

**Mathematical Calculation/Steps:**
- Validate that the input contains only `0`s and `1`s.
- Convert the binary number to decimal using the formula:
  
  **Decimal = Σ (bit × 2^position)** (where position starts from 0 on the right)

- Return the converted decimal value.

**Third-Party Packages (if required):**
- `express` (for backend server)
- `cors` (to allow frontend-backend communication)
- `body-parser` (to handle JSON requests)

**Acceptance Criteria:**
- The backend should correctly process binary-to-decimal conversion.
- The frontend should capture user input and dynamically update the UI.
- The API should return a valid decimal result.
- The Web Component should encapsulate input handling and result display.
- Users should receive an error message for invalid binary input.

**Submission Guidelines:**
1. Fork the provided repository.
2. Create a folder with your name inside the repo.
3. Implement both backend and frontend in the designated folder.
4. Push the completed code to your forked repo.
5. Submit a pull request for review.

The assignment is complete when the backend correctly converts binary to decimal, returns accurate responses, and the frontend successfully updates the UI based on API responses.

