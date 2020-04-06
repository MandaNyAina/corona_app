import React, { useState, Fragment } from 'react'
import { Redirect } from 'react-router'


const AddUser = () => {
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const onSubmit = async(e) => {
        e.preventDefault()
        const newUser = await {
            "name": name,
            "username": username,
            "password": password
        }
        const save = await fetch("http://localhost:5000/user/add",{
            method: "POST",
            headers: {"Content-type":"application/json"},
            body: JSON.stringify(newUser)
        })
        window.location = "/"
    }
    return(
        <Fragment>
            <button type="button" className="btn btn-link" data-toggle="modal" data-target="#exampleModal">
                Crée un compte
            </button>

            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="w-25 modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content bg-dark text-light" style={{opacity: "0.9"}}>
                    <div className="modal-body text-left">
                        <h4 className="text-center">Crée votre compte gratuitement</h4>
                        <div className="form-group">
                            <label>Votre nom</label>
                            <input 
                                type="text"
                                placeholder="Entrer votre nom"
                                className="form-control bg-dark text-light"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Votre nom d'utilsateur</label>
                            <input 
                                type="text"
                                placeholder="Entrer votre nom d'utilisateur"
                                className="form-control bg-dark text-light"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Votre mot de passe</label>
                            <input 
                                type="password"
                                placeholder="Entrer votre mot de passe"
                                className="form-control bg-dark text-light"
                                value={password}
                                onChange={e => setPassword(e.target.value)} 
                            />
                        </div>
                        <div className="text-center">
                            <button className="btn btn-secondary btn-sm" data-dismiss="modal">Annuler</button>{"\t"}
                            <button type="submit" className="btn btn-success btn-sm" onClick={onSubmit}>Ajouter</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </Fragment>
    )
}

export default AddUser