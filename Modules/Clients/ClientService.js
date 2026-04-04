import Client from "./Client.js";

class ClientService {

    validateClientData({ name, passport, phone, email, birthdate }) {

        if (!name || name.trim().length < 2) {
            throw new Error("Имя клиента должно содержать минимум 2 символа");
        }

        if (!passport || passport.length < 6) {
            throw new Error("Некорректный номер паспорта");
        }

        const phoneRegex = /^\+?[0-9]{10,15}$/;
        if (!phoneRegex.test(phone)) {
            throw new Error("Некорректный номер телефона");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Некорректный email");
        }

        if (!birthdate) {
            throw new Error("Дата рождения обязательна");
        }

        const date = new Date(birthdate);
        if (isNaN(date.getTime())) {
            throw new Error("Некорректная дата рождения");
        }

        if (date > new Date()) {
            throw new Error("Дата рождения не может быть в будущем");
        }
    }


    async create(name, passport, phone, email, birthdate){

        this.validateClientData({ name, passport, phone, email, birthdate });

        const candidate = await Client.findOne({ passport });

        if(candidate){
            throw new Error("Клиент с таким паспортом уже существует");
        }

        const client = await Client.create({
            name,
            passport,
            phone,
            email,
            birthdate
        });

        return client;
    }

    async getAll(){
        return await Client.find();
    }

    async getOne(id){

        if(!id){
            throw new Error("Не указан ID клиента");
        }

        return await Client.findById(id);
    }

    async update(id, client){

        if(!id){
            throw new Error("Не указан ID клиента");
        }

        this.validateClientData(client);

        return await Client.findByIdAndUpdate(id, client, { new: true });
    }

    async delete(id){

        if(!id){
            throw new Error("Не указан ID клиента");
        }

        return await Client.findByIdAndDelete(id);
    }

}

export default new ClientService();