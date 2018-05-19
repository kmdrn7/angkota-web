import { Application } from 'express'
import {AdminPublicMessage as Admin} from './adminSocket'
import {KepolisianSocket as KepolisianSocket} from '../socket/kepolisianSocket'
import * as socketIo from 'socket.io'

export class Socket {
    io: socketIo.Server

    constructor (io: SocketIO.Server){
        this.io = io;
        new Admin(this.io)
        new KepolisianSocket(this.io)
    }
}