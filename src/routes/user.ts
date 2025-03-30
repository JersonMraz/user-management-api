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

export default router;