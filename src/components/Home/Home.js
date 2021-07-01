import React from "react";
import './Home.css';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MaterialIcon from 'react-google-material-icons';
import { Async } from "react-async";

import Grid from '@material-ui/core/Grid';
import Like from '@material-ui/icons/Favorite';

// const sourceUrl = "https://api.hkmovie6.com/hkm/movies?type=showing";

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
                                {data.map(m =>
                                    <div className="poster">
                                        <Link style={{ textDecoration: 'none', color: "white" }} to={`/detail/${m.id}`}>
                                            <div className="img-container">
                                                {m.thumbnail != null ? (
                                                    <Image className="posterImg" alt={m.name} src={m.thumbnail} />
                                                ) : (
                                                    <Image className="posterImg" alt={m.name} src={`${process.env.PUBLIC_URL}/dummy_logo.png`} />
                                                )}
                                            </div>

                                            <p className="posterName">{m.name}</p>
                                            <div className="movie-detail">
                                                <p className="openDate">{m.openDate.substring(4, 15)}</p>
                                                <p className="favCount"><Like style={{ fontSize: '16px' }} />&nbsp;{m.favCount}</p>

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