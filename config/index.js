import { PATH } from "./endpoint";

const configs = {
  // APP_ENV: process.env.REACT_APP_ENV,

  // API_DOMAIN: `${process.env.PRIMARY_APP_URL}/${PATH}`,
  //     API_DOMAIN: `https://api.bazigaar.com/${PATH}`,

  //   API_DOMAIN: `${process.env.PRIMARY_APP_URL}/${PATH}`,
  API_DOMAIN: `${process.env.REACT_APP_MAIN_URL}/${PATH}`,
};

export default configs;
