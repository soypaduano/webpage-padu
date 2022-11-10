import React from "react";

let boxesData = [
    {
        id: 1,
        on: true
    },   
    {
        id: 2,
        on: false
    },   
    {
        id: 3,
        on: true
    },   
    {
        id: 4,
        on: true
    },   
    {
        id: 5,
        on: false
    },   
    {
        id: 6,
        on: false
    },   
]

let Boxes = () => {
    let [boxes, setBoxes] = React.useState(boxesData);

    let toggleElement = (id) => {
        setBoxes(prevBoxes => {
            let newArr = [...prevBoxes];
            newArr.filter(obj => {
                if(obj.id === id) obj.on = !obj.on
            })
            return newArr;
        })
    }


    let boxesArr = boxes.map(box => <SingleBox key={box.id} box={box} handleClick={toggleElement} />)

    

    return (
        <main>
            <h1>Boxes will go here</h1>
            <div className="box-container">
                {boxesArr}
            </div>
            
        </main>
    )
}

export default Boxes;


let SingleBox = (prop) => {

    let {on, id} = prop.box;

    const stylesBox = {
        width: "60px",
        height: "60px",
        border: "2px solid red",
        backgroundColor: on ? 'green' : 'red'
    }

    return (
        <div>
            {on && <div onClick={() => prop.handleClick(id) } className="box"> </div>}
        </div>
        
    )
}


