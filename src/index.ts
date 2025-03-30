import { DataSource } from "typeorm";
import { User } from "./entities/user";

export const AppDataSource = new DataSource({
    type: "mysql", // Database type in here we choose MySql
    host: "localhost", // This is our database hostname
    port: 3306, // Our database port number
    username: "root", // Database username here our username is root
    password: "", // And this is the database password
    database: "user_management_api", // Database name
    entities: [User],
    synchronize: true,
    logging: true,
});

// Function to ensure database exists
async function initializeDatabase() {
    try {
        // First connect without specifying the database
        const adminDataSource = new DataSource({
            type: "mysql", // Database type in here we choose MySql
            host: "localhost", // This is our database hostname
            port: 3306, // Our database port number
            username: "root", // Database username here our username is root
            password: "", // And this is the database password
        });

        await adminDataSource.initialize();
        
        // Create database if it doesn't exist
        await adminDataSource.query(`CREATE DATABASE IF NOT EXISTS user_management_api`);
        await adminDataSource.destroy();
        
        console.log("Database verified/created");
    } catch (error) {
        console.error("Error creating database:", error);
        throw error;
    }
}

// Modified initialize function
export async function initializeAppDataSource() {
    try {
        await initializeDatabase();
        await AppDataSource.initialize();
        console.log("Data Source has been initialized!");
        return AppDataSource;
    } catch (error) {
        console.error("Error during Data Source initialization:", error);
        throw error;
    }
}