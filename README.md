## movie-app API
[movie-app 배포](https://movie-app-kimjung.netlify.app/)

 # OMDB API 활용
 [OMDB]https://www.omdbapi.com/
 
![API](https://github.com/user-attachments/assets/b386b74b-1e4a-430f-b36f-0ab256ed1262)


- PostMan 활용

![api2](https://github.com/user-attachments/assets/c8200731-a3f0-4c57-922a-953dc224bc3c)


<hr>

# 영화 앱 만들기

- index.js

```react
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- App.js

```react
import './App.css';

function App() {
  return (
    <div>
      헬로우
    </div>
  );
}

export default App;
```

![hello](https://github.com/user-attachments/assets/bd271eb5-35c2-4262-868e-bea4bd7d8c4e)


<hr>

# 영화 데이터 초기값을 테스트

- movies 의 초기값을 포스트맨에서 복사해서 JSON => JS 객체로 변환
  
![API3](https://github.com/user-attachments/assets/c45f1485-7096-4062-affa-672fd41bffb3)


[JS변환]https://www.convertsimple.com/convert-json-to-javascript/

- src 폴더 아래에 components 폴더를 만들고 MovieList.jsx 파일생성

![COMPONET](https://github.com/user-attachments/assets/e20d3b4e-321a-4419-aebc-0ee2bb06ffcf)



- App.js 에서 MovieList 가져오기(import)

```react
  return (
    <div>
      <MovieList movies={movies} />
    </div>
  );
```

- MovieList

```react
import React from 'react';

const MovieList = (props) => {
	return (
		<>
			{props.movies.map((props.id) => (
				<img src={?.Poster} alt='movie'></img>
			))}
		</>
	);
};

export default MovieList;
```

![spi](https://github.com/user-attachments/assets/77e423ba-6925-450d-85b4-112336e6f092)


<hr>

# 부트스트랩 && CSS 꾸며보기

- App.js 에 부트스트랩 라이브러리 추가 모듈경로는 생략 부트스트랩 먼저 그다음 커스텀 css

```react
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
```

- App.css  배경색은 검은색 글자는 하얀색

```css
body {
	background: #141414;
	color: white;
}

.movie-app > .row {
	overflow-x: auto;
	flex-wrap: nowrap;
}

.movie-app > .row > div {
	width: fit-content;
}
```

- [인기 색깔]https://colorhunt.co/palettes/popular

`App.js`

```react
  return (
    <div className='container-fluid movie-app'>
      <div className="row">
        <MovieList movies={movies} />
      </div>
    </div>
  );
```

`MovieList`

```react
	return (
		<>
			{props.movies.map((movie) => (
				<div className='d-flex m-3' key={movie.imdbID}>
					<img src={movie.Poster} alt='movie'></img>
				</div>
			))}
		</>
	);
```

![spi2](https://github.com/user-attachments/assets/58d86799-e4bf-4315-bab4-ce15acf218be)


<hr>

# 검색어로 영화데이터 요청

```react
 const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=본인API키`;

    const response = await fetch(url);
    const responseJson = await response.json();

    console.log(responseJson);
  };
```

- async, awit은 쌍으로 이루어짐.

```react
  useEffect(() => {
    getMovieRequest("영어로 영화검색");
  }, []);
```

![array](https://github.com/user-attachments/assets/dd63d9d3-b247-4a81-9388-28ce9153eb71)


![spider3](https://github.com/user-attachments/assets/7a915330-6084-4644-bb1c-0763d1b4d5c8)



- 결과가 잘 나오면 초기값은 삭제.

```react
const [movies, setMovies] = useState([]);
```

<hr>


# MovieListHeading, SearchBox


![com](https://github.com/user-attachments/assets/e0d82ffa-1a17-49e5-b2b9-d2f69b27201e)


![movie](https://github.com/user-attachments/assets/8922b689-c44d-4f8b-a92d-13f494bacd2d)


- 상단에 부트스트랩 클래스 'row'로 한줄 더 추가하고  그 안에 왼쪽에는 앱의 제목에 해당하는 MovieListHeading 오른쪽에는 검색입력하는  SearchBox.

```react
 <div className='container-fluid movie-app'>
      <div className='row align-items-center my-4'>
        <MovieListHeading heading='Movies' />
        <SearchBox />
      </div>
      <div className="row">
        <MovieList movies={movies} />
      </div>
    </div>
```

`MovieListHeading`

```react
const MovieListHeading = (props) => {
	return (
		<div className='col'>
			<h1>{props.heading}</h1>
		</div>
	);
};
```

`SearchBox`

```react
const SearchBox = (props) => {
	return (
		<div className='col col-sm-4'>
			<input className='form-control' placeholder='영화 검색...'></input>
		</div>
	);
};
```

<hr>

# SearchValue SearchBox에서 입력시 업데이트

`App`

```react
const [searchValue, setSearchValue] = useState('');
...
<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
```

`SearchBox`

```react
const SearchBox = (props) => {
	const handleChange = (e) => {
		props.setSearchValue(e.target.value);
	};

	return (
		<div className='col col-sm-4 me-5'>
			<input
				className='form-control'
				value={props.searchValue}
				onChange={handleChange}
				placeholder='영화 검색...'
			/>
		</div>
	);
};
```

![asasas](https://github.com/user-attachments/assets/c37bc9bd-274b-465f-89c2-8dc3ca494aff)


`app`

```react
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async (searchValue) => {
    ...

    if (responseJson.Search) {
      setMovies(responseJson.Search)
    }
  };

  useEffect(() => {
    if (searchValue.length > 3) {
      getMovieRequest(searchValue);
    }
  }, [searchValue]);
```

- `useEffect` 에 `searchValue`가 바뀔때마다 영화를 검색하는데  영문자 4자 이상 적어야 검색을 하도록 설정
- 검색결과가 있을 경우에만 영화리스트를 업데이트하여 화면에 나오게 한다.

![Uploading spii.PNG…]()


<hr>

