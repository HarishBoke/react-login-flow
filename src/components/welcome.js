import React from 'react';
import "../content/welcome.css";
import Header from './header';
class Welcome extends React.Component {
        state = {
            userName: localStorage.getItem("userName")
        }
        render(){
            return(
                <div className="welcome-page">
                        <Header userName={this.state.userName} />
                        <section>
                            Welcome {this.state.userName}
                        </section>
                </div>
            );
        }
}
export default Welcome;