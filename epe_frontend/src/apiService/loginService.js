import * as request from "../utils/httpRequest";
export const login = async (Email, PasswordHash) => {
  try {
    const res = await request.post("Auth/login", {
      Email,
      PasswordHash,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
