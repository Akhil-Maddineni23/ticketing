import { Subjects , Listener , PyamentCreatedEvent , OrderStatus} from '@mac-tickets/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Order } from '../../models/order';

export class PaymentCreatedListener extends Listener<PyamentCreatedEvent>{
    subject : Subjects.PaymentCreated = Subjects.PaymentCreated;
    queueGroupName = queueGroupName;

    async onMessage(data : PyamentCreatedEvent['data'] , msg : Message){
        const order = await Order.findById(data.orderId);

        if(!order){
            throw new Error('Order Not found');
        }

        order.set({
            status : OrderStatus.Complete,
        })

        await order.save()
        msg.ack();
    }
}