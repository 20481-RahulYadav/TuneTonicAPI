const userRepository = require('../Services/LoginService');
const { hashPassword, comparePassword } = require('../utils/hashUtil');

class AuthController {
    async register(req, res) {
        try {
            const { username, email, password } = req.body;

            console.log(req.body);
            // Check if user exists
            if (await userRepository.findByEmail(email)) {
                return res.status(400).json({ message: "Email already registered" });
            }

            // Hash password and save user
            const hashedPassword = await hashPassword(password);
            const newUser = await userRepository.createUser({
                username,
                email,
                password: hashedPassword,
            });

            res.status(201).json({ message: "User registered successfully", userId: newUser._id });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Find user by email
            const user = await userRepository.findByEmail(email);
            if (!user) {
                return res.status(400).json({ message: "Invalid email or password" });
            }

            // Validate password
            const isValidPassword = await comparePassword(password, user.password);
            if (!isValidPassword) {
                return res.status(400).json({ message: "Invalid email or password" });
            }

            // If successful, send response (e.g., generate token here)
            res.status(200).json({ message: "Login successful", userId: user._id });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    }
}

module.exports = new AuthController();
