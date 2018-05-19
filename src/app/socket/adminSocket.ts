import { Application } from 'express'
import * as socketIo from 'socket.io'

export class AdminPublicMessage {    

    io:socketIo.Server
    static ioNameSpace: any
    gsocket: any

    constructor (io: socketIo.Server){
        this.io = io
        AdminPublicMessage.ioNameSpace = this.io.of("/adminSocket")
        this.sockets()
    }

    sockets (){
        console.log("fungsi socket dijalankan")
        AdminPublicMessage.ioNameSpace.on('connect', (socket: any) => {
            // console.log('Connected client on port %s.', this.port);
            // socket.on('message', (m: Message) => {
            //     console.log('[server](message): %s', JSON.stringify(m));
            //     this.io.emit('message', m);
            // });

            // socket.on('disconnect', () => {
            //     console.log('Client disconnected');
            // });
            // socket.on('join', (data: String) => {
            //     console.log("terdapat message dari client");
            //     AdminPublicMessage.ioNameSpace.emit('messages', 'Hello from server');
            // });
        });
    }
}