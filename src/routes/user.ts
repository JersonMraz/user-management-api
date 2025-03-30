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


// Alferez: Creating user deletion functionality
router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        // Try deleting the user directly
        const deleteResult = await userRepository.delete(id);

        if (deleteResult.affected === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
});

//Mabano List of all users and find by id
// Get all users
router.get('/', async (req: Request, res: Response, next: NextFunction) => {        
    try {
        const users = await userRepository.find();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}
);
// Get user by ID
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const user = await userRepository.findOneBy({ id: Number(req.params.id) });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}
);
export default router;