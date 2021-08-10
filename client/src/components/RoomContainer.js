/* import React from 'react'
import RoomFilter from './RoomFilter'
import RoomList from './RoomList'
import Loading from './Loading'
import { RoomContext, RoomConsumer } from '../context'
export default function RoomContainer() {
    return (
        <RoomConsumer>
            {(value) => {
                const { loading, sortedRooms, rooms } = value;
                if (loading) {
                    return <Loading></Loading>
                }
                return <div>
                    Hello from Rooms container
                    <RoomFilter rooms={rooms}></RoomFilter>
                    <RoomList rooms={sortedRooms}>

                    </RoomList>
                    
                </div>
            }}
        </RoomConsumer>

    )
}
 */
import React from 'react'
import RoomFilter from './RoomFilter'
import RoomList from './RoomList'
import Loading from './Loading'
import { RoomContext, withRoomConsumer } from '../context'

function RoomContainer({ context }) {
    const { loading, sortedRooms, rooms } = context;
 
    if (loading) {
        return <Loading></Loading>
    }
    return (<div>
        
        <RoomFilter rooms={rooms}></RoomFilter>
        <RoomList rooms={sortedRooms}>

        </RoomList>

    </div>)
}
export default withRoomConsumer(RoomContainer)