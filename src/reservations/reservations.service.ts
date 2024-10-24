import { Inject, Injectable } from '@nestjs/common';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { MYSQL_CONNECTION } from 'src/constants';
import * as schema from '../database/schema';
import { reservations } from '../database/schema';
import { eq, isNull } from 'drizzle-orm';
import { CreateReservationDto } from './dto/create-reservation.dto';
@Injectable()
export class ReservationsService {
  constructor(
    @Inject(MYSQL_CONNECTION)
    private readonly db: MySql2Database<typeof schema>,
  ){}

  /**
   * Retrieves all reservations from the database.
   * 
   * @returns An array of all reservations in the database.
   */
  async findAll() {
    const allReservations = await this.db
      .select()
      .from(reservations)
      .where(isNull(reservations.deleted_at));
 
    return allReservations;
  }

  /**
   * Retrieves a reservation based on the provided user ID.
   * 
   * @param userId The user ID for which the reservation should be retrieved.
   * @returns The reservation matching the specified user ID.
   */
  async findOne(userId: number) {
    const reservation = await this.db.query.reservations.findFirst({
      where: eq(reservations.user_id, userId),
      with: {
        room: true,
        user: true,
      }
    }); 

    return reservation; 
  }

  /**
   * Creates a new reservation based on the provided CreateReservationDto.
   * 
   * @param dto The CreateReservationDto containing reservation details.
   * @returns An object with a message indicating the reservation creation status.
   */
  async create(dto: CreateReservationDto) {
    await this.db
      .insert(reservations)
      .values(dto); 

    return {
      message: "Reservation Created"
    }
  }

  /**
   * Updates an existing reservation based on the provided Partial<CreateReservationDto>.
   * Only updates the fields that are provided in the dto.
   * 
   * @param id The ID of the reservation to update.
   * @param dto The Partial<CreateReservationDto> containing the updated reservation details.
   * @returns An object with a message indicating the reservation update status.
   */
  async update(id: number, dto: Partial<CreateReservationDto>) {
    await this.db
      .update(reservations)
      .set({
        ...dto, 
        updated_at: new Date(),
      })
      .where(
        eq(reservations.id, id)
      ); 

    return {
      message: "Reservation Updated"
    }
  }

  /**
   * Soft deletes a reservation by setting the deleted_at field to the current date.
   * 
   * @param id The ID of the reservation to soft delete.
   * @returns An object with a message indicating the reservation removal status.
   */
  async remove(id: number) {
    await this.db
      .update(reservations)
      .set({
        deleted_at: new Date(),
      })
      .where(
        eq(reservations.id, id)
      ); 

    return {
      message: "Reservation Removed"
    }
  }
}
