import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import queryString from 'query-string';
import classes from './CityDescription.css'

class CityDescription extends Component {

    state = {
        results: ''
    }
    componentDidMount() {
   const values =queryString.parse(this.props.location.search);
   const URL = `http://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exlimit=max&explaintext&exintro&list=search&srsearch=${values.cityName}&origin=*`;

      fetch(URL)
      .then(res=> res.json())
      .then(json => {
        
          this.setState({results: json.query.search[0]})
    
      })
      .catch(err => console.log(err))
    }
    render() {

        const {results} =this.state;
        
        return(
            
                
            <div className = {classes.Cities}>
            <h1>City Description</h1>
               <p dangerouslySetInnerHTML={{ __html: results.snippet}} /> 
               
               <Link
                to = "/"
                className = {classes.Link}
               >Back to Home Page</Link>
             </div>
         
           
              
        )
            
            
    }
}
export default CityDescription