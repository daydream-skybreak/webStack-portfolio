import User from "../models/User";

export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        console.log(err);
    }
    if (!users) {
        return res.status(404)
            .json({ message: "User not found" })
    }

    return res.status(200)
        .json({ message: 'User successfully found', users })
}
export const signUp = async (req, res, next) => {
    const {name, email, password} = req.body;
    if (!name) return res.status(400).json({message: "Please provide name"})
    if (!email) return res.status(400).json({message: "Please provide E-mail"})
    if (!password) return res.status(400).json({message: "Please provide password"})

    let existingUser;
    try {
        existingUser = await User.findOne({email});
    }catch (err) {
        console.log(`Error:${err}`)
    }
    if (existingUser) {
        res.status(400).json({message: 'User already exists', user: existingUser})
    }
    const user  = new User({
        name,
        email,
        password,
        blogs: [],
        });
    try {
        await user.save()
    } catch (err) {
        console.log(err)
    }
    return res.status(201).json({user});
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email) return res.status(400).json({message: "Please provide E-mail"})
    if (!password) return res.status(400).json({message: "Please provide password"})

    let existingUser;
    try {
        existingUser = await User.findOne({ email })
    }
    catch (err) {
        return console.log("Error:", err.toString() || err.message)
    }

    if (!existingUser) {
        return res.status(404)
            .json({message: "No such user could be found"})
    }
    if (existingUser.password !== sha1(password)) {
        return res.status(401)
            .json({message: "Incorrect password"})
    }
    return res.status(200).json({message: "Login Successful"})
}

