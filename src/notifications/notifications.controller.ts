import { Body, Controller, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Notification } from './notification.interface';
import { lostKeyNotification } from './lostKey.notification';
@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
  ){}

  //for custom notifications
  @Post()
  notify(@Body('to') to: string, @Body('subject') subject: string, @Body('message') message: string) {
    const notification = new class implements Notification {
      subject: string = subject;
      message: string = message;
    }

    this.notificationsService.sendMail(notification, to);
  }

  @Post('lost-key')
  notifyLostKey(@Body('to') to: string, @Body('student_name') studentName: string, @Body('apartment_floor') apartmentFloor: string, @Body('apartment_number') apartmentNumber: number) {
    this.notificationsService.sendMail(new lostKeyNotification(studentName, apartmentFloor, apartmentNumber), to);
  }
}
