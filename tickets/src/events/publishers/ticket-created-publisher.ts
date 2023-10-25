import { Publisher , Subjects, TicketCreatedEvent} from '@mac-tickets/common';

export class TicketCreatedPublsiher extends Publisher<TicketCreatedEvent>{
    subject:Subjects.TicketCreated = Subjects.TicketCreated;
}