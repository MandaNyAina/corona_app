import React, {Fragment} from 'react'
import Navbar from './Navbar.compo'
import moment from './Moment.compo'
import Axios from 'axios'
import {read_cookie} from 'sfcookies'
import EditArt from './EditArticle.compo'
import RmArt from './DeleteArticle.compo'

let listCommentaire = []
export default class ArtDetail extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            articles:'',
            comment:'',
            name: ''
        }
    }
    componentDidMount(){
        this.getArticle()
        Axios.get("http://localhost:5000/login/"+read_cookie("user_react_app"))
            .then(response => this.setState({name: response.data.name}))
    }
    getArticle = async() => {
        const articleValue =  await fetch("http://localhost:5000/article/"+this.props.match.params.id)
        const articles = await articleValue.json()
        this.setState({articles})
    }
    setComments = (e) => {
        e.preventDefault()
        let now = new Date()
        let commentaires = {
            "user": this.state.name,
            "content": this.state.comment,
            "date": now
        }
        listCommentaire.push(commentaires) 
        Axios.post("http://localhost:5000/article/"+this.props.match.params.id, listCommentaire)
            .then(response => console.log(response.data))
        this.setState({comment:''})
    }
    render(){
        let {_id, nom_article, description, auteur, createdAt, commentaires} = this.state.articles
        let nbr_coms = 0
        let editForm = ""
        let deleteForm
        if (commentaires == undefined) {
            commentaires= []
        } else {
            listCommentaire = commentaires
            nbr_coms= listCommentaire.length
        }
        if(auteur == this.state.name){
            auteur= "vous"
            editForm = <EditArt articleTitle={nom_article} articleContent={description} articleId={_id}/>
            deleteForm= <RmArt articleId={_id}/>
        }
        return (
            <Fragment>
                <Navbar/>
                <div className="container mt-lg-2" style={{whiteSpace: "pre-wrap"}}>
                    <h3>{nom_article}</h3>
                    <p>{description}</p>
                    <p>Publié par {auteur} ({moment(createdAt).fromNow()}) {editForm} {deleteForm}</p>
                    <b><p>Commentaires ({nbr_coms})</p></b>
                    <table className="table table-hover table-borderless table-striped">
                    <tbody>
                    {commentaires.map(comment => {
                        return (
                            <Fragment>
                                <tr><td>
                                    <p><u>Utilisateur : {comment.user} (Publié {moment(comment.date).fromNow()})</u></p>
                                    <p>{comment.content}</p>
                                </td></tr>
                            </Fragment>
                        )
                    })}
                    </tbody>
                    </table> 
                    <form onSubmit={this.setComments}>
                        <textarea 
                            type="text"
                            className="w-50 form-control"
                            placeholder="Votre commentaire"
                            style={{height: '100px'}}
                            value={this.state.comment}
                            onChange={(e) => this.setState({comment:e.target.value})}
                            required
                        ></textarea>
                        <button 
                            type="submit" 
                            className="mt-2 mb-2 btn btn-success"
                        >Commenter</button>
                    </form>
                </div>
            </Fragment>
            
        )
    }
}