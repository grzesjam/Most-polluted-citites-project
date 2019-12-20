import React, { Component, Suspense } from 'react';
import classes from './App.css';
import CityDescription from './Components/CityDescription/CityDescription'
import Spinner from './Components/UI/Spinner/Spinner'
import {BrowserRouter, Route} from 'react-router-dom';
const InputField = React.lazy(()=> import('./Containers/InputField/InputField'))

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className = {classes.App}>
        <Route path = "/" exact 
              render= {()=> (
                <Suspense fallback = {<Spinner />} >
                  <InputField />
                </Suspense>
              )}       
        />
        <Route path = "/description" 
        component = {CityDescription} 
        />
       </div>
      </BrowserRouter>
    
    

    );
  }

}

export default App;
