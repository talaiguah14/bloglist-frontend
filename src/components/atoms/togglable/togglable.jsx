import { useState, forwardRef, useImperativeHandle } from "react";
import Button from "../button/Button";

const Togglable = forwardRef((props,refs) => {

    const [visible, setvisible] = useState(false)

    const hideVisible = {display: visible ? 'none': ''}
    const showVisible = {display: visible ? '': 'none'}

    const toggleVisibility =() =>{
        setvisible(!visible)
    }

    useImperativeHandle(refs, ()=> {
        return{
            toggleVisibility
        }
    })

    return(
        <div>
            <div style={hideVisible}>
                <Button onClick={toggleVisibility} >{props.buttonLabel}</Button>
            </div>
            <div style={showVisible}>
                {props.children}
                <Button onClick={toggleVisibility} >cancel</Button>
            </div>
        </div>
    )

})

export default Togglable