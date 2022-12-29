import React from "react"
//nueva url de scrimba https://swapi.dev/api/people/1/

export function DataFetcher(props) {

    let stateObj = {
        loading: false,
        data: null
    }

    const [state, setState] = React.useState(stateObj);

    React.useEffect(() => {
        setState({ loading: true })
        fetch(props.url)
            .then(res => res.json())
            .then(data => {
                setState({ data: data, loading: false })
                console.log(data);
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <div>
            {props.fill(state)}
        </div>
    )
    


        /**
         * Part 1: Figure out what you're returning here. You should pass the 
         * loading state and the data state through to the component needing it.
         * 
         * Remember: the render props pattern allows us to separate the data 
         * and logic (like fetching data and setting the loading state) from 
         * the UI (JSX). Think about which one of those this component is in 
         * charge of. You'll need to pass both pieces of state to whatever 
         * component is making use of the DataFetcher
         * 
         * Also, there's more than one "correct" way to make use of the render
         * props pattern. Check App.js to determine which way it's being implemented
         * in this challenge.
         */
}

export default DataFetcher