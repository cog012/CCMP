const SERVER_URL = import.meta.env.VITE_SERVER_URL
import axios from 'axios';

// export function uploadObject({ objectKey, objectBody }) {
//     //send POST request to server,pass the object and info parameters
//     console.log("uploading to S3")
//     const formData = new FormData()
//     formData.append('objectBody', objectBody)
//     axios.post(SERVER_URL + '/test/upload', formData, { params: { objectKey: objectKey } })
//         .then(res => {
//             console.log(res.data);
//         })
// }