import knex from "../db";
import { v4 as uuidv4 } from "uuid";
import { IUser } from "../utils/constants";

export default class UserRepository {
  async findByUsername(username: string): Promise<IUser | undefined> {
    const user = await knex<IUser>("users").where({ username }).first();
    return user;
  }

  async create(username: string, hash: string): Promise<IUser> {
    const id = uuidv4();

    const user: IUser = { id, username, password: hash };

    await knex<IUser>("users").insert(user);
    return user;
  }

  async fetchAllUser(): Promise<any | undefined> {
    const users = await knex<IUser>("users").select("username");
    return users;
  }
}
