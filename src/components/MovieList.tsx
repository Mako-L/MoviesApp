import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopMovies, updatePage, searchMovies } from '../actions/movieActions';
import { useDebounce } from 'use-debounce';
import { Movie } from '../types';
import { useNavigation } from '@react-navigation/native';
import { AppState } from "../reducers";
import Pagination from './Pagination';

const MovieList: React.FC = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const movies = useSelector((state: AppState) => state.movies.movies);
    const loading = useSelector((state: AppState) => state.movies.moviesLoading);
    const totalItems = useSelector((state: AppState) => state.movies.totalItems);
    const offline = useSelector((state: AppState) => state.movies.offline);
    const error = useSelector((state: AppState) => state.movies.error);
    const page = useSelector((state: AppState) => state.movies.page);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchString] = useDebounce(searchQuery, 1000);
    useEffect(() => {
        if (searchString === "") {
            dispatch(fetchTopMovies(page));
        } else {
            dispatch(searchMovies(searchString, page));
        }
    }, [dispatch, page, searchString])

    const handleSearchChange = (text: string) => {
        setSearchQuery(text);
    };

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
            <ScrollView style={styles.container}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChangeText={handleSearchChange}
                />
                {loading ?
                    <View style={styles.loadingWrapper}><Text>Loading...</Text></View>
                    :
                    <>
                        {movies.length === 0 && !loading ?
                            <View style={styles.noResultsWrapper}><Text>No results</Text></View>
                            :
                            <FlatList
                                data={movies}
                                keyExtractor={(item) => item.id.toString()}
                                scrollEnabled={false}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        style={styles.movieItem}
                                        onPress={() => {
                                            if(!offline){
                                            navigation.navigate('MovieDetails', { movieId: item.id })
                                            }
                                        }}
                                    >
                                        <Image
                                            style={styles.image}
                                            source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                                        />
                                        <View style={styles.infoContainer}>
                                            <Text style={styles.title}>{item.title}</Text>
                                            <Text numberOfLines={3} style={styles.overview}>{item.overview}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />}
                        {totalItems !== 0 ?
                            <View style={styles.paginationWrapper}>
                                <Pagination
                                    currPage={page}
                                    totalPages={parseInt(`${totalItems / 20}`)}
                                    onPageChange={(newpage) => {
                                        dispatch(updatePage(newpage));
                                    }}
                                    pagesPerBatch={2}
                                />
                            </View>: <View style={styles.paginationWrapper}></View>}
                    </>}
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    loadingWrapper: {
        alignItems: 'center',
        padding: 5
    },
    noResultsWrapper: {
        alignItems: 'center',
        padding: 5
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
    searchInput: {
        fontSize: 18,
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    movieItem: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    image: {
        width: 100,
        height: 150,
        borderRadius: 5,
    },
    infoContainer: {
        flex: 1,
        paddingLeft: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    overview: {
        fontSize: 14,
        color: 'gray',
    }, paginationWrapper: {
        marginTop: 10,
        marginBottom: 30
    }
});

export default MovieList;
