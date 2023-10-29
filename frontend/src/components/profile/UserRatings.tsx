/**
 * @file UserRatings.tsx
 * @author Rudolf Hyksa (xhyksa00@stud.fit.vutbr.cz)
 * @brief
 * @version 0.1
 * @date 2022-12-14
 */

import React, { useState, useEffect, useRef } from "react";
import Globals from "../Globals";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";

const useStyles = makeStyles({
  postRatingSection: {
    backgroundColor: Globals.COLORS.MAIN2,
    borderRadius: "8px",
    paddingTop: "1vw",
    paddingBottom: "1vw",
    border: "2px solid black",
  },
  container: {
    position: "relative",
    padding: "1vw",
    paddingTop: "2px",
    backgroundColor: "white",
    border: "2px solid black",
    borderRadius: "8px",
    marginBottom: "0.3vw",
    marginRight: "1vw",
    marginLeft: "2vw",
  },
  topRight: {
    position: "absolute",
    top: 0,
    right: 10,
  },
  topRightIconless: {
    position: "absolute",
    top: "0.5vw",
    right: "0.5vw",
  },
  bottomRight: {
    position: "absolute",
    right: "0.5vw",
    bottom: "0.5vw",
  },
});

function UserRatings({ userId, userRatings, fetchData }: any) {

  var [ratingValue, setRatingValue]: any = useState(3);

  const valueRef = useRef<any>(null);
  const textRef = useRef<any>(null);

  const classes = useStyles();

  const handlePostRating = () => {
    var valueInput = valueRef.current.value;
    var textInput = textRef.current.value;

    var payload = {
      text: textInput,
      rating: valueInput,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    valueRef.current.value = 3
    textRef.current.value = ""

    fetch(Globals.BACKEND_URL + "users/" + userId + "/", requestOptions).then(
      () => fetchData()
    );
  };

  // const d = new Date(userData.joinedOn)
  // const joinedDate = d.toLocaleString('cs-CZ')

  return (
    <>
      <div className={classes.postRatingSection}>
        <div className={classes.container}>
          <h3>Přidat recenzi</h3>
          <TextField
            id="rating-text"
            name="rating-text"
            rows={2}
            inputRef={textRef}
            style={{ width: "100%", resize: "none" }}
            inputProps={{ maxLength: Globals.CONSTRAINTS.COMMENTMAXLEN }}
          />
          <input
            name="rating-value-input"
            type="number"
            value={ratingValue}
            ref={valueRef}
            hidden
            readOnly
          />
          <Rating
            name="simple-controlled"
            value={ratingValue}
            precision={1}
            onChange={(event: any, newValue: any) => {
              setRatingValue(newValue);
            }}
          />
          <button
            className="button"
            style={{ marginTop: "0.6vw", marginBottom: "0.6vw" }}
            onClick={handlePostRating}
          >
            Odeslat
          </button>
        </div>
        {userRatings &&
          userRatings.map((rating: any) => (
            <div className={classes.container}>
              <div>
                {rating.author.name + " " + rating.author.surname} {rating.author.id == Globals.CURRENT_USER_ID && "(vy)"}
              </div>
              <div className={classes.topRight}>
                {(new Date(rating.createdOn)).toLocaleString("cs-CZ")}
              </div>
              <p>{rating.text}</p>
              <Rating
                name="rating-read-only"
                value={rating.rating}
                readOnly
                precision={1}
              />
            </div>
          ))}
      </div>
    </>
  );
}

export default UserRatings;
