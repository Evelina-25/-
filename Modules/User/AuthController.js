import UserService from "./UserService.js";
import jwt from "jsonwebtoken";

class AuthController {

    async register(req, res){
        try{

            const { username, password } = req.body;

            if (!username && !password) {
                return res.status(400).json({ 
                    message: "Пожалуйста, заполните все поля: имя пользователя и пароль" 
                });
            }

            const user = await UserService.register(username, password);

            const userData = {
                id: user._id,
                username: user.username,
                role: user.role
            };

            res.status(201).json({ 
                message: "Регистрация успешна", 
                user: userData 
            });
            

        } catch(e) {
            let statusCode = 400;
            if (e.message === "Пользователь уже существует") {
                statusCode = 409; 
            }
            
            res.status(statusCode).json({ message: e.message });
        }
    }

async login(req, res){
    try{

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ 
                message: "Имя пользователя и пароль обязательны для заполнения" 
            });
        }

        const user = await UserService.login(username, password);

        const token = jwt.sign(
            { id: user._id, role: user.role },
            "TEMP_SECRET_KEY_123",
            { expiresIn: "24h" }
        );

        res.json({ 
                message: "Вход выполнен успешно",
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    role: user.role
                }
            });

        } catch(e) {
            const statusCode = e.message === "Пользователь не найден" || e.message === "Неверный пароль" 
                ? 401 
                : 400;
                
            res.status(statusCode).json({ message: e.message });
        }
    }
}

export default new AuthController();