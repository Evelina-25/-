import ApplicationService from "./ApplicationService.js";

class ApplicationController {

    async create(req, res){
        try{

            const application = await ApplicationService.create(
                req.body,
                req.user.id
            );

            res.json(application);

        }catch(e){
            res.status(400).json({message: e.message});
        }
    }

    async confirm(req, res){
    try{

        const application = await ApplicationService.confirm(req.params.id);

        res.json(application);

    }catch(e){
        res.status(400).json({message: e.message});
    }
}

async issueFinalDocuments(req, res){
    try {
        const documents = await ApplicationService.issueFinalDocuments(req.params.id);
        res.json(documents);
    } catch(e) {
        res.status(400).json({message: e.message});
    }
}

    async getAll(req, res){
        try{

            const applications = await ApplicationService.getAll();

            res.json(applications);

        }catch(e){
            res.status(400).json({message: e.message});
        }
    }

    async getOne(req, res){
        try{

            const application = await ApplicationService.getOne(req.params.id);

            res.json(application);

        }catch(e){
            res.status(400).json({message: e.message});
        }
    }

    async delete(req, res){
        try{

            const application = await ApplicationService.delete(req.params.id);

            res.json(application);

        }catch(e){
            res.status(400).json({message: e.message});
        }
    }

}

export default new ApplicationController();