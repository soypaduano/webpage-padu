/*
    Buen ejemplo de como crear un array de componentes formado con el metodo array.
*/

import data from './data.js'

export default function Card() {
    let cardsArrayData = data.map(element =>{
        
        return (<div key={element.id} className={`card ${element.openSpots == 0 ? 'soldout' : ''}`}>
        <img alt="event" src={'https://www.traveldailymedia.com/assets/2019/11/airbnb-experiences-cooking.jpg'} className="card--image" />
        <div className="card--stats">
            
        </div>
        <p>{element.title}</p>
        <p>{element.description}</p>
        <p>Location: {element.location}</p>
        <p>Open Spots yet: {element.openSpots}</p>
        <p><span className="bold">From ${element.price}</span> / person</p>
    </div>)
    })

    return (
        [cardsArrayData]
    )
}


