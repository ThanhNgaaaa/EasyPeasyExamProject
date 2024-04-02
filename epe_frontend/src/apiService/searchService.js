import * as request from "../utils/httpRequest";
export const search = async (searchKey) => {
  try {
    const res = await request.get("Courses/search", {
      params: {
        searchKey,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
