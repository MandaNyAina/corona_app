import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery'
import 'bootstrap/dist/js/bootstrap'


import Authentification from './compo/Login.compo'
import App from './project'
import App_ from './project_'
import DestroyUser from './compo/Destroy.compo'
import ArticleDetail from './compo/ArticleDetail'
import Corona from './corona'
import SetUsers from './setUser'

export default class Auth extends React.Component{
        render(){
        return (
            <Router>
                <Route path="/" exact component={Authentification}/>
                <Route path="/article" component={App}/>
                <Route path="/detail/:id" component={ArticleDetail}/>
                <Route path="/add" component={App_}/>
                <Route path="/corona" component={Corona}/>
                <Route path="/set/:id" component={SetUsers}/>
                <Route path="/logout" component={DestroyUser}/>
            </Router>
        )
    }
}