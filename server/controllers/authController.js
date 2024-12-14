const User = require('../../database/model/user.model');
const jwt = require('jsonwebtoken');
const validator = require('email-validator');

const jwtSecret = process.env.JWT_SECRET || 'default_secret_key';

const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        console.log('User Info:', user);
        if (!user) {
            return res.status(400).json({ error: 'Email does not exist' });
        }

        user.comparePassword(password, (err, match) => {
            if (err || !match) {
                return res.status(400).json({ error: 'Password does not match' });
            }

            const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: '24h' });

            return res.status(200).json({
                success: true,
                message: 'Signin successful',
                data: {
                    token,
                    username: user.username,
                    email: user.email,
                    id: user._id,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                    role: user.role,
                    classIds: user.classIds,
                },
            });
        });
    } catch (error) {
        console.error('Signin Error:', error);
        return res.status(500).json({ error: 'Login failed. Please try again later.' });
    }
};

const register = async (req, res) => {
    const { username, password, email, role, classIds } = req.body;
    try {
        if (!username) return res.status(400).json({ error: 'Username is required' });
        if (!email) return res.status(400).json({ error: 'Email is required' });
        if (!validator.validate(email)) {
            return res.status(400).json({ error: 'Enter a valid email ID' });
        }
        if (!password || password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }
        if (!role) {
            return res.status(400).json({ error: 'Role is required' });
        }
        if (role === 'Student' && (!classIds || classIds.length === 0)) {
            return res.status(400).json({ error: 'classIds are required for students' });
        }

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ error: 'Email is already taken' });
        }

        const user = new User({ email, username, password, role, classIds });
        await user.save();

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                username: user.username,
                email: user.email,
                role: user.role,
                classIds: user.classIds,
            },
        });
    } catch (error) {
        console.error('Register Error:', error);
        return res.status(500).json({ error: 'Error creating user' });
    }
};

module.exports = {
    signin,
    register,
};
