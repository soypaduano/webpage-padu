import React from "react"
let Counter = () => {

    //ARRAY STATE
    /*const [thingsArray, setThingsArray] = React.useState(["Thing 1", "Thing 2"])
    function addItem() {
        // We'll work on this next
        setThingsArray(prevThingsArray => {
            let newAr = [...prevThingsArray];
            newAr.push('Thing ' + (prevThingsArray.length + 1) + '');
            return newAr;
        })
    }
    const thingsElements = thingsArray.map(thing => <p key={thing}>{thing}</p>)
    */

    
    const [contact, setContact] = React.useState({
        firstName: "John",
        lastName: "Doe",
        phone: "+1 (719) 555-1212",
        email: "itsmyrealname@example.com",
        isFavorite: true
    })


    let toggleFavorite = () => {
        console.log("doung this");
        setContact(prevContact => {
            return {
                ...prevContact, isFavorite: !prevContact.isFavorite
            }
        })
    }
    
    

    return (
        <div>
            <p>{contact.firstName} {contact.lastName} </p>
            <p>Telefono: {contact.phone}</p>
            <p>Email: {contact.email}</p>
            <button onClick={toggleFavorite}>Press here</button>
            <p> {contact.isFavorite.toString()} </p>
            <StarComponent isFilled={contact.isFavorite} handleClick={toggleFavorite}/>
        </div>
    )
}

let StarComponent = (prop) => {
    let {isFilled, handleClick} = prop; 
    return (
        <div className={`star-container ${isFilled ? 'favorite' : ''}`}>
                <h1>Is filled? {isFilled.toString()}</h1>
                <button onClick={handleClick}>Press here</button>
        </div>
    )
}




export default Counter;