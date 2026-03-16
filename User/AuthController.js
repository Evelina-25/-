import UserService from "./UserService.js";
import jwt from "jsonwebtoken";

class AuthController {

    async register(req, res){
        try{

            const { username, password } = req.body;

            const user = await UserService.register(username, password);

            res.json(user);

        }catch(e){
            res.status(400).json({ message: e.message });
        }
    }

async login(req, res){
    try{

        const { username, password } = req.body;

        const user = await UserService.login(username, password);

        const token = jwt.sign(
            { id: user._id, role: user.role },
            "TEMP_SECRET_KEY_123",
            { expiresIn: "24h" }
        );

        res.json({ token });

    }catch(e){
        res.status(400).json({ message: e.message });
    }
}

}

export default new AuthController();