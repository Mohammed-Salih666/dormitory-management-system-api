import { Notification } from "./notification.interface";

export class reservationApprovedNotification implements Notification {
  subject: string;
  message: string;

  constructor(apartmentFloor: string, apartmentNumber: number) {
    this.subject = `Reservation Approved - Floor ${apartmentFloor} Number ${apartmentNumber}`;
    this.message = `Your reservation in floor ${apartmentFloor} number ${apartmentNumber} has been approved`
  }
}