import React, {Component} from "react";
import PostService from "./PostService";
//import axios from 'axios';


const postService = new PostService();
let inp = React.createRef();

export default class Posts extends Component {
	constructor(props){
    	super(props)
    	this.state = {
        	data : [],
        	inputValue: ''
    	}

    	this.handleChange = this.handleChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
    	this.setState({inputValue: event.target.value});
	}

	handleSubmit(event) {
    	postService.createPost({'text' : this.state.inputValue});
    	this.getData()
    	this.setState({inputValue : ''})
	}

	getData(){
    	postService.getPosts().then(result => {
            console.log(result.data)
        	this.setState({data: result.data})
            
    	}) 
	}

    // getPosts() {
    //     //const url = `${API_URL}/api/posts/`;
    //     const url = `${API_URL}/post/`;
    //     return axios.get(url).then(response => response.data);
    // }

	componentDidMount(){
    	this.getData()
        console.log(this.state)
	}

    

	setLike(post) {
    	postService.setLikePost(post.id)
    	post.likesCount += 1
    	this.forceUpdate()    
	}

     view() {
        console.log(inp.current.value)
        postService.deletePost(inp.current.value)
        
    }

	render() {
    	return (
        	<div id = 'posts'>
        	{this.state.data.map(post =>
            	<div id = {'post_' + post.id}>
                	<p> {post.text} </p>
                	<button onClick={() => this.setLike(post)}>  {post.likesCount}</button>
                	<p> Date : {post.date}</p>
                	<hr/>
            	</div>
        	)}
        	<input type='text' onChange={this.handleChange} value={this.state.inputValue}></input><button onClick={this.handleSubmit}>Send</button>
        	<p>Что будем удалять id ?</p>
            <input type="text" defaultValue="inpit ID" ref={inp}/>
            <button onClick={this.view} >Enter</button>
            </div>
    	)
	}

}