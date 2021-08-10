import React, { Component } from 'react'
import Title from './Title'
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa'
export default class Service extends Component {
    state = {
        service: [{
            icon: <FaCocktail></FaCocktail>,
            title: "free cocktails",
            info: 'alsjdlfkasfkjla kasdfslkjf lj ksdjfl'
        },
        {
            icon: <FaHiking></FaHiking>,
            title: "free cocktails",
            info: 'alsjdlfkasfkjla kasdfslkjf lj ksdjfl'
        },
        {
            icon: <FaShuttleVan></FaShuttleVan>,
            title: "free cocktails",
            info: 'alsjdlfkasfkjla kasdfslkjf lj ksdjfl'
        },
        {
            icon: <FaBeer></FaBeer>,
            title: "free cocktails",
            info: 'alsjdlfkasfkjla kasdfslkjf lj ksdjfl'
        }]
    }
    render() {
        return (
            <section className="services">
                <Title title='services'>

                </Title>
                <div className="services-center">
                    {this.state.service.map((item, index) => {
                        return <article key={index} className="service">
                            <span>{item.icon}</span>
                            <h6>{ item.title}</h6>
                            <p>{ item.info}</p>
                        </article>
                    })}
                </div>
            </section>
        )
    }
}
