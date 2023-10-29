import React from 'react'
import { Menu, MenuItem } from '@mui/material'
import DiscussionMenu from './DiscussionMenu'
import Globals from '../Globals'

export default function DiscussionReply(props: any) {
    const d = new Date(props.comment.createdOn)
    const createdDate = d.toLocaleString('cs-CZ')
    return (
        <div className={props.classes.container} style={{marginLeft: "8vw", background:Globals.COLORS.SECONDARY2}}>
            <div>
                {props.comment.author.name + ' ' + props.comment.author.surname} {props.comment.author.id == Globals.CURRENT_USER_ID && "(vy)"} {props.OpId == props.comment.author.id ? <strong> - Prodejce</strong> : ''}
            </div>
            <div className={props.classes.topRightIconless}>
                    {createdDate} <DiscussionMenu deletable={Globals.CURRENT_USER_ID == props.comment.author.id} fetchData={props.fetchData} commentId={props.comment.id}/>
            </div>
            <p>{props.comment.text}</p>
        </div>
    )
}
