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
        //Seriesのコンポーネントにstateとライフサイクルをお引越ししてレンダリング
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