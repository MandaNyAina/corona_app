import React from 'react'
import {Redirect} from 'react-router-dom'
import {bake_cookie, read_cookie} from 'sfcookies'

import App from '../project'
import AddUser from './AddUser.compo'
import Axios from 'axios'

export default class LoginUser extends React.Component{
    constructor(props){
        super(props)
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.state = {
            username: '',
            password: '',
            etat: ''
        }
    }
    onSubmit = e => {
        e.preventDefault()
        Axios.get("http://localhost:5000/login/"+this.state.username+"/"+this.state.password)
            .then(response => {
                this.setState({etat: response.data})
            })   
    }
    onChangeUsername(e){
        this.setState({username:e.target.value})
    }
    onChangePassword(e){
        this.setState({password:e.target.value})
    }
    render(){
        const loginFormStyle = {
            border:'1px #a3a3a3 solid', 
            borderRadius: '10px', 
            boxSizing: "border-box",
            marginTop: "12%",
            boxShadow: "0px 1px 10px 0px #c9c9c9",
            width: "270px"
        }
        let cooks= read_cookie("user_react_app")
        if (cooks != ""){
            Axios.get("http://localhost:5000/login/"+cooks)
            .then(response => {
                this.setState({etat: response.data})
            })
            if (this.state.etat != "notExist") {
                return <Redirect to="/article"/>
            }
        }
        if (this.state.etat == "Ok"){
            bake_cookie("user_react_app", this.state.username)
            return <App/>
        }
        else{
            let errorForm= ""
            const erreurStyle = {
                height: '30px',
                padding: '2px'
            }
            if (this.state.etat == "CompteInvalide") {
                errorForm = <div className="w-25 mx-auto text-center alert alert-danger mt-lg-2" style={erreurStyle}>Compte invalide</div>
            } else if (this.state.etat == "PassInvalide"){
                errorForm = <div className="w-25 mx-auto text-center alert alert-danger mt-lg-2" style={erreurStyle}>Mot de passe incorrect</div>
            }
            return (
                <div className="container mt-md-5">
                    <form onSubmit={this.onSubmit}>
                        <div className="mx-auto pt-5 pb-2 pl-3 pr-3 " style={loginFormStyle}>
                            <div className="mt-xl-n4 mb-xl-4 text-center">
                                <h3>Connectez-vous</h3>
                            </div>
                            <div className="form-group">
                                <label>Username</label>
                                <input className="form-control" type="text" id="username" onChange={this.onChangeUsername} required/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input className="form-control" type="password" id="password" onChange={this.onChangePassword} required/>
                            </div>
                            <button className="btn btn-success w-100" type="submit">Connexion</button>
                            <div className="text-center mt-2">
                                <AddUser />
                            </div>
                        </div>
                    </form>
                    {errorForm}
                </div>  
            )
        }
    }
}