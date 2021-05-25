import { UserDto } from '../users/dto/user.dto';
import { LoginDto } from './dto/login.dto';
import { validateEmail } from './auth.controoller';
import { createAccount } from './auth.query';

export const registerAccount = (entity:UserDto):Promise<UserDto> => {
  if (!validateEmail(entity.email)) {
    throw new Error('Email invalid');
  }
  return createAccount(entity);
};

// export const loginAccount = (entity:LoginDto):Promise<UserDto> => {
//
// };
