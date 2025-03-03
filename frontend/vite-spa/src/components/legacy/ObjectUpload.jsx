const SERVER_URL = import.meta.env.VITE_SERVER_URL
import React from 'react';
import axios from 'axios';

export default class ObjectUpload extends React.Component {
    state = {
        selectedObject: (null),
    }

    handleChange = event => {
        this.setState({ selectedObject: event.target.files[0] })
    }

    handleSubmit = event => {
        event.preventDefault();

        const formData = new FormData()
        formData.append("objectBody", this.state.selectedObject)
        const objectName = this.state.selectedObject.name
        formData.append("objectKey", objectName)
        console.log("uploading " + objectName)

        axios.post(SERVER_URL + '/s3/upload', formData)
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
                        <input type="file" onChange={this.handleChange} />
                    </label>
                    <button type="submit">Upload</button>
                </form>
            </div>
        )
    }
}