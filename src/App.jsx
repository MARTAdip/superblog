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
      <React.Fragment>
            {this.state.data.map((post, i) => 
          <div key={i}> 
                <li>
                  {post.name}
                </li>
                <br /> 
                <li>
                  {post.content}
                </li>
                <br /> 
                <li>
                  {post.order}
                </li>
          </div>
                )}
            <br />      
          <form id="form" onSubmit={this.handleSubmit}> 
            <div>  
              <label>Name: </label>    
                <input type="textarea" onChange={this.handleChange} id="name-input" />
            </div>    
                <br />
            <div>    
              <label>Content: </label>  
                <input type="textarea" onChange={this.handleChange} id="content-input"  />
            </div>    
                <br />
            <div>    
              <label>Order: </label>  
                <input type="number" onChange={this.handleChange} id="order-input" />
            </div>    
                <button onClick={(e) => this.handleChange(e)}>add post</button>
          </form>     
      </React.Fragment>
    );
  }
}
export default App;
 // defaultValue={this.state.data}