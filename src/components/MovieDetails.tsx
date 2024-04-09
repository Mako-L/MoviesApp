import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, useWindowDimensions, StatusBar, TouchableOpacity, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import type { NativeScrollEvent } from 'react-native';
import { fetchMovieDetails } from '../actions/movieActions';
import { AppState } from '../reducers';
import { Props } from '../types';
import { TabbedHeaderPager } from 'react-native-sticky-parallax-header';
import { useSharedValue } from 'react-native-reanimated';
import { HeaderBar } from './HeaderBar';
import { AntDesign } from '@expo/vector-icons';
const dayjs = require('dayjs');

const MovieDetails: React.FC<Props> = ({ route, navigation }) => {
    const { movieId } = route.params;
    const dispatch = useDispatch();
    const movie = useSelector((state: AppState) => state.movies.movieDetail);
    const loading = useSelector((state: AppState) => state.movies.movieDetailLoading);
    const offline = useSelector((state: AppState) => state.movies.offline);
    const error = useSelector((state: AppState) => state.movies.error);

    const { height: windowHeight } = useWindowDimensions();
    const scrollValue = useSharedValue(0);

    function onScroll(e: NativeScrollEvent) {
        'worklet';
        scrollValue.value = e.contentOffset.y;
    }

    useEffect(() => {
        dispatch(fetchMovieDetails(movieId));
    }, [dispatch, movieId]);

    if (!movie || loading) {
        return (
            <>
                {offline && !error &&
                    <View style={styles.offlineBaner}>
                        <Text style={styles.offlineText}>
                            No internet connection
                        </Text>
                    </View>}
                {error &&
                    <View style={styles.offlineBaner}>
                        <Text style={styles.offlineText}>
                            {error}
                        </Text>
                    </View>}
                {loading &&
                    <View style={styles.container}>
                        <View style={styles.loadingWrapper}>
                            <Text style={styles.loadingText}>Loading movie details...</Text>
                        </View>
                    </View>}</>
        );
    }

    return (
        <>
            <TabbedHeaderPager
                containerStyle={styles.stretchContainer}
                backgroundImage={{
                    uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                }}
                title={movie.title}
                titleStyle={styles.titleStyle}
                onScroll={onScroll}
                // parallaxHeight={20}
                renderHeaderBar={() => <HeaderBar scrollValue={scrollValue} title={movie.title} />}
                showsVerticalScrollIndicator={false}>
                <View style={[styles.container, { height: windowHeight }]}>
                    <View style={styles.topInfoWrapper}>
                        <View style={styles.infoWrapper}>
                            <AntDesign name="staro" size={20} color="white" />
                            <Text style={styles.info}>{movie.vote_average?.toFixed(1)}</Text>
                        </View>
                        <View style={styles.infoWrapper}>
                            <AntDesign name="clockcircleo" size={20} color="white" />
                            <Text style={styles.info}>{dayjs(movie.release_date).format('DD MMMM YYYY')}</Text>
                        </View>
                    </View>
                    <View style={styles.genreWrapper}>
                    {movie.genres && movie.genres.map(genre => (
                        <View key={genre.id} style={styles.genreInfoWrapper}>
                        <Text style={styles.genre}>{genre.name}</Text>
                        </View>
                    ))}
                    </View>
                    <View style={styles.overviewWrapper}>
                        <Text style={styles.overview}>{movie.overview}</Text>
                    </View>

                </View>
            </TabbedHeaderPager>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#181a21'
    },
    loadingWrapper: {
        alignItems: 'center',
        padding: 5
    },
    loadingText: {
        color: 'white'
    },
    offlineBaner: {
        backgroundColor: 'red',
        alignItems: 'center',
        padding: 5
    },
    offlineText: {
        color: 'white',
        fontWeight: 'bold'
    },
    image: {
        width: '100%',
        height: 300,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    overviewWrapper: {
        backgroundColor: '#1c1e27',
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    overview: {
        fontSize: 16,
        color: 'white',
    },
    topInfoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    infoWrapper: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#1c1e27',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    info: {
        fontSize: 16,
        color: 'white',
        marginLeft: 10
    },
    genreInfoWrapper:{
        backgroundColor: '#1c1e27',
        margin:10,
        marginTop:0,
        marginLeft:0,
        padding:10,
        borderRadius:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    genreWrapper:{
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    genre: {
        fontSize: 14,
        color: 'white',
    },
    headerImage: {
        width: 20,
        height: 20,
    },
    stretchContainer: {
        alignSelf: 'stretch',
        flex: 1,
    },
    titleStyle: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        color: "white",
        fontSize: 40,
        padding: 10,
    },
    contentContainer: {
        backgroundColor: "white",
        padding: 10,
    },
    contentText: {
        fontSize: 16,
    },
    headerText: {
        color: "white",
        fontSize: 20,
        paddingLeft: 20,
    },
});

export default MovieDetails;
