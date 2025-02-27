const SERVER_URL = import.meta.env.VITE_SERVER_URL
import React from 'react';
import axios from 'axios';

export default class DeleteObject extends React.Component {
    state = {
        key: ''
    }

    handleChange = event => {
        this.setState({ key: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
        const objectKey = this.state.key
        axios.post(SERVER_URL + '/s3/delete', {}, { params: { objectKey: objectKey } })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Input objectKey to delete:
                        <input type="text" name="key" onChange={this.handleChange} />
                    </label>
                    <button type="submit">Delete</button>
                </form>
            </div>
        )
    }
}