import './App.css';
//import './styles/meme-generator-styles.css'
import DataFetcher from './components/basic-components/render-prop.js'


let App = () => {

  return (
    <div>
      <DataFetcher url='https://jsonplaceholder.typicode.com/posts/1' fill={function(state){
        return (
          <div>
            {console.log(state.data)}
            <ul>


            </ul>
          </div>
        )
      }}>
      </DataFetcher>
    </div>
  )
}
export default App 

