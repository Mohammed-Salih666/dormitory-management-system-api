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
  constructor(
    @Inject(MYSQL_CONNECTION)
    private readonly db: MySql2Database<typeof schema>, 
  ){}

  async findAll() {
    const allUsers = await this.db.select().from(users); 

    return allUsers; 
  }

  async findOne(id: number) {
    const user = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id)); 

    return user; 
  }

  async findByUniId(uniId: string) {
    const user = await this.db
      .select()
      .from(users)
      .where(eq(users.uni_id, uniId)); 

    return user; 
  }

  async create(dto: CreateUserDto) {
    await this.db
      .insert(users)
      .values(dto); 

    return {
      message: "User Created"
    }
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.db
      .update(schema.apartments)
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
        updated_at: new Date(),
      })
      .where(eq(users.id, id)); 

    return {
      message: "User Removed",
    }

  }

}
