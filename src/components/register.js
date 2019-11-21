import React from 'react';
import "../content/login.css";
//import "../content/register.css";
import { BASE_URL, REGISTRATION, PASS_VALIDATION } from '../shared/service';

import { Link } from 'react-router-dom';





class Register extends React.Component {
        state = {
            isError: "",
            isLoading: false,
            passValidation: ""
        }
        
        onSubmit = (e) => {
            //TODO:: check strong password from this.state.passValidation
            if(Object.is(e.target.userPassword.value, e.target.userConfirmPassword.value)){
                let userObj = {
                    display_name: e.target.userName.value,
                    email: e.target.userEmail.value,  
                    password: e.target.userPassword.value,
                };
                this.register(userObj);
            }
            else {
                this.setState({
                    isError: "Both Passwords Does not Match! Please enter same passwords!"
                })
            }
            // TODO:: Password regex for storng password
            
        }

        register = (obj) => {               
            this.setState({
                isLoading: true
            })
            fetch(`${BASE_URL}${REGISTRATION}`, {
              'method': "POST",
              'body': JSON.stringify(obj),
              'headers': new Headers({
                "Content-Type": "application/json"
              })
            })
            .then( result => {
                return result.json();
            })
            .then(result =>{
                //TODO: use result to store details
               this.registerUser(result);
            })
            .catch(err => console.error(err));
        }
        registerUser(result) {
            if (result.error_code === 400) {
                this.setState({
                isError: result.message,
                isLoading: false
                });
            } else {
                this.setState({
                    isLoading: false
                });
                this.props.history.push("/login");
            }
        }
        getPasswordFormat() {
            fetch(`${BASE_URL}${PASS_VALIDATION}`, {
              method: "GET",
              headers: new Headers({
                "Content-Type": "application/json"
              })
            })
              .then(response => {
                return response.json();
              })
              .then(result => {
                let expectedPass = "";
                for (let [key, value] of Object.entries(result)) {
                    expectedPass += `${key}: ${value}\n`;
                }
        
                this.setState({
                    isError: "",
                  passValidation: expectedPass
                });
              })
              .catch(error => {});
          }
        componentDidMount(){
            this.getPasswordFormat();
            this.setState({
                isLoading:false
            })
        }
        render(){
            return(
                <div className="register-page container">
                        
                        <div className="login-form">
                            <form action="void:(0)" method="post" onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label>User Name</label>
                                    <input name="userName" type="text" className="form-control" placeholder="User Name" required />
                                </div>
                                <div className="form-group">
                                    <label>User Email</label>
                                    <input name="userEmail" type="email" className="form-control" placeholder="user@email.com" required />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input name="userPassword" type="password" className="form-control" placeholder="Password" required />
                                </div>
                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <input name="userConfirmPassword" type="password" className="form-control" placeholder="Confirm Password" required />
                                </div>
                                
                                <Link to="/login" className="btn btn-secondary mr-1">Login</Link>
                                <button type="submit" className="btn btn-primary ">Register</button>
                                {(this.state.isLoading) ? <div className=" ml-5 spinner-border text-success" role="status"><span className="sr-only">Loading...</span></div> : "" }

                                <Link to="/forget" className="mt-5 ml-5">Forgot Password ?</Link>

                                
                            </form>
                            {(this.state.isError.length > 0) ? <div className="notification alert alert-danger">{this.state.isError}</div> : "" }
                        </div>
                
                </div>
            );
        }
}
export default Register;