const welcomeController = require('../controller/welcomeController');

export default (app) => {
    
    ////////////////////////TOUR CONTROLLER///////////////////////////
    app.route("/").get(welcomeController.welcome);
   
};  