import { StyleSheet,Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

// parallax header styles
export const headerStyles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        paddingHorizontal: 24,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "#1c1e27",
    },
    headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerImage: {
        width: 20,
        height: 20,
    },
    headerText: {
        color: "white",
        fontSize: 20,
        paddingLeft: 20,
    },
});


// Movie details screen styles
export const movieDetailsStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#181a21'
    },
    loadingWrapper: {
        alignItems: 'center',
        padding: 5,
        marginTop:20
    },
    loadingText: {
        color: 'white'
    },
    offlineBanner: {
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


// MovieList screen styles
export const movieListStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#181a21'
    },
    loadingText:{
        color:'white'
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
    offlineBanner: {
        backgroundColor: 'red',
        alignItems: 'center',
        padding: 5
    },
    offlineText: {
        color: 'white',
        fontWeight: 'bold'
    },
    searchWrapper:{
        borderRadius: 25,
        paddingLeft:15,
        backgroundColor: '#1c1e27',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    searchInput: {
        fontSize: 18,
        padding: 10,
        color:'white',
        borderRadius: 15,
    },
    movieItem: {
        flexDirection: 'column',
        alignItems: 'center',
        width: (width / 2) - 20,
        padding: 10,
        backgroundColor: '#1c1e27',
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
        marginTop:5,
        fontSize: 16,
        color:'white',
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
    }
});

// Pagination styles
export const paginationStyles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      height: 35,
      width: 35,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      backgroundColor: '#1c1e27',
      margin:2,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,
      
      elevation: 2,
    },
    buttonText: {
      fontSize: 14,
      color: "white",
    },
    activeButtonText: {
      color: "red",
    },
    disabledButton: {
      opacity: 0.5,
    },
  });