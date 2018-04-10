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