import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopMovies, updatePage, searchMovies } from '../actions/movieActions';
import { useDebounce } from 'use-debounce';
import { Movie } from '../types';
import { useNavigation } from '@react-navigation/native';
import { AppState } from "../reducers";
import Pagination from './Pagination';

const { width } = Dimensions.get('window');

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
        if (searchString.trim() === "") {
            dispatch(fetchTopMovies(page));
        } else {
            dispatch(searchMovies(searchString, page));
        }
    }, [page, dispatch]);

    useEffect(() => {
        if (searchString.trim() === "") {
            dispatch(fetchTopMovies(1));
        } else {
            dispatch(searchMovies(searchString, 1));
        }
        dispatch(updatePage(1));
    }, [searchString, dispatch]);

    const handleSearchChange = (newSearchString) => {
        setSearchQuery(newSearchString);
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
                                numColumns={2}
                                contentContainerStyle={styles.listContainer}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        style={styles.movieItem}
                                        onPress={() => {
                                            if (!offline) {
                                                navigation.navigate('MovieDetails', { movieId: item.id })
                                            }
                                        }}
                                    >
                                        <View style={styles.imageWrapper}>
                                            <Image
                                                style={styles.image}
                                                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                                            />
                                        </View>
                                        <View style={styles.infoContainer}>
                                            <Text style={styles.title}>{item.title}</Text>
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
                            </View> : <View style={styles.paginationWrapper}></View>}
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
    listContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 10
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
        flexDirection: 'column',
        alignItems: 'center',
        width: (width / 2) - 20,
        padding: 10,
        backgroundColor: 'white',
        margin: 5,
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
    imageWrapper: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
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
        textAlign: 'center'
    },
    overview: {
        fontSize: 14,
        color: 'gray',
    },
    paginationWrapper: {
        marginTop: 10,
        marginBottom: 30
    }
});

export default MovieList;
