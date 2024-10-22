import { HttpException, Inject, Injectable } from '@nestjs/common';
import { MYSQL_CONNECTION } from 'src/constants';
import * as schema from '../database/schema';
import { apartments } from '../database/schema';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { and, eq } from 'drizzle-orm';
import { CreateApartmentDto } from './dto/create-apartment.dto';
@Injectable()
export class ApartmentsService {
/**
 * Constructor for the ApartmentsService class.
 * 
 * @param db The MySql2Database instance for database operations.
 */
  constructor(
    @Inject(MYSQL_CONNECTION)
    private readonly db: MySql2Database<typeof schema>, 
  ){}

  async findAll(forMale: boolean) {
  /**
   * Retrieves all apartments for the given gender.
   * @param forMale Whether the apartments are for males or not.
   * @returns An array of all apartments for the given gender.
   */
    const allApartments = await this.db
      .select()
      .from(apartments)
      .where(
        eq(apartments.for_male, forMale)
      ); 

    return allApartments; 
  }

  
  /**
   * Retrieves a specific apartment based on floor, apartment number, and gender preference.
   * 
   * @param floor The floor on which the apartment is located.
   * @param apartmentNumber The specific number of the apartment.
   * @param forMale A boolean indicating if the apartment is for males.
   * @returns The apartment matching the specified criteria.
   */
  async findOne(floor: string, apartmentNumber: number, forMale: boolean) {
    const apartment = await this.db
    .select()
    .from(apartments)
    .where(
      and(
        eq(apartments.floor, floor), 
        eq(apartments.number, apartmentNumber),
        eq(apartments.for_male, forMale),
      )
    ); 
    
    return apartment; 
  }
  
  /**
   * Retrieves all rooms for a given apartment.
   * 
   * @param floor The floor on which the apartment is located.
   * @param number The specific number of the apartment.
   * @returns An array of all rooms in the given apartment.
   */
  async findRoomsByApartment(floor: string, number: number) {
    const condition = and(
      eq(apartments.floor, floor),
      eq(apartments.number, number)
    ); 

    const rooms = await this.db.query.apartments.findMany({
      where: condition, 
      with: {
        rooms: true,
      }
    }); 

    return rooms;
  }

  /**
   * Retrieves all available rooms for the given gender.
   * 
   * @param gender A boolean indicating if the rooms are for males.
   * @returns An array of all available rooms for the given gender.
   */
  async findAvailableRooms(gender: boolean) {
    const rooms = await this.db.query.apartments.findMany({
      where: eq(apartments.for_male, gender),
      with: {
        rooms: {
          where: eq(schema.rooms.is_available, true),
        }
      }
    }); 

    return rooms; 
  }

/**
 * Creates a new apartment based on the provided CreateApartmentDto.
 * The number of rooms is determined by the apartment type.
 * Each room is assigned a unique room number starting from 'A'.
 * 
 * @param dto The CreateApartmentDto containing apartment details.
 * @returns An object with a message indicating the apartment creation status.
 */
  async create(dto: CreateApartmentDto) {
    const roomsCount = dto.apartment_type === "standard" ? 2
                        : dto.apartment_type === "economy" ? 3
                        : 1 //private

    
    let roomLetter = 'A'; 

    await this.db.transaction(async (tx) => {
      const [result] = await tx
      .insert(apartments)
      .values(dto); 

      for (let i =0; i < roomsCount; i++) {
        await tx
          .insert(schema.rooms)
          .values({
            apartment_id: result.insertId, 
            room_number: roomLetter
          }); 
        roomLetter = String.fromCharCode(roomLetter.charCodeAt(0)+1)
      }
    }); 

    return {
      message: "Apartment Created",
    }
  }


  /**
   * Updates an existing apartment based on the provided Partial<CreateApartmentDto>.
   * Only updates the fields that are provided in the dto.
   * 
   * @param floor The floor on which the apartment is located.
   * @param apartmentNumber The specific number of the apartment.
   * @param dto The Partial<CreateApartmentDto> containing the updated apartment details.
   * @returns An object with a message indicating the apartment update status.
   */
  async update(floor: string, apartmentNumber: number, dto: Partial<CreateApartmentDto>) {
    await this.db
      .update(apartments)
      .set({
        ...dto,
        updated_at: new Date(),
      })
      .where(
        and(
          eq(apartments.floor, floor),
          eq(apartments.number, apartmentNumber),
        )
      ); 

    return {
      message: "Apartment Updated",
    }
  }

  /**
   * Removes an existing apartment based on the provided floor and apartment number. Also deletes the associated rooms.
   * 
   * @param floor The floor on which the apartment is located.
   * @param apartmentNumber The specific number of the apartment.
   * @returns An object with a message indicating the apartment removal status.
   */
  async remove(floor: string, apartmentNumber: number){

    await this.db.transaction(async (tx) => {
      const apartment = await tx.query.apartments.findFirst({
        where: and(
          eq(apartments.floor, floor),
          eq(apartments.number, apartmentNumber),
        ),
        with: {
          rooms: true,
        }
      });
  
      if(!apartment) throw new HttpException("Apartment Not Found", 404);
  
      apartment.rooms.forEach(async (room) => {
        await tx.delete(schema.rooms).where(eq(schema.rooms.id, room.id));
      })
  
      await tx.delete(apartments).where(eq(apartments.id, apartment.id));
    })

    return {
      message: "Apartment Removed",
    }
  }

}
