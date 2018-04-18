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
    let emptyNameString = document.getElementById('name').value = '';
    let emptyContentString = document.getElementById('content').value = '';
    let addPostForm = this.state.form;
    axios.post(`http://localhost:5000/api/posts`, addPostForm).then(response => {
      console.log("Slide added successful: ", response);
        fetch(`http://localhost:5000/api/posts`).then( resp => resp.json()).then(posts => {
          this.setState({posts: posts});
          M.toast({html: 'Post saved successfully!'})
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
        M.toast({html: 'Post updated successfully!'})
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
        M.toast({html: 'Post deleted successfully!'})
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
    const divStyle = {
      fontFamily : 'Roboto Mono'
    }
    const posttemplate = this.state.posts.map((post, i) => 
        <div className="col s6 m6"  key={i}>
    
    {this.state.editing && this.state.editing._id === post._id ? (
          <form key={i} onSubmit={(e) => this.handleUpdate(e, post)}>
          <div className="z-depth-2 p-3">
            <div className="form-group" style={divStyle} >
              <label className="w-100">
                Name: 
                <input type="text"  defaultValue={this.state.editing.name} onChange={this.handleChange} id="name" />
              </label>
            </div>  
            <div >
              <label className="w-100">
                Content: 
                <input type="text"  defaultValue={this.state.editing.content} onChange={this.handleChange} id="content" />
              </label>
            </div>  
            <div className="form-group">
            <button className="waves-effect lime btn-flat" type="submit">submit</button>
              </div> 
              </div>  
 
          </form> 
      ) : (
          <div className="p-3 z-depth-2">
                  <h4 className="mt-0">{post.name}</h4>
                  <p>{post.content}</p>
                  <button className="btn waves-effect lime black-text text-darken-2" onClick={() => this.handleDelete(post._id)}>Remove</button>
                  <button className="btn waves-effect lime black-text text-darken-2" onClick={() => this.handleEdit(post)}>Edit</button>
      </div>    
                  
      )}
      </div>    

    )
    return (
      <div className="container">
        <div className="my-3" style={divStyle}>
            <br />   
          <h2>Create a post:</h2>     
          <form  id="form" onSubmit={this.handleSubmit}> 
            <div className="input-field col s6">  
              <label>Name: </label>     
                <input  className="form-control" type="text" defaultValue={this.state.posts.name} onChange={this.handleChange} id="name" />
            </div>    
                <br />
            <div className="input-field col s6">    
              <label>Content: </label>  
                <input  className="form-control" type="text" defaultValue={this.state.posts.content} onChange={this.handleChange} id="content"  />
            </div>    
                <br />
            {/* <div className="input-field col s6">    
              <label>Order: </label>  
                <input  className="form-control" type="number" onChange={this.handleChange} id="order" />
            </div>   */}  
                <button className="btn waves-effect lime black-text text-darken-2" type="submit">add post
                  <i className="material-icons right">send</i>
                </button>
          </form>  
        </div>  
        
          <div className="row" style={divStyle}>
            <div className="my-3">
              <h2>List of all posts:</h2>
      <div className="row">
      
              {posttemplate}
        </div>    
            </div>
          </div>
      </div>
    );
  }
}
export default App;
