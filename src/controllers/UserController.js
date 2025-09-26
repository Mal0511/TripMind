import db from '../models/index.js';

const User = db.User;

let getUser = async (req, res) => {
    console.log("SESSION:", req.session);
   try {
        if (!req.session.userId) {
            return res.status(401).json({ message: 'Not logged in' });
        }

        const user = await User.findByPk(req.session.userId, {
            attributes: ['id', 'fullName', 'userName', 'email', 'phone'] 
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default {
    getUser : getUser,
}