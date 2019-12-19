import React, {Component}from 'react';
import classes from './Cities.css';
import Spinner from '../UI/Spinner/Spinner'
class Cities extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
            
            cities: [],
            isLoaded: false,
            
        }
    }
   
    componentWillReceiveProps(nextProps) {
     if(this.props.countryCode !== nextProps.countryCode)
     {
        this.setState({ cities: [] });
     }
    }
     shouldComponentUpdate(nextProps, nextState) {
     return this.state.cities.length === 0
    }

    

    componentDidUpdate() {
        fetch(`https://api.openaq.org/v1/measurements?country=${this.props.countryCode}&limit=10&order_by=value&sort=desc`)
        .then(res => {
            if (res.ok) {
              return res;
            }
            throw Error(res.status)
          })
          .then(res=> res.json())
          .then(data => {
            this.setState({
              cities: data.results,
              isLoaded: true
            })
          
          })
          .catch(error => console.log(error))

    }
    
   

  

    render() {
        
     
       const {isLoaded, cities} = this.state;
    let Info = null
      if(cities.length > 0)
      {
        Info = <p>To reset data change country and click two times a button</p>
      }
       if(!isLoaded)
       {
         return <Spinner />
       }
       
        return (
           <div className = {classes.Cities}>
             <ul>
               {cities.map(city => (
                 <li key = {city.value}>
                   {city.city}
                 </li>
               ))}
             </ul>
             {Info}
           </div>
        )
  
       

    }

}

export default Cities;