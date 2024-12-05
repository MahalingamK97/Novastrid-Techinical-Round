// @ts-ignore

import db from '../models/index.js'
import { CreateUserInput } from '../types/create-user-input.js';

const createUser = async (createUserInput: CreateUserInput) => {
  const user = await db.User.create(createUserInput);
  return user;
}

const getUser = async (email: string) => {
  return await db.User.findOne({ where: { email } })
}

export default { createUser, getUser }