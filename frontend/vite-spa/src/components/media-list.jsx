const SERVER_URL = import.meta.env.VITE_SERVER_URL
import React from 'react';
import axios from 'axios';

export default class MediaList extends React.Component {
  state = {
    medias: []
  }

  componentDidMount() {
    //Get media list from SERVER_URL/list after mount
    axios.get(SERVER_URL + '/list')
      .then(res => {
        const medias = res.data.Contents;
        this.setState({ medias });
      })
  }

  render() {
    return (
      <ul>
        {
          this.state.medias
            .map(media =>
              <li key={media.Key}>{media.Key}</li>
            )
        }
      </ul>
    )
  }
}