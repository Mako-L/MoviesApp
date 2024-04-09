import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails } from '../actions/movieActions';
import { AppState } from '../reducers';

interface Props {
    route: {
        params: {
            movieId: number;
        }
    };
}

const MovieDetails: React.FC<Props> = ({ route }) => {
    const { movieId } = route.params;
    const dispatch = useDispatch();
    const movie = useSelector((state: AppState) => state.movies.movieDetail);
    const loading = useSelector((state: AppState) => state.movies.movieDetailLoading);
    const offline = useSelector((state: AppState) => state.movies.offline);
    const error = useSelector((state: AppState) => state.movies.error);

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

                        <Text>Loading movie details...</Text>
                    </View>}</>
        );
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                />
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.overview}>{movie.overview}</Text>
                <Text style={styles.info}>Release Date: {movie.release_date}</Text>
                <Text style={styles.info}>Average Rating: {movie.vote_average}</Text>
                {movie.genres && movie.genres.map(genre => (
                    <Text key={genre.id} style={styles.genre}>{genre.name}</Text>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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
    overview: {
        fontSize: 16,
        color: 'gray',
        marginVertical: 10,
    },
    info: {
        fontSize: 16,
        marginBottom: 5,
    },
    genre: {
        fontSize: 14,
        color: 'navy',
        marginRight: 10,
        marginBottom: 5,
    }
});

export default MovieDetails;
