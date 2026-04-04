import DocumentService from "./DocumentService.js";

class DocumentController {

    async create(req, res){
        try{

            const document = await DocumentService.create(req.body);

            res.json(document);

        }catch(e){
            res.status(400).json({message: e.message});
        }
    }

    async getAll(req, res){
        try{

            const documents = await DocumentService.getAll();

            res.json(documents);

        }catch(e){
            res.status(400).json({message: e.message});
        }
    }

    async getOne(req, res){
        try{

            const document = await DocumentService.getOne(req.params.id);

            res.json(document);

        }catch(e){
            res.status(400).json({message: e.message});
        }
    }

}

export default new DocumentController();