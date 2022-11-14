import React from "react"

export default function Main() {
    
    console.log("executing this")
    let [valueNumber, setValueNumber] = React.useState(0);
    let [valueName, setValueName] = React.useState(() => {console.log("loading")});


    let handleChange = (event) => {
        setValueName(event.target.value)
        console.log(event.target.value)
    }

    const [show, setShow] = React.useState(true);

  let toggleButton = () => {
        setShow(oldValue => {return !oldValue})
    };

    let addOne = () => {
        setValueNumber(oldValueNumber => oldValueNumber + 1);
    }

    React.useEffect(() => {
        console.log("Value number is changing");
    }, [valueNumber])

    return (
        <main>
            <div>
                <h1>Hola</h1>
                <h3>El valor es {valueNumber}</h3>
                <button onClick={addOne}>Press here</button>
                <input
                type="text"
                placeholder="name"
                onChange={(event) => handleChange(event)}
                name="lastName"
                value={valueName}
            />
            </div>
        </main>
    )
}


