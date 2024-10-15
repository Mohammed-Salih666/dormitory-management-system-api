import { Inject, Injectable } from '@nestjs/common';
import { MYSQL_CONNECTION } from 'src/constants';
import * as schema from '../database/schema';
import { apartments } from '../database/schema';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { and, eq } from 'drizzle-orm';
import { CreateApartmentDto } from './dto/create-apartment.dto';
@Injectable()
export class ApartmentsService {
  constructor(
    @Inject(MYSQL_CONNECTION)
    private readonly db: MySql2Database<typeof schema>, 
  ){}

  async findAll(forMale: boolean) {
    const allApartments = await this.db
      .select()
      .from(apartments)
      .where(
        eq(apartments.for_male, forMale)
      ); 

    return allApartments; 
  }

  
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

  async create(dto: CreateApartmentDto) {
    const roomsCount = dto.apartment_type === "standard" ? 4
                        : dto.apartment_type === "economy" ? 6
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

  async remove(floor: string, apartmentNumber: number){
    await this.db
      .delete(apartments)
      .where(
        and(
          eq(apartments.floor, floor),
          eq(apartments.number, apartmentNumber),
        )
      ); 

    return {
      message: "Apartment Removed",
    }
  }

}
