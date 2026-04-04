import User from "./User.js";
import bcrypt from "bcrypt";

class UserService {

    async register(username, password){

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