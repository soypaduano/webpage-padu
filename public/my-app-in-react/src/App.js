import './App.css';
import './styles/meme-generator-styles.css'
import Header from './components/meme-generator-components/Header.js'
import Meme from './components/meme-generator-components/Meme.js'
import Counter from './components/meme-generator-components/Counter.js'
import Boxes from './components/meme-generator-components/Boxes.js'
import Form from './components/meme-generator-components/Form.js'


let MemeGenerator = () => {
  return (
    <div>
      <Header />
      <Meme />
      <Form />
    </div>
  )
}

export default { MemeGenerator }

