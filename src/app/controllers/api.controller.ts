import { Router, Request, Response } from 'express'
import * as firebase from 'firebase-admin'
import * as firebaseMiddleware from 'express-firebase-middleware'

class ApiController {

    router: Router
    serviceAccount: any

    constructor (){
        this.router = Router()
        this.routes()
        this.serviceAccount = require('../../../ServiceAccountKey.json')
        firebase.initializeApp({
            credential: firebase.credential.cert(this.serviceAccount),
            databaseURL: 'https://angkota-hackathon-2018.firebaseio.com'
        })
    }

    routes (){
                
        this.router.post('/', (req: Request, res: Response) => {

            let val;
            let ref = firebase.database().ref('/Users');
            let UserRef = ref.push({
                name: 'Anik',
                age: 45,
            })

            res.json({
                data: 'ini adalah data percobaan pertama',
                dataLagi: ref
            })
        })

    }

}

export default new ApiController().router