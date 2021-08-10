import React, { useState } from 'react'
import {  Input } from 'antd';

import { Grid, Paper, Avatar } from '@material-ui/core';
import { useContext } from 'react';
import { RoomContext } from '../context';
import { Button } from 'antd';
import axios from 'axios';
const { TextArea } = Input;
function SingleComment(props) {
    const context = useContext(RoomContext);
    const { getUser, user } = context;
    const [CommentValue, setCommentValue] = useState("")
    var date = new Date().toLocaleString()
    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }
  

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            room_slug: props.roomSlug,
            postby: JSON.parse(user).name,
            create_time: new Date().toLocaleString(),
            content: CommentValue
        }


        axios.post('/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setCommentValue("")
                   
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Không lưu được bình luận, xin vui lòng thử lại sau')
                }
            })
    }
    let imgLink = "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";
    return (
        <div>
            <Paper style={{ padding: 14, margin: 10 }}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar alt="Remy Sharp" />
                    </Grid>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                        <h4 style={{ margin: 0, textAlign: "left" }}>{ props.comment.postby}</h4>
                        <p style={{ textAlign: "left" }}>
                            {props.comment.content}
                        </p>
                        <p style={{ textAlign: "left", color: "gray" }}>
                           
                           {props.comment.create_time} 
                        </p>
                    </Grid >
                </Grid>
               
            </Paper>

        </div>
    )
}

export default SingleComment
