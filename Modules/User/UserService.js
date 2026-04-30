import User from "./User.js";
import bcrypt from "bcrypt";

class UserService {

    async register(username, password){

        if (!username || username.trim() === "") {
            throw new Error("Имя пользователя не может быть пустым");
        }

        if (username.trim().length < 3) {
            throw new Error("Имя пользователя должно содержать минимум 3 символа");
        }
        
        if (!password || password.trim() === "") {
            throw new Error("Пароль не может быть пустым");
        }
        if (password.length < 6) {
            throw new Error("Пароль должен содержать минимум 6 символов");
        }
         
        const candidate = await User.findOne({ username });

        if(candidate){
            throw new Error("Пользователь уже существует");
        }

        const hashPassword = await bcrypt.hash(password, 5);

        const user = await User.create({
            username,
            password: hashPassword,
            role: "MANAGER"
        });

        return user;
    }

    async login(username, password){
         
        if (!username || username.trim() === "") {
            throw new Error("Введите имя пользователя");
        }
        
        if (!password || password.trim() === "") {
            throw new Error("Введите пароль");
        }
        const user = await User.findOne({ username });

        if(!user){
            throw new Error("Пользователь не найден");
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword){
            throw new Error("Неверный пароль");
        }

        return user;
    }

}

export default new UserService();