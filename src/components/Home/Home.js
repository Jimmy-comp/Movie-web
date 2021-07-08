import React from "react";
import './Home.css';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Async } from "react-async";

import Like from '@material-ui/icons/Favorite';

const loadAllMovie = async () => {
    const res = await fetch(`https://api.hkmovie6.com/hkm/movies?type=showing`, { Accept: "application/json" })
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
}

const Home = () => {
    return (
        <Async promiseFn={loadAllMovie}>
            {({ data, error, isPending }) => {
                if (isPending) return "Loading..."
                if (error) return `Something went wrong: ${error.message}`
                if (data) {
                    return (
                        <div className="home">
                            <div className="container">
                                {data.map((m, index) =>
                                    <div key={index} className="poster">
                                        <Link style={{ textDecoration: 'none', color: "white" }} to={`/detail/${m.id}`}>
                                            <div className="img-container">
                                                {m.thumbnail != null ? (
                                                    <Image className="posterImg" alt={m.engNormalAltNames} src={m.thumbnail} />
                                                ) : (
                                                    <Image className="posterImg" alt={m.engNormalAltNames} src={"https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png"} />
                                                )}
                                            </div>

                                            <p className="posterName">{m.name}</p>
                                            <div className="movie-detail">
                                                <p className="openDate">{m.openDate.substring(4, 15)}</p>
                                                <p className="favCount"><Like style={{ fontSize: '16px' }} />&emsp;{m.favCount}</p>

                                            </div>

                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                }
                return null
            }}
        </Async>
    )
}

export default Home
