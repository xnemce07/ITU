import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import React from 'react'
import PropertyDisplay from './PropertyDisplay'
import ClassIcon from '@mui/icons-material/Class';
import SchoolIcon from '@mui/icons-material/School';
import HeightIcon from '@mui/icons-material/Height';
import HomeIcon from '@mui/icons-material/Home';
import GrassIcon from '@mui/icons-material/Grass';
import SpeciesDisplay from './SpeciesDisplay';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export default function PropertiesDisplay(props: any) {
    const item = props.item
    const d = new Date(item.createdOn)
    const createdDate = d.toLocaleString('cs-CZ', {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
    var price: string = item.price + " czk"
    if (item.tradeType != "Prodej") {
        price = item.tradeType
    }
    return (
        <Grid2 container columns={2}>
            <PropertyDisplay icon={<ClassIcon fontSize='large' />} property={'Kategorie'} value={item.category.name} />
            <PropertyDisplay icon={<SchoolIcon fontSize='large' />} property={'Náročnost'} value={item.difficulty} />
            <PropertyDisplay icon={<HeightIcon fontSize='large' />} property={'Velikost'} value={item.size} />
            <PropertyDisplay icon={<HomeIcon fontSize='large' />} property={'Prostředí'} value={item.environment} />
            <PropertyDisplay icon={<GrassIcon fontSize='large' />} property={'Forma předání'} value={item.plantType} />
            <SpeciesDisplay czech={item.speciesCZ} latin={item.speciesLat} />
            <Grid2 lg={2}>
                <div style={{ backgroundColor: "green", height: "5px", marginTop: "1vw", marginBottom: "1vw" }}></div>
            </Grid2>
            <PropertyDisplay icon={<VisibilityIcon fontSize='large' />} property={'Zobrazeni'} value={item.views + 'x'} />
            <PropertyDisplay icon={<CalendarMonthIcon fontSize='large' />} property={'Vytvořeno'} value={createdDate} />
            <PropertyDisplay icon={<AttachMoneyIcon fontSize='large' />} property={'Cena'} value={price} />
            <PropertyDisplay icon={<LocationOnIcon fontSize='large' />} property={'Lokalita'} value={item.locationZip + ', ' + item.locationName} />
        </Grid2>
 
    )
}
