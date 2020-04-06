import React, { Fragment, useContext } from 'react'
import Axios from 'axios'
import Content from '../updateContext'

const CountryList = (props) => {
    const country = props.country
    return (
        <Fragment>
            <tr>
                <td>{country.title}</td>
                <td>{new Intl.NumberFormat().format(country.total_cases)}</td>
                <td>{new Intl.NumberFormat().format(country.total_recovered)}</td>
                <td>{new Intl.NumberFormat().format(country.total_active_cases)}</td>
                <td>{new Intl.NumberFormat().format(country.total_deaths)}</td>
                <td>{new Intl.NumberFormat().format(country.total_new_cases_today)}</td>
                <td>{new Intl.NumberFormat().format(country.total_new_deaths_today)}</td>
                <td>{new Intl.NumberFormat().format(country.total_serious_cases)}</td>
            </tr>
        </Fragment>
    )
}

export default class CoronaApp extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            coronaList: "",
            status: '',
            search:'',
            list: []
        }
    }
    componentDidMount(){
        let proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        let Url = "https://api.thevirustracker.com/free-api?countryTotals=ALL"

        fetch(proxyUrl + Url)
        .then(response => response.text())
        .then(result => {
            this.setState({
                coronaList:JSON.parse(result),
                status: 'online'
            })
        })
        .catch(() => {
            Axios.get("http://localhost:5000/corona/")
                .then(response => {
                    this.setState({
                        coronaList:response.data,
                        status: "offline"
                    })
                })
        })
    }
    onChangeSearch = (e) => {
        this.setState({
            list: [],
            search: e.target.value
        })
    }
    render(){
        if(this.state.coronaList.length != 0){
            if(this.state.search == ""){
                if (this.state.status != "offline") {
                    for (let i in this.state.coronaList.countryitems[0]){
                        if (this.state.coronaList.countryitems[0][i].title) {
                            this.state.list.push(this.state.coronaList.countryitems[0][i])
                        }
                    }
                    Axios.post("http://localhost:5000/corona/5e8ae945a3c59d24e7824341", this.state.coronaList)
                        .then(response => console.log(response.data))
                } else {
                    for (let i in this.state.coronaList[0].corona_data[0].countryitems[0]){
                        if (this.state.coronaList[0].corona_data[0].countryitems[0][i].title) {
                            this.state.list.push(this.state.coronaList[0].corona_data[0].countryitems[0][i])
                        }
                    }
                }
            } else {
                if (this.state.status != "offline") {
                    for (let i in this.state.coronaList.countryitems[0]){
                        if(this.state.coronaList.countryitems[0][i].title != undefined){
                            if(this.state.coronaList.countryitems[0][i].title.toLowerCase().includes(this.state.search.toLowerCase())){
                                this.state.list.push(this.state.coronaList.countryitems[0][i])
                            }
                        }  
                    }
                    Axios.post("http://localhost:5000/corona/5e8ae945a3c59d24e7824341", this.state.coronaList)
                        .then(response => console.log(response.data))
                } else {
                    for (let i in this.state.coronaList[0].corona_data[0].countryitems[0]){
                        if(this.state.coronaList[0].corona_data[0].countryitems[0][i].title != undefined){
                            if(this.state.coronaList[0].corona_data[0].countryitems[0][i].title.toLowerCase().includes(this.state.search.toLowerCase())){
                                this.state.list.push(this.state.coronaList[0].corona_data[0].countryitems[0][i])
                            }
                        }
                        
                    }
                }
            }
            return (
                <Fragment>
                    <div className="container mt-lg-3">
                        <p className="text-danger">CORONAVIRUS au monde entier</p>
                        <input 
                            type="text"
                            className="float-lg-right form-control w-25 sticky-top"
                            value={this.state.search}
                            placeholder="Rechercher un pays"
                            onChange={this.onChangeSearch}
                        />
                        <table className="table table-hover table-striped">
                            <thead>
                                <tr>
                                    <th>Pays</th>
                                    <th>Cas total</th>
                                    <th>Cas resolu</th>
                                    <th>Nombre de contaminé actuel</th>
                                    <th>Total des décés</th>
                                    <th>Nouveau cas aujourd'hui</th>
                                    <th>Nouveau décés aujourd'hui</th>
                                    <th>Cas grave</th>
                                </tr>
                            </thead>
                            <tbody className="bg-light text-center">
                                    {this.state.list.map( country => {
                                        return (
                                            <CountryList country={country}/>
                                        )
                                    })}
                            </tbody>
                        </table>
                    </div>
                </Fragment>
            )
        } else{
            return (
                <div className="container mt-lg-3">
                    Chargement des infos <i className="spinner-border" style={{width: "20px", height: "20px",border:"1px dashed grey"}}></i>
                </div>
            )
        }
    }
}