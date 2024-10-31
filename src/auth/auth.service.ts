import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { MYSQL_CONNECTION } from 'src/constants';
import * as schema from '../database/schema';
import { MySql2Database } from 'drizzle-orm/mysql2';
import * as bcrypt from 'bcrypt';
import { signUpDto } from './dto/signup.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class AuthService {
  constructor(
    @Inject(MYSQL_CONNECTION)
    private readonly db: MySql2Database<typeof schema>,
  ){}

  async signUp(dto: signUpDto) {
    const user = await this.db.query.users.findFirst({
      where: eq(schema.users.email, dto.email),
    }); 

    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const uni_id = dto.email.split('@')[0];

    await this.db
      .insert(schema.users)
      .values({
        ...dto,
        uni_id,
        image: 'https://test.com',
      }); 

    return true; 
  }

  async signIn(email: string, accessToken: string) {
    const user = await this.db.query.users.findFirst({
      where: eq(schema.users.email, email)
    }); 
    
    if(!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const at = await bcrypt.hash(accessToken, 10);

    await this.db
      .update(schema.users)
      .set({
        access_token: at,
      })
      .where(eq(schema.users.id, user.id));

    return true; 
  }
}
