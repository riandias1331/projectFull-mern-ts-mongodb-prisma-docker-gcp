import { Request, Response } from 'express'
import User, { IUser } from '../models/userModel'
import jwt from 'jsonwebtoken';



export const getUserAll = async (req: Request, res: Response) => {
    try {
        const users: IUser[] = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId)

        if (!user) {
            res.status(400).json({ message: "User not found" })
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}
export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body as { name: string; email: string; password: string };
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const user = await User.create({ name, email, password });

    // Gera o token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    console.log('token:', token, user);
    res.status(201).json({ message: 'User created successfully', token, user });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}
export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id
        const userUpdated = req.body
        const user = await User.findByIdAndUpdate(userId, userUpdated, { new: true })

        if (!user) {
            res.status(400).json({ message: "User not found" })
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id
        const user = await User.findByIdAndDelete(userId)

        if (!user) {
            res.status(400).json({ message: "User not found" })
        }

        res.status(200).json({ message: "User deleted" })
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}
export const deleteUserAll = async (req: Request, res: Response) => {
    try {
        const user = await User.deleteMany()

        if (!user) {
            res.status(400).json({ message: "Users not found" })
        }

        res.status(200).json({ message: "Users  deleted" })
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}



//

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body as { name: string, email: string, password: string }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already in use' });
        }

        const user = await User.create({
            name,
            email,
            password
        })

        console.log(user)
        // res.status(201).json(user)
        res.status(201).json({ message: 'User created successfully' });

    } catch (error) {
        res.status(400).json({ message: (error as Error).message })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as { email: string, password: string }

        const user = await User.findOne({ email });
        if (!user) {
            console.log('Invalid email ')
            return res.status(400).json({ error: 'User not found' });
        }

        console.log('Login successfully:', user);
        res.status(200).json({ message: 'Login successfully', user });

    } catch (error) {
        res.status(400).json({ message: (error as Error).message })
    }
}