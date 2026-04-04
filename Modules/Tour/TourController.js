import TourService from "./TourService.js";

class TourController {

    async create(req, res){
        try{
            const tour = await TourService.create(req.body);
            return res.json(tour);
        }catch(e){
            res.status(500).json(e.message);
        }
    }

    async getAll(req,res){

    const tours = await TourService.getAll(req.query);

    res.json(tours);
}

    async getOne(req, res){
        try{
            const tour = await TourService.getOne(req.params.id);
            return res.json(tour);
        }catch(e){
            res.status(500).json(e.message);
        }
    }

    async update(req, res){
        try{
            const tour = await TourService.update(
                req.params.id,
                req.body
            );
            return res.json(tour);
        }catch(e){
            res.status(500).json(e.message);
        }
    }

    async delete(req, res){
        try{
            const tour = await TourService.delete(req.params.id);
            return res.json(tour);
        }catch(e){
            res.status(500).json(e.message);
        }
    }
}

export default new TourController();