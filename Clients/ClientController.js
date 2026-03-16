import ClientService from "./ClientService.js";

class ClientController {

    async create(req, res){
        try{

            const { name, passport, phone, email, birthdate } = req.body;

            const client = await ClientService.create(
                name,
                passport,
                phone,
                email,
                birthdate
            );

            return res.json(client);

        }catch(e){
            res.status(500).json(e.message);
        }
    }

    async getAll(req, res){
        try{

            const clients = await ClientService.getAll();
            return res.json(clients);

        }catch(e){
            res.status(500).json(e.message);
        }
    }

    async getOne(req, res){
        try{

            const client = await ClientService.getOne(req.params.id);
            return res.json(client);

        }catch(e){
            res.status(500).json(e.message);
        }
    }

    async update(req, res){
        try{

            const updatedClient = await ClientService.update(
                req.params.id,
                req.body
            );

            return res.json(updatedClient);

        }catch(e){
            res.status(500).json(e.message);
        }
    }

    async delete(req, res){
        try{

            const client = await ClientService.delete(req.params.id);
            return res.json(client);

        }catch(e){
            res.status(500).json(e.message);
        }
    }

}

export default new ClientController();