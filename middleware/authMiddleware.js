import jwt from "jsonwebtoken";

export default function(req, res, next){

    if(req.method === "OPTIONS"){
        next();
    }

    try{

        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({ message: "Не авторизован" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, "TEMP_SECRET_KEY_123");

        req.user = decoded;

        next();

    }catch(e){
        return res.status(401).json({ message: "Недействительный токен" });
    }

}