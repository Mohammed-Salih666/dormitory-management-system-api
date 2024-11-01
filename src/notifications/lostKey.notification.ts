import { Notification } from "./notification.interface";

export class lostKeyNotification implements Notification {
  subject: string;
  message: string; 

  constructor(studentName: string, apartmentFloor: string, apartmentNumber: number){
    this.subject = `Lost Key - Floor ${apartmentFloor} Number ${apartmentNumber}`;
    this.message = `The student ${studentName} has lost the key to their apartment in floor ${apartmentFloor} number ${apartmentNumber}`; 
  }
}