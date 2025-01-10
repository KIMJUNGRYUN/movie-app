## movie-app API
[배포주소](https://movie-app-kimjung.netlify.app/)

 # OMDB API 활용
 [OMDB]https://www.omdbapi.com/
 
![API](https://github.com/user-attachments/assets/3366e32f-6772-44c8-b145-ed0e1c84e67d)

- PostMan 활용

![api2](https://github.com/user-attachments/assets/36a8d064-5e52-42ee-9322-9c854a990b07)

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

![hello](https://github.com/user-attachments/assets/5c5530ad-f7dc-4652-9733-d59ef02b40dd)

<hr>

# 영화 데이터 초기값을 테스트

- movies 의 초기값을 포스트맨에서 복사해서 JSON => JS 객체로 변환
  
![API3](https://github.com/user-attachments/assets/44377ea7-3537-4d2b-8b7d-026bd2047f49)

[JS변환]https://www.convertsimple.com/convert-json-to-javascript/

- src 폴더 아래에 components 폴더를 만들고 MovieList.jsx 파일생성

![COMPONET](https://github.com/user-attachments/assets/c71c15e5-c218-4049-b6b1-53bd17ab716f)


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

![spi](https://github.com/user-attachments/assets/ff537ae5-75c9-46b2-9762-af7def5c2194)

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

![spi2](https://github.com/user-attachments/assets/bcc31079-45cd-4ef9-8cb8-d1de6918f309)

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

![array](https://github.com/user-attachments/assets/9ae1cefc-c518-4a2f-bd62-54e85d76473e)


![spider3](https://github.com/user-attachments/assets/40b6120c-e99d-4181-96dd-cfab8de7525b)

- 결과가 잘 나오면 초기값은 삭제.

```react
const [movies, setMovies] = useState([]);
```

<hr>


# MovieListHeading, SearchBox

![com](https://github.com/user-attachments/assets/3886c848-14c2-4ac4-9989-450c8900668e)

![movie](https://github.com/user-attachments/assets/e4cda7ad-5ff5-4db4-8b35-63f16d4f22b0)

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

![asasas](https://github.com/user-attachments/assets/4d46c675-02f8-404d-8a1a-2a8968930928)

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

![spii](https://github.com/user-attachments/assets/9aaf5e3d-2b86-4a06-91e5-9eec91d7bee8)

<hr>

