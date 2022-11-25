import axios from 'axios';

//const API_URL = 'http://localhost:8000';
const API_URL = 'http://127.0.0.1:8000';

export default class PostService{

    constructor(){}


    getPosts() {
        //const url = `${API_URL}/api/posts/`;
        const url = `${API_URL}/post/`;
        //return axios.get(url).then(response => response.data);
        return axios.get(url);
    }

    setLikePost(id) {
        const url = `${API_URL}/api/like_post/` + id;
        return axios.get(url).then(response => response.data);
    }

    createPost(text){
		const url = `${API_URL}/post/`;
		return axios.post(url,text);
	}

    deletePost(id){
		const url = `${API_URL}/post/${id}/`;
        console.log(url)
		return axios.delete(url,id);
	}
}