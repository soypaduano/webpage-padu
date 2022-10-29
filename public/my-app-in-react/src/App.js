import './App.css';
import Header from './components/Header.js'
import MainContent from './components/MainContent.js'
import Footer from './components/Footer.js'

//Tenemos que usar Caps para los componentes, es una convención. 
let InformationPage = () =>{
  return (
    <div>
      <Header/>
      <MainContent/>
      <Footer/>
    </div>
  )
}







export default {InformationPage}