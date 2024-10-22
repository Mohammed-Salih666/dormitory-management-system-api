import { Injectable, Inject } from '@nestjs/common';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { MYSQL_CONNECTION } from 'src/constants';
import * as schema from '../database/schema';
import { inspections } from '../database/schema';
import { and, eq, isNull } from 'drizzle-orm';
import { CreateInspectionDto } from './dto/create-inspection.dto';

@Injectable()
export class InspectionsService {
  /**
   * Constructor for the InspectionsService class.
   * 
   * @param db The MySql2Database instance for database operations.
   */
  constructor(
    @Inject(MYSQL_CONNECTION)
    private readonly db: MySql2Database<typeof schema>
  ){}

  /**
   * Retrieves all inspections from the database.
   * 
   * @returns An array of all inspections in the database that have not been deleted.
   */
  async findAll() {
    const allInspections = await this.db
      .select()
      .from(inspections)
      .where(
        isNull(inspections.deleted_at)
      ); 

    return allInspections; 
  }

/**
 * Retrieves a specific inspection based on the provided ID.
 * 
 * @param id The ID of the inspection to retrieve.
 * @returns The inspection matching the specified ID.
 */
  async findOne(id: number) {
    const inspection = await this.db
      .select()
      .from(inspections)
      .where(
        and(
          eq(inspections.id, id), 
          isNull(inspections.deleted_at),
        )
      ); 

    return inspection;
  }


  /**
   * Creates a new inspection based on the provided CreateInspectionDto.
   * The inspection_date is converted to a Date object before insertion.
   * 
   * @param dto The CreateInspectionDto containing inspection details.
   * @returns An object with a message indicating the inspection creation status.
   */
  async create(dto: CreateInspectionDto){
    dto.inspection_date = new Date(dto.inspection_date);
    await this.db
      .insert(inspections)
      .values(dto); 

    return {
      message: 'Inspection Created',
    }
  }

/**
 * Updates an existing inspection based on the provided ID and Partial<CreateInspectionDto>.
 * The updated_at field is set to the current date.
 * 
 * @param id The ID of the inspection to update.
 * @param dto The Partial<CreateInspectionDto> containing the updated inspection details.
 * @returns An object with a message indicating the inspection update status.
 */
  async update(id: number,dto: Partial<CreateInspectionDto>){
    await this.db
      .update(inspections)
      .set({
        ...dto, 
        updated_at: new Date(),
      })
      .where(
        and(
          eq(inspections.id, id),
          isNull(inspections.deleted_at),
        )
      ); 

    return {
      message: 'Inspection Updated',
    }
  }

  /**
   * Soft deletes an inspection by setting the deleted_at field to the current date.
   * 
   * @param id The ID of the inspection to soft delete.
   * @returns An object with a message indicating the inspection removal status.
   */
  async remove(id: number) {
    await this.db
      .update(inspections)
      .set({
        deleted_at: new Date(),
      })
      .where(
        and(
          eq(inspections.id, id),
          isNull(inspections.deleted_at),
        )
      );  

    return {
      message: 'Inspection Deleted',
    }
  }
}
