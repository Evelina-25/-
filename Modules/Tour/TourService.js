import Tour from "./Tour.js";

class TourService {

    validateTourData({ name, country, startDate, durationDays, price, availableSeats }) {

        if (!name || name.trim().length < 3) {
            throw new Error("Название тура должно содержать минимум 3 символа");
        }

        if (!country) {
            throw new Error("Страна обязательна");
        }

        const date = new Date(startDate);
        if (isNaN(date.getTime())) {
            throw new Error("Некорректная дата начала тура");
        }

        if (durationDays <= 0) {
            throw new Error("Продолжительность должна быть больше 0");
        }

        if (price <= 0) {
            throw new Error("Цена должна быть больше 0");
        }

        if (availableSeats < 0) {
            throw new Error("Количество мест не может быть отрицательным");
        }
    }

async create(tourData){

    const { name, country, city, startDate } = tourData;

    const existingTour = await Tour.findOne({
        name,
        country,
        city,
        startDate
    });

    if(existingTour){
        throw new Error("Такой тур уже существует");
    }

    const tour = await Tour.create(tourData);

    return tour;
}

async getAll(query){

    const filter = {};

    if(query.country){
        filter.country = query.country;
    }

    if(query.city){
        filter.city = query.city;
    }

    return Tour.find(filter);
}

async getOne(id) {

    if (!id) {
        throw new Error("Не указан ID тура");
    }

    return await Tour.findById(id);
}

    async update(id, data){

        if(!id){
            throw new Error("Не указан ID тура");
        }

        return await Tour.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id){

        if(!id){
            throw new Error("Не указан ID тура");
        }

        return await Tour.findByIdAndDelete(id);
    }
}

export default new TourService();