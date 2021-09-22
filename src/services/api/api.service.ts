import axios from "axios";

const config = {
  api: "https://api.themoviedb.org/3/discover",
};

export const getApi = async (endpoint: string, configData: any) => {
  const response = await axios.get(`${config.api}${endpoint}`, {
    params: configData,
  });
  if (response.status === 200) {
    return response.data;
  } else {
    return undefined;
  }
};
