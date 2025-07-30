import axios from 'axios';

export default class PostService {
    static async getAll(limit = 10, page = 1) {
        const skip = (page - 1) * limit;
        const response = await axios.get('https://dummyjson.com/posts', {
            params: { limit, skip },
        });
        return response.data; // вернем сразу .data
    }

    static async getById(id) {
        const response = await axios.get(`https://dummyjson.com/posts/${id}`);
        return response.data;
    }
}
