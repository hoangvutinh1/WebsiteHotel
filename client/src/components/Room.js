import React from 'react'
import { Link } from 'react-router-dom'
import defaultImg from '../images/single.jpg'

import  PropTypes  from 'prop-types';
export default function Room({ room }) {
    const { name, slug, images, price,type } = room;
  
    if (type==='single')
    return (
        <article className="room">
            <div className="img-container">
                
                <img src="./images/single.jpg" alt="single room"></img>
               
                <div className="price-top"
                >
                    <h6>{price}</h6>
                    <p>một đêm</p>
                </div>
                <Link to={`/rooms/${slug}`} className="btn-primary room-link">Xem chi tiết</Link>
            </div>
            <p className="room-info">{ name}</p>
        </article>
        )
    else
        return (
            <article className="room">
                <div className="img-container">

                    <img src="./images/double.jpg" alt="double room"></img>

                    <div className="price-top"
                    >
                        <h6>{price}</h6>
                        <p>một đêm</p>
                    </div>
                    <Link to={`/rooms/${slug}`} className="btn-primary room-link">Xem chi tiết</Link>
                </div>
                <p className="room-info">{name}</p>
            </article>
        )
}
Room.propTypes = {
    room: PropTypes.shape({
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        price: PropTypes.number.isRequired,
    })
}