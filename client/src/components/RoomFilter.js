import React from 'react'
import { useContext } from 'react'
import { RoomContext } from '../context'
import Title from './Title'
const getUnique = (items, value) => {
    return [...new Set(items.map(item=>item[value]))]
}

export default function RoomFilter({ rooms }) {
    const context = useContext(RoomContext);

    const { handleChange, type, capacity, price } = context;
   
    let types = getUnique(rooms, 'type');
    types = ['all', ...types];
    types = types.map((item, index) => {
        return <option value={item} key={index}>{ item}</option>
    })
    let people = getUnique(rooms, 'capacity');
    people = [1, ...people];
    people = people.map((item, index) => {
        return <option key={index} value={item}>{item}</option>
    })
    return (
        <section className="filter-container">
            <Title title="Tìm kiếm "/>
                <form className="filter-form">
                    {/*select type */}
                    < div className="form-group" >
                    <label htmlFor="type" style={{ color: '#000000' } }>Loại phòng</label>
                        <select name="type"
                            id="type"
                            value={type}
                            className="form-control"
                            onChange={handleChange}>
                            {types}
                        </select>
                    </div >
                {/* end select type*/}
                < div className="form-group" >
                    <label htmlFor="capacity" style={{ color:'#000000'}}>Số người</label>
                    <select name="capacity"
                        id="capacity"
                        value={capacity}
                        className="form-control"
                        onChange={handleChange}>
                        {people}
                    </select>
                </div >
                <div className="form-group">
                    <label htmlFor="price" style={{ color: '#000000' }}>Giá phòng:{price}/1 đêm</label>
                    <input
                        type="range"
                        name="price"
                        min='150'
                        max='300'
                        id="price"
                        value={price}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                </form >
            

        </section >
    )
}
