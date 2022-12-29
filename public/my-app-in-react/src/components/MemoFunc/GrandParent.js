import React from "react"
import Parent from "./Parent"

function GrandParent(props) {

    console.log("[👴🏼]   [ ]   [ ]   [ ] rendered")

    /*
        React Memo es el antiguo Pure Component.
        React Memo en sí, es un HOC que lo que hace es aplicar memoitazion sobre un componente.
        Basicamente, si no tiene nada que actualizar, no lo hace, así no gastamos en performance.
        También, podemos añadir una condición si queremos renderizar o no dependiendo de un valor: 
            - Abajo tenemos la función de areEqual que recibe 2 parametros. Esa función deberemos pasarla por parametro a React.Memo
    */

    return (
        <div>
            <p>I'm a GrandParent Component ({props.number})</p>
            <Parent />
            <Parent />
        </div>
    )
}

export default React.memo(GrandParent);



function areEqual(prevProps, nextProps) {
    /*
    return true if passing nextProps to render would return
    the same result as passing prevProps to render,
    otherwise return false
    */
  }