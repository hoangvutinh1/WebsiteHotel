import React, { Component } from 'react';

import axios from 'axios'
const RoomContext = React.createContext();
//<RoomContext.Provider value={}
class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: 'all',
        capacity: 1,
        price: 0,
        user: null,
        token:''
    };
    
    getUser = () => {
        const userStr =this.state.user;
        if (userStr) return userStr;
        else return null;
    }

    // return the token from the session storage
    getToken = () => {
        return this.state.token || null;
    }

    // remove the token and user from the session storage
    removeUserSession = () => {
        this.setState({
            user: null,
            token:''
         })
    }

    // set the token and user from the session storage
    setUserSession = (token, user) => {
        this.setState({
            token: token,
            user: JSON.stringify(user)
        })
      
    }
    getData=()=> {
        axios.get('http://localhost:4000/rooms', {}).then(response => {
           
            this.setState({
                rooms: response.data.rooms,
                featuredRooms:response.data.rooms,
                loading: false,
                sortedRooms:response.data.rooms

            })
           
        }).catch(error => {
            console.log("Something went wrong. Please try again later.");
        })
    }
    //getData
    componentDidMount() {
        this.getData()
    }
    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms];
      
        const room = tempRooms.find(room =>
            room.slug === slug);
        return room;

    }
    handleChange = event => {
      
        const target = event.target;
        const value = event.type === 'checkbox' ? target.checked : target.value;

        const name = event.target.name;
        this.setState({
            [name]: value
        }, this.filterRooms)

    }
    filterRooms = () => {
        
        let {
            rooms,
            type,
            capacity,
            price
           
        } = this.state;

        let tempRooms = [...rooms];
        capacity = parseInt(capacity);
        console.log(price,"price")
        if (capacity !== 1) {
            tempRooms = tempRooms.filter(room => room.capacity >= capacity);
        }
        if (type !== 'all') {
            tempRooms = tempRooms.filter(room => room.type === type)
        }
        tempRooms = tempRooms.filter(room => room.price >= price);
        this.setState({
            sortedRooms: tempRooms
        })
    }
    render() {
     /*    if (this.state.loading === false)
        { */
            return (
              
                <RoomContext.Provider
                    value={{
                        ...this.state,
                        getRoom: this.getRoom,
                        handleChange: this.handleChange,
                        getToken: this.getToken,
                        getUser: this.getUser,
                        setUserSession: this.setUserSession,
                        removeUserSession:this.removeUserSession
                    }}>
                    {this.props.children}
                </RoomContext.Provider>
            )
      /*   }
        else return <div>Loading</div> */
       
    }
}

const RoomConsumer = RoomContext.Consumer;
export function withRoomConsumer(Component) {
    return function ConsumerWrapper(props) {
        return <RoomConsumer>
            {value => <Component {...props} context={value} />}
        </RoomConsumer>
    }
}
export { RoomProvider, RoomConsumer, RoomContext };