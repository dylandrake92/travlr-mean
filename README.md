Dylan Drake
CS-465
December 21, 2025

Travlr Getaways – Full Stack Web Application
Overview
Travlr Getaways is a full stack MEAN application that provides a customer-facing travel site and an administrator single-page application (SPA). Customers can view available trips, while administrators can securely log in to manage trip data. The project demonstrates full stack development concepts including frontend frameworks, RESTful APIs, database integration, and authentication.

Architecture
Frontend Development Comparison
This project uses two frontend approaches: Express-rendered pages and an Angular single-page application (SPA).
The Express-based frontend delivers basic HTML views using server-side rendering. This approach is simple and effective for static content and basic navigation, but each user interaction requires a full page reload and server response.
The Angular SPA provides a more dynamic user experience. The application loads once and uses client-side routing and components to update views without refreshing the page. Angular components, services, and routing allow for modular development, better performance, and a more interactive interface, especially for administrative tasks such as adding, editing, and deleting trips.

Backend Database Choice
The backend uses MongoDB, a NoSQL database, because it stores data in flexible JSON-like documents that align naturally with JavaScript-based applications. MongoDB works well with the MEAN stack by allowing seamless data exchange between the database, API, and frontend. Its schema flexibility makes it easier to adapt data models as application requirements evolve.

Functionality
JSON and JavaScript
JSON (JavaScript Object Notation) is a lightweight data-interchange format that is language-independent, while JavaScript is a programming language used to build application logic. JSON acts as the bridge between the frontend and backend by formatting data sent in API requests and responses. In this application, Angular sends and receives JSON objects when communicating with Express API endpoints, allowing consistent data handling across the full stack.

Refactoring and Reusable Components
Throughout development, code was refactored to improve efficiency and maintainability. Angular services were created to centralize API calls, reducing duplication across components. UI components such as trip cards were reused to display trip data consistently across views. Reusable components improve code readability, simplify updates, and reduce the risk of errors when changes are needed.

Testing
API testing focused on verifying request methods, endpoints, and security controls. GET requests were tested to ensure trip data was retrieved correctly from the database. PUT, POST, and DELETE requests were tested while authenticated as an admin to confirm secure data modification. Browser developer tools were used to inspect network requests, validate status codes, and confirm JSON responses. Authentication testing ensured that protected routes were inaccessible without valid credentials.

Reflection
This course strengthened my understanding of full stack web development by requiring the integration of frontend frameworks, backend APIs, databases, and security. I gained hands-on experience with the MEAN stack, RESTful architecture, and SPA development. I also improved my ability to debug, refactor code, and reason about application architecture. These skills directly support my professional goals by making me a more capable and marketable candidate for software development roles.

Repository
The final version of this project is available in this GitHub repository and includes all required source code and documentation. https://github.com/dylandrake92/travlr-mean
