import nats from 'node-nats-streaming';
import { TicketCreatedPublsiher } from './events/ticket-created-publisher';
console.clear();


const stan = nats.connect('ticketing' , 'abc', {
    url : 'http://localhost:4222'
});

stan.on('connect' , async()=> {
    console.log('Publisher connect to NATS');

    const publisher = new TicketCreatedPublsiher(stan);

    try{
        await publisher.publish({
            id : '123',
            title : 'Cricket',
            price : 45
        })
    }catch(err){
        console.error(err);
    }

})