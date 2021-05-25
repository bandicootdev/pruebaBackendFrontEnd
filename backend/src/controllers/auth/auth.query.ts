import pool from '../../database/poolClient';
import { UserDto } from '../users/dto/user.dto';

export const createAccount = async (entities:UserDto):Promise<UserDto> => {
  const poolClient = await pool().connect();
  try {
    await poolClient.query('BEGIN');
    const newUser = (await poolClient.query('INSERT INTO users(email,username,password) VALUES($1,$2,$3) RETURNING *',
      [entities.email, entities.username, entities.password])).rows[0];
    await poolClient.query('COMMIT');
    return newUser;
  } catch (err) {
    await poolClient.query('ROLLBACK');
    throw new Error(err);
  } finally {
    await poolClient.release();
  }
};
