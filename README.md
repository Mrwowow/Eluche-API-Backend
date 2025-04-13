# Eluche API Backend

## Description
This project is a Node.js/Express application built to provide APIs for registering and managing stakeholders in the agricultural supply chain. Stakeholders include **Farmers**, **Processors**, and **Distributors**, each with their own registration endpoints and detailed validation rules. The application uses **MySQL** for database storage, with models tailored for each stakeholder type.

## Features
- Role-based separation for **Farmers**, **Processors**, and **Distributors**.
- Secure password hashing with **bcrypt**.
- Validation middleware to ensure incoming data is correct and complete.
- Separate profile tables for each stakeholder in the database.
- RESTful APIs following consistent response formats.

## Technologies Used
- **Node.js**
- **Express.js**
- **MySQL**
- **bcrypt** for password hashing
- **express-validator** for input validation
- **dotenv** for environment variable management

---

## Installation

### Prerequisites
- Node.js (v14+)
- MySQL
- npm (Node Package Manager)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Mrwowow/Eluche-API-Backend
   cd Eluche-API-Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the environment variables:
   - Create a `.env` file in the project root.
   - Add the following variables:
     ```
     DB_HOST=your-mysql-host
     DB_USER=your-mysql-username
     DB_PASSWORD=your-mysql-password
     DB_NAME=your-mysql-database
     PORT=3000
     ```

4. Start the development server:
   ```bash
   npm start
   ```

---

## API Endpoints

### Farmer Registration
**POST** `/api/farmers/register`

#### Request Body:
```json
{
  "email": "farmer@example.com",
  "password": "securepassword",
  "firstName": "John",
  "lastName": "Doe",
  "farmName": "Sunny Farm",
  "farmSize": 50,
  "farmType": "crop",
  "farmAddress": "123 Farm Road",
  "city": "Farmville",
  "region": "Midwest",
  "country": "USA"
}
```

### Processor Registration
**POST** `/api/processors/register`

#### Request Body:
```json
{
  "email": "processor@example.com",
  "password": "securepassword",
  "firstName": "Jane",
  "lastName": "Doe",
  "facilityName": "Fresh Processing Ltd",
  "processingType": "grains",
  "processingCapacity": 500.50,
  "facilityAddress": "123 Processing Street",
  "city": "Techville",
  "region": "Southwest",
  "country": "USA"
}
```

### Distributor Registration
**POST** `/api/distributors/register`

#### Request Body:
```json
{
  "email": "distributor@example.com",
  "password": "securepassword",
  "firstName": "Mark",
  "lastName": "Smith",
  "companyName": "Global Distribution Co",
  "distributionType": "international",
  "productsDistributed": "grains,vegetables,fruits",
  "marketRegions": "Europe,Asia",
  "businessAddress": "789 Distribution Street",
  "city": "Distributopia",
  "region": "Northwest",
  "country": "USA",
  "fleetSize": 25,
  "warehouseCount": 5,
  "warehouseCapacity": 2500.75,
  "seekingProducers": true,
  "businessLicense": "LICENSE12345",
  "foundedYear": 2000
}
```

---

## File Structure
```
project-directory/
│
├── config/
│   └── db.js                   # Database connection file
│
├── controllers/
│   ├── farmerController.js     # Farmer-specific logic
│   ├── processorController.js  # Processor-specific logic
│   └── distributorController.js # Distributor-specific logic
│
├── middleware/
│   └── validation.js           # Input validation logic (shared for all)
│
├── models/
│   ├── Farmer.js               # Farmer model
│   ├── Processor.js            # Processor model
│   └── Distributor.js          # Distributor model
│
├── routes/
│   ├── farmerRoutes.js         # Farmer routes
│   ├── processorRoutes.js      # Processor routes
│   └── distributorRoutes.js    # Distributor routes
│
├── utils/
│   ├── bcrypt.js               # Utility for password hashing (shared for all)
│   └── response.js             # Utility for error/response formatting (shared for all)
│
├── .env                        # Environment variables
├── app.js                      # Main application entry point
└── package.json                # Node.js dependencies
```

---

## Error Responses
All APIs return consistent error responses in the following format:
```json
{
  "success": false,
  "error": "Validation error",
  "details": [
    {
      "type": "field",
      "msg": "Error message",
      "path": "fieldName",
      "location": "body"
    }
  ]
}
```

---

## Contributions
Feel free to raise issues or contribute to the repository by creating pull requests. All contributions are welcome!