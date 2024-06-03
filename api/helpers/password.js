import bcrypt from "bcrypt";

const hashPassword = async (pass) => {
  try {
    return await bcrypt.hash(pass, 12);
  } catch (error) {
    console.log(error);
  }
};

const comparePassword = async (pass, userPass) => {
  return await bcrypt.compare(pass, userPass);
};

export { hashPassword, comparePassword };
