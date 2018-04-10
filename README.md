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

```