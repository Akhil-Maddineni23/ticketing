import { Publisher , Subjects , TicketUpdatedEvent} from '@mac-tickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    subject:Subjects.TicketUpdated = Subjects.TicketUpdated;
}