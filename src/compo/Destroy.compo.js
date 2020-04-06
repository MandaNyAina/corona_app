import React from 'react'
import {delete_cookie} from 'sfcookies'
import { Redirect } from 'react-router-dom'

export default class Destroy extends React.Component{
    render(){
        delete_cookie("user_react_app")
        return (
            <Redirect to="/"/>
        )
    }
}

