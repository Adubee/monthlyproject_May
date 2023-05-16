import { Component } from "react";
import './App.css'
import { v4 as uuidV4 } from "uuid"


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: 'John',
      loaded: false,
      count: 0
    }
  }

  componentDidMount() {
    const API_URL = 'https://restcountries.com/v3.1/all?fields=name,population,flags,languages'
    fetch(API_URL)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        // console.log(data)
        this.setState({data:data, loaded:true})
      })
      .catch((error) => {
        console.log(error)
      })
    // console.log(uuidV4())
  }

  changeCountry = () => {
    const number = Math.floor(Math.random() * 249)
    this.setState({count:number})
 }



  render() {
    let country
    if(this.state.loaded){
        country = this.state.data.map(({flags, languages, name, population })=> {
          let seperateLanguages = []
          for(const [key,value] of Object.entries(languages)){
            seperateLanguages.push(value)
          }
          return (
            <div key={uuidV4()}>
              <div className="img-container">
                <img src={flags.svg} alt={flags.alt} />
              </div>
              <h1 className="country-name">{name.common}</h1>
              <h2>Languages: <span>{seperateLanguages.join(', ')}</span></h2>
              <h2>Population: <span>{population.toLocaleString()}</span> </h2>
            </div>
          )
       })
    }
    else {
      return (
        <div className="center">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
      )
    }

    return (
      <div className="container">
        <div >{country[this.state.count]}</div>
        <button onClick={this.changeCountry}>Change Country</button>
      </div>
    )
  }
}


export default App