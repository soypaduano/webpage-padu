import React from "react"

let Dice = (props) => {
    return (
        <div key={props.id} className="dice-element">
            <div className={`dice ${props.isHeld ? 'isHeld' : ''}`} onClick={(event) => props.handleClick(event, props.id)} >
                <span>{props.value}</span>
            </div>
        </div>
    )
}

export default Dice;