import Application from "./Application.js";
import DocumentService from "../Document/DocumentService.js";
import Client from "../Clients/Client.js";
import Tour from "../Tour/Tour.js";

class ApplicationService {

    async create(data, managerId) {
        const { clientId, tourId, peopleCount } = data;

        const client = await Client.findById(clientId);
        if(!client) throw new Error("Клиент не найден");

        const tour = await Tour.findById(tourId);
        if(!tour) throw new Error("Тур не найден");

        if(tour.availableSeats < peopleCount){
            throw new Error("Недостаточно свободных мест");
        }

        tour.availableSeats -= peopleCount;
        await tour.save();

        const application = await Application.create({
            clientId,
            tourId,
            managerId,
            peopleCount
        });

        // создаем документ заявки
        await DocumentService.createApplicationDocument(application._id);

        return application;
    }

    async confirm(id) {
        const application = await Application.findById(id);
        if(!application) throw new Error("Заявка не найдена");

        application.bookingStatus = "CONFIRMED";
        await application.save();

        // создаём ваучер
        await DocumentService.createVoucher(application._id);

        return application;
    }

    async issueFinalDocuments(applicationId) {
        const application = await Application.findById(applicationId);
        if(!application) throw new Error("Заявка не найдена");

        if(application.bookingStatus !== "CONFIRMED" || application.paymentStatus !== "PAID") {
            throw new Error("Документы можно выдать только после оплаты и подтверждения брони");
        }
        //Финальный пакет доков
        return DocumentService.createFinalDocuments(applicationId);
    }

    async getAll() {
        return Application.find()
            .populate("clientId")
            .populate("tourId")
            .populate("managerId");
    }

    async getOne(id) {
        return Application.findById(id)
            .populate("clientId")
            .populate("tourId")
            .populate("managerId");
    }

    async delete(id) {
        const application = await Application.findById(id);
        if(!application) throw new Error("Заявка не найдена");

        const tour = await Tour.findById(application.tourId);
        if(tour){
            tour.availableSeats += application.peopleCount;
            await tour.save();
        }

        await Application.findByIdAndDelete(id);
        return { message: "Заявка удалена, места возвращены" };
    }

}

export default new ApplicationService();