import React from 'react'
import Hero from '../components/Hero'
import { Link } from 'react-router-dom'
import Banner from '../components/Banner'
import RoomContainer from '../components/RoomContainer'
export default function Rooms() {
    return (
        <>
            <Hero hero="roomsHero">
                <Banner title="Danh sách phòng">
                    <Link to='/' className="btn-primary">
                        Về trang chủ
                    </Link>
                </Banner>
            </Hero>
            <RoomContainer></RoomContainer>
        </>)

}
