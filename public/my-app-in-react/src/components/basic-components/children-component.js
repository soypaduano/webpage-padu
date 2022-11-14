import React from "react"
import InfoCallout from "./InfoCallout"
import ImageCallout from "./ImageCallout"
import EmailCallout from "./EmailCallout"
import Callout from "./Callout"

/*
    En vez de tener diferentes componentes, podemos tener solo uno y pasarle el contenido directamente 
    como un hijo. Ejemplo: tenemos un component que es EmailCallout. 
*/

function EmailCallout(props) {
    return (
        <div className="callout">
            <h2>{props.header}</h2>
            <input type="email" placeholder="Enter Email" />
            <button>{props.btnText}</button>
        </div>
    )
}

/*
    Mejor crear un componente al que le pasamos las cosas y las pinta:
*/

export default function Callout(props) {

    return (
        <div class="callout">
            {props.children}
        </div>
    )
}


function App() {
    return (
        <main>
            <h1>Welcome!</h1>
            <Callout>
                <h2>Don't miss out</h2>
                <p>"Unless you don't suffer from FOMO, you better make sure you fill out the email form below!"</p>
            </Callout>

            <p>This is probably the best site you've ever come across. I'm glad you're here to witness the magnificence of this website right now.</p>

            <Callout>
                <div className="callout">
                    <img src="https://picsum.photos/id/102/4320/3240" width="100%" />
                    <figcaption>"Just look at those sparkling raspberries!"</figcaption>
                </div>
            </Callout>

            <p>Here's some more unforgettable content. Lorem ipsum something or other.</p>

            {/*No haría falta crear este email callout, ya lo está haciendo el Callout. */}
            <EmailCallout
                header="Give us your email. We definitely won't sell it to anyone."
                btnText="Sign me up!"
            />

        </main>
    )
}

export default App