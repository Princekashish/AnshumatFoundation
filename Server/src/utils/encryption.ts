import bcrypt from "bcryptjs";

export const encrypt = async (password: string) => {
  const salt = 9;
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};
export const decrypt = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};
