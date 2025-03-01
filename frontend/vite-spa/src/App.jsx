import './App.css'
import ObjectList from './components/ObjectList'
import ObjectUpload from './components/ObjectUpload'
import ObjectDelete from './components/ObjectDelete'
import Test from './components/Test'

function App() {

  return (
    <>
      <div className="App">
        <ObjectList />
        <ObjectUpload />
        <ObjectDelete />
        <Test />
      </div>
    </>
  )
}

export default App
