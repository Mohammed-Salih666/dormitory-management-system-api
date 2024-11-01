import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Notification } from './notification.interface';
@Injectable()
export class NotificationsService {
  constructor(
    private readonly mailService: MailerService,
  ){}

  sendMail(notification: Notification, to: string) {
    this.mailService.sendMail({
      from: process.env.MAIL_FROM_ADDRESS,
      to: to, 
      subject: notification.subject,
      text: notification.message
    }); 
  }
}
