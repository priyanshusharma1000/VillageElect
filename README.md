VillageElect: A Secure Backend for Village-Level Digital Elections
Project Vision
VillageElect is a backend application designed to conduct secure, efficient, and transparent elections in rural areas, specifically for village leaders like the "Sarpanch." The project aims to reduce the risks and inefficiencies associated with paper ballot voting by offering a digital alternative. It provides a reliable voting mechanism that ensures accurate, real-time results, prevents vote tampering, and eliminates common loopholes in traditional voting systems.
This project is the result of my practical learning of backend development, where I designed and implemented my own REST API using Node.js and Express.js. It incorporates secure user authentication and voting functionalities through JWT (JSON Web Token) for authorization and secure password hashing with bcrypt.

Features
JWT-based Authentication: Secure login and signup using Aadhar card and password, ensuring only authenticated users can vote.
Admin Role: An admin user can manage candidates (create, update, delete) but cannot vote, ensuring separation of powers.
Real-time Vote Counting: Displays live results, with candidates ranked by vote counts.
Password Hashing with bcrypt: Ensures secure storage of user credentials.
REST API: A fully functioning backend with clean and structured endpoints.
Scalability: Designed to support small-scale elections but can be scaled to larger ones if needed.


VillageElect: A Secure Backend for Village-Level Digital Elections
Project Vision
VillageElect is a backend application designed to conduct secure, efficient, and transparent elections in rural areas, specifically for village leaders like the "Sarpanch." The project aims to reduce the risks and inefficiencies associated with paper ballot voting by offering a digital alternative. It provides a reliable voting mechanism that ensures accurate, real-time results, prevents vote tampering, and eliminates common loopholes in traditional voting systems.

This project is the result of my practical learning of backend development, where I designed and implemented my own REST API using Node.js and Express.js. It incorporates secure user authentication and voting functionalities through JWT (JSON Web Token) for authorization and secure password hashing with bcrypt.

Features
JWT-based Authentication: Secure login and signup using Aadhar card and password, ensuring only authenticated users can vote.
Admin Role: An admin user can manage candidates (create, update, delete) but cannot vote, ensuring separation of powers.
Real-time Vote Counting: Displays live results, with candidates ranked by vote counts.
Password Hashing with bcrypt: Ensures secure storage of user credentials.
REST API: A fully functioning backend with clean and structured endpoints.
Scalability: Designed to support small-scale elections but can be scaled to larger ones if needed.
Technologies Used
Node.js & Express.js: Backend framework and server.
MongoDB: NoSQL database for storing users, candidates, and votes.
JWT (JSON Web Token): For user authentication and secure session management.
bcrypt: For hashing user passwords.
Mongoose: For object data modeling (ODM) to interact with MongoDB.

API Endpoints
User Authentication
POST /signup: Create a new user account using Aadhar card and password.
POST /login: Log in to an existing account using Aadhar card and password.
Voting
GET /candidate: Fetch the list of all candidates.
POST /vote/:candidateId: Vote for a specific candidate.
Vote Count
GET /vote/counts: Retrieve the list of candidates sorted by their vote count.
User Profile
GET /profile: Get the logged-in user's profile information.
PUT /profile/password: Change the logged-in user's password.
Admin Candidate Management
POST /candidate: Add a new candidate (admin only).
PUT /candidate/:candidateId: Update an existing candidate (admin only).
DELETE /candidate/:candidateId: Remove a candidate from the list (admin only).



Setup and Installation
Clone the repository

bash
Copy code
git clone https://github.com/yourusername/VillageElect.git
cd VillageElect
Install Dependencies

bash
Copy code
npm install
Set up Environment Variables
Create a .env file in the root directory and add the following variables:

bash
Copy code
MONGO_URI=<your_mongo_database_uri>
JWT_SECRET=<your_jwt_secret>
Start the Server

bash
Copy code
npm start
The server will be running at http://localhost:3000.



Usage
Example Requests
1. Sign Up a New User
bash
Copy code
POST /signup
{
  "aadharNumber": "123456789012",
  "password": "securepassword"
}
2. Log In
bash
Copy code
POST /login
{
  "aadharNumber": "123456789012",
  "password": "securepassword"
}
3. Vote for a Candidate
bash
Copy code
POST /vote/5f8f8c44b54764421b7156c6
Headers: Authorization: Bearer <JWT Token>
4. Get Vote Counts
bash
Copy code
GET /vote/counts
Project Structure
bash
Copy code
VillageElect/
│
├── controllers/          # Functions handling the API logic
├── models/               # Mongoose schemas for Users, Candidates
├── routes/               # API endpoints
├── middleware/           # JWT authentication middleware
├── config/               # Database and environment configurations
├── .env                  # Environment variables
├── server.js             # Entry point for the Node.js application
└── README.md             # Project documentation
Contributing
Fork the repository.
Create your feature branch (git checkout -b feature/new-feature).
Commit your changes (git commit -am 'Add a new feature').
Push to the branch (git push origin feature/new-feature).
Create a new Pull Request.
