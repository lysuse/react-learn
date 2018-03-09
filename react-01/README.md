# React Getting Start(起步)

## JSX 语法

  JSX语法形式如下：
```JSX
const element = <h1>hello, world!</h1>
```
  虽然JSX语法形式看起来像HTML但是它却是字符串。
  JSX是JavaScript语法的扩展。在React中推荐使用它描述UI。JSX看起来想一个模板语言，但是它
  具体JavaScript的全部能力。

  React 提倡将松散耦合的UI逻辑和渲染逻辑进行天生的耦合:状态(state)如何随着时间变化，
  事件如何处理，数据如何准备和呈现。



## 渲染元素

    React渲染是调用的ReactDOM.rener()方法进行的
```js
const element = <h1>hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

  当然，更新Element也可以使用render方法，但是一般React只调用一次render方法，一般是在有状态的组件
  中更新element。
```js
function tick() {
  const element = (
    <div>
      <h1>hello,world</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  )
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
```

## 组件和属性
  组件让你的UI分割成相对独立的部分，可重用的片段，然后只考虑每一片段的实现。

### 组件的定义
  1. 函数式声明
```js
function Welcome(props) {
  return (<h1>Hello, {props.name}</h1>);
}
```
  2. ES6 class方式定义
```js
class Welcome extends React.Component {
  render() {
    return (<h1>Hello, {this.props.name}</h1>);
  }
}
```

### 属性是只读的
  组件的属性，不能再内部修改，必须保证是纯(pure)函数。

  **所有React组件必须扮演成一个像纯(pure)函数一样的功能，尊重他们的属性！**
  ```js
  function sum(a, b) {
    return a + b;
  }
  ```
    下面的函数修改了属性值，不是纯(pure)函数。
  ```js
  function withdraw(account, amount) {
    account.total -= amount;
  }
  ```
> 小提示：img的src，alt,a的href均不能加引号哦，src={this.props.avatarUrl}


## 状态和生命周期

### 状态初始化
  状态初始化通过constructor构造函数里进行初始化。
  ```js
  class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state =  {
        date: new Date()
      }
    }
  }
  ```

### 更改状态

  ```js
  this.setState({
    field: value
  })
  ```

### 组件的声明周期

  1. constructor

    父级元素render时首先调用组件的constructor,在客户端也在服务端。
  2. componentWillMount

    在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。 如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作(防止异部操作阻塞UI)。
  3. render

    render()方法应该是一个纯方法，即它不会修改组件的state，在每一次调用时返回同样的结果。它不直接和浏览器交互，如果我们想要交互，应该在componentDidMount()或者其他的生命周期函数里面。
  4. componentDidMount

     在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用。
  5. componentWillReceiveProps

    在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用。
  6. shouldComponentUpdate

    返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用。
    可以在你确认不需要更新组件时使用。
  7. componentWillUpdate

    在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。
  8. componentDidUpdate

    在组件完成更新后立即调用。在初始化时不会被调用。
  9. componentWillUnmount

    在组件从 DOM 中移除的时候立刻被调用。


## 事件处理
  注意事项：
  + React事件名称使用驼峰大小写，而不是小写。
  + 在JSX中传递一个function作为事件处理器，而不是string。

  HTML中的事件处理：
  ```html
  <button onclick="activateLasers()">
    Activate Lasers
  </button>
  ```
  React事件处理:

  ```jsx
  <button onClick={activateLasers}>
  Activate Lasers
  </button>
  ```

  另外React中不能返回false去阻止事件冒泡。React中阻止事件冒泡如下:

  ```js
  function ActionLink() {
    function handleClick(e) {
      e.preventDefault();
      console.log('The link was clicked.');
    }

    return (
      <a href="#" onClick={handleClick}>
        Click me
      </a>
    );
  }
  ```

  注意事件函数中this的指代，可以通过bind(this)解决。


## 条件渲染

  1. 定义单独的渲染函数，通过条件判断
  ```js
  function ComponentA(props) {
    if(props.show) {
      return (<div>this is a cat!</div>);
    }
    return (<div>guess animal?</div>);
  }
  ```

  2. render return前赋值到变量
  ```js
  class LoginCtrl extends React.Component {
    constructor(props) {
      super(props);
      this.state = {isLoggedIn: false};
    }

    render() {
      const isLoggedIn = this.state.isLoggedIn;

      let button = null;

      if(isLoggedIn) {
        button = <LogoutButton />;
      } else {
        button = <LoginButton />;
      }

      return (
        <div>
          <<h2>Welcome to our website !</h2>
          {button}
        </div>
      )
    }
  }
  ```
  3. render返回中内联逻辑判断
  ```js
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
      <div>
        {
          isLoggedIn ?
            (<LogoutButton />) : (<LoginButton />)
        }
      </div>
    )
  }
  ```
## Lists and Keys

    列表渲染可以是还有map函数，下面是map函数的基本用法：
    ```js
    const numbers = [1, 2, 3, 4, 5, 6];
    const doubled = numbers.map((number) => number * 2);
    console.log(doubled);
    ```

    + 渲染多个组件
    ```js
    const numbers = [1, 2, 3, 4, 5];
    const listItems = numbers.map((number) =>
      <li>{number}</li>
    );

    ReactDOM.render(
      <ul>{listItems}</ul>,
      document.getElementById('root')
    )
    ```
    + 数据作为属性提取
    ```js
    function NumberList(props) {
      const numbers = props.numbers;
      const listItems = numbers.map((number) => <li>{number}</li>);
      return (
        <ul>{listItems}</ul>
      );
    }
    ```
    >小数判断相等
    const floatEpsilon = Math.pow(2, -23);

    const equal = (a, b) => {
     return Math.abs(a - b) <= floatEpsilon * Math.max(Math.abs(a), Math.abs(b));
    }
    Key在循环遍历时指定
    ```js
    //通过可靠的，唯一的作为key
    const todoItems = todos.map((todo) => <li key={todo.id}>{todo.text}</li>);
    //id不确定，不稳定的情况下使用index
    const todoItems2 = todos.map((todo, index) => <li key={index}>{todo.text}</li>);
    //组件循环遍历
    function NumberList(props) {
      const numbers = props.numbers;
      return (
        <ul>
          {numbers.map((number) =>
            <ListItem key={number.toString()} value={number} />
          )}
        </ul>
      );
    }
    ```

## 表单(Forms)

      + 可控组件
      + 处理多输入框
      + input file类型的输入框需要参见不可控组件

      setState 会自动merge（合并）改变到当前状态

## 状态提升(Lifting State Up)

      通过将子组件的状态提升到父组件的State，提升复用和数据管理能力。

## 组合（Composition） 与 继承（Inhreitance）

    React 拥有一个强大的组合模型，我们建议使用组合而不是继承以实现代码的重用。

    使用 props(属性) 和 组合已经足够灵活来明确、安全的定制一个组件的外观和行为。切记，组件可以接受任意的 props(属性) ，包括原始值、React 元素，或者函数。

    如果要在组件之间重用非 U I功能，我们建议将其提取到单独的 JavaScript 模块中。组件可以导入它并使用该函数，对象或类，而不扩展它。
