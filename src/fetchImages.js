import axios from 'axios';

export default async function fetchImage(value, page) {
    const baseURL = 'https://pixabay.com/api/';
    const KEY = '34508381-5f1bfab6abde36f0f37ce7014';
    const filter = `?key=${KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;

    return await axios.get(`${baseURL}${filter}`).then(response => response.data);
    // const res = await axios.get(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_KEY}&q=${value}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`);
    // return res.data.hits;
}