import { Subjects , Publisher , ExpirationCompleteEvent} from '@mac-tickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    subject : Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}