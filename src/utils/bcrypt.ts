import  bcrypt from "bcrypt";

export const compareHash = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash, );
};

export const generateSalt = (rounds: number) => {
  return bcrypt.genSaltSync(rounds);
};

export const generateHash = (password: string, salt: string) => {
  return bcrypt.hashSync(password, salt);
};
