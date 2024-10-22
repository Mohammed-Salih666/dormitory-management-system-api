import { Inject, Injectable } from '@nestjs/common';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { MYSQL_CONNECTION } from 'src/constants';
import * as schema from '../database/schema';
import { users } from '../database/schema';
import { eq } from 'drizzle-orm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  /**
   * Constructor for the UsersService class.
   * 
   * @param db The MySql2Database instance for database operations.
   */
  constructor(
    @Inject(MYSQL_CONNECTION)
    private readonly db: MySql2Database<typeof schema>, 
  ){}


  /**
   * Retrieves all users from the database.
   * 
   * @returns An array of all users in the database.
   */
  async findAll() {
    const allUsers = await this.db.select().from(users); 

    return allUsers; 
  }

/**
 * Retrieves a user based on the provided user ID.
 * 
 * @param id The ID of the user to retrieve.
 * @returns The user matching the specified ID.
 */
  async findOne(id: number) {
    const user = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id)); 

    return user; 
  }

  /**
   * Retrieves a user based on the provided university ID.
   * 
   * @param uniId The university ID of the user to retrieve.
   * @returns The user matching the specified university ID.
   */
  async findByUniId(uniId: string) {
    const user = await this.db
      .select()
      .from(users)
      .where(eq(users.uni_id, uniId)); 

    return user; 
  }

  /**
   * Creates a new user based on the provided CreateUserDto.
   * 
   * @param dto The CreateUserDto containing user details.
   * @returns An object with a message indicating the user creation status.
   */
  async create(dto: CreateUserDto) {
    await this.db
      .insert(users)
      .values(dto); 

    return {
      message: "User Created"
    }
  }

  /**
   * Updates an existing user based on the provided UpdateUserDto.
   * Only updates the fields that are provided in the dto.
   * 
   * @param id The ID of the user to update.
   * @param dto The UpdateUserDto containing the updated user details.
   * @returns An object with a message indicating the user update status.
   */
  async update(id: number, dto: UpdateUserDto) {
    await this.db
      .update(users)
      .set({
        ...dto,
        updated_at: new Date(),
      })
      .where(eq(users.id, id)); 

      return {
        message: "User Updated",
      }
  }

  async remove(id: number) {
    await this.db
      .update(users)
      .set({
        deleted_at: new Date(), 
      })
      .where(eq(users.id, id)); 

    return {
      message: "User Removed",
    }

  }

}
