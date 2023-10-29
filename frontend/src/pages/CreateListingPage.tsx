/**
 * File: CreateListingPage.tsx
 * Author: Leopold Nemček <xnemce07>
 * Brief: Page for adding new listings
 */
import React, { useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { borderRadius } from '@mui/system';
import Globals from '../components/Globals';
import ThemedTextInput from '../components/themedInputFields/ThemedTextInput';
import ThemedTextArea from '../components/themedInputFields/ThemedTextArea';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import ThemedSelect from '../components/themedInputFields/ThemedSelect';
import { redirect } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
  


const useStyles = makeStyles({
    pageContainer: {
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
    },
    container: {
        border: "2px solid black",
        borderRadius: "8px",
        padding: "2vw",
        backgroundColor: Globals.COLORS.MAIN2,
    }
});

export default function CreateListingPage() {

    // States for setting error messages for input fields
    var [titleErr, setTitleErr] = useState('')
    var [categoryErr, setCategoryErr] = useState('')
    var [descritpionErr, setDescritpionErr] = useState('')
    var [imagesErr, setImagesErr] = useState('')
    var [locationNameErr, setLocationNameErr] = useState('')
    var [locationZipErr, setLocationZipErr] = useState('')
    var [priceErr, setPriceErr] = useState('')
    var [priceDisabled, setPriceDisabled] = useState(false)

    var titleRef = useRef<HTMLInputElement>(null)
    var categoryRef = useRef<HTMLInputElement>(null)
    var descriptionRef = useRef<HTMLInputElement>(null)
    var imagesRef = useRef<HTMLInputElement>(null)
    var phoneNumberRef = useRef<HTMLInputElement>(null)
    var phoneNumberCheckBoxRef = useRef<HTMLInputElement>(null)
    var emailRef = useRef<HTMLInputElement>(null)
    var emailCheckBoxRef = useRef<HTMLInputElement>(null)
    var difficultyRef = useRef<HTMLInputElement>(null)
    var envRef = useRef<HTMLInputElement>(null)
    var heightRef = useRef<HTMLInputElement>(null)
    var plantTypeRef = useRef<HTMLInputElement>(null)
    var locationNameRef = useRef<HTMLInputElement>(null)
    var locationZipRef = useRef<HTMLInputElement>(null)
    var tradeTypeRef = useRef<HTMLInputElement>(null)
    var priceRef = useRef<HTMLSelectElement>(null)
    var instructionsRef = useRef<HTMLInputElement>(null)
    var czechNameRef = useRef<HTMLInputElement>(null)
    var latinNameRef = useRef<HTMLInputElement>(null)
    
    
    const navigate = useNavigate();
      
    /**
     * Disable and enable price input field, accordint to sale type (Prodej, Vymena or Zdarma)
     */
    const handleTradeTypeChange = () => {
        if(tradeTypeRef.current?.value != 'Prodej') {
            setPriceDisabled(true)
        }else{
            setPriceDisabled(false)
        }
    }

    /**
     * Check for validity of input fields, if all are valid, sent put request, to create new item
     */
    const handleClick = async () => {

        var error = false
        if(titleRef.current?.value.replace(/\s/g, '') == ''){
            setTitleErr('Tohle pole nesmi být prázdné.')
            error = true
        }else {
            setTitleErr('')
        }

        if(descriptionRef.current?.value.replace(/\s/g, '') == ''){
            setDescritpionErr('Tohle pole nesmi být prázdné.')
            error = true
        }else{
            setDescritpionErr('')
        }

        if(locationNameRef.current?.value.replace(/\s/g, '') == ''){
            setLocationNameErr('Tohle pole nesmi být prázdné.')
            error = true
        }else{
            setLocationNameErr('')
        }

        if(locationZipRef.current?.value.replace(/\s/g, '') == ''){
            setLocationZipErr('Tohle pole nesmi být prázdné.')
            error = true
        }else{
            setLocationZipErr('')
        }
        if(priceRef.current?.value.replace(/\s/g, '') == '' && tradeTypeRef.current?.value == 'Prodej' ){
            setPriceErr('Tohle pole nesmi být prázdné.')
            error = true
        }else{
            setPriceErr('')
        }
        
        if(categoryRef.current?.value == 'Kategorie'){
            setCategoryErr('Vyberte kategorii.')
            error = true
        } else{
            setCategoryErr('')
        }
        

        if(error){
            return
        }


        const payload = {
            title:titleRef.current?.value,
            category: categoryRef.current?.value,
            description: descriptionRef.current?.value,
            instructions: instructionsRef.current?.value,
            difficulty: ((difficultyRef.current?.value != Globals.LISTS.DIFFICULTY_LIST[0]) ? difficultyRef.current?.value : ''),
            environment: ((envRef.current?.value != Globals.LISTS.ENVIRONMENT_LIST[0]) ? envRef.current?.value : ''),
            size: ((heightRef.current?.value != Globals.LISTS.HEIGHT_LIST[0]) ? heightRef.current?.value : ''),
            plantType: ((plantTypeRef.current?.value != Globals.LISTS.PLANT_TYPE_LIST[0]) ? plantTypeRef.current?.value : ''),
            locationN: locationNameRef.current?.value,
            locationZ: locationZipRef.current?.value,
            tradeType: tradeTypeRef.current?.value,
            price: priceRef.current?.value,
            speciesCZ: czechNameRef.current?.value,
            speciesLat: latinNameRef.current?.value,
        }



        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }
        
        const response = await fetch(Globals.BACKEND_URL + 'listings/', requestOptions)
        const data:any = await response.json()
        //Redirect to page of the added listing
        navigate("/listing/" + data.Success)
    }




    const classes = useStyles()
    return (
        <div className={classes.pageContainer}>
            <h1>Přidat inzerát</h1>
            <div className={classes.container}>
                <Grid2 container columns={2} >
                    <Grid2 style={{ width: "45%" }}>
                        <h3>Základní informace</h3>
                        <div>
                            <div style={{ margin: "0.5vw" }}>
                                Nadpis:
                                <ThemedTextInput maxLength={"100"} type="text" style={{ width: "100%" }} reference={titleRef} error={titleErr} />
                            </div>
                            <div style={{ margin: "0.5vw" }}>
                                Kategorie:
                                <ThemedSelect options={Globals.LISTS.CATEGORY_LIST} style={{ width: "40%" }} reference={categoryRef} error={categoryErr} />
                            </div>
                            <div style={{ margin: "0.5vw" }}>
                                Popis:
                                <ThemedTextArea maxLength={"500"} rows={4} style={{ width: "100%", resize: "none" }} reference={descriptionRef} error={descritpionErr} />
                            </div>
                            <div style={{ margin: "0.5vw" }}>
                                Obrázky:
                                <ThemedTextArea rows={4} style={{ width: "100%", resize: "none" }} />
                            </div>
                        </div>
                        <div style={{ margin: "0.5vw" }}>
                            Informace o starostlivosti:
                            <ThemedTextArea maxLength={"500"} rows={4} style={{ width: "100%", resize: "none" }} reference={instructionsRef} />
                        </div>
                    </Grid2>
                    <Grid2 style={{ marginLeft: "5vw", width: "45%" }} xl={1}>
                        <h3>Dodatečné informace</h3>
                        <Grid2 container style={{ width: "90%" }} columns={2}>
                            <Grid2 lg={1}>
                                <div style={{ margin: "0.5vw" }} >
                                    Náročnost starostlivosti:
                                    <ThemedSelect options={Globals.LISTS.DIFFICULTY_LIST} style={{ width: "100%" }} reference={difficultyRef} />
                                </div>
                            </Grid2>
                            <Grid2 lg={1}>
                                <div style={{ margin: "0.5vw", marginLeft: "4vw", width: "100%" }}>
                                    Postředí:
                                    <ThemedSelect options={Globals.LISTS.ENVIRONMENT_LIST} style={{ width: "100%" }} reference={envRef} />
                                </div>
                            </Grid2>
                            <Grid2 lg={1}>
                                <div style={{ margin: "0.5vw" }}>
                                    Výška:
                                    <ThemedSelect options={Globals.LISTS.HEIGHT_LIST} style={{ width: "100%" }} reference={heightRef} />
                                </div>
                            </Grid2>
                            <Grid2 lg={1}>
                                <div style={{ margin: "0.5vw", marginLeft: "4vw", width: "100%" }}>
                                    Forma předání:
                                    <ThemedSelect options={Globals.LISTS.PLANT_TYPE_LIST} style={{ width: "100%" }} reference={plantTypeRef} />
                                </div>
                            </Grid2>
                            <Grid2 lg={1}>
                                <div style={{ margin: "0.5vw", width: "90%"}}>
                                    Druh česky:
                                    <ThemedTextInput maxLength={"30"} type="text" style={{ width: "100%" }} reference={czechNameRef} />
                                </div>
                            </Grid2>
                            <Grid2 lg={1}>
                                <div style={{ margin: "0.5vw", marginLeft: "4vw", width: "95%" }}>
                                    Druh latinsky:
                                    <ThemedTextInput maxLength={"30"} type="text" style={{ width: "100%" }} reference={latinNameRef} />
                                </div>
                            </Grid2>
                        </Grid2>
                        <h3>Lokace</h3>
                        <div style={{ margin: "0.5vw" }}>
                            Název obce:
                            <ThemedTextInput maxLength={"50"} type="text" style={{ width: "100%" }} reference={locationNameRef} error={locationNameErr} />
                        </div>
                        <div style={{ margin: "0.5vw" }}>
                            PSČ:
                            <ThemedTextInput maxLength={"5"} type="text" style={{ width: "50%" }} reference={locationZipRef} error={locationZipErr} />
                        </div>
                        <h3>Cena</h3>
                        <div style={{ margin: "0.5vw" }}>
                            Typ inzerce:
                            <ThemedSelect options={Globals.LISTS.TRADETYPE_LIST} style={{ width: "100%"}} reference={tradeTypeRef} onChange={handleTradeTypeChange} />
                            Cena:
                            <ThemedTextInput inputType="number" style={{ width: "30%" }} reference={priceRef} error={priceErr} disabled={priceDisabled} unit={' czk'}/>
                        </div>
                    </Grid2>
                </Grid2>
                <button className='button' onClick={handleClick}>Přidat</button>
            </div>
        </div>
    )
}
