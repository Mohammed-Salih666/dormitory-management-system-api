import { Notification } from "./notification.interface";

export class ReservationDeclinedNotification implements Notification{
  subject: string;
  message: string;

  constructor(apartmentFloor: string, apartmentNumber: number) {
    this.subject = `Reservation Declined - Floor ${apartmentFloor} Number ${apartmentNumber}`;
    this.message = `Your reservation in floor ${apartmentFloor} number ${apartmentNumber} has been declined`;
  }
}