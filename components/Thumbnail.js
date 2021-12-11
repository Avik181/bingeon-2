import { ThumbUpIcon, PlayIcon } from "@heroicons/react/outline"
import Image from "next/image"
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer';
import { useState } from "react";

function Thumbnail({result}) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [currentMovie, setCurrentMovie] = useState([]);

    const opts = {
        height: "380",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    const handleClick = (movie) => {
        if (movie === currentMovie) {
            setCurrentMovie([]);
            setTrailerUrl("");
        } else {
            movieTrailer(movie?.name || movie?.title || "")
                .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get("v"));
                })
                .catch((error) => {
                    setTrailerUrl("None"); 
                    console.log(error)
                })
            
            setCurrentMovie(movie);

            
            }}

    const BASE_URL ="https://image.tmdb.org/t/p/original/"
    return (
        <div className="w-full">
        <div className="group cursor-pointer p-2 transition duration-200 ease-in transform 
        sm:hover:scale-105 hover:z-50">
             <Image
                layout="responsive"
                src={
                `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
                `${BASE_URL}${result.poster_path}`
                }
                 height={1080}
                 width={1920}
                 alt="image"
                 onClick={() => handleClick(result)}
                 className="hover:opacity-50" 
            />
            
            <div className="absolute bottom-0 left-0 w-full content-center pb-3">
            {trailerUrl && <><button className = "bg-red-500 p-2 rounded-md hover:bg-red-700 font-semibold"onClick={() => handleClick(result)}>
            Close ✕</button>
            <YouTube className="" videoId={trailerUrl} opts={opts} /> 
            </>}
            
            </div>
            

      <div className="p-2">
          <p className="truncate max-w-md">{result.overview}</p>
          <div className="flex">
          <h2 className="mt-1 text-2xl text-white transition-all duration-100 ease-in-out
          group-hover:font-bold ">
              {result.title || result.original_name}
          </h2>
          <button className="flex items-center text-xl ml-4 px-2 rounded-lg pb-1 mt-1 bg-purple-500
          hover:bg-purple-400 max-h-8" onClick={() => handleClick(result)}>Play</button>
          </div>

          <p className="flex items-center opacity-0 group-hover:opacity-100">
                {result.media_type && `${result.media_type} •`}{" "}
                {result.release_date || result.first_air_date} •{" "}
                <ThumbUpIcon className="h-5 mx-2" />
                {result.vote_count}
         </p>
      </div>
      
        </div>
        
        </div>
    )
}

export default Thumbnail
