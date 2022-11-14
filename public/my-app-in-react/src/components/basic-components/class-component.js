import React from "react"
import ReactDOM from 'react-dom/client';

class App extends React.Component {


    //const [count, setCount] = React.useState(0)

    state = {
        count: 0
    }

    add = () => {
        this.setState(prevCount => {
            return {
                count: prevCount.count + 1
            }
        })
    }

    subtract = () => {
        this.setState(prevCount => {
            return {
                count: prevCount.count -  1
            }
        })
    }



    render() {
        return (
            <main>
                <div className="counter">
                    <button className="counter--minus" onClick={this.subtract}>–</button>
                    <div className="counter--count">
                        {console.log(this.state)}
                        <h1>{this.state.count}</h1>
                    </div>
                    <button className="counter--plus" onClick={this.add}>+</button>
                </div>
            </main>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(<App.MemeGenerator/>);
root.render(<App />);