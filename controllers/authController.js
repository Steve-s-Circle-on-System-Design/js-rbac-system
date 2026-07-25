import User from "../models/user.js"
import Role from '../models/role.js'

exports.registerUser = async (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8); 
    const user = new User({ username, password: hashedPassword, role });

    User.register(user, password, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err.message })
        }
        res.json({ message: 'User registered successfully' })
    });
};

// Login a user and create a session
exports.loginUser = (req, res) => {
    const { username, password } = req.body;

    User.authenticate(username, password, (err, user) => {
        if (err || !user) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        // Create a new session and store user id
        req.session.userId = user._id;
    const token = jwt.sign(
      { id: userId, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: `15m`,
      }
    );
        res.json({ message: 'Login successful', token })
    })
}