import User from "../model/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const register = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const userdata = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            confirmpassword: req.body.confirmpassword
        })
        console.log(userdata.username)
        await userdata.save()
        res.status(200).json(userdata)
    } catch (err) {
        res.status(404).json("User already exist's")
    }
}


export const login = async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            return res.status(403).send("User not found")
        }
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        
        if (!isPasswordCorrect) {
            return res.status(404).json("Wrong Password")
        }

        const token = jwt.sign({
            userId: user._id,
            email: user.email
        }, process.env.jwt, { expiresIn: "24h" })

        return res.status(200).json({ msg: "logIn successful", email: user.email, userId: user._id, password: isPasswordCorrect, token })
    } catch (err) {
        return res.status(404).json("Email Not found")
    }
}

export const getUser = async (req, res) => {
    try {
        const { email } = req.params
        if (!email) {
            return res.status(404).json("Invalid User")
        }

        const userdata = await User.findOne({ email });

        if (!userdata) {
            return res.status(401).json({ error: "User not found" });
        }

        const { password, confirmpassword, ...restdata } = Object.assign({}, userdata.toJSON())

        return res.status(200).json(restdata)
    } catch (err) {
        return res.status(404).json("User data Not found")
    }

}


export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const body = req.body;

            const updateResult = await User.updateOne({ _id: id }, body);

            if (updateResult) {
                return res.status(200).json(updateResult);
            } else {
                return res.status(401).json({ error: "User Not Found...!" });
            }
        } else {
            return res.status(402).json({ error: "Invalid User ID" });
        }
    } catch (error) {
        console.error(error);
        return res.status(404).json({ error: "Server error" });
    }
};
