## How to Run the Application
This guide will walk you through the steps to run the application.  
### Prerequisites
Docker installed on your machine.
Java Development Kit (JDK) installed on your machine.
Node.js and npm installed on your machine.
Angular CLI installed on your machine.
Steps
Start the PostgreSQL Database  Run the following command in your terminal to start a PostgreSQL database using Docker:  <pre>docker run --name filter -e POSTGRES_PASSWORD=thisispassword -p 5432:5432 -d postgres:12.0 </pre> This command will start a new PostgreSQL database with the name filter, password thisispassword, and it will be accessible on port 5432.  
Run the Backend Application  Navigate to the backend directory of the project and run the following command to start the Spring Boot application:  <pre>./mvnw spring-boot:run </pre> The backend application will start and connect to the PostgreSQL database.  
Run the Frontend Application  Navigate to the frontend directory of the project and run the following commands to start the Angular application:  <pre>npm install ng serve </pre> The frontend application will start and it will be accessible on http://localhost:4200.  
Now, you should be able to access the application in your web browser by navigating to http://localhost:4200.
