import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data : [],
      form: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    fetch(`http://localhost:5000/api/posts`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      this.setState({
        data : data
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
    axios.post('http://localhost:5000/api/posts', addPostForm).then(response => {
      console.log("Slide added successful: ", response);
        fetch(`http://localhost:5000/api/posts`).then( resp => resp.json()).then(posts => {
          this.setState({data: posts});
      });
    }).catch(function(error){
      console.log("Errooooor: ", error);
    })
  }

  render() {
    return (
      <div className="container">
        <div className="my-3">
        <h2>List of all posts:</h2>
        <ul className="list-group">

            {this.state.data.map((post, i) => 
          <li className="list-group-key" key={i}> 
                <h2>{post.name}</h2>
                <p>{post.content}</p>
                {/* <p>{post.order}</p> */}
          </li>
         
                )}
        </ul>         
            <br />   
          <h2>Create a post:</h2>     
          <form  id="form" onSubmit={this.handleSubmit}> 
            <div className="form-group">  
              <label>Name: </label>     
                <input  className="form-control" type="textarea" onChange={this.handleChange} id="name-input" />
            </div>    
                <br />
            <div className="form-group">    
              <label>Content: </label>  
                <input  className="form-control" type="textarea" onChange={this.handleChange} id="content-input"  />
            </div>    
                <br />
            <div className="form-group">    
              <label>Order: </label>  
                <input  className="form-control" type="number" onChange={this.handleChange} id="order-input" />
            </div>    
                <button className="btn btn-primary" onClick={(e) => this.handleChange(e)}>add post</button>
          </form>  
        </div>     
      </div>
    );
  }
}
export default App;
 // defaultValue={this.state.data}