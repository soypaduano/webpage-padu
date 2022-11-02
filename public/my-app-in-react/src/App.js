import './App.css';
import './styles/meme-generator-styles.css'
import Header from './components/meme-generator-components/Header.js'
import Meme from './components/meme-generator-components/Meme.js'
import Counter from './components/meme-generator-components/Counter'


let MemeGenerator = () => {
  return (
    <div>
      <Header />
      <Meme />
      <Counter/>

    </div>
  )
}

export default { MemeGenerator }