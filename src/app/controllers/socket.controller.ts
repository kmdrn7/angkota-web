import { Router, Request, Response } from 'express'
import {fcmMessage as fcmMessage} from '../interfaces/fcmMessage'
import {NotificationController as Notif} from '../controllers/notification.controller'

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

        this.router.get('/test', (req: Request, res: Response) => {
            this.pesan.title = "Jancok KOntol"
            this.pesan.body = "taek eek asu"
            this.pesan.icon = "uc_icon"
            this.pesan.json = ""

            new Notif().sendMessage(this.pesan,"asdasd")

            res.render('socket', {                
                page: {
                    title: 'Dashboard',
                    actor: 'Jasa Raharja',
                    view: 'jasaraharja/dashboard'
                }
            })
        })

    }

}

export default new SocketController().router