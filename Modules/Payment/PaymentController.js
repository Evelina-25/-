import PaymentService from "./PaymentService.js";

class PaymentController {

    async create(req, res){
        try{

            const payment = await PaymentService.create(req.body);

            res.json(payment);

        }catch(e){
            res.status(400).json({message: e.message});
        }
    }

    async getAll(req, res){
        try{

            const payments = await PaymentService.getAll();

            res.json(payments);

        }catch(e){
            res.status(400).json({message: e.message});
        }
    }

    async getOne(req, res){
        try{

            const payment = await PaymentService.getOne(req.params.id);

            res.json(payment);

        }catch(e){
            res.status(400).json({message: e.message});
        }
    }

async pay(req, res) {
  try {
      const payment = await PaymentService.create({
        applicationId: req.params.id,
        method: req.body.method || "cash" 
      });
      res.json(payment);
    } catch(e) {
      res.status(400).json({ message: e.message });
    }
  }
}

export default new PaymentController();