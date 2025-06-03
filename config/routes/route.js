import swagger from '../../core/swagger.js';
import ExampleController from '../../modules/example/controller.js';
import ImageController from '../../modules/images/controller.js';
import PaymentController from '../../modules/payment/controller.js';
import AuthenticationController from '../../modules/auth/controller.js'
import upload from "./../../core/services.js"
// import SubscriptionController from '../../modules/payment/controller.js';
class Route {
  constructor(app) {
    this.app = app;
  }

  defineRoutes() {

    this.app.post('/register', AuthenticationController.register);
    this.app.post('/login', AuthenticationController.login);

    this.app.post('/example', ExampleController.Insert);
    this.app.get('/example', ExampleController.Gets);
    this.app.get('/example/:id', ExampleController.Get);
    this.app.put('/example/:id', ExampleController.Update);
    this.app.delete('/example/:id', ExampleController.Delete);

    this.app.post('/image', ImageController.Insert);
    this.app.get('/image', ImageController.Gets);
    this.app.get('/image/:id', ImageController.Get);
    this.app.put('/image/:id', ImageController.Update);
    this.app.delete('/image/:id', ImageController.Delete);

    //  this.app.post('/image', ImageController.Insert);
    // this.app.get('/image/:id', ImageController.Get);
    // this.app.put('/image/:id', ImageController.Update); 
    // this.app.delete('/image/:id', ImageController.Delete); 

    this.app.get('/payment', PaymentController.Gets);
    this.app.get('/payment/price', PaymentController.GetPrice);
    this.app.post('/paddle/webhook', PaymentController.Getwebhook);
    this.app.post('/cancel-subscription/:id', PaymentController.cancelSubscription);

    
    // this.app.get('/subscription', SubscriptionController.getSubscription);
    // this.app.post('/paddle/webhook', PaddleWebhookController.Handle);

    swagger.setupSwagger(this.app);
  }
}

export default Route;
