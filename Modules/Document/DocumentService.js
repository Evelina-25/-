import Document from "./Document.js";

class DocumentService {

async createApplicationDocument(applicationId){

    return Document.create({
        applicationId,
        type: "APPLICATION",
        number: "APP-" + Date.now()
    });

}

async createReceipt(applicationId){

    return Document.create({
        applicationId,
        type: "PAYMENT_RECEIPT",
        number: "REC-" + Date.now()
    });

}

async createVoucher(applicationId){

    return Document.create({
        applicationId,
        type: "TOUR_VOUCHER",
        number: "VCH-" + Date.now()
    });

}

async createFinalDocuments(applicationId){

    const docs = [
        {
            applicationId,
            type: "SERVICE_CONTRACT",
            number: "CON-" + Date.now()
        },
        
        {
            applicationId,
            type: "TOURIST_MEMO",
            number: "MEM-" + Date.now()
        }
    ];

    return Document.insertMany(docs);
}

async getByApplication(applicationId){
    return Document.find({applicationId});
}

}

export default new DocumentService();