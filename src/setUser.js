import React from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import { read_cookie} from 'sfcookies'

import Navbar from './compo/Navbar.compo'
import ListArticle from './compo/ListArticle.compo'
import AddArticle from './compo/AddArticle.compo'
import SetUser from './compo/SetUser.compo'
import CoronaApp from './compo/Corona.compo'

class SetUsers extends React.Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }
    render(){
        let cooks= read_cookie("user_react_app")
        if (cooks == ""){
            return <Redirect to="/"/>
        }
        return (
            <Router>
                <Navbar/>
                <div className="container">
                    <Route path="/article" component={ListArticle} />
                    <Route path="/corona" component={CoronaApp}/>
                    <Route path="/set/:id" component={SetUser}/>
                    <Route path="/add" component={AddArticle}/>
                </div>
            </Router>
        );
    }
}

export default SetUsers