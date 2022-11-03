import React from "react";

/*
    En este ejemplo vemos como claramente hacemos lo que es el controlled input: no queremos 2 sources of truth, solo una
    y es la de formData. Si dejamos que el value sea el de input, tendremos 2 entonces. Por eso sustituimos el value del
    input 
*/

let Form = () => {


    const [formData, setFormData] = React.useState(
        {firstName: "", lastName: "", email: "", comments: "", isFriendly: true, employment: ""}
    )

    function handleChange(event) {
        let {name, value, type, checked} = event.target

        setFormData(prevFormData => {
            debugger;
            return {
                ...prevFormData, 
                [name]: type === "checkbox" ? checked : value
            }
        })

        console.log(formData);
    }


    function handleSubmit(e){
        e.preventDefault();
        console.log("*****")
        console.warn(formData);
    }



    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="First Name"
                onChange={handleChange}
                name="firstName"
                value={formData.firstName}
            />
            <input
                type="text"
                placeholder="Last Name"
                onChange={handleChange}
                name="lastName"
                value={formData.lastName}
            />
            <input
                type="email"
                placeholder="Email"
                onChange={handleChange}
                name="email"
                value={formData.email}
            />

            <textarea value={formData.comments} onChange={handleChange} name="comments"/>

            
            <label htmlFor="isFriendly">Is Friendly <input onChange={handleChange} type="checkbox" name="isFriendly" id="isFriendly" checked={formData.isFriendly}/> </label>


            <fieldset>
                <legend>Current employment status</legend>
                
                <input 
                    type="radio"
                    id="unemployed"
                    name="employment"
                    value="unemployed"
                    onChange={handleChange}
                />
                <label htmlFor="unemployed">Unemployed</label>
                <br />
                
                <input 
                    type="radio"
                    id="part-time"
                    name="employment"
                    value="part-time"
                    onChange={handleChange}
                />
                <label htmlFor="part-time">Part-time</label>
                <br />
                
                <input 
                    type="radio"
                    id="full-time"
                    name="employment"
                    value="full-time"
                    onChange={handleChange}
                />
                <label htmlFor="full-time">Full-time</label>
                <br />
                
            </fieldset>

            <button> Submit! </button>

        </form>
    )
}

export default Form;