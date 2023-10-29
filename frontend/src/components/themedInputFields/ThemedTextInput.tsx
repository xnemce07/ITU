import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Globals from '../Globals';

const useStyles = makeStyles({
  inputField: {
    padding: "0.2vw",
    borderRadius: "6px",
    border: "2px black solid",
    height: "19px"
  },
  inputFieldError: {
    border: "3px solid red",
    borderRadius: "6px",
    padding: "0.2vw",
    height: "19px"
  },
  errorMsg: {
    color: "white",
    fontSize: "small",
    fontWeight: "bold",
  }
});




export default function (props: any) {
  const classes = useStyles()
  return (
      <div>
          <input
              type={props.inputType}
              ref={props.reference}
              className={(props.error && props.error != '')? classes.inputFieldError : classes.inputField}
              onKeyDown={props.onKeyDown}
              onChange={props.onChange}
              style={props.style}
              maxLength={props.maxLength}
              disabled={props.disabled}
          />
          {props.unit}
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