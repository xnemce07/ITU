import React from 'react'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Globals from '../Globals';

//Source: https://mui.com/material-ui/react-menu/
export default function DiscussionMenu(props:any) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const ITEM_HEIGHT = 48;

    const handleDelete = () => {
        const requestOptions = {
            method: 'DELETE'
        }
        fetch(Globals.BACKEND_URL + 'comment/' + props.commentId + '/', requestOptions)
            .then(() => props.fetchData())
    }

    return (
        <>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                <MenuItem>Nahlásit...</MenuItem>
                {props.deletable &&
                    <MenuItem onClick={handleDelete}>Smazat</MenuItem>
                }
            </Menu>
        </>
    )
}
