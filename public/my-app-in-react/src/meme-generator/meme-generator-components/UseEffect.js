import React from "react";


let UseEffect = () => {

    const [starWarsData, setStarWarsData] = React.useState({})
    const [count, setCount] = React.useState(1)
    
    /**
     * Quiz:
     * 1. What will happen if I put back our Star Wars API call
     *    into the effect function?
     */
    React.useEffect(function() {
        fetch(`https://swapi.dev/api/people/${count}`)
             .then(res => res.json())
             .then(data => {
                setStarWarsData(data)
                console.log("Setting star wars data")
             })
    }, [count])
    
    return (
        <div>
            <pre>{JSON.stringify(starWarsData, null, 2)}</pre>
            <h2>The count is {count}</h2>
            <button onClick={() => setCount(prevCount => prevCount + 1)}>Add</button>
        </div>
    )
}

export default UseEffect;