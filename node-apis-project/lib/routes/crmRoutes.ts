import {Request, Response} from "express";

import { ContactController } from "../controllers/crmController";
import * as multer from 'multer';

export class Routes {
    
    public contactController: ContactController = new ContactController();

    imageFilter = function (req, file, cb) {
        // accept image only
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    };
    public upload = multer({ dest: `${"./public/resources/"}/`,fileFilter: this.imageFilter }); // multer configuration
    

    public routes(app): void {          
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })
        
        // Create a new contact
        app.route('/contact')
        .post(this.contactController.addNewContact);


        // Get all contacts
        app.route('/contact')
        .get(this.contactController.getContacts)


        app.route('/contact/:contactId')
        // edit specific contact
        .get(this.contactController.getContactWithID)
        .put(this.contactController.updateContact)
        .delete(this.contactController.deleteContact)

        // finding cintact using firstname
        app.route('/contactbyname')
        .post(this.contactController.contactByName)
    
        // add hobbies array
        app.route('/add_hobbies')
        .put(this.contactController.addHobbyField)

        // get hobbies field value
        app.route('/get_hobbies')
        .get(this.contactController.getHobby)

        // upload files
        app.route('/upload')
        .post( this.upload.single('avatar'),this.contactController.uploadFile)

    }
}