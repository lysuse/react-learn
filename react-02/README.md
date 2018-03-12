# React 高级指引

## 深入JSX

  本质上来讲，JSX只是为React.createElement(component, props, ...children) 方法
  提供的语法糖。比如下面的代码:
  ```jsx
  <MyButton color="blue" shadowSize={2}>
  Click Me
  </MyButton>
  ```
  编译为:
  ```js
  React.createElement(
    MyButton,
    {color: 'blue', shadowSize: 2},
    'Click Me'
  )
  ```
  如果没有children，可以使用自闭和标签：
  ```html
  <div className="sidebar" />
  ```
  编译为：
  ```js
  React.createElement(
    'div',
    {className: 'sidebar'},
    null
  )
  ```

### 指定React元素类型

  JSX的标签名决定了React元素的类型。

  大写开头的JSX标签标示一个React组件。

#### React必须声明
  由于JSX编译后会调用React.createElement方法，所以在你的JSX代码中必须先声明React变量。

  比如，下面的两个都是必须导入的。尽管React和CustomButton都没有在代码中直接调用。
  ```js
  import React from 'react';
  import CustomButton from './CustomButton';

  function WarningButton() {
    return <CustomButton color="red" />;
  }

  ```
#### 点表示法

  直接看如下代码:
  ```js
  import React from 'react';
  const MyComponents = {
    DatePicker: DatePicker(props) {
      return <div>Image a {props.color} datepicker here.</div>;
    }
  }

  function BlueDatePicker() {
    return <MyComponents.DatePicker color="blue" />;
  }


  ```

#### 首字母大写

  当元素类型以小子字母开头时，他表示一个内置组件，如 <div> 或 <span>，并将字符串 'div'
  或 'span' 传递给React.createElement。以大写字母开头的类型，如<Foo /> 编译为React.
  createElement(Foo)，它正对应你在JavaScript文件中定义或导入的组件。

  建议用大写开头命名组件。
  ```js
  //错误
  function hello(props) {
    return <div>Hello {props.toWhat}</div>;
  }
  //正确
  function Hello(props) {
    return <div>Hello {props.toWhat}</div>;
  }

  function HelloWorld() {
    return <Hello toWhat="world" />;
  }
  ```
#### 运行时选择类型

  ```js
  import React from 'react';
  import { PhotoStory, VideoStory } from './stories';

  const components = {
    photo: PhotoStory,
    video: VideoStory
  };

  function Story(props) {
    // 正确！JSX 标签名可以为大写开头的变量。
    const SpecificStory = components[props.storyType];
    return <SpecificStory story={props.story} />;
  }
  ```

### 属性
  在JSX中有几种不同的方式来指定属性。

#### 使用JavaScript表达式

  ```js
  <MyComponent foo={1 + 2 + 3 + 4} />

  ```

#### 字符串常量

  下面两个JSX表达式是等价的：
  ```js
  <MyComponent message="hello world" />
  <MyComponent message={hello world} />
  ```

#### 默认为True

  下面两个JSX表达式是等价的：
  ```js
  <MyTextBox autocomplete />
  <MyTextBox autocomplete={true} />
  ```

#### 扩展属性

  使用 ... 作为扩展符来传递整个属性对象。

  ```js
  function App1() {
    return <Greeting firstName="Ben" lastName="Hector" />;
  }

  function App2() {
    const props = {firstName: 'Ben', lastName: 'Hector'};
    return <Greeting {...props} />;
  }
  ```


### JSX 的 Children

  JSX有以下几种方式来传递Children:

#### 字符串常量
  ```JSX
  <div>Hello World</div>
  ```
#### JSX
  ```JSX
  <MyContainer>
    <MyFirstComponent />
    <MySecondComponent />
  </MyContainer>

  render() {
    //不需要额外的元素包裹数组中的元素
    return [
      <li key="A">First item</li>,
      <li key="B">Second item</li>,
      <li key="C">Third item</li>,
    ]
  }
  ```
#### JavaScript表达式
    ```js
    <MyComponent>foo</MyComponent>
    <MyComponent>{'foo'}</MyComponent>

    function Item(props) {
      return <li>{props.message}</li>;
    }

    function TodoList() {
      const todos = ['finish doc', 'submit pr', 'nag dan to review'];
      return (
        <ul>
          {todos.map((message) => <Item key={message} message={message} />)}
        </ul>
      );
    }
    ```
#### 函数
  通常情况下，插入 JSX 中的 JavsScript 表达式将被认作字符串、React 元素或这些内容的列表。然而，props.children 可以像其它属性一样传递任何数据，而不仅仅是 React 元素。例如，如果你使用自定义组件，则可以将调用 props.children 来获得传递的子代：
  ```js
  function Repeat(props) {
    let items = [];
    for (let i = 0; i < props.numTimes; i++) {
      items.push(props.children(i));
    }
    return <div>{items}</div>;
  }

  function ListOfTenThings() {
    return (
      <Repeat numTimes={10}>
        {(index) => <div key={index}>This is item {index} in the list</div>}
      </Repeat>
    );
  }
  ```

#### bool, Null和Undefined被忽略

  false, null, undefined 和true都是有效的children，不会直接被渲染，下面的表达式是等价的：

  ```JSX
  <div />

  <div></div>

  <div>{false}</div>

  <div>{null}</div>

  <div>{undefined}</div>

  <div>{true}</div>
  ```
  可以使用这些来做条件渲染：
  ```JSX
  <div>
    {showHeader && <Header />}
    <Content />
  </div>
  ```

  ```JSX
  <div>
    {props.messages.length > 0 &&
      <MessageList messages={props.messages}} />
  </div>
  ```
## 使用PropTypes检查类型



## 静态类型检查

## Refs & DOM

## 非受控组件

## 性能优化

## 不使用ES6

## 不使用JSX
