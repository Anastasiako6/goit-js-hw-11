import axios from 'axios';

const URL = 'https://pixabay.com/api';
const KEY = '34508381-5f1bfab6abde36f0f37ce7014';
const OPTIONS = 'image_type=photo&orientation=horizontal&safesearch=true';

export default class PixabayApi {
    constructor() {
    this.query = '';
    this.page = 1;
    }

    async getImage() {
    try {
        const res = await axios.get(
        `${URL}/?key=${KEY}&q=${this.query}&${OPTIONS}&per_page=40&page=${this.page}`
        );

        this.nextPage();
        return res.data;
    } catch (error) {
        console.log(error.message);
    }
    }

    nextPage() {
    this.page += 1;
    }

    resetPage() {
    this.page = 1;
    }

}

