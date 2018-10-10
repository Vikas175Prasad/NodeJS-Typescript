import * as mongoose from 'mongoose';
import { ContactSchema } from '../models/crmModel';
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

const Contact = mongoose.model('contact', ContactSchema);
export class ContactController{

public addNewContact (req: Request, res: Response) {                
        let newContact = new Contact(req.body);
    
        newContact.save((err, contact) => {
            if(err){
                res.send(err);
            }    
            res.json(contact);
        });
    }

public getContacts (req: Request, res: Response) {           
        Contact.find({}, (err, contact) => {
            if(err){
                res.send(err);
            }
            let resObject = {"data":contact,"status":200}
            res.json(resObject);
            
        });
    }

public getContactWithID (req: Request, res: Response) {           
        Contact.findById(req.params.contactId, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json(contact);
        });
    }

public updateContact (req: Request, res: Response) {           
        Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json(contact);
        });
    }

public deleteContact (req: Request, res: Response) {           
        Contact.deleteOne({ _id: req.params.contactId }, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted contact!'});
        });
    }

public contactByName(req:Request,res:Response){

    Contact.find({firstName:req.body.firstName},(err,contact) =>{

        if(err){

            res.send(err);
        }

        res.json(contact);


    });
}


public addHobbyField(req:Request,res:Response){

    Contact.updateOne({ _id:req.body._id },{ $set:{ hobbies:req.body.hobbies }},(err,contact) =>{

        if(err){

            res.send(err);
        }

        res.json(contact);
    })

}

public getHobby( req:Request,res:Response){

    Contact.find({},{hobbies:1},(err,contact) => {

        if(err){

            res.send(err);
        }

        res.json(contact);

    })

}

public uploadFile( req:Request, res:Response){

    console.log(req.file.originalname);

    var file = './public/resources/' + req.file.originalname;

    
    fs.rename(req.file.path, file, function(err){
        if (err) {
            console.log(err);
            res.send(500);
        }else{
            console.log("Inside else");
            fs.readFile('./public/resources/' + req.file.originalname, function(err,data){

                if (!err){
                console.log('received data: ' + data.length);
                res.setHeader('Content-Type', req.file.mimetype);
                fs.createReadStream(path.join('./public/resources/', req.file.originalname)).pipe(res);
                
                }else{
                    console.log(err);
                }
                
            });
            

        } 

        
    });
}

}