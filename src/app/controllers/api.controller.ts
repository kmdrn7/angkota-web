import { Router, Request, Response } from 'express'
import * as firebase from 'firebase-admin'
import * as firebaseMiddleware from 'express-firebase-middleware'
import * as bodyParser from 'body-parser'

class ApiController {

    ref: any
    router: Router    

    constructor (){
        this.router = Router()
        this.router.use(bodyParser.json())
        this.router.use(bodyParser.urlencoded({ extended: false }))
        this.routes()        
    }

    routes (){

        /**
         * USER API
         */        
        this.router.post('/users', (req: Request, res: Response) => {
            this.ref = firebase.database().ref('/users');            
            this.ref.once('value', (snap) => {
                return snap.val()
            }).then((render) => {                
                res.json({
                    data: render
                })
            })
        })

        this.router.post('/users/add', (req: Request, res: Response) => {
            firebase.database()
                    .ref('/users')
                    .push({
                        name: req.body.name,
                        address: req.body.address,
                        phone: req.body.phone,
                        birthDate: req.body.birthDate,
                        email: req.body.email,
                        bankAccount: {
                            number: req.body.accountNumber,
                            bankName: req.body.accountName,
                            bank: req.body.bank,
                            branchCode: req.body.branchCode
                        },
                        idNumber: req.body.idNumber,
                        deviceID: req.body.deviceID,
                    }).then((snap => {
                        res.json({
                            status: 'Berhsail input data',
                            key: snap.key
                        })
                    }))
        })

        this.router.post('users/delete', (req: Request, res: Response) => {
            if ( req.body.userID ){
                let userID = req.body.userID;
                firebase.database()
                        .ref('/users')
                        .child(userID)
                        .remove()
            } else {
                res.json({
                    msg: "Masukkan userID yang ingin dihapus"
                })
            }
        })

        this.router.get('/users/:userID', (req: Request, res: Response) => {
            this.ref = firebase.database().ref('/users')
            if ( req.param('userID') ){
                let ID = req.param('userID')
                firebase.database()
                        .ref('/users')
                        .child(ID)
                        .once('value', (snap) => {
                            return snap.val()
                        }).then((user) => {
                            res.json(user)
                        })
            }
        })

        /**
         * VEHICLE API
         */
        this.router.post('/vehicles', (req: Request, res: Response) => {
            this.ref = firebase.database().ref('/vehicles')
            this.ref.once('value', (snap) => {
                return snap.val()
            }).then((render) => {
                res.json({
                    data: render
                })
            })
        })

        this.router.post('/vehicles/add', (req: Request, res: Response) => {
            firebase.database()
                    .ref('/users')
                    .push({
                        name: req.body.name,
                        type: req.body.type,
                        licensePlate: req.body.licensePlate,
                        birthDate: req.body.birthDate,
                        color: req.body.color,
                        yearOperate: req.body.yearOperate,
                        totalSeats: req.body.totalSeats,
                        details: req.body.details,
                        beaconID: req.body.beaconID
                    }).then((snap => {
                        res.json({
                            status: 'Berhsail input data',
                            key: snap.key
                        })
                    }))
        })

        this.router.post('users/delete', (req: Request, res: Response) => {
            if ( req.body.userID ){
                let userID = req.body.userID;
                firebase.database()
                        .ref('/users')
                        .child(userID)
                        .remove()
            } else {
                res.json({
                    msg: "Masukkan userID yang ingin dihapus"
                })
            }
        })

        this.router.get('/vehicles/:vehicleID', (req: Request, res: Response) => {
            this.ref = firebase.database().ref('/vehicles')
            if ( req.param('vehicleID') ){
                let ID = req.param('vehicleID')
                firebase.database()
                        .ref('/vehicles')
                        .child(ID)
                        .once('value', (snap) => {
                            return snap.val()
                        }).then((user) => {
                            res.json(user)
                        })
            }
        })

        /**
         * DRIVERS API
         */
        this.router.post('/drivers', (req: Request, res: Response) => {
            this.ref = firebase.database().ref('/drivers');            
            this.ref.once('value', (snap) => {
                return snap.val()
            }).then((render) => {                
                res.json({
                    data: render
                })
            })
        })

        this.router.post('/drivers/add', (req: Request, res: Response) => {
            firebase.database()
                    .ref('/drivers')
                    .push({
                        name: req.body.name,
                        address: req.body.address,
                        phone: req.body.phone,
                        birthDate: req.body.birthDate,
                        email: req.body.email,
                        bankAccount: {
                            number: req.body.accountNumber,
                            bankName: req.body.accountName,
                            bank: req.body.bank,
                            branchCode: req.body.branchCode
                        },
                        idNumber: req.body.idNumber,
                        deviceID: req.body.deviceID,
                    }).then((snap => {
                        res.json({
                            status: 'Berhsail input data',
                            key: snap.key
                        })
                    }))
        })

        this.router.post('drivers/delete', (req: Request, res: Response) => {
            if ( req.body.userID ){
                let userID = req.body.userID;
                firebase.database()
                        .ref('/drivers')
                        .child(userID)
                        .remove()
            } else {
                res.json({
                    msg: "Masukkan userID yang ingin dihapus"
                })
            }
        })

        this.router.get('/drivers/:driverID', (req: Request, res: Response) => {
            this.ref = firebase.database().ref('/drivers')
            if ( req.param('driverID') ){
                let ID = req.param('driverID')
                firebase.database()
                        .ref('/drivers')
                        .child(ID)
                        .once('value', (snap) => {
                            return snap.val()
                        }).then((render) => {
                            res.json(render)
                        })
            }
        })
    }

}

export default new ApiController().router