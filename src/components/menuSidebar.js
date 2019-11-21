
import { React } from 'react';
class SlidingMenu extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
      return(
        <div className={"sliding-menu animated " + this.props.slideClass}>
          <button type="button" onClick={this.props.onClick}>
            <span className="glyphicon glyphicon-arrow-left"></span>
          </button>
          {this.props.children}
        </div>
      );
    }
  }
  
  class App extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        toggleMenu: false
      }
      this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
      console.log(this.state.toggleMenu);
      this.setState({toggleMenu: !this.state.toggleMenu});
    }
    
    render(){
      let slideClass;
      this.state.toggleMenu
        ? slideClass = 'slideInLeft slide-menu'
        : slideClass = 'slideInRight';
      
      return(
        <div className="main-container">
          <button type="button" onClick={this.handleClick}>
            <span className="glyphicon glyphicon-menu-hamburger"></span>
          </button>
          <SlidingMenu slideClass={slideClass} onClick={this.handleClick}>
            <span className="glyphicon glyphicon-home"></span>
            <span className="glyphicon glyphicon-cloud-download"></span>
            <span className="glyphicon glyphicon-trash"></span>
            <span className="glyphicon glyphicon-upload"></span>
          </SlidingMenu>
        </div>
      );
    }
  }
  
  const element = <h1>Welcome</h1>;
  ReactDOM.render(<App />, document.getElementById("root"));