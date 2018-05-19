import { Router, Request, Response } from 'express'
import * as firebase from 'firebase-admin'
import * as gcm from 'node-gcm'
import {fcmMessage as fcmMessage} from '../interfaces/fcmMessage'

export class NotificationController {

    serviceAccount: any

    constructor (){

    }

    sendMessage(mes:fcmMessage,token:string){
        var registrationToken = token;

        var message = {
            notification: {
                title: mes.title,
                // icon: mes.icon,
                body: mes.body
            },
            token: registrationToken
        };

        // Send a message to the device corresponding to the provided
        // registration token.
        firebase.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
    }
}