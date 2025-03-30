import { Router, Request, Response, NextFunction } from "express";
import { AppDataSource } from "../index";
import { User } from "../entities/user";
import { validateUserRequest } from "../middleware/validate-request";

const router = Router();
const userRepository = AppDataSource.getRepository(User);

// Create user with hashed password
router.post('/', validateUserRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstname, lastname, middlename, email, password } = req.body;
        
        // Create user (password will be hashed by the @BeforeInsert hook)
        const user = userRepository.create({ firstname, lastname, middlename, email, password });
        await userRepository.save(user);
        
        // Return user with hashed password
        res.status(201).json({
            ...user,
            password: user.password // Show the hashed password
        });
    } catch (error) {
        next(error);
    }
});



// Jaca Update user by ID
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const userId = parseInt(req.params.id);
        
        // Validate ID
        if (isNaN(userId)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        
        // Find existing user
        const user = await userRepository.findOneBy({ id: userId });
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        // Extract update fields
        const { firstname, lastname, middlename, email, password } = req.body;
        
        // Update user properties
        if (firstname !== undefined) user.firstname = firstname;
        if (lastname !== undefined) user.lastname = lastname;
        if (middlename !== undefined) user.middlename = middlename;
        if (email !== undefined) user.email = email;
        
        // Only update password if provided
        // The @BeforeUpdate hook in the User entity should handle password hashing
        if (password !== undefined) user.password = password;
        
        // Save updated user
        await userRepository.save(user);
        
        res.status(200).json({
            message: "User updated successfully",
            user: {
                id: user.id,
                lastname: user.lastname,
                firstname: user.firstname,
                middlename: user.middlename,
                email: user.email,
                password: user.password
            }
        });
    } catch (error) {
        console.error("Error updating user:", error);
        next(error);
    }
});


export default router;