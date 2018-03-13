import React, { Component } from 'react';
import BlueDatePicker from './Jsx';
import PropTypeApp from './PropTypeApp';
import RefDomApp from './RefDomApp';
import NameForm from './UncontrolledComponent';
import HOCComp from './HOCApp';
// import SayHello from './NoEs6UseApp';
import Welcome2 from './Welcome';
import Goodbye from './Goodbye';

import './App.css';


function Pannel(props) {
  return (
    <div className="pannel">
      <div className="pannel-header" onClick={e => {props.clickHeader(props.index)}}>
        <h3>{props.title} <em>{props.showBody?'折叠':'展开'}</em></h3>
      </div>
      <div className="pannel-body" style={{display:(props.showBody?'block':'none')}}>
        {props.children}
      </div>
    </div>
  );
}

const HocApp = withSubscription(
  HOCComp,
  [
    {
      id: 1,
      name: 'Alibaba'
    },
    {
      id: 2,
      name: 'Tencent'
    },
    {
      id: 3,
      name: 'BaiDu'
    },
    {
      id: 4,
      name: 'Netease'
    },
    {
      id: 5,
      name: 'JD'
    }
  ]
);
//函数接收一个组件参数
function withSubscription(WrappedComponent, selectData) {
  //...返回另一个新组件
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData
      };
    }

    componentDidMount() {
      //...订阅数据...
    }

    componentWillUnmount() {
      //...释放资源，销毁
    }

    handleChange() {
      this.setState({
        data: (selectData || []).reverse()
      });
    }

    render() {
      //...使用最新的数据渲染组件
      // 此处将已有的props属性传递给原组件
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex : 0,
      total: 10
    };
    this.handleHeaderClick = this.handleHeaderClick.bind(this);
  }

  handleHeaderClick(index) {
    if(index === this.state.activeIndex) {
      this.setState({
        activeIndex:-1
      });
    } else {
      this.setState({
        activeIndex:index
      });
    }
  }

  componentWillMount() {
    localStorage.setItem('username', 'Jobs');
  }

  render() {
    return (
      <div className="App">
        <h2>React高级指引</h2>
        <Pannel title="JSX(深入JSX)" index={0} clickHeader={this.handleHeaderClick} showBody={this.state.activeIndex===0}>
          <BlueDatePicker />
        </Pannel>
        <Pannel title="PropTypes(PropTypes类型检查)" index={1} clickHeader={this.handleHeaderClick} showBody={this.state.activeIndex===1}>
          <PropTypeApp name="GitHub">
            <p>this is element in children!</p>
          </PropTypeApp>
        </Pannel>
        <Pannel title="Ref & DOM(引用和DOM)" index={2} clickHeader={this.handleHeaderClick} showBody={this.state.activeIndex===2}>
          <RefDomApp />
        </Pannel>
        <Pannel title="UnControlledComponent(非受控组件)" index={3} clickHeader={this.handleHeaderClick} showBody={this.state.activeIndex===3}>
          <NameForm />
        </Pannel>
        <Pannel title="NO ES6 (不使用ES6)" index={4} clickHeader={this.handleHeaderClick} showBody={this.state.activeIndex===4}>
          <p>需要安装create-react-class依赖</p>
        </Pannel>
        <Pannel title="HOC (高阶组件)" index={5} clickHeader={this.handleHeaderClick} showBody={this.state.activeIndex===5}>
          <HocApp />
          <Welcome2 />
          <Goodbye />
        </Pannel>
      </div>
    );
  }
}

export default App;
