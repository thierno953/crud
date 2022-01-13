import React from 'react'

const HomeInfo = ({ item }) => {
    return (
        <div className="home_info">
            <div className="home_info_1">
                <div className="home_info_2">
                <img src={item.images[0].url} alt={item.username} />
                <div className="info">
                <h3>Username: <span>{item.username}</span></h3>
                <h3>Email: <span>{item.email}</span></h3>
                <h3>Occupation: <span>{item.occupation}</span></h3>
                <h3>Tagline: <span>{item.tagline}</span></h3>
                </div>
                </div>
            </div>
        </div>
    ) 
}

export default HomeInfo
