import React from 'react';
import "../content/login.css";
import { BASE_URL,LOGIN } from '../shared/service';

import { Link } from 'react-router-dom';


class Login extends React.Component {
        state = {
            isError: "",
            userRole: "",
            userName: "",
            isLoading: false
        }
        onSubmit = (e) => {
            let userObj = {
                email: e.target.userEmail.value,  
                password: e.target.userPassword.value
            };
            this.login(userObj);
        }

        login = (obj) => {
            this.setState({
                isLoading: true
            })
            fetch(`${BASE_URL}${LOGIN}`, {
                'method': "POST",
                'body': JSON.stringify(obj),
                'headers': new Headers({
                  "Content-Type": "application/json"
                })
              })
            .then( result => result.json())
            .then(result => {  
                this.setUserAction(result);
            })
            .catch()
        }
        setUserAction(result) {
            if (result.error_code === 400) {
              this.setState({
                isError: result.message,
                isLoading:false
              });
              //IS_AUTHENTICATED = false;
            } else {
                localStorage.setItem("userToken", result.authentication_token);
                localStorage.setItem("userName", result.person.display_name);
                localStorage.setItem("userType", result.person.role.key);
                //IS_AUTHENTICATED = true;
                // TODO:: create route for user type and  route based on user type as admim / user 
                this.setState({
                    isLoading: false
                });
                this.props.history.push("/welcome");
            }
          }
        componentDidMount(){
            this.setState({
                isLoading:false
            })
        }
          render(){
            return(
                <div className="login-page container">
                        
                        <div className="login-form">
                            <form action="void:(0)" method="post" onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label>User Email</label>
                                    <input name="userEmail" type="email" className="form-control" placeholder="user@email.com" required />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input name="userPassword" type="password" className="form-control" placeholder="Password" required />
                                </div>
                                
                                <button type="submit" className="btn btn-primary mr-1">Login
                                </button>
                                <Link to="/register" className="btn btn-secondary">Register</Link>
                                {(this.state.isLoading) ? <div className=" ml-5 spinner-border text-success" role="status"><span className="sr-only">Loading...</span></div> : "" }
                                
                                <Link to="/forget" className="mt-5 ml-5">Forgot Password ?</Link>

                            </form>
                            
                            {(this.state.isError.length > 0) ? <div className="notification alert alert-danger">{this.state.isError}</div> : "" }
                        </div>
                
                </div>
            );
        }
}
export default Login;