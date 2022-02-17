import bcrypt from 'bcrypt';

export const hashPassword = async (password) => await bcrypt.hash(password, 10);
export const comparehashPassword = async (password, hash) => await bcrypt.compare(password, hash);
