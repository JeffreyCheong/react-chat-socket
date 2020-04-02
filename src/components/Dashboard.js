import React, { useState, useContext } from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { CTX } from '../store/Store'

const useStyle = makeStyles(theme => ({
    root : {
        margin : '50px',
        padding: theme.spacing(3,2)
    },
    center: {
        textAlign: 'center'
    },
    flex : {
        display: 'flex',
        alignItems: 'center'
    },
    topicWindow: {
        width: '30%',
        height: '300px',
        borderRight: '1px solid grey'
    },
    chatWindow: {
        width: '70%',
        height: '300px'
    },
    chatBox: {
        width: '85%'
    },
    button: {
        width: '15%'
    },
}));

export default function Dashboard(){

    const classes = useStyle();

    // CTX store
    const {allChats, sendChatAction, user} = useContext(CTX)
    const topics = Object.keys(allChats)
    // console.log(allChats)
    // local state
    const [activeTopic, changeActiveTopic] = useState(topics[0])
    const [textValue, changeTextValue] = useState('')
    return (
        <div>
            <Paper className={classes.root}>
                <div className={classes.center}>
                    <Typography variant="h4" component="h4">
                        Chat App
                    </Typography>
                    <Typography variant="h5" component="h5">
                        {activeTopic}
                    </Typography>
                </div>
                <div className={classes.flex}>
                    <div className={classes.topicWindow}>
                        <List>
                            {
                                topics.map(topic => (
                                    <ListItem onClick={e => changeActiveTopic(e.target.innerText)} key={topic} button>
                                        <ListItemText primary={topic} />
                                    </ListItem>
                                ))
                            }
                                
                        </List>
                    </div>
                    <div className={classes.chatWindow}>
                        {
                            allChats[activeTopic].map((chat, i) => (
                                <div className={classes.flex} key={i}>
                                    <Chip label={chat.from} className={classes.chip}></Chip>
                                    {/* "h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","caption","button","overline","srOnly","inherit" */}
                                    <Typography variant='body1' gutterBottom>
                                            {chat.msg}
                                    </Typography>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={classes.flex}>
                    <TextField 
                        label="Send a chat"
                        className={classes.chatBox}
                        value={textValue}
                        onChange = { (e) => changeTextValue(e.target.value)}
                    />

                    <Button 
                        variant="contained" 
                        color="primary"
                        className={classes.button}
                        onClick={
                            () => {
                                sendChatAction(
                                    {
                                        from: user, 
                                        msg: textValue, 
                                        topic: activeTopic
                                    }
                                );
                                changeTextValue('');
                            }
                        }
                        >
                        Send
                    </Button>
                    
                </div>
            </Paper>
        </div>
    )
}
