import React from 'react'
import Axios from 'axios'

const RmArt = props => {
    const deleteArticle = async() => {
        Axios.delete("http://localhost:5000/article/delete/"+props.articleId)
        window.location = "/article"
    }
    return <button className="btn btn-outline-danger btn-sm" onClick={deleteArticle}>Supprimer l'article</button>
}

export default RmArt