## React Componentのおさらい

### Functional Component
```js

//propsを渡す　functionでcomponentを作成 arrowfunctionの際に()になるので注意　よく間違える
const Intro = (props) => (
  <p className="App-intro">
    Oure first function component
  </p>
)

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">TV Series List</h1>
        </header>
        //Intro componentを呼び出す
        <Intro />
      </div>
    );
  }
}
//本来はcomponents/xxx.jsでコンポーネントを作成するのであくまでこうやってもできるよーって感じ
```


### Functional Componentをcomponentに切り出す

```js
import React from 'react';

//関数に引数を一つだけ渡す場合 （props) のかっこを外してかいても大丈夫
const Intro = props => (
  <p className="App-intro">
    Oure first function component
  </p>
)

export default Intro;

//でこれをapp.jsでimport
//App.js

import React, { Component } from 'react';
import './App.css';
import Intro from './components/Intro';

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">TV Series List</h1>
        </header>
        <Intro />
      </div>
    );
  }


```

### propsのおさらい
```js
//App.js propsにカスタムプロパティを設定してアクセスする
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">TV Series List</h1>
        </header>
        //ここでカスタムプロパティを指定することでpropsでアクセスできる
        <Intro message="you can find all of youre most loved series" />
      </div>
    );
  }
}

//Introコンポーネント
import React from 'react';

const Intro = props => (
  <p className="App-intro">
    {props.message}
  </p>
)

export default Intro;

//こうすることでカスタムプロパティでpropsを渡して、Introコンポーネントでレンダリングできる
```

### stateとライフサイクルについて
```js


class App extends Component {
  //stateの設定
  state = {
    series : []
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">TV Series List</h1>
        </header>
        <Intro message="you can find all of youre most loved series" />
        The length of series array - {this.state.series.length}
      </div>
    );
  }
}

//ライフサイクル
class App extends Component {
  state = {
    series : []
  }

  componentDidMount(){
    const series = ["Vikings", "Game of thrones"];
    //setTimeoutで２秒後にthis.setStateで
    //const series = ["Vikings", "Game of thrones"];をstateの[series]の配列にsetをしている
    setTimeout( () => {
      this.setState({ series: series });
    }, 2000);
  }
  //こうすることでThe length of series array - {this.state.series.length}で設定した場所に２秒後にlengthなので何個あるかが表示される
```

### 非同期について
- `npm install whatwg-fetch --save`のライブラリをnpmでインストール

```js
src/components/App/index.js

import React, { Component } from 'react';
import Intro from '../Intro';
import './App.css';
//先ほどのnpmをインストール
import whatwg-fetch;

```

```js
//ライスフサイクルメソッドのcomponentDidMount()を使って描画とにレンダリング

componentDidMount(){
  //responseに取得できると200番になってconsole.log()でオブジェクトが取得できる
  fetch('http://api.tvmaze.com/search/shows?q=Vikings')
    .then((response) => { console.log(response) })
}

//JSONの取得
componentDidMount(){
  fetch('http://api.tvmaze.com/search/shows?q=Vikings')
    .then(response => response.json())
    .then(json => console.log(json))
}

//取得したJSONをsetStateでセットする
componentDidMount(){
  fetch('http://api.tvmaze.com/search/shows?q=Vikings')
    .then(response => response.json())
    .then(json => this.setState({ series: json}))
}
```
- この状態で最初にstateを宣言した配列の中にJSONが入ってきてsetStateされたものがレンダリングされる


### Containerについて
src/containers/Series/index.jsを作成

```js
import React, { Component } from 'react'


class Series extends Component{
  render() {
    return(
      <div>Series container</div>
    )
  }
}


export default Series;


//作ったコンポーネントをAppのindex.jsにインポート
import React, { Component } from 'react';
import Intro from '../Intro';
//ここでimport
import Series from '../../containers/Series';
import './App.css';
import 'whatwg-fetch';

//修正を加える Appコンポーネント
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">TV Series List</h1>
        </header>
        <Intro message="you can find all of youre most loved series" />
        //Seriesのコンポーネントにstateとライフサイクルをお引越ししてレンダリングg
        <Series />
      </div>
    );
  }
}




//Seriesコンポーネント
import React, { Component } from 'react'


class Series extends Component{
  state = {
    series: []
  }

  componentDidMount() {
    fetch('http://api.tvmaze.com/search/shows?q=Vikings')
      .then(response => response.json())
      .then(json => this.setState({ series: json }))
  }

  render() {
    return(
      <div>
        The length of series array - {this.state.series.length}
      </div>
    )
  }
}


export default Series;
```

- components/SerisList/index.jsを作成
- これをSeriesのコンポーネントにimport
```js
import React from 'react'

const SeriesList = (props) => {
  return (
    <div>Series List component</div>
  )
}


export default SeriesList;

//Seriesコンポーネントはこんな感じ
import React, { Component } from 'react';
import SeriesList from '../../components/SeriesList';

class Series extends Component{
  state = {
    series: []
  }

  componentDidMount() {
    fetch('http://api.tvmaze.com/search/shows?q=Vikings')
      .then(response => response.json())
      .then(json => this.setState({ series: json }))
  }

  render() {
    return(
      <div>
        The length of series array - {this.state.series.length}
        //ここで子コンポーネントにpropsでアクセスできるようにstateのseriesを渡す
        <SeriesList list={this.state.series} />
      </div>
    )
  }
}


export default Series;


//これを子コンポーネントでレンダリングするとpropsでアクセスできるので取得できる

const SeriesList = (props) => {
  return (
    <div>
     <ul>
      //mapメソッドでレンダリング
      //seriesのオブジェクトの中にアクセスして名前を表示させている
       {props.list.map(series => (
         <li>{series.show.name}</li>
       ))}
     </ul>
    </div>
  )
}

//これでapiの情報がレンダリングされて表示される
//ただし、reactの場合はkeyがないと怒られるので、mapするとき含めてkeyと紐づける
  <ul className="series-list">
    {props.list.map(series => (
      <li key={series.show.id}>{series.show.name}</li>
    ))}
  </ul>
```

### リファクタリング
```js

//functionコンポーネントで管理をもっと上手にする
const SeriesListItem = ({ series }) => (
  <li key={series.show.id}>{series.show.name}</li>
)

const SeriesList = (props) => {
  return (
    <div>
     <ul className="series-list">
       {props.list.map(series => (
         //ここで呼び出す
        <SeriesListItem series={series} 　key={series.show.id}/>
       ))}
     </ul>
    </div>
  )
}


```

## formのインプットによるイベント
- containers/Series/index.jsを編集
```js

//名前は好きなものでOKで　イベントを設定
onInputChange = e =>{
  console.log(e);
  console.log(e.target.value); 
}


//省略 inputタグを作ってonChangeイベントを紐づける
return(
  <div>
    The length of series array - {this.state.series.length}
    <div>
    //上で作成したeventをthis.xxxxで紐づける
      <input type="text" onChange={this.onInputChange} />
    </div>
    <SeriesList list={this.state.series} />
  </div>

//これでchangeイベントが繋がる
```
- changeイベントの修正(入力したinputの文字をapiに紐づける)
```js

  onInputChange = e =>{
    //jsの連結を使って紐づける`${e.target.value}`
    fetch(`http://api.tvmaze.com/search/shows?q=Viking${e.target.value}`)
      .then(response => response.json())
      .then(json => this.setState({ series: json }))
      //これで取れるので
      console.log(e.target.value); 
  }

//これによって入力したものが取得できるようになる
```

### 条件付きレンダリング
- apiの検索で表示できなかった（ヒットしなくて取得できないもの）場合の条件付きレンダリング
```js
import React, { Component } from 'react';
import SeriesList from '../../components/SeriesList';

class Series extends Component{
  state = {
    series: [],
    //state状態を保持する為に追加する
    seriesName: '',
    isFetching: false
  }

  onInputChange = e =>{
    //onChangeイベントの中でsetStateによってstateの状態を更新
    this.setState({ seriesName: e.target.value, isFetching: true});

    fetch(`http://api.tvmaze.com/search/shows?q=Viking${e.target.value}`)
      .then(response => response.json())
      //jsonが取得できた場合にisFetchingをfalseに更新して戻す
      .then(json => this.setState({ series: json , isFetching: false }));
      console.log(e.target.value); 
  }

  render() {
    //変数の中にstateを入れる
    const { series, seriesName, isFetching } = this.state;

    return(
      <div>
        <div>
          <input 
            value={seriesName}
            type="text" 
            onChange={this.onInputChange} />
        </div>
        //条件つきでレンダリング
        { 
          //trimメソッドで空白を削除
          series.length === 0 && seriesName.trim() === ''
          &&
          <p>Prease enter series name into the input</p>
        }
        {
          series.length === 0 && seriesName.trim() !== ''
          &&
          <p>No TV series have been found with this name</p>
        }
        {
          isFetching && <p>Loadding...</p>
        }
        {
          !isFetching && <SeriesList list={this.state.series} />
        }
      </div>
    )
  }
}


export default Series;

```


### Loaderを表示
- components/Loader/index.js
```js

import React from 'react'
import loaderSrc from '../../assets/a.gif';

const Loader = props => (
  <img
    alt="Loader icon"
    src={loaderSrc} />
);

export default Loader;

```

- containers/Seriesでimport
```js


import Loader from '../../components/Loader';

//条件付きの部分に埋め込み
  {
    !isFetching && series.length === 0 && seriesName.trim() !== ''
    &&
    <p>No TV series have been found with this name</p>
  }
  {
    isFetching && <Loader />
  }
  {
    !isFetching && <SeriesList list={this.state.series} />
  }

//これでfetchしているときの待機時間中にloadingがgifが表示される
```

### react-routerの設定
- `npm install --save react-router-dom`
```js

//ファイル直下のindex.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/index';
import registerServiceWorker from './registerServiceWorker';
//BrowserRouterをインポート
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render
  (
  //BrowserRouterでラップ
  <BrowserRouter>
    <App />
  </BrowserRouter>
    ,document.getElementById('root')
  );
registerServiceWorker();

```
- components/Main
```js
import React from 'react'
import { Switch, Router } from 'react-router-dom';
import Series from '../../containers/Series';

const Main = props =>(
  <Switch>
    <Router exact path="/" component={Series} />
  </Switch>
);

export default Main;


//Appを編集
import React, { Component } from 'react';
import Series from '../../containers/Series';
import Main from '../Main';
import './App.css';
import 'whatwg-fetch';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">TV Series List</h1>
        </header>
        //ここをメインに変更
        <Main />
      </div>
    );
  }
}

export default App;


```