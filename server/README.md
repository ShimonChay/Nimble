# Nimble - Home Assignment

## Overview

This project is an invoices and suppliers management dashboard that provides a comprehensive view of their details, including associated data visualizations. It is built using React, MUI, and custom reusable components for charts and tables.

## Getting Started

### Prerequisites

Ensure the following are installed:

- Node.js
- npm
- Docker (The project uses `docker-compose` for easy database setup)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/ShimonChay/Nimble.git

   ```

2. Navigate to the Client folder and run:
   ```sh
   npm install
   npm run dev
   ```
   The client will be available at http://localhost:5173.

3. Navigate to the Server folder and run:

   ```sh
   npm install
   ```

4. Use the provided `docker-compose.yml` file to create the database in Docker. To start, run:
   ```sh
   docker compose up -d
   ```

   You can interact with the database using:
   ```sh
   docker exec -it postgres_container psql -U postgres 
   ```
   Alternatively, you can connect manually via pgAdmin.

5. In the Server folder, start the server:
   ```sh
   npm start
   ```
   The server will run at http://localhost:3000. When the server starts for the first time, it will automatically create the database tables.

6. To populate the tables with data, upload a CSV file using Postman or similar tools to the endpoint: http://localhost:3000/csv/upload-csv.

## Implementations
1. <u>**Main view**</u>: The main view displays charts with data about existing invoices. You can select the chart type and filter using the provided options. Filtering by date does not require specifying both startDate and endDate — they are automatically set on the server.
2. <u>**Supplier view**</u>: From the main view, click the button in the top-left corner to navigate to the supplier view. This view displays a table of the 10 suppliers with the most invoices. You can also filter suppliers by their company name in the search bar. The results will show the top 10 suppliers matching the search criteria.
3. <u>**Debounce**</u>: To minimize unnecessary server requests during supplier searches, debounce functionality is implemented. Requests are sent only after a brief delay, ensuring the user has finished entering the search term.
4. <u>**Supplier details**</u>: Click the expand button next to a supplier to view personal statistics and charts (if available).


## Notes

1. Some server queries use replacements to prevent SQL injection. Even though pure SQL is used, there is no security risk.
2. If the tables are not created when the server loads, run:

   ```sh
   npx sequelize-cli db:migrate      
   ```
   Ensure `npm install` is executed beforehand.
   
3. Most of the charts are from MUI, except for the horizontal chart, which was created from scratch (in case that’s what you were referring to)
4. Screenshots of the project are attached to the email sent to Omer.

Toda Raba, Chay.



