import './Detail.css';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { Async } from "react-async";

import Grid from '@material-ui/core/Grid';
import Star from '@material-ui/icons/Star';
import Favorite from '@material-ui/icons/Favorite';
import Comment from '@material-ui/icons/ForumOutlined';

import MediaQuery from 'react-responsive';

import { Slide } from 'react-slideshow-image';

import 'react-slideshow-image/dist/styles.css';

const loadTabbedMovie = async ({ movieId }) => {
    const res = await fetch(`https://api.hkmovie6.com/hkm/movies/${movieId}`, { Accept: "application/json" })
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
};

const itemLayout = {
    openDate: data => {
        return (
            <Grid container spacing={1}>
                <p className="label">Date:</p>

                <p>{data.substring(3, 15)}</p>
            </Grid>
        )
    },
    duration: data => {
        return (
            <Grid container spacing={1}>
                <p className="label">Duration:</p>

                <p>{data} mins</p>
            </Grid>
        )
    }

};

const Detail = () => {
    let { id } = useParams();

    const [isReadMore, setIsReadMore] = useState(true);

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    const properties = {
        duration: 5000,
        autoplay: true,
        transitionDuration: 500,
        arrows: true,
        infinite: true,
        easing: "ease",
        indicators: (i) =>
            <div className="dot"></div>

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
                                        <MediaQuery minWidth={1025}>
                                            {console.log('You are using laptop or desktop.')}
                                            <Grid item xs={3}>
                                                <div className="img-container">
                                                    <Image className="thumbnail" src={data.thumbnail} alt={(data.engNormalAltNames || data.name)} />
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


                                                            {(data.infoDict.Genre || '').split(', ').map((g, index) => (
                                                                g ? (
                                                                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                                                        <p key={index} className="eachGenre">{g}</p>
                                                                    </div>
                                                                ) : (
                                                                    <span></span>
                                                                )
                                                            ))}

                                                        </Grid>

                                                        <Grid container spacing={1}>
                                                            <p className="label">Language:</p>

                                                            <p>{data.language}</p>
                                                        </Grid>

                                                        <Grid container spacing={1}>
                                                            <p><Star style={{ fontSize: '14px' }} /></p>
                                                            <p style={{ color: 'yellow' }}>
                                                                {(data.rateCount || 0)}
                                                                {/* {((data.rating / data.rateCount * 5).toFixed(1) || 0)} */}
                                                            </p>
                                                            <p><Comment style={{ fontSize: '14px' }} /></p>
                                                            <p style={{ color: 'yellow' }}>{data.commentCount}</p>
                                                            <p><Favorite style={{ fontSize: '14px' }} /></p>
                                                            <p style={{ color: 'yellow' }}>{data.favCount}</p>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </Grid>

                                            <Grid item xs={9}>
                                                <div className="img-container" style={{ width: '75%', height: 'auto', margin: '0 auto' }}>
                                                    <Slide ref={React.createRef()} {...properties}>
                                                        {(data.multitrailers || []).map((m, index) => (

                                                            <iframe key={index}
                                                                className="yt_trailer"
                                                                src={m.replace('watch?v=', 'embed/')}
                                                                frameBorder="0"
                                                                allowFullScreen
                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                title="Embedded youtube"
                                                            />

                                                        ))}

                                                        {(data.screenShots || '').map((each, index) => (
                                                            <div key={index} className="each-slide" style={{ backgroundImage: `url(${each})` }}>
                                                            </div>
                                                        ))}
                                                    </Slide>
                                                </div>

                                                <div className="synopsis">
                                                    {isReadMore ? (data.synopsis || '').slice(0, 100) : (data.synopsis || '')}
                                                    {data.synopsis ? (
                                                        <span onClick={toggleReadMore} className="read-or-hide">
                                                            {isReadMore ? " ... read more" : "  show less"}
                                                        </span>
                                                    ) : (
                                                        ''
                                                    )}
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
                                                        {(data.infoDict.Cast || '').split(',').map((g, index) => (
                                                            <p key={index}>{g}</p>
                                                        ))}

                                                    </div>
                                                </div>

                                            </Grid>

                                        </MediaQuery>

                                        {/* for ipad or ipad pro */}
                                        <MediaQuery maxWidth={1024} minWidth={450}>
                                            {console.log('You are using tablet.')}
                                            <Grid item xs={12}>
                                                <div className="img-container" style={{ width: '75%', height: 'auto', margin: '0 auto' }}>
                                                    <Slide ref={React.createRef()} {...properties}>
                                                        {(data.multitrailers || []).map((m, index) => (
                                                            <iframe key={index}
                                                                className="yt_trailer"
                                                                src={m.replace('watch?v=', 'embed/')}
                                                                frameBorder="0"
                                                                allowFullScreen
                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                title="Embedded youtube"
                                                            />
                                                        ))}

                                                        {(data.screenShots || '').map((each, index) => (
                                                            <div key={index} className="each-slide" style={{ backgroundImage: `url(${each})` }}>
                                                            </div>
                                                        ))}
                                                    </Slide>
                                                </div>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Grid container>
                                                    <Grid item xs={6}>
                                                        <div className="img-container">
                                                            <Image className="thumbnail" src={data.thumbnail} alt={(data.engNormalAltNames || data.name)} />
                                                        </div>
                                                    </Grid>

                                                    <Grid item xs={6}>
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

                                                                    {(data.infoDict.Genre || '').split(', ').map((g, index) => (
                                                                        g ? (
                                                                            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                                                                <p key={index} className="eachGenre">{g}</p>
                                                                            </div>
                                                                        ) : (
                                                                            <span></span>
                                                                        )
                                                                    ))}
                                                                </Grid>

                                                                <Grid container spacing={1}>
                                                                    <p className="label">Language:</p>

                                                                    <p>{data.language}</p>
                                                                </Grid>

                                                                <Grid container spacing={1}>
                                                                    <p><Star style={{ fontSize: '14px' }} /></p>
                                                                    <p style={{ color: 'yellow' }}>
                                                                        {(data.rateCount || 0)}
                                                                        {/* {((data.rating / data.rateCount * 5).toFixed(1) || 0)} */}
                                                                    </p>
                                                                    <p><Comment style={{ fontSize: '14px' }} /></p>
                                                                    <p style={{ color: 'yellow' }}>{data.commentCount}</p>
                                                                    <p><Favorite style={{ fontSize: '14px' }} /></p>
                                                                    <p style={{ color: 'yellow' }}>{data.favCount}</p>
                                                                </Grid>
                                                            </Grid>
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <div className="synopsis">
                                                    {isReadMore ? (data.synopsis || '').slice(0, 100) : (data.synopsis || '')}
                                                    {data.synopsis ? (
                                                        <span onClick={toggleReadMore} className="read-or-hide">
                                                            {isReadMore ? " ... read more" : "  show less"}
                                                        </span>
                                                    ) : (
                                                        ''
                                                    )}

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
                                        </MediaQuery>

                                        {/* For mobile device */}
                                        <MediaQuery maxWidth={449}>
                                            {console.log('You are using mobile.')}
                                            <Grid item xs={12}>
                                                <div className="img-container" style={{ width: '100%', height: 'auto', margin: '0 auto' }}>
                                                    <Slide ref={React.createRef()} {...properties}>
                                                        {(data.multitrailers || []).map((m, index) => (
                                                            <iframe key={index}
                                                                className="yt_trailer"
                                                                src={m.replace('watch?v=', 'embed/')}
                                                                frameBorder="0"
                                                                allowFullScreen
                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                title="Embedded youtube"
                                                            />
                                                        ))}

                                                        {(data.screenShots || '').map((each, index) => (
                                                            <div key={index} className="each-slide" style={{ backgroundImage: `url(${each})` }}>
                                                            </div>
                                                        ))}
                                                    </Slide>
                                                </div>

                                            </Grid>

                                            <Grid item xs={12}>
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

                                                            {(data.infoDict.Genre || '').split(', ').map((g, index) => (
                                                                g ? (
                                                                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                                                        <p key={index} className="eachGenre">{g}</p>
                                                                    </div>
                                                                ) : (
                                                                    <span></span>
                                                                )
                                                            ))}
                                                        </Grid>

                                                        <Grid container spacing={1}>
                                                            <p className="label">Language:</p>

                                                            <p>{data.language}</p>
                                                        </Grid>

                                                        <Grid container spacing={1}>
                                                            <p><Star style={{ fontSize: '14px' }} /></p>

                                                            <p style={{ color: 'yellow' }}>
                                                                {(data.rateCount || 0)}
                                                                {/* {((data.rating || 0) / (data.rateCount || 0) * 5).toFixed(1)} */}
                                                            </p>
                                                            <p><Comment style={{ fontSize: '14px' }} /></p>
                                                            <p style={{ color: 'yellow' }}>{data.commentCount}</p>
                                                            <p><Favorite style={{ fontSize: '14px' }} /></p>
                                                            <p style={{ color: 'yellow' }}>{data.favCount}</p>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <div className="synopsis">
                                                    {isReadMore ? (data.synopsis || '').slice(0, 100) : (data.synopsis || '')}
                                                    {data.synopsis ? (
                                                        <span onClick={toggleReadMore} className="read-or-hide">
                                                            {isReadMore ? " ... read more" : "  show less"}
                                                        </span>
                                                    ) : (
                                                        ''
                                                    )}

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
                                                        {(data.infoDict.Cast || '').split(',').map((g, index) => (
                                                            <p key={index}>{g}</p>
                                                        ))}

                                                    </div>
                                                </div>
                                            </Grid>
                                        </MediaQuery>
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
