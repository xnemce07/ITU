import React from 'react'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';


export default function PropertyDisplay(props:any) {
  return (
    <>
    <Grid2 xs={1}>
        <div style={{width:"15vw"}}>
                <Grid2 container columns={3} columnSpacing={0}>
                    <Grid2 xs={1}>
                        {props.icon}
                    </Grid2>
                    <Grid2 xs={2}>
                        <h3>{props.property}</h3>
                        {props.value}
                    </Grid2>
                </Grid2>
        </div>

    </Grid2>
    </>
  )
}
