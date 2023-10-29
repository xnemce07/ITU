import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    inputField: {
        padding: "0.2vw",
        borderRadius: "6px",
        border: "2px black solid"
    },
    inputFieldError: {
        border: "3px solid red",
        borderRadius: "6px",
        padding: "0.2vw",
    },
    errorMsg: {
        color: "white",
        fontSize: "small",
        fontWeight: "bold"
    }
});

export default function ThemedTextInput(props: any) {
    const classes = useStyles()
    return (
        <>
            <div>
                <textarea
                    rows={5}
                    ref={props.reference}
                    className={(props.error && props.error != '') ? classes.inputFieldError : classes.inputField}
                    onKeyDown={props.onKeyDown}
                    onChange={props.onChange}
                    style={props.style}
                    maxLength={props.maxLength}
                />
                {(props.error && props.error != '') ?                    
                    <div className={classes.errorMsg}>
                        {props.error}
                    </div> :
                    <div style={{opacity:"0"}}>
                    s
                  </div>
                }

            </div>

        </>
    )
}

