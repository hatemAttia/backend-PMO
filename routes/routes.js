const welcomeController = require('../controller/welcomeController');
const teamController = require('../controller/teamController');
const newsController = require('../controller/newsController');
const fileController = require('../controller/fileController');
const histoMailController = require('../controller/histoMailController');
const sendMailController = require('../controller/sendMailController');
const opportunityController= require('../controller/opportunityController');
const userController = require('../controller/userController');
import {uploadimages,uploadFile } from "../config/multer"
export default (app) => {
    
 app.route("/").get(welcomeController.welcome);
 ////////////////////////TEAM CONTROLLER///////////////////////////
 app.route("/team").post(teamController.createTeam);
 app.route("/team/:id").put(teamController.updateMembre);
 app.route("/team/:id").delete(teamController.deleteMembre);
 app.route("/team").get(teamController.getAllMembres);
 app.route("/team-img/:id").post(uploadimages.single("file"),teamController.updateImage);

 ////////////////////////NEWS CONTROLLER///////////////////////////

 app.route("/news").post(newsController.createNews);
 app.route("/news/:id").put(newsController.updateStory);
 app.route("/news/:id").delete(newsController.deleteStory);
 app.route("/news").get(newsController.getAllstories);
 app.route("/news-img/:id").post(uploadimages.single("file"),newsController.updateImage);

  ////////////////////////FILE CONTROLLER///////////////////////////

 app.route("/file").post(fileController.createFile);
 app.route("/file/:id").put(fileController.updateFile);
 app.route("/file/:id").delete(fileController.deleteFile);
 app.route("/file").get(fileController.getAllFiles);
 app.route("/file-name/:id").post(uploadFile.single("file"),fileController.updateFileName);

  ////////////////////////OPPORTUNITY CONTROLLER///////////////////////////

 app.route("/opportunity").post(opportunityController.createOpportunity);
 app.route("/opportunity/:id").put(opportunityController.updateOpportunity);
 app.route("/opportunity/:id").delete(opportunityController.deleteOpportunity);
 app.route("/opportunity").get(opportunityController.getAllOpportunities);
 app.route("/opportunity-img/:id").post(uploadimages.single("file"),opportunityController.updateImage);
 
  ////////////////////////FILE CONTROLLER///////////////////////////

 app.route("/email").post(histoMailController.createhistoMail);
 app.route("/email/:id").put(histoMailController.updatemail);
 app.route("/email/:id").delete(histoMailController.deletemail);
 app.route("/email").get(histoMailController.getAllmails);

  ////////////////////////mail CONTROLLER///////////////////////////

 app.route("/send-email").post(sendMailController.sendMultiMail);
 app.route("/contact").post(sendMailController.sendMail);

 ////////////////////////user CONTROLLER///////////////////////////

  // app.route("/user").post(userController.register);
  app.route("/login").post(userController.login);

};  
