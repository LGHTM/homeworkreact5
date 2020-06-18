import React from "react";

// class UsersList extends React.Component {
//   state = {
//     users: null
//   }

//   async componentDidMount(){
//     const response = await fetch('https://jsonplaceholder.typicode.com/users')
//     const users = await response.json();
//     console.log(users)
//     this.setState({
//       users,
//     })
//   }

//   render(){
//     if(this.state.users === null){
//       return '...loading...'
//     }
//     return(
//       <>
//       <ul>{this.state.users.map((user) => <li key={user.name}>{user.name}</li>)}</ul>
//       </>
//     )
//   }
// }

const UsersList = ({ userList, activeTypeName, onChange }) => (
  <ul>
    {userList.map((user) => (
      <li
        style={
          activeTypeName === user.id ? { backgroundColor: "yellow" } : null
        }
        key={user.name}
        onClick={() => onChange(user.id)}
      >
        {user.name}
      </li>
    ))}
  </ul>
);

class UserPost extends React.Component {
  constructor(type) {
    super(type);
    this.state = {
      id: null,
      post: null,
    };
  }

  async componentDidMount() {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${this.props.type}`
    );
    const post = await response.json();
    console.log(post);
    this.setState({
      post,
    });
  }

  async componentDidUpdate(prevProps) {
    console.log(this.props.type);
    if (prevProps.type !== this.props.type) {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${this.props.type}`
      );
      const post = await response.json();
      console.log(post);
      this.setState({
        post,
      });
    }
  }

  render() {
    if (this.state.post === null) {
      return "...loading...";
    }
    return (
      <>
        <ol>
          {this.state.post.map((post) => (
            <li key={post.title}>{post.body}</li>
          ))}
        </ol>
      </>
    );
  }
}

class UserApp extends React.Component {
  state = {
    userList: null,
    activeTypeName: null,
  };

  async componentDidMount() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const userList = await response.json();
    console.log(userList);

    this.setState({
      userList,
    });
  }

  render() {
    if (this.state.userList === null) {
      return "...loading...";
    }
    return (
      <>
        <UsersList
          userList={this.state.userList}
          activeTypeName={this.state.activeTypeName}
          onChange={(activeTypeName) => (
            console.log(activeTypeName), this.setState({ activeTypeName })
          )}
        />
        <UserPost type={this.state.activeTypeName} />
      </>
    );
  }
}

export default UserApp;
