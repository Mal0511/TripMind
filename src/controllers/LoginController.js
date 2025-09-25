import db from '../models/index';
const User = db.User;

let getLoginPage = (req, res) => {
    return res.render("login");
}
let getLoginController = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

    req.session.userId = user.id; 
    res.json({ message: 'Login successful' });
    
    } catch (error) {
        res.status(500).json({ message : error.message});
    }
}


let getRegisterController = async (req, res) => {
    try {
        const {username, password, email, phone} = req.body;
        const exitstUser = await User.findOne({ where : {username} });
        if (existUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const user = await User.create({ username, password, email, phone });
        res.status(201).json({ message: 'Registration successful', user });
    } catch (error) {
        res.status(500).json({ message : error.message});
    }
}

let getPasswordController = () => {

}
let getLogoutController = () => {

}
let getDeleteUserController = () => {

}

module.exports = {
    getLoginPage : getLoginPage,
    getLoginController : getLoginController,
    getRegisterController : getRegisterController,
    getPasswordController : getPasswordController,
    getLogoutController : getLogoutController,
    getDeleteUserController : getDeleteUserController
}