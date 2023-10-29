/**
 * File: DiscussionSection.tsx
 * Author: Leopold Nemček <xnemce07>
 * Brief: Component for displaying discussion section under post
 */

import React, { useState } from "react";
import Globals from '../Globals'
import DiscussionInput from "./DiscussionInput";
import DiscussionThread from './DiscussionThread'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    position: 'relative',
    padding: "1vw",
    paddingTop: "2px",
    backgroundColor: "white",
    border: "2px solid black",
    borderRadius: "8px",
    marginBottom: "0.3vw",
    marginRight: "1vw",
    marginLeft: "2vw"
  },
  topRight: {
    position: "absolute",
    top: 0,
    right: 0,
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
  }
});


export default function DiscussionSection(props: any) {
  var [replyId, setReplyId]: any = useState([0]);

  const classes = useStyles()

  const handlereplyIdChange = (id: number) => {
    if (id == replyId) {
      setReplyId(0)
    } else {
      setReplyId(id)
    }
  }

  return (
    <div style={{ backgroundColor: Globals.COLORS.MAIN2, borderRadius: "8px", paddingTop: "1vw", paddingBottom: "1vw", border: "2px solid black" }}>
      <DiscussionInput classes={classes} listingID={props.listingID} fetchData={props.fetchData} parentComment={false} replyHandler={handlereplyIdChange} />
      {props.comments.map((comment: any) =>
        comment.parentComment == null &&
        <DiscussionThread classes={classes} OpId={props.OpId} comment={comment} comments={props.comments} level={1} replyID={replyId} replyHandler={handlereplyIdChange} fetchData={props.fetchData} />
      )}
    </div>
  )
}
