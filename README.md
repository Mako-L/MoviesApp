# MoviesApp

MoviesApp is a React Native application that leverages the Movie Database API (TheMovieDB) to deliver a seamless and interactive experience for movie enthusiasts. Users can search for movies, view the top films, and get details on individual films. The app is designed to function both online and offline, retaining the top 20 movies data for access without an internet connection.

## Features

- **Search**: Users can search for movies within the TheMovieDB database.
- **Top Movies**: Display the top-rated movies on the Home Page.
- **Movie Details**: Users can view detailed information about the films but only when internet connection is available.
- **Offline Support**: The app retains some functionality even without an internet connection, displaying the first top 20 movies data.

## Tech Stack

- **React Native**: for building the mobile application.
- **Redux**: for state management and asynchronous requests.
- **React Navigation**: for navigating between screens.
- **NetInfo**: for internet connection detection.
- **Axios**: for API requests.
- **Typescript**: for adding static type definitions to enhance code quality and understandability.
- **Expo**: as a framework and platform for universal React applications.

## Folder Structure

```plaintext
src/
|-- actions/
|   |-- movieActions.ts
|-- assets/
|   |-- banner.jpg
|-- components/
|   |-- HeaderBar.tsx
|   |-- Pagination.tsx
|-- hooks/
|   |-- index.tsx
|-- navigation/
|   |-- AppNavigator.tsx
|-- reducers/
|   |-- index.ts
|   |-- MovieReducer.ts
|-- screens/
|   |-- MovieDetails.tsx
|   |-- MovieList.tsx
|-- store/
|   |-- index.tsx
|-- styles/
|   |-- index.tsx
|-- types/
|   |-- index.ts
.env
App.tsx
```

## Setup

1. Clone the repository from Bitbucket or GitHub.
2. Install dependencies using `npm install`.
3. Create a `.env` file in the root directory and add the following line:

```plaintext
EXPO_PUBLIC_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your API key from TheMovieDB.

4. Start the app with the following command to reset the cache:

```sh
npm start --reset-cache
```

## Documentation

- All code is well-documented with comments to understand the functionality and usage.
- For more detailed documentation, see the specific files within the `components/`, `screens/` and `actions/` directories.

## Notes

- Users will be notified when there is no internet connection, thanks to NetInfo.


```plaintext
src/
|-- actions/
|   |-- movieActions.ts
```

`movieActions.ts`, contains action creators for a Redux store, which are used to interact with the TheMovieDB API and manage the application state related to movies. It includes:

1. Importing necessary modules like Redux, Axios, AsyncStorage, and NetInfo.
2. Defining and exporting asynchronous action creators that dispatch actions to the Redux store.
3. Fetching top-rated movies and handling pagination by updating the current page in the Redux store.
4. Caching the first page of top-rated movies in AsyncStorage for offline access.
5. Fetching movie details for a specific movie by its ID.
6. Implementing search functionality to find movies based on a query string.
7. Managing network status checking using NetInfo to handle offline scenarios and inform the user accordingly.
8. Each action creator handles the loading state, success, and failure scenarios, dispatching appropriate actions to the Redux store for each case.

The API key is retrieved from the environment variable `EXPO_PUBLIC_API_KEY` and is used to authorize requests to the TheMovieDB API.

```plaintext
src/
|-- components/
|   |-- HeaderBar.tsx
```

The `HeaderBar.tsx` component is a custom, animated header for the app's screens. It features:

- A back button that appears if needed, allowing users to navigate to the previous screen.
- The title that fades in as you scroll, for a nice visual effect.
- Safe area handling to look good on all devices.


```plaintext
src/
|-- screens/
|   |-- MovieDetails.tsx
```
In the `MovieDetails.tsx` component, I set up a screen to show detailed information about a movie. Here's what it does:

- Pulls in the movie ID from the navigation parameters and fetches the movie details from TheMovieDB API.
- Keeps track of the loading and offline status to manage what to show to the user – either loading indicators, error messages, or an offline status banner.
- Utilizes a sticky parallax header for a sleek look, where the movie's poster serves as the backdrop.
- Displays the movie's rating, release date, genres, and overview with custom styles and icons for a polished interface.
- Handles scrolling with an animated header bar that adjusts its appearance based on the scroll position.


```plaintext
src/
|-- screens/
|   |-- MovieList.tsx
```
The `MovieList.tsx` file defines a component for displaying a searchable and paginated list of movies:

- It integrates with Redux to fetch top movies and handle search functionality.
- Uses a debounced search input to minimize API calls while typing.
- Manages movie data, loading states, and pagination within the component's state.
- Uses a custom hook, `useNetworkStatus`, to monitor and react to changes in network connectivity. This allows the component to respond dynamically, such as refetching data when the network becomes available after a disconnect.
- Implements a custom `Pagination` component and a `FlatList` to display movies in a grid.
- Each movie item is clickable, leading to detailed information if not in offline mode.
- Handles offline notices and errors, displaying banners when no internet connection is available or when an error occurs.
- Uses `TabbedHeaderPager` for a parallax effect on the header, enhancing the user interface.

It's designed to provide users with a responsive and intuitive way to browse and find movies they're interested in.


```plaintext
src/
|-- components/
|   |-- Pagination.tsx
```

The `Pagination.tsx` file is a component that provides pagination functionality:

- It includes a custom hook `usePagination` that calculates an array of page numbers based on the current page, total pages, and pages per batch to display in the component.
- The component accepts `currPage`, `totalPages`, `onPageChange`, and an optional `pagesPerBatch` prop for customization.
- It renders interactive elements allowing users to navigate between pages by clicking on page numbers or "previous" and "next" buttons.
- Ellipses ("...") are displayed when there are more pages available than currently shown.
- The component's style is imported from a separate styles file, ensuring consistent design.
- It uses `React.memo` to optimize performance by preventing unnecessary re-renders unless its props change.

This component enhances user experience by providing an intuitive and responsive way to navigate through a list of items, such as a movie list.

```plaintext
src/
|-- hooks/
|   |-- index.tsx
```
The `index.tsx` from `hooks` folder contains `useNetworkStatus` custom hook that monitors network connectivity in a React Native app.

1. **Imports and Setup**: The hook imports React's `useState` and `useEffect` for state management and lifecycle effects, and uses `NetInfo` from `@react-native-community/netinfo` to check network status.
2. **State Management**: It initializes a `isConnected` state variable with `null` to indicate that the initial network status is not checked yet.
3. **Listener Setup**: Inside `useEffect`, it subscribes to network changes and updates `isConnected` whenever the network status changes.
4. **Cleanup**: It also ensures the subscription is cleaned up to prevent memory leaks when the component unmounts.
5. **Output**: The hook returns the current network status, letting components react to changes in network connectivity.

```plaintext
src/
|-- navigation/
|   |-- AppNavigator.tsx
```

The `AppNavigator.tsx` file sets up the stack navigation for the app:

- It uses `NavigationContainer` and `createStackNavigator` from React Navigation to manage app screens.
- Defines a stack navigator with `MovieList` as the initial route and `MovieDetails` for individual movie information.

This navigator acts as the main framework for switching between the movie list and the detailed view of each movie in the app.

```plaintext
src/
|-- reducers/
|   |-- MovieReducer.ts
```

The `MovieReducer.ts` file in your project defines a Redux reducer that manages the state related to movies within the application:

- **Initial State**: Sets up default values for movie listings, movie details, errors, pagination, loading states, and offline status based on the `MoviesState` interface.

- **Actions Handled**:
  - **FETCH_TOP_MOVIES_SUCCESS**: Updates the state with a list of top movies and clears any existing errors.
  - **FETCH_TOP_MOVIES_FAILURE**: Sets the error state if there is a failure in fetching the top movies.
  - **FETCH_MOVIE_DETAILS_SUCCESS**: Updates the state with the details of a specific movie and clears errors related to fetching details.
  - **FETCH_MOVIE_DETAILS_FAILURE**: Clears the movie detail from the state and sets an error if fetching movie details fails.
  - **UPDATE_NUMBER_OF_ITEMS**: Updates the total number of items, which is useful for pagination.
  - **UPDATE_MOVIES_LOADING**: Toggles the loading state for fetching the list of movies.
  - **UPDATE_MOVIE_DETAIL_LOADING**: Toggles the loading state for fetching the movie details.
  - **UPDATE_PAGE**: Adjusts the current page number in the pagination state.
  - **UPDATE_OFFLINE**: Sets the offline status to reflect the connectivity status of the app.

```plaintext
.env
```

`.env` file is used to securely manage configuration values that shouldn't be hardcoded into the application's source code.

I placed the API key for TheMovieDB API in the `.env` file as `EXPO_PUBLIC_API_KEY=your_actual_api_key_here`. This key is crucial for making authenticated requests to TheMovieDB's services to fetch movie data.

By keeping the `.env` file in the root directory and referencing it in our code, we effectively manage sensitive configuration in a secure and maintainable way.

## Note
When Building the apk with the command `eas build -p android --profile preview` make sure the `eas.json` file has the env parameter set as this:

```plaintext
   "preview": {
      "distribution": "internal",
      "env": {
        "EXPO_PUBLIC_API_KEY": "your_actual_api_key_here"
      }
    },
```
