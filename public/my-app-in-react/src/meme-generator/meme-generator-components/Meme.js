import React from "react"
import memeData from "./memeData.js"

export default function Meme() {

    /**
 
      */

    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })


    const [allMemes, setAllMemes] = React.useState({})
    const [memeText, setMemeText] = React.useState({ topText: "", bottomText: "" });


    let onChangeTexts = (event) => {
        let { name, value } = event.target
        setMemeText(prevMeme => {
            return {
                ...prevMeme,
                [name]: value
            }
        })
    }

    React.useEffect(() => {
        asyncAwaitFunc();

        fetch('https://api.imgflip.com/get_memes')
            .then(response => response.json()
                .then(data => {
                    setAllMemes(data.data.memes);
                    console.log(allMemes);
                }));
    }, []);


    async function asyncAwaitFunc() {
        try {

            const response = await fetch('https://api.imgflip.com/get_memes');
            const data = await response.json();
            console.log("Respuesta async await es: ")
            console.log(data)
        } catch {

        }
    }


    /*
    Tambien se puede hacer con await, es más limpio
    React.useEffect(async () => {
        const res = await fetch("https://api.imgflip.com/get_memes")
        const data = await res.json()
        setAllMemes(data.data.memes)
    }, [])
    */



    function getMemeImage() {
        const memesArray = allMemes;
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        const url = memesArray[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))

    }

    return (
        <main>
            <div className="form">
                <input
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    onChange={onChangeTexts}
                    value={memeText.topText}
                />
                <input
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    onChange={onChangeTexts}
                    value={memeText.bottomText}
                />
                <button
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{memeText.topText}</h2>
                <h2 className="meme--text bottom">{memeText.bottomText}</h2>
            </div>
        </main>
    )
}