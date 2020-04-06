import React, {Fragment} from 'react'
import {read_cookie} from 'sfcookies'

export default class AddArt extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title: '',
            description: ''
        }
    }
    onSubmit = async(e) => {
        e.preventDefault()
        const name = await fetch("http://localhost:5000/login/"+read_cookie("user_react_app"))
        const setName = await name.json()
        const articleSend = await {
            nom_article: this.state.title,
            description: this.state.description,
            auteur: setName.name
        }
        const save = await fetch("http://localhost:5000/article/add",
        {
            method: "POST",
            headers: {"Content-type":"application/json"},
            body: JSON.stringify(articleSend)
        })
        window.location = "/"
    }
    render(){
        return (
            <Fragment>
                <form className="mt-lg-3" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Titre de l'article</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="title"
                            value={this.state.title}
                            onChange={(e) => this.setState({title: e.target.value})}
                            placeholder="Titre de l'article"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Contenu de l'article</label>
                        <textarea 
                            className="form-control" 
                            id="content" 
                            placeholder="Contenu de l'article"
                            style={{height: '200px'}}
                            value={this.state.description}
                            onChange={(e) => this.setState({description: e.target.value})}
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-success">Publier</button>
                </form>
            </Fragment>
        );
    }
}