import React, {useState, useEffect, Fragment, useContext} from 'react'
import Content from '../updateContext'
import moment from './Moment.compo'

const Article = () => {
    const article =  useContext(Content)
    let date = moment(article.createdAt).fromNow()
    return (
        <Fragment>
            <h3><a href={"/detail/"+article._id}>{article.nom_article}</a></h3>
            <u><p style={{fontSize: "14px"}}>Auteur : {article.auteur} (Publié {date})</p></u>
            <p>{article.description.substring(0,300)} (...)</p>
            <hr/>
            <a href={"/detail/"+article._id} className="btn btn-primary btn-sm m-3 mb-5">Lire la suite</a>
        </Fragment>
    )
}

const ListArt = () => {
    const [listof, setListof] = useState([])
    const getList = async() => {
        try {
            const response = await fetch("http://localhost:5000/article")
            const List = await response.json()
            setListof(List)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        getList()
    }, [])

    return (
        <div className="mt-lg-2" style={{whiteSpace: "pre-wrap"}}>
            {listof.map(article =>  (
                <Content.Provider value={article}>
                    <Article />
                </Content.Provider>
            ))}
        </div>
    )
}

export default ListArt