import React, { useState, useEffect } from "react";
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DiscussionReply from "./DiscussionReply";
import DiscussionInput from "./DiscussionInput";
import { Button } from '@mui/material';
import Globals from "../Globals";
import DiscussionMenu from "./DiscussionMenu";
import IconButton from '@mui/material/IconButton';



export default function DiscussionThread(props: any) {
  var [expand, setExpand]: any = useState([true]);
  var [expandable, setExpandable]: any = useState([])

  const classes = props.classes

  const detectChildComments = () => {
    var res = false
    props.comments.map((comment: any) => {
      if (comment.parentComment == props.comment.id) {
        res = true
      }
    })
    setExpandable(res);
  }

  useEffect(() => {
    detectChildComments();
  }, [props.comments]);

  const handleExpandClick = () => {
    setExpand(!expand)
    if (expand && props.replyID == props.comment.id) {
      props.replyHandler(0)
    }
  }

  const handleReplyClick = () => {
    props.replyHandler(props.comment.id)
    setExpand(true)
  }

  const d = new Date(props.comment.createdOn)
  const createdDate = d.toLocaleString('cs-CZ')
  return (
    <>
      <div className={classes.container} style={{marginTop:"1vw"}}>
        <div>
          {props.comment.author.name + ' ' + props.comment.author.surname} {props.comment.author.id == Globals.CURRENT_USER_ID && "(vy)"} {props.OpId == props.comment.author.id ? <strong> - Prodejce</strong> : ''}
        </div>
        <div className={expandable ? classes.topRight : classes.topRightIconless}>
          <div  >
            {createdDate}
            <DiscussionMenu deletable={Globals.CURRENT_USER_ID == props.comment.author.id} fetchData={props.fetchData} commentId={props.comment.id} />
            {expandable &&
              <IconButton
                aria-label="more"
                id="long-button"
                aria-haspopup="true"
                onClick={handleExpandClick}
              >
                {expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            }
          </div>

        </div>
        <p>{props.comment.text}</p>
        {props.level == 1 &&
          <button style={{ marginTop: "0.6vw" }} className='button' onClick={handleReplyClick} >Přidat opověd</button>
        }
      </div>
      {props.replyID == props.comment.id && <DiscussionInput classes={classes} listingID={props.comment.listing} fetchData={props.fetchData} parentComment={props.comment.id} />}

      {expand && props.comments.map((comment: any) =>
        comment.parentComment == props.comment.id &&
        <DiscussionReply key={comment.id} comment={comment} classes={classes} OpId={props.OpId} fetchData={props.fetchData} />
      )}
    </>
  )
}
