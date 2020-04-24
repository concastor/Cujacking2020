import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Checkbox from '@material-ui/core/Checkbox';

const User = props => (
    <tr>
        <td>{props.user.username}</td>
        <Checkbox
            checked={props.user.isAdmin}
            color='primary'
            disableRipple={true}
        />
        {/*<td>{props.user.isAdmin.toString()}</td>*/}
        <td>
            <Link to={"/edit/"+props.user._id}>Edit</Link> | <a href="#" onClick={() => { props.deleteUser(props.user._id) }}>Delete</a>
        </td>
    </tr>
)

export default class UsersList extends Component {
    constructor(props) {
        super(props);

        this.deleteUser = this.deleteUser.bind(this)

        this.state = {users: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(response => {
                this.setState({ users: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteUser(id) {
        axios.delete('http://localhost:5000/users/'+id)
            .then(response => { console.log(response.data)});

        this.setState({
            users: this.state.users.filter(el => el._id !== id)
        })
    }

    userList() {
        return this.state.users.map(curUser => {
            return <User user={curUser} deleteUser={this.deleteUser} key={curUser._id}/>;
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Users</h3>
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Admin</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.userList() }
                    </tbody>
                </table>
            </div>
        )
    }
}