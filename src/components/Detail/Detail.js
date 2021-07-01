import './Detail.css';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import MaterialIcon from 'react-google-material-icons';
import { Async } from "react-async";

import Grid from '@material-ui/core/Grid';
import Like from '@material-ui/icons/ThumbUp';
import Unlike from '@material-ui/icons/ThumbDown';
import Favorite from '@material-ui/icons/Favorite';
import Comment from '@material-ui/icons/ForumOutlined';
import MediaQuery from 'react-responsive';

const loadTabbedMovie = async ({ movieId }) => {
    const res = await fetch(`https://api.hkmovie6.com/hkm/movies/${movieId}`, { Accept: "application/json" })
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
};

const Detail = () => {
    let { id } = useParams();

    const [isReadMore, setIsReadMore] = useState(true);

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    return (
        <Async promiseFn={loadTabbedMovie} movieId={id}>
            {({ data, error, isPending }) => {
                if (isPending) return "Loading..."
                if (error) return `Something went wrong: ${error.message}`
                if (data) {
                    return (
                        <div className="detail">
                            <Grid container>
                                <Grid item xs={12}>
                                    <Grid container>
                                        <Grid item xs={3}>
                                            <div className="img-container">
                                                <Image className="thumbnail" src={data.thumbnail} />
                                            </div>

                                            <div className="highlightInfo">
                                                <h2>
                                                    {data.name}
                                                </h2>

                                                <h2>
                                                    {data.chiName}
                                                </h2>

                                                <Grid container>
                                                    <Grid container spacing={1}>
                                                        <p className="label">Date:</p>

                                                        <p>{data.openDate.substring(3, 15)}</p>
                                                    </Grid>

                                                    <Grid container spacing={1}>
                                                        <p className="label">Duration:</p>

                                                        <p>{data.duration} mins</p>
                                                    </Grid>

                                                    <Grid container spacing={1}>
                                                        <p className="label">Category:</p>

                                                        <p className="eachGenre">{data.infoDict.Category}</p>
                                                    </Grid>

                                                    <Grid container spacing={1}>
                                                        <p className="label">Genres:</p>

                                                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                                            {(data.infoDict.Genre || '').split(', ').map(g => (
                                                                <p className="eachGenre">{g}</p>
                                                            ))}
                                                        </div>
                                                    </Grid>

                                                    <Grid container spacing={1}>
                                                        <p className="label">Language:</p>

                                                        <p>{data.language}</p>
                                                    </Grid>

                                                    <Grid container spacing={1}>
                                                        <p><Like style={{ fontSize: '14px' }} /></p>
                                                        <p style={{ color: 'yellow' }}>{(data.rating || 0)}</p>
                                                        <p><Unlike style={{ fontSize: '14px' }} /></p>
                                                        <p style={{ color: 'yellow' }}>{(data.rateCount - data.rating || 0)}</p>
                                                        <p><Comment style={{ fontSize: '14px' }} /></p>
                                                        <p style={{ color: 'yellow' }}>{data.commentCount}</p>
                                                        <p><Favorite style={{ fontSize: '14px' }} /></p>
                                                        <p style={{ color: 'yellow' }}>{data.favCount}</p>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </Grid>

                                        <Grid item xs={9}>
                                            <div className="video">
                                                <iframe
                                                    className="yt_trailer"
                                                    src={data.trailerUrl.replace('watch?v=', 'embed/')}
                                                    frameBorder="0"
                                                    allowFullScreen
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    title="Embedded youtube"
                                                />
                                            </div>

                                            <div className="synopsis">
                                                {isReadMore ? data.synopsis.slice(0, 100) : data.synopsis}
                                                <span onClick={toggleReadMore} className="read-or-hide">
                                                    {isReadMore ? " ... read more" : "  show less"}
                                                </span>
                                            </div>

                                            <div className="directorCast">
                                                <div className="title">
                                                    <h4 style={{ margin: '0' }}>
                                                        Director & Cast
                                                    </h4>
                                                </div>

                                                <div className="people">
                                                    <p>
                                                        {data.infoDict.Director}
                                                    </p>
                                                    {(data.infoDict.Cast || '').split(',').map(g => (
                                                        <p>{g}</p>
                                                    ))}

                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </div>


                    )

                }
                return null
            }}
        </Async>
    )
}

export default Detail
