const axios = require('axios').default;
const URL = "https://pixabay.com/api/";
const API_KEY = "33456182-4b4e94c7d011671bbd7c07f09";

function getImg(value) {

    return axios.get(`${URL}?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true`)
    .then((res) => {
        if (!res.ok) {
            throw new Error(res.status);
          }
        return res.json()});
};

export { getImg };
