// Import necessary modules from React and React Native, including hooks and components
import React,{ useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, useWindowDimensions, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'; // Hooks for Redux to dispatch actions and select from the state
import { fetchTopMovies, updatePage, searchMovies } from '../actions/movieActions'; // Action creators for fetching movies and updating pagination
import { useDebounce } from 'use-debounce'; // Hook for debouncing rapid changes to inputs
import type{ NativeScrollEvent } from 'react-native'; // TypeScript type for scroll events
import { useNavigation } from '@react-navigation/native'; // Hook for navigation
import { AppState } from "../reducers"; // Type definition for the Redux store state
import Pagination from './Pagination'; // Custom component for pagination
import { TabbedHeaderPager } from 'react-native-sticky-parallax-header'; // Component for a sticky parallax header
import { useSharedValue } from 'react-native-reanimated'; // Reanimated hook for shared animation values
import { HeaderBar } from './HeaderBar'; // Custom header bar component
import { movieListStyles } from '../styles' // Import styles specifically for this component

// Functional component definition
const MovieList: React.FC = () =>{
    // Hooks to interact with Redux and navigation
    const dispatch = useDispatch();
    const navigation = useNavigation();

    // State selectors from the Redux store
    const movies = useSelector((state: AppState) => state.movies.movies);
    const loading = useSelector((state: AppState) => state.movies.moviesLoading);
    const totalItems = useSelector((state: AppState) => state.movies.totalItems);
    const offline = useSelector((state: AppState) => state.movies.offline);
    const error = useSelector((state: AppState) => state.movies.error);
    const page = useSelector((state: AppState) => state.movies.page);

    // Local state for handling search input
    const [searchQuery, setSearchQuery] = useState('');
    const [searchString] = useDebounce(searchQuery, 1000); // Debounces the search input to reduce API calls

    // Window dimensions and scroll position management for animated effects
    const{ height: windowHeight } = useWindowDimensions();
    const scrollValue = useSharedValue(0);

    // Function to handle scroll events and update scroll position
    function onScroll(e: NativeScrollEvent){
        'worklet';
        scrollValue.value = e.contentOffset.y;
    }

    // Effect for fetching movies based on search query or page change
    useEffect(() =>{
        if (searchString.trim() === ""){
            dispatch(fetchTopMovies(page));
        } else{
            dispatch(searchMovies(searchString, page));
        }
    }, [page, dispatch]);

    // Initial fetch and page reset when search string changes
    useEffect(() =>{
        if (searchString.trim() === ""){
            dispatch(fetchTopMovies(1));
        } else{
            dispatch(searchMovies(searchString, 1));
        }
        dispatch(updatePage(1));
    }, [searchString, dispatch]);

    // Handles changes to the search input
    const handleSearchChange = (newSearchString: string) =>{
        setSearchQuery(newSearchString);
    };

    return (
        <>
           {/* Parallax header component for enhanced UI effect */}
            <TabbedHeaderPager
                enableSafeAreaTopInset={false}
                containerStyle={movieListStyles.stretchContainer}
                backgroundImage={require('../assets/banner.jpg')}
                title={`Movies`}
                titleStyle={movieListStyles.titleStyle}
                onScroll={onScroll}
                parallaxHeight={30}
                showsVerticalScrollIndicator={false}
                renderHeaderBar={() => <HeaderBar scrollValue={scrollValue} title={`Movies`} back={false} />}
            >
                <>
                   {/* Offline and error handling banners */}
                   {offline && !error &&
                        <View style={movieListStyles.offlineBanner}>
                            <Text style={movieListStyles.offlineText}>
                                No internet connection
                            </Text>
                        </View>}
                   {error &&
                        <View style={movieListStyles.offlineBanner}>
                            <Text style={movieListStyles.offlineText}>
                               {error}
                            </Text>
                        </View>}

                   {/* Main content container */}
                    <View style={movieListStyles.container}>
                       {/* Search input */}
                        <View style={movieListStyles.searchWrapper}>
                            <TextInput
                                style={movieListStyles.searchInput}
                                placeholder="Search movies..."
                                placeholderTextColor="white"
                                value={searchQuery}
                                onChangeText={handleSearchChange}
                            />
                        </View>
                       {/* Conditional rendering based on loading state and search results */}
                       {loading ?
                            <View style={movieListStyles.loadingWrapper}><Text style={movieListStyles.loadingText}>Loading...</Text></View>
                            :
                            <>
                               {movies.length === 0 && !loading ?
                                    <View style={movieListStyles.noResultsWrapper}><Text>No results</Text></View>
                                    :
                                    <>
                                       {/* FlatList component to render a list of movies */}
                                        < FlatList
                                            data={movies}  // Array of movie objects to render
                                            keyExtractor={(item) => item.id.toString()}  // Extracts unique keys for list items
                                            scrollEnabled={false}  // Disables scrolling within the FlatList
                                            numColumns={2}  // Displays items in two columns
                                            contentContainerStyle={movieListStyles.listContainer}  // Styles for the container of the list items
                                            renderItem={({ item }) => (  // Renders each movie item using the data provided
                                                <TouchableOpacity
                                                    activeOpacity={1}  // Sets the opacity to 1 when the item is pressed, indicating no visual feedback on press
                                                    style={movieListStyles.movieItem}  // Styles for each movie item
                                                    onPress={() =>{  // Defines what happens when a movie item is pressed
                                                        if (!offline){  // Checks if the app is not offline
                                                            navigation.navigate('MovieDetails',{ movieId: item.id })  // Navigates to the MovieDetails screen with the movieId as a parameter
                                                        }
                                                    }}
                                                >
                                                   {/* Container for the movie image */}
                                                    <View style={movieListStyles.imageWrapper}>
                                                        <Image
                                                            style={movieListStyles.image}  // Styles the image
                                                            source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}  // Fetches the movie poster from the API
                                                        />
                                                    </View>
                                                   {/* Container for the movie title */}
                                                    <View style={movieListStyles.infoContainer}>{/*  Displays the title of the movie */}
                                                        <Text style={movieListStyles.title}>{item.title}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )}
                                        />
                                    </>}

                               {/* Pagination component for navigating between pages */}
                               {totalItems !== 0 ?
                                    <View style={movieListStyles.paginationWrapper}>
                                        <Pagination
                                            currPage={page}
                                            totalPages={parseInt(`${totalItems / 20}`)}
                                            onPageChange={(newpage) =>{
                                                dispatch(updatePage(newpage));
                                            }}
                                            pagesPerBatch={2}
                                        />
                                    </View> : <View style={movieListStyles.paginationWrapper}></View>}
                            </>}
                    </View>
                </>
            </TabbedHeaderPager>
        </>
    );
};

export default MovieList;
