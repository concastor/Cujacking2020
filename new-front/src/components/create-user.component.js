import React, { Component } from 'react';
import axios from 'axios';
import Checkbox from '@material-ui/core/Checkbox';

export default class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            isAdmin: false
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.name === 'username' ? target.value: target.checked;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            isAdmin: this.state.isAdmin,
        }

        console.log(user);

        axios.post('http://localhost:5000/users/add',user)
            .then(res => console.log(res.data));

        window.location = "/users/create"
    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input  type="text"
                                name="username"
                                required
                                className="form-control"
                                value={this.state.username}
                                onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <div>
                            <label>isAdmin:&nbsp;&nbsp;&nbsp;</label>
                            <Checkbox
                                name="isAdmin"
                                value={this.state.isAdmin}
                                onChange={this.handleInputChange}
                                color="primary"
                            />
                            {/*<input*/}
                            {/*        type="checkbox"*/}
                            {/*        value={this.state.isAdmin}*/}
                            {/*        onChange={this.handleInputChange}*/}
                            {/*/>*/}
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}