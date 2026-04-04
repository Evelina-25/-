import Payment from "./Payment.js";
import Application from "../Application/Application.js";
import Tour from "../Tour/Tour.js";
import DocumentService from "../Document/DocumentService.js";

class PaymentService {

    async create(data) {
        const { applicationId, method } = data;

        const application = await Application.findById(applicationId);
        if(!application) throw new Error("Заявка не найдена");

        const tour = await Tour.findById(application.tourId);
        if(!tour) throw new Error("Тур не найден");

        const amount = tour.price * application.peopleCount;

        const payment = await Payment.create({
            applicationId,
            amount,
            method
        });

        //  Меняем только paymentStatus
        application.paymentStatus = "PAID";
        await application.save();

        // создаём квитанцию
        await DocumentService.createReceipt(applicationId);

        return payment;
    }

    async getAll() {
        return Payment.find().populate({
            path: "applicationId",
            populate: ["clientId","tourId"]
        });
    }

    async getOne(id) {
        return Payment.findById(id).populate({
            path: "applicationId",
            populate: ["clientId","tourId"]
        });
    }

}

export default new PaymentService();