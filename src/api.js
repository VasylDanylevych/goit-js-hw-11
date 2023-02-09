import axios from 'axios';
const URL = "https://pixabay.com/api/";
const API_KEY = "33456182-4b4e94c7d011671bbd7c07f09";

export default class ImgApi {
  constructor() {
    this.page = 1;
    this.searchQuery = "";
  };

  async getImg() {
    try {
      const response = await axios.get(`${URL}?key=${API_KEY}&page=${this.page}&per_page=40&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`);
      return response.data;
    } catch (error) {
      console.error(error)
    }
  };

  incrementPage() {
    this.page +=1;
  }

  resetPage() {
    this.page = 1;
  }
  
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}