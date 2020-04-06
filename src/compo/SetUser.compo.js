import React, {Fragment, useState, useEffect} from 'react'
import { bake_cookie } from 'sfcookies'

const SetUser = (props) => {
    const [name, setName] =  useState("")
    const [username, setUsername] =  useState("")
    const [password, setPassword] =  useState("")
    const getUser = async() => {
        const response = await fetch("http://localhost:5000/user/"+props.match.params.id)
        const user = await response.json()
        setName(user.name)
        setUsername(user.username)
        setPassword(user.password)
    }
    const saveChanged = async(e) => {
        e.preventDefault()
        const newUserValue = await {
            name,
            username,
            password
        }
        const saveValue = await fetch("http://localhost:5000/user/set/"+props.match.params.id, {
            method: "POST",
            headers: {"Content-type":"application/json"},
            body: JSON.stringify(newUserValue)
        })
        bake_cookie("user_react_app", username)
        window.location = "/article"
    }
    useEffect(() => {
        getUser()
    }, [])
    return (
        <Fragment>
            <div className="container mt-lg-2">
                <form onSubmit={saveChanged }>
                    <div className="form-group">
                    <label>Nom</label>
                    <input 
                        type="text"
                        className="form-control w-50"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input 
                            type="text"
                            className="form-control w-50"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password"
                            className="form-control w-50"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success btn-sm">Enregistrer</button>
                </form>
                
            </div>
        </Fragment>
    )
}

export default SetUser