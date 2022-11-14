import React from "react"

/**
 * A function that takes a component as its first argument and returns a new component that wraps
 * the given component, providing extra capabilities to it.
 */

function App(props) {
    return (
        <div>My favorite number is: {props.withFavoriteNumber}</div>
    )
}

/*
    Mandamos al componente App pasar por la función de withFavoriteNumber
*/
const AppWithFavoriteNumber = withFavoriteNumber(App)
export default AppWithFavoriteNumber;



/*
    Esto es un high order component, una funcion que se encarga de mejorar o cambiar un componente ya existente. 
*/
export function withFavoriteNumber(Component) {
    return function(props){
        return (
            <Component {...props} withFavoriteNumber={4}/>
        )
    }
}