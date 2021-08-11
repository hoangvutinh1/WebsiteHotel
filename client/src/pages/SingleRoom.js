
import defaultBcg from '../images/defaultImg.jpg';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import { RoomContext } from '../context';
import React, { Component } from 'react';
import axios from 'axios';
import { Button, Grid, Paper, Avatar, Typography } from '@material-ui/core';
import StyledHero from '../components/StyledHero';
import Comments from '../components/Comments';
import defaultImg from '../images/single.jpg';
import defaultImg1 from '../images/double.jpg';
export default class SingleRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            slug: this.props.match.params.slug,
            comment: [],
            defaultBcg
        }
    }
    static contextType = RoomContext;
    getComment = () => {
        
        axios.get('http://localhost:4000/comment').then(response => {
            var slugComment = []
            for (let i = 0; i < response.data.comment.length; i++) {
                if (response.data.comment[i].room_slug === this.state.slug)
                    slugComment.push(response.data.comment[i])
            }
            this.setState({
                comment: slugComment
            })

        }).catch(error => {
            console.log(error);
        })
    };
    componentDidMount() {
        this.getComment()

    };

    render() {
        const CommentLists = this.state.comment

        const updateComment = (newComment) => {
           
            this.setState({ comment: CommentLists.concat(newComment) })
           
        }
        

        let imgLink = "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";
        const { getRoom } = this.context;
        const room = getRoom(this.state.slug)
        if (!room) {
            return <div className="error">
                <h3>Không tìm thấy phòng</h3>
                <Link to='/' className="btn-primary">
                    Xem danh sách phòng
                </Link>
            </div>
        }
        var {
            name, description, capacity, price, extras, images, type } = room;
        extras=extras.split(',')
        
        console.log(type === 'single' ? defaultImg : defaultImg1,"hoangvutinh")
        return (
            <>
                <StyledHero img={type==='single'?defaultImg:defaultImg1}>

                    <Banner title={`${name}`}>
                        <Link to="/rooms" className="btn-primary">
                            Xem danh sách phòng
                        </Link>
                    </Banner>
                </StyledHero>
                <section className="single-room">
                    <div className="single-room-images">
                        
                       {/*  {defaultImg.map((item, index) => (

                            <img key={index} src={item} alt={name}></img>
                        ))} */}
                    </div>
                    <div className="single-room-info">
                        <article className="desc">
                            <h3>Mô tả sơ lược</h3>
                            <p>{description}</p>
                        </article>
                        <article className="info">
                            <h3>Thông tin </h3>
                            <h6>Giá phòng:{price}</h6>

                            <h6>Số người tối đa:{capacity}</h6>
                            <h6>Loại phòng:{type}</h6>
                        </article>
                    </div>
                </section>
                <section className="room-extras">
                    <h6>Dịch vụ</h6>
                    <ul className="extras">
                        
                       {extras.map((item, index) => {
                            return <li key={index}>-{item}</li>
                        })} 
                    </ul>
                </section>
                <section className="room-extras">
                    <Link to={`/order/${this.state.slug}`}>
                        <Typography align='center'>
                        <Button
                            variant='contained'
                            color="primary"
                            
                            type="submit"
                        
                        >
                          
                            Đặt phòng ngay
                            </Button>
                        </Typography>
                    </Link>
                    <div >
                        <Comments CommentLists={CommentLists} roomSlug={room.slug} refreshFunction={updateComment} />

                    </div>

                </section>

            </>
        )

    }
}
