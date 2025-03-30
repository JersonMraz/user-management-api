# 1. **Project Overview**

- **Objective:** Build a REST API for managing users (CRUD operations: Create, Read, Update, Delete).

- **Technologies:**
  - **Backend:** Node.js with TypeScript  
  - **ORM:** TypeORM for database interactions  
  - **Database:** MySQL  
  - **API Framework:** Express.js  

- **Features:**
  - **Sullano:** Implement user creation functionality.  
  - **Alferez:** Implement user deletion functionality.  
  - **Mabano:** Implement user listing and retrieval functionality.  
  - **Jaca:** Implement user update functionality.  
  - **Leader:** Manage the `main` branch and ensure integration.  

---

# 2. **Setup**  

### Step 1: Clone the Repository  
- `git clone https://github.com/JersonMraz/user-management-api.git`  
- `cd user-management-api`  

### Step 2: Install Dependencies 

#### Required dependencies (example: npm install config cors dotenv express etc ):  
- bcryptjs  
- config  
- cors  
- dotenv  
- express  
- joi  
- mysql2  
- reflect-metadata  
- rootpath  
- sequelize  
- typeorm  

#### Development dependencies (npm install --save-dev @types/cors @types/express nodemon ts-node):  
- @types/cors  
- @types/express  
- nodemon  
- ts-node  

### Step 3: Configure the Database  
1. Open the `ormconfig.json` file.  
2. Update the database configuration:  
    - "host": "localhost",
    - "port": "3306",
    - "user": "root",
    - "password": "" Add your password if applicable,
    - "database": "" Replace with your database name
--- 
3. Run the following command:
    - npm run dev
# 3. **API Documentation**
    - List all endpoints with examples (e.g., POST /users, GET /users/:id).    
# 4. Testing 