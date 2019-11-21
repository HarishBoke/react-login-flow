import React from 'react';
import "../content/welcome.css";


class Header extends React.Component {
        state = {
            userName: this.props.userName,
            DP:""
        }
        sliderStyle = {
            display: "none"
        }
        createDisplyName = (str) => {
            if (str) return str.toUpperCase().slice(0, 2);
            else return "";
        }
        openSidebar() {
            this.refs.profileSlider.style.display = "block";

        }
        componentDidMount(){
            //console.log('DP',this.createDisplyName(this.state.userName));
            this.setState({
                DP: this.createDisplyName(this.state.userName)
            });
        }
        
        render(){
            return(
                <div className="header-page">
                     <div className="userAvatar" onClick={this.openSidebar}>
                        {this.state.DP}
                     </div>
                     {/* SlidingMenu */}
                     {/* TODP: create componet for slider */}
                     <aside className="sidebar" ref="profileSlider" style={this.sliderStyle}>

                     </aside>
                     {/* <img src="avatar.png" alt="Avatar" className="avatar" /> */}
                </div>
            );
        }
}
export default Header;