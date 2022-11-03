import React from 'react';
import memeData from './memeData.js'

let Meme = () => {

    let [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        url: "http://i.imgflip.com/1bij.jpg"
    });
    
    let [allMemeImages, setAllMemeImages] = React.useState(memeData);


    let getMeme = (e) => {
        const memeCopy = allMemeImages.data.memes[Math.floor(Math.random()*allMemeImages.data.memes.length)];
        if(e) e.preventDefault();
        setMeme(prevMeme => {
            return {
                ...prevMeme, url: memeCopy.url
            }
        });
    }

    

    return (
        <main>
        <form className="form">
            <input 
                type="text"
                placeholder="Top text"
                className="form--input"
            />
            <input 
                type="text"
                placeholder="Bottom text"
                className="form--input"
            />
            <button 
                className="form--button"
                onClick={getMeme}
            >
                Get a new meme image 🖼
            </button>
        </form>
        <div className="img-container">
            <img src={meme.url} />
        </div>
    </main>
    )
}

export default Meme;