import './App.css'
import MediaList from './components/media-list'
import UploadObject from './components/upload-object'
import DeleteObject from './components/delete-object'

function App() {

  return (
    <>
      <div className="App">
        <UploadObject />
        <MediaList />
        <DeleteObject />
      </div>
    </>
  )
}

export default App
