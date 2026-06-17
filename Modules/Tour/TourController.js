import TourService from "./TourService.js";

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class TourController {

    async create(req, res){
        try{
            console.log('=== ОТЛАДКА СОХРАНЕНИЯ ТУРА ===');
            console.log('req.body:', req.body);
            console.log('req.file:', req.file);
            console.log('req.files:', req.files);
            console.log('===================================');
            
            const tourData = { ...req.body };
            

          if (req.files && req.files.length > 0) {

    const currentTour = await TourService.getOne(req.params.id);
    
    if (currentTour && currentTour.images && currentTour.images.length > 0) {
        currentTour.images.forEach(imageUrl => {
            const oldPath = path.join(__dirname, '..', imageUrl);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        });
    }
    tourData.images = req.files.map(file => `/uploads/tours/${file.filename}`); // ← ИСПРАВЛЕНО
}
            
            const tour = await TourService.create(tourData);
            return res.json(tour);
        }catch(e){
            console.error('Ошибка:', e);
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
        console.log('=== ОТЛАДКА ОБНОВЛЕНИЯ ТУРА ===');
        console.log('req.body:', req.body);
        console.log('req.files:', req.files);
        console.log('===================================');
        
        const tourData = { ...req.body };
        
        if (req.files && req.files.length > 0) {

            const currentTour = await TourService.getOne(req.params.id);
            
           
            if (currentTour && currentTour.images && currentTour.images.length > 0) {
                currentTour.images.forEach(imageUrl => {
                    const oldPath = path.join(__dirname, '..', imageUrl);
                    if (fs.existsSync(oldPath)) {
                        fs.unlinkSync(oldPath);
                    }
                });
            }
            
         
            tourData.images = req.files.map(file => `/uploads/tours/${file.filename}`);
        }
      
        
        const tour = await TourService.update(req.params.id, tourData);
        return res.json(tour);
    }catch(e){
        console.error('Ошибка:', e);
        res.status(500).json(e.message);
    }
}

    async delete(req, res){
        try{
            const tour = await TourService.getOne(req.params.id);
            if (tour && tour.images && tour.images.length > 0) {
                tour.images.forEach(imageUrl => {
                    const imagePath = path.join(__dirname, '..', imageUrl);
                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);
                    }
                });
            }
            
            const deletedTour = await TourService.delete(req.params.id);
            return res.json(deletedTour);
        }catch(e){
            res.status(500).json(e.message);
        }
    }
}

export default new TourController();