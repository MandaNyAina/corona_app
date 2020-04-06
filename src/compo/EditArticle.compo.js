import React, {Fragment, useState, useEffect} from 'react'

const EditArt = (props) => {
    const [title, setTitle] = useState("")
    const [descri, setDescri] = useState("")
    const getValue = () => {
        setTitle(props.articleTitle)
        setDescri(props.articleContent)
    }
    const saveChange = async(e) => {
        const newArticle = {
            "nom_article" : title,
            "description" : descri
        }
        console.log(newArticle)
        const save = await fetch("http://localhost:5000/article/edit/"+props.articleId, {
            method: "POST",
            headers: {"Content-type":"application/json"},
            body: JSON.stringify(newArticle)
        })
        window.location = "/detail/"+props.articleId
    }
    useEffect(() => {
        getValue()
    }, [])
    return (
        <Fragment>
            <button type="button" className="btn btn-outline-warning btn-sm" data-toggle="modal" data-target="#exampleModalCenter">
            Modifier l'article
            </button>

            <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">{title}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label>Titre</label>
                        <input 
                            type="text" 
                            value={title}
                            className="form-control"
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Contenu</label>
                        <textarea 
                            className="form-control"
                            value={descri}
                            style={{height: '200px'}}
                            onChange={e => setDescri(e.target.value)}
                        >
                        </textarea>
                    </div>
                    
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={saveChange}>Save changes</button>
                </div>
                </div>
            </div>
            </div>
        </Fragment>
    )
}
export default EditArt