import React, {useState, useEffect} from 'react'
import axios from './axios'
import requests from './requests';
import { AppRegistry, Platform, StyleSheet, Button, Text, View } from 'react-native';

let movieList = ''

function Banner() {
    const [movie, setMovie] = useState([]);
    const [descriptionCount, setDescriptionCount] = useState([150]);
    const [movieList, setMovieList] = useState([]);

    // function refreshBanner() {
    //     console.log("Got Timer event from Header")
    //     // So refresh just looks at the existing movieList
    //     // Doesnt do another axios call to the API
    //     //console.log("MovieList", movieList)
    //     const randmovie = Math.floor(Math.random() * movieList.length);
    //     console.log("Random", randmovie)
    //     setMovie(movieList[randmovie])
    //     console.log("New Movie", movieList[randmovie])
    // }
 
    useEffect(() => {

        function refreshBanner() {
            console.log("Got Timer event from Header")
            // So refresh just looks at the existing movieList
            // Doesnt do another axios call to the API
            //console.log("MovieList", movieList)
            const randmovie = Math.floor(Math.random() * movieList.length);
            //console.log("Random", randmovie)
            setMovie(movieList[randmovie])
            //console.log("New Movie", movieList[randmovie])
        }
    
        const interval = setInterval(() => {
            // console.log('Interval Timer - Calling RefreshBanner every 6 seconds!');
            refreshBanner()
          }, 6000);

        async function fetchData() {

            const request = await axios.get(requests.fetchNetFlixOriginals);

            // console.log("Banner: ", request.data.results)

            // Only Fetch the Movie List Once - so only one call to the api when app loads.
            // Store the list in with this setMovieList 
            // And reference with 'movieList' if you need it again/
            // Could also add some other function to reload/update / to reload the whole list
           
            setMovieList(request.data.results);

            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length)
                ]
            );
            
            return request;
        }

        fetchData()

        return () => clearInterval(interval);

    }, [descriptionCount]);

    // console.log("Random Banner Movie", movie)

    // Truncate the descriptipon (or anything to n characters  and add ...)
    function truncate(str,n) {
            return str?.length > n ? str.substr(0,n -1) + " ..." : str ;
    }

    return (
    
        
            <Text>The Banner Component</Text>
   
        
     
    )
}

export default Banner