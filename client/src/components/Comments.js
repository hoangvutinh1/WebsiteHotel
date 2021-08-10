import React, { useState } from 'react'
import { Button, Input } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';

import { useContext } from 'react';
import { RoomContext } from '../context';
const { TextArea } = Input;

function Comments(props) {
    const context = useContext(RoomContext)
    const { user } = context;
    const [Comment, setComment] = useState("")
   
    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            content: Comment,
            responseTo:null,
            postby: JSON.parse(user).name,
            room_slug: props.roomSlug,
            create_time: new Date().toLocaleString()
        }

        axios.post('http://localhost:4000/saveComment', variables)
            .then(response => {

               
                props.refreshFunction(response.data.comment)

            }).catch(error => {
                console.log(error)
            })
        setComment('')
    }

    return (
        <div>
            <br />
            <p> Bình luận</p>
            <hr />
            {/* Comment Lists  */}
           
            

            {props.CommentLists && props.CommentLists.map((comment, index) => (
                (!comment.responseTo &&

                    <React.Fragment>
                        <SingleComment comment={comment} postId={props.roomSlug} refreshFunction={props.refreshFunction} />
                        
                    </React.Fragment>
                )
            ))}



            {/* Root Comment Form */}
            {user &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <TextArea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={handleChange}
                        value={Comment}
                        placeholder="Thêm bình luận"
                    />
                    <br />
                    <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Gửi</Button>
                </form>
            }

        </div>
    )
}

export default Comments
