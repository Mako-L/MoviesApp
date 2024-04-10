// Imports necessary React components and hooks, React Native components, Redux hooks, and other utilities
import React,{ useEffect } from 'react';
import { View, Text, useWindowDimensions, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import type{ NativeScrollEvent } from 'react-native';
import { fetchMovieDetails } from '../actions/movieActions'; // Importing the action to fetch movie details
import { AppState } from '../reducers'; // Importing the type for the app's state
import { Props } from '../types'; // Props type definition
import { TabbedHeaderPager } from 'react-native-sticky-parallax-header'; // Component for a sticky parallax header
import { useSharedValue } from 'react-native-reanimated'; // Reanimated hook for shared values across components
import { HeaderBar } from '../components/HeaderBar'; // Custom header bar component
import { AntDesign } from '@expo/vector-icons'; // Icon library
import { movieDetailsStyles } from '../styles' // Style sheet for movie details
const dayjs = require('dayjs'); // Library for date manipulation

// Component definition using functional component style
const MovieDetails: React.FC<Props> = ({ route, navigation }) =>{
    const{ movieId } = route.params; // Destructuring to extract movieId from navigation route
    const dispatch = useDispatch(); // Hook to dispatch actions
    const movie = useSelector((state: AppState) => state.movies.movieDetail); // Retrieves movie details from the Redux store
    const loading = useSelector((state: AppState) => state.movies.movieDetailLoading); // Retrieves loading state
    const offline = useSelector((state: AppState) => state.movies.offline); // Retrieves offline state
    const error = useSelector((state: AppState) => state.movies.error); // Retrieves any error information

    const{ height: windowHeight } = useWindowDimensions(); // Hook to get window dimensions
    const scrollValue = useSharedValue(0); // Shared value for scroll position

    // Function to handle scroll events
    function onScroll(e: NativeScrollEvent){
        'worklet'; // Directive for the reanimated library to treat this as an animation worklet
        scrollValue.value = e.contentOffset.y; // Updates the scrollValue based on current scroll position
    }

    // useEffect hook to dispatch the fetchMovieDetails action when component mounts or movieId changes
    useEffect(() =>{
        dispatch(fetchMovieDetails(movieId));
    }, [dispatch, movieId]);

    // Conditional rendering based on the loading, offline, and error states
    if (!movie || loading){
        return (
            <>
              {/* Check if offline mode is true and there is no error, then show offline message */}
              {offline && !error &&
                    <View style={movieDetailsStyles.offlineBanner}>
                        <Text style={movieDetailsStyles.offlineText}>
                            No internet connection
                        </Text>
                    </View>
                }
              {/* If there is an error, display it in a similar style banner */}
              {error &&
                    <View style={movieDetailsStyles.offlineBanner}>
                        <Text style={movieDetailsStyles.offlineText}>
                          {error}{/* Displaying the error message from the Redux store */}
                        </Text>
                    </View>
                }
              {/* While the data is loading, show a loading indicator */}
              {loading &&
                    <View style={movieDetailsStyles.container}>
                        <View style={movieDetailsStyles.loadingWrapper}>
                            <ActivityIndicator color="red"/>
                            <Text style={movieDetailsStyles.loadingText}>Loading movie details...</Text>
                        </View>
                    </View>
                }
            </>
        );
    }
    

    // Main component rendering
    return (
        <>
          {/* TabbedHeaderPager provides a parallax header effect for the content */}
            <TabbedHeaderPager
                containerStyle={movieDetailsStyles.stretchContainer} // Style for the container, allows full stretch
                backgroundImage={{ // Background image for the header set dynamically using movie poster
                    uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                }}
                title={movie.title} // Movie title displayed in the header
                titleStyle={movieDetailsStyles.titleStyle} // Styling for the title
                onScroll={onScroll} // Function to handle scroll events, updating scrollValue
                renderHeaderBar={() => <HeaderBar scrollValue={scrollValue} title={movie.title} back={true} />}
                showsVerticalScrollIndicator={false}>{/* Disables vertical scroll indicator */}
              {/* Main view container that adjusts based on the window's height */}
                <View style={[movieDetailsStyles.container,{ height: windowHeight }]}>
                  {/* Container for top movie information (rating and release date) */}
                    <View style={movieDetailsStyles.topInfoWrapper}>
                      {/* Individual wrapper for rating info */}
                        <View style={movieDetailsStyles.infoWrapper}>
                            <AntDesign name="staro" size={20} color="white" />{/* Star icon */}
                            <Text style={movieDetailsStyles.info}>{movie.vote_average?.toFixed(1)}</Text>{/* Movie rating, formatted to 1 decimal place */}
                        </View>
                      {/* Individual wrapper for release date info */}
                        <View style={movieDetailsStyles.infoWrapper}>
                            <AntDesign name="clockcircleo" size={20} color="white" />{/* Clock icon */}
                            <Text style={movieDetailsStyles.info}>{dayjs(movie.release_date).format('DD MMMM YYYY')}</Text>{/* Formatted release date */}
                        </View>
                    </View>
                  {/* Genre container, dynamically populated based on available genres */}
                    <View style={movieDetailsStyles.genreWrapper}>
                  {movie.genres && movie.genres.map(genre => (
                        <View key={genre.id} style={movieDetailsStyles.genreInfoWrapper}>
                        <Text style={movieDetailsStyles.genre}>{genre.name}</Text>{/* Genre name */}
                        </View>
                    ))}
                    </View>
                  {/* Overview text wrapper */}
                    <View style={movieDetailsStyles.overviewWrapper}>
                        <Text style={movieDetailsStyles.overview}>{movie.overview}</Text>{/* Movie overview/description */}
                    </View>
                </View>
            </TabbedHeaderPager>
        </>
    );
};

export default MovieDetails;
