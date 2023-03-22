import axios from 'axios';

export default async function fetchImage(value, page) {
    const url = 'https://pixabay.com/api/';
    const key = '33743660-913c813c030e6790e857639fb';
    const filter = `?key=${key}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;

    return await axios.get(`${url}${filter}`).then(response => response.data);
    // const res = await axios.get(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_KEY}&q=${value}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`);
    // return res.data.hits;
}