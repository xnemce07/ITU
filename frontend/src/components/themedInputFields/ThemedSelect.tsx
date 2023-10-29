import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    inputField: {
        padding: "0.2vw",
        borderRadius: "6px",
        border: "2px black solid",
        height: "30px"
    },
    inputFieldError: {
        padding: "0.2vw",
        borderRadius: "6px",
        border: "3px red solid",
        height: "25px"
    },
    errorMsg: {
      color: "white",
      fontSize: "small",
      fontWeight: "bold"
    }
});

export default function ThemedSelect(props: any) {
    const classes = useStyles()
    return (
        <div>
            <select
                className={(props.error && props.error != '')? classes.inputFieldError : classes.inputField}
                ref={props.reference}
                style={props.style}
                onChange={props.onChange}
            >
                {props.options.map((option: string) =>
                    <option value={option}>{option}</option>
                )}
            </select>
            {(props.error && props.error != '')  ?
              <div className={classes.errorMsg}>
                  {props.error}
              </div> :
              <div style={{opacity:"0"}}>
                s
              </div>
          }
        </div>
    )
}
