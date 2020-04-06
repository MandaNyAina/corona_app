import React from 'react'
import {BrowserRouter as Router, Link} from 'react-router-dom'
import {read_cookie} from 'sfcookies'
import Axios from 'axios'

class Navbar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            acc_active: '',
            create_active: '',
            data: [],
            link: ''
        }
    }
    componentDidMount(){
        const response = Axios.get("http://localhost:5000/login/"+read_cookie("user_react_app"))
            .then(response => this.setState({data:response.data}))
    }
    render(){
        return (
            <div className="sticky-top">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link to="/article" className="navbar-brand" href="#">Project</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor02">
                        <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/article" className="nav-link" href="#">Article</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/add" className="nav-link" href="#">Cree un article</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/corona" className="nav-link" href="#">Coronavirus info</Link>
                        </li>
                        </ul>
                        <div className="my-2 my-lg-0">
                            <button className="btn btn-outline-light btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.state.data.name}</button>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                <a href={"/set/"+this.state.data.idUser} className="dropdown-item">Parametre compte</a>
                                <a href="/logout" className="dropdown-item">Deconnection</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar