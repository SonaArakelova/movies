// import './App.css';
// import React, { useState, useEffect } from 'react';
// import 'font-awesome/css/font-awesome.min.css';

// const Full_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}`;


// const Header =({onSearch}) => {
//   return (

//     <header className='header'>
//       <div className='logo'>
//       <div className='h1-logo'>
//       <h1> IMDb</h1>
//       </div>
//       <i className="fa-solid fa-film"></i>
//       </div>

//       <input
//        type= "text"
//        className = "input-search"
//        placeholder = "Search IMDb"
//        onChange = {(e) => onSearch(e.target.value)}
//       />

//       <div className='buttons'>

//     <button>IMDb Pro</button>
//     <button>Sign in</button>
//     <button>Watch List</button>
//     </div>

//     </header>

//   )
// }

// const TableComponent = ({data}) =>{
//   return(
//     <table className='table'>
//       <thead className='thead'>
//         <tr>
//           <th> #</th>
//           <th>Name</th>
//           <th>Age</th>
//           <th>City</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((item, index)=>
//         <tr key = {index}>
//           <td>{index + 1}</td>
//           <td>{item.name }</td>
//           <td>{item.age }</td>
//           <td>{item.city }</td>
//         </tr>
//         )}
//       </tbody>
//     </table>
//   );
// };

// const MainSection = () => {
//   const [search, setSearch]= useState("");
//   const data = [
//     {name: 'a', age: 12, city: 'hvg'}
//   ];

//   const filteredData = data.filter(
//     (item)=>
//       item.name.toLowerCase().includes(search.toLowerCase())
//   )

//   return(
//     <main className='mainContainer'>
//       <TableComponent data = {filteredData}/>
//     </main>

//   )
// }


// function App() {

//   const[searchQuery, setSearchQuery] = useState("");
//   const[movie, setMovie] = useState({});
//   const[movies, setMovies] = useState([])
//   const [isLoading, setLoading] = useState(true);
//   const [error, setError] = useState("")

//   // useEffect(() => {
//   //  console.log("every time rendering, with every letter");
   
//   // })

//   // useEffect(()=> {
//   //   // console.log("empty");

//   //   const getMovie = async () =>{
//   //     try {
//   //       const response =   await  fetch(Full_URL);
//   //       const data = await response.json();


//   //       if(response.status !== 200){
//   //         throw Error(data.Error)
//   //       }
        
//   //       setMovie(data);
//   //       setLoading(false);
        
//   //     } catch (error) {
//   //       setError(error.toString())
//   //       setLoading(false)
//   //     }
      


//   //   };
//   //   // fetch(Full_URL)
//   //   // .then(response => {
//   //   //   return response.json();
//   //   // }) 
//   //   // .then((data) =>{
//   //   //   console.log(data);
//   //   //   setMovie(data)
//   //   // })   
//   //   getMovie()

//   // }, [])



//   useEffect(() => {

//     if(searchQuery > 6){
//       const url = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${searchQuery}`;
// ;

//     const getMovies = async () =>{
//       try {
//         const response =   await  fetch(url);
//         const data = await response.json();


//         if(response.status !== 200){
//           throw Error(data.Error)
//         }
        
//         setMovies(data.Search);
//         setLoading(false);
        
//       } catch (error) {
//         setError(error.toString())
//         setLoading(false)
//       }
      


//     };
//     getMovies()
//     }
    
//   }, [searchQuery])

//   // fetch(Full_URL + "i=tt3896198")

//   console.log("Render: ", movie);
  

//   return (
//     <div className="App">
//       <Header onSearch={setSearchQuery}/>
//       {isLoading ? (
//         <div>Loading...</div>
//       ):(
//       <div>
//         <div> Title :{movie.Title || "--"}</div>
//       </div>
//     )}
//     {error && <div>{error}</div>}

//     {movies.map(m => (
//               <div> Title :{m.Title || "--"}</div>

//     ))}
//           <MainSection searchQuery = {searchQuery} />

//     </div>
//   );
// }


// export default App;

// // http://www.omdbapi.com/?i=tt3896198&apikey=d5c66a51












import './App.css';
import React, { useState, useEffect } from 'react';
import 'font-awesome/css/font-awesome.min.css';



const URL = ` https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}` ;


const Header = ({ onSearchSubmit }) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearchSubmit(event.target.value);
    }
  };

  return (
    <header className='header'>
      <div className='logo'>
        <div className='h1-logo'>
          <h1>IMDb</h1>
        </div>
        <i className = "fa-solid fa-film"></i>
      </div>

      <input
        type="text"
        className="input-search"
        placeholder="Search IMDb"
        onKeyDown={handleKeyDown}
      />

      <div className='buttons'>
        <button>IMDb Pro</button>
        <button>Sign in</button>
        <button>Watch List</button>
      </div>
    </header>
  );
};

const MovieCard = ({ movie, onAdd}) => {
  return (
    <div className="movie-card">
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
      <p>{movie.Genre}</p>
      {movie.Poster && movie.Poster !== "null" ? (
        <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
      ) : (
        <div>No image available</div>
      )}
      <button onClick={() => onAdd(movie)}>Add to List</button>
    </div>
  );
};

const MainSection = ({ searchQuery, addToList, watchListMode, removeFromList }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!searchQuery) return;

    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${URL}&s=${searchQuery}`);
        const data = await response.json();

        if (data.Response === "False") {
          setError(data.Error);
          setMovies([]);
        } else {
          setMovies(data.Search);
          setError("");
        }
      } catch (err) {
        setError("Error fetching movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery]);

  if (watchListMode) {
    return (
      <div className="watch-list">
        <h2>Your Watch List</h2>
        {movies.length === 0 ? (
          <p>No movies in your list yet.</p>
        ) : (
          <ul>
            {movies.map((movie,) => (
              <li key={movie.imdbID}>
                {movie.Title} ({movie.Year})
                <button onClick={() => removeFromList(movie.imdbID)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <main className="mainContainer">
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="movie-list">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} onAdd={addToList} />
          ))}
        </div>
      )}
    </main>
  );
};

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movieList, setMovieList] = useState(() => {
  const savedList = localStorage.getItem("movieList");

    return savedList ? JSON.parse(savedList) : [];
  });
  const [watchListMode, setWatchListMode] = useState(false);

  const handleSearchSubmit = (query) => {
    setSearchQuery(query); 
  };

  const addToList = (movie) => {
    setMovieList((prevList) => {
      const updatedList = [...prevList, movie];
      localStorage.setItem("movieList", JSON.stringify(updatedList));
      return updatedList;
    });
  };

  const removeFromList = (imdbID) => {
    setMovieList((prevList) => {
      const updatedList = prevList.filter((movie) => movie.imdbID !== imdbID);
      localStorage.setItem("movieList", JSON.stringify(updatedList));
      return updatedList;
    });
  };

  const clearList = () => {
    setMovieList([]);
    localStorage.removeItem("movieList");
  };

  const toggleWatchListMode = () => {
    setWatchListMode(!watchListMode);
  };

  return (
    <div className="App">
      <Header onSearchSubmit={handleSearchSubmit} />
      <div className="actions">
        <button onClick={toggleWatchListMode}>
          {watchListMode ? "Show Search Results" : "Show My Watch List"}
        </button>
        {watchListMode && movieList.length > 0 && (
          <button onClick={clearList}>Clear All</button>
        )}
      </div>
      <MainSection
        searchQuery={searchQuery}
        addToList={addToList}
        watchListMode={watchListMode}
        removeFromList={removeFromList} 
      />
    </div>
  );
};

export default App;




