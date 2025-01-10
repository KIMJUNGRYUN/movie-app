import { useEffect, useState } from "react";
import MovieList from "./components/MovieList";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import ScrollContainer from "react-indiana-drag-scroll";


function App() {
  const [searchValue, setSearchValue] = useState('');
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  // 서버에서 영화들 데이터를 가져옴
  async function getMovieRequest(s){   //async awit는 쌍으로 이루어져 있음
    const url = `http://www.omdbapi.com/?i=tt3896198&apikey=61a1acd6&s=${s}`;
    const response = await fetch(url); //omdb 서버에서 데이터를 제이슨으로 받음
    const jsonData = await response.json(); //제이슨 문자열을 자바스크립트 객체로 변환
    if(jsonData.Search != null && jsonData.Search.length > 0){
      setMovies(jsonData.Search);
    }
    
  }

  //앱 실행시 처음 한번만 실행 [] => 검색어가 바뀔때마다 실핼됨
  useEffect(() => {
    if(searchValue.length >= 3){
         getMovieRequest(searchValue);
    }
 
  }, [searchValue]);
  
  //처음 한번만 실행 로컬스토리지에서 선호작 가져오기
  useEffect(() => {
    const movieLikes = JSON.parse(localStorage.getItem('favorites'))
    if(movieLikes){
      setFavorites(movieLikes);
    }
  }, [])

  //로컬에 저장하는 메소드
  function saveToLocalStorage(items){
    localStorage.setItem('favorites', JSON.stringify(items));
  }

  //선호작 추가 함수
  function addFavoriteMovie(movie){
    if (!favorites.some((fav) => fav.imdbID === movie.imdbID)) {
        const newList = [...favorites, movie];
        setFavorites(newList); //스테이트 업데이트
        saveToLocalStorage(newList); //저장소에 저장
    }else{
      alert("이미 추가된 영화입니다.");
    }
  }
  

  //선호작 제거 함수
  function removeMovie(movie){
    //필터를 써서 id가 같은 영화가 있으면 제거됨!
    const newList = favorites.filter((fm) => fm.imdbID !== movie.imdbID)
    setFavorites(newList)
    saveToLocalStorage(newList)
  }

  return (
    <div className="container-fluid movie-app">
        <div className='row align-items-center my-4'>
        <MovieListHeading heading='영화 검색과 선호작 등록' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      
    
      <ScrollContainer className="row scroll-container">
        <MovieList addMovie={true} movies={movies} handleClick={addFavoriteMovie} />
      </ScrollContainer>

      <div className='row align-items-center my-4'>
        <MovieListHeading heading='내 선호작' />
      </div>

      <ScrollContainer className="row scroll-container">
        <MovieList addMovie={false} movies={favorites} handleClick={removeMovie} />
      </ScrollContainer>
    
    </div>
  
  );
}

export default App
