import React from 'react'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function SpeciesDisplay(props:any) {
  return (
    <>
    <Grid2 xs={1}>
        <div style={{width:"15vw"}}>
                <Grid2 container columns={3} columnSpacing={0}>
                    <Grid2 xs={1}>
                        <MenuBookIcon fontSize='large' />
                    </Grid2>
                    <Grid2 xs={2}>
                        <h3>Druh</h3>
                        {props.czech || props.latin ?
                          <>
                          {props.czech ?
                          <>
                          {props.czech} <br />
                          </>
                          : 
                          ''
                          }
                          {props.latin}
                          </> :
                          'Nezadáno'
                        }
                        
                        

                    </Grid2>
                </Grid2>
        </div>

    </Grid2>
    </>
  )
}
