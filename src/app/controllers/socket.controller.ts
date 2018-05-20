import { Router, Request, Response } from 'express'
import {fcmMessage as fcmMessage} from '../interfaces/fcmMessage'
import {NotificationController as Notif} from '../controllers/notification.controller'
import {KepolisianSocket as KepolisianSocket} from '../socket/kepolisianSocket'

class SocketController {

    router: Router
    pesan: fcmMessage = {title:"",body:"",icon:"",json:""}
    
    constructor (){
        this.router = Router()        
        this.routes()
    }

    routes (){
        
        this.router.get('/', (req: Request, res: Response) => {
            res.render('socket', {                
                page: {
                    title: 'Dashboard',
                    actor: 'Jasa Raharja',
                    view: 'jasaraharja/dashboard'
                }
            })
        })

        this.router.get('/sendNotif', (req: Request, res: Response) => {
            this.pesan.title = "PERHATIAN !!!!!"
            this.pesan.body = "Terdapat kecelakaan di sekitar anda"
            this.pesan.json = ""

            new Notif().sendMessage(this.pesan,req.param("token"))
            
            console.log(req.param("token"))

            res.json({"iya":"iya"})
        })

        this.router.get('/addKepolisianAccident', (req: Request, res: Response) => {
            let html = req.param("html")
            KepolisianSocket.ioNameSpace.emit("appendReport",html)
            res.json({"tes":"tes"})
        })

    }

}

export default new SocketController().router