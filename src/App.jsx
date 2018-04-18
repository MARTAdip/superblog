import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts : [],
      form: {},
      editing: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  componentDidMount() {
    fetch(`http://localhost:5000/api/posts`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      this.setState({
        posts : data
      });
    })
  }

  handleChange(e) {
    e.preventDefault();
    let addPost = {...this.state.form};
    addPost[e.target.id] = e.target.value;
    this.setState({form : addPost});
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(e)
    let addPostForm = this.state.form;
    axios.post(`http://localhost:5000/api/posts`, addPostForm).then(response => {
      console.log("Slide added successful: ", response);
        fetch(`http://localhost:5000/api/posts`).then( resp => resp.json()).then(posts => {
          this.setState({posts: posts});
      });
    }).catch(function(error){
      console.log("Errooooor: ", error);
    })
  }


  handleUpdate(e, post) {
    e.preventDefault();
    console.log(e)
    axios.put(`http://localhost:5000/api/posts/${post._id}`, this.state.form).then(response => {
      console.log("Slide edited successful: ", response);
      fetch(`http://localhost:5000/api/posts`).then(resp => resp.json()).then(posts => {
        this.setState({posts: posts, editing: null});
      });
    }).catch(function(error){
      console.log("Errooooor: ", error);
    })
  }

  handleDelete(id) {
    axios.delete(`http://localhost:5000/api/posts/${id}`).then(response => {
      console.log("Slide deleted successful: ", response);
      fetch(`http://localhost:5000/api/posts`).then(resp => resp.json()).then(posts => {
        this.setState({posts : posts});
      });
    }).catch(function(error) {
      console.log("Error: ", error);
    })
  }

  handleEdit(post) {
    this.setState({
      form: post,
      editing: post
    })
  }

  render() {
    const posttemplate = this.state.posts.map((post, i) => 
      this.state.editing && this.state.editing._id === post._id ? (
          <form key={i} onSubmit={(e) => this.handleUpdate(e, post)}>
            <div className="form-group">
              <label className="w-100">
                Name: 
                <input  className="form-control" type="textarea" defaultValue={this.state.editing.name} onChange={this.handleChange} id="name" />
              </label>
            </div>  
            <div className="form-group">
              <label className="w-100">
                Content: 
                <input  className="form-control" type="textarea" defaultValue={this.state.editing.content} onChange={this.handleChange} id="content" />
              </label>
            </div>  
            <div className="form-group">
              <button className="btn btn-primary" type="submit">submit</button>
            </div>  
          </form> 
      ) : (
        <li className="list-group-key" key={i}> 
                <h2>{post.name}</h2>
                <p>{post.content}</p>
                <button className="btn btn-danger" onClick={() => this.handleDelete(post._id)}>Remove</button>
                <button className="btn btn-info" onClick={() => this.handleEdit(post)}>Edit</button>
          </li>
      )

    )
    return (
      <div className="container">
        <div className="my-3">
        <h2>List of all posts:</h2>
         
            <br />   
          <h2>Create a post:</h2>     
          <form  id="form" onSubmit={this.handleSubmit}> 
            <div className="form-group">  
              <label>Name: </label>     
                <input  className="form-control" type="textarea" onChange={this.handleChange} id="name" />
            </div>    
                <br />
            <div className="form-group">    
              <label>Content: </label>  
                <input  className="form-control" type="textarea" onChange={this.handleChange} id="content"  />
            </div>    
                <br />
            <div className="form-group">    
              <label>Order: </label>  
                <input  className="form-control" type="number" onChange={this.handleChange} id="order" />
            </div>    
                <button className="btn btn-primary" type="submit">add post</button>
          </form>  
        </div>     
          <div className="row">
            <div className="my-3">
              <h2>List of all posts:</h2>
              <ul className="list-group">
                {posttemplate}
              </ul>
            </div>
          </div>
      </div>
    );
  }
}
export default App;
