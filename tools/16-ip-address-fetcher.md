**Title: IP Address Fetcher**

**Tool Details:**
- **Backend:** Node.js with Express.js
- **Frontend:** Web Components (vanilla JavaScript, no frameworks)
- **Database:** Not required
- **AI Integration:** Fetch and display IP-related details dynamically

**Goal:**
Candidates will learn how to build an Express.js backend that retrieves the user's IP address and integrates it with a WebComponent-based frontend. They will practice API request handling, working with request headers, and dynamic UI updates.

**Assignment Description:**
Candidates will create an IP Address Fetcher tool where users can retrieve their public IP address. The backend will capture the IP address from incoming requests and return it to the frontend. The frontend will display the fetched IP address dynamically.

**Tasks & Steps:**
1. **Backend Development:**
   - Set up an Express.js server.
   - Create an API endpoint to capture and return the user's IP address.
   - Extract the IP address from request headers (`req.ip` or `req.headers['x-forwarded-for']`).

2. **Frontend Development:**
   - Create a Web Component with a button to fetch the user's IP address.
   - Send a request to the backend to retrieve the IP address.
   - Display the fetched IP dynamically on the page.

3. **Result Display:**
   - Show the retrieved IP address in a structured format.
   - Provide an option to refresh and fetch the IP again.

**Mathematical Calculation/Steps:**
- Extract the IP address from request headers.
- Optionally, use an external API to fetch additional details (e.g., geolocation, ISP).

**Third-Party Packages (if required):**
- `express` (for backend server)
- `cors` (to allow frontend-backend communication)
- `request-ip` (optional, for better IP extraction handling)

**Acceptance Criteria:**
- The backend correctly retrieves and returns the user's IP address.
- The frontend captures and displays the IP address dynamically.
- The API should return accurate IP-related data.
- The Web Component should encapsulate the request handling and result display.
- Users should be able to fetch their IP address with a button click.

**Submission Guidelines:**
1. Fork the provided repository.
2. Create a folder with your name inside the repo.
3. Implement both backend and frontend in the designated folder.
4. Push the completed code to your forked repo.
5. Submit a pull request for review.

The assignment is complete when the backend correctly retrieves IP addresses, returns accurate responses, and the frontend successfully updates the UI based on API interactions.

