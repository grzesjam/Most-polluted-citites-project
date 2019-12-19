import React, {Component} from 'react';
import Aux from '../../hoc/Plik/Plik'
import classes from "./InputField.css"
import Cities from '../../Components/Cities/Cities'

class InputField extends Component{
    constructor (props) {
        super(props);
        this.items = [
            'Poland',
            'France',
            'Germany',
            'Spain',
        ];
        this.state = {
         suggestions: [],
         text: '',
         validation: {
             required: true
         },
         valid: true,
         countryCode : '',
        };
      
    }
    componentWillMount() {
        localStorage.getItem('text') && this.setState({
            text: JSON.parse(localStorage.getItem('text'))
        })
    }

    componentWillUpdate(nextProps, nextState)
    {
        localStorage.setItem('text', JSON.stringify(nextState.text))
    }

     checkValidity(value, rules) {
         let isValid = true
        
         if(rules.required)
         {
         isValid = value.trim();
         isValid !== '' ? isValid = true : isValid = false;
         }


        const ValidItem = [...this.items];

        isValid = ValidItem.includes(value.trim()) && isValid;
         return isValid;
     }

     
    onTextChanged = (e) => {
        
        const Updatedvalue = {
            ...this.state
        }
        Updatedvalue.text = e.target.value;
       
        console.log(Updatedvalue.text)
        let suggestions = [];
        if(Updatedvalue.text.length > 0) {
        const regex = new RegExp(`^${Updatedvalue.text }`, 'i');
        suggestions = this.items.sort().filter(v => regex.test(v));
        }
            this.setState(()=> ({ suggestions, text: Updatedvalue.text , valid: this.checkValidity(Updatedvalue.text, Updatedvalue.validation)}))
        }
       suggestionSelected(value) {
           this.setState(()=>({
               text:value,
               suggestions: [],
           }))
       }

    renderSuggestions() {
        const {suggestions} = this.state;
        if(suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions.map((item)=> <li onClick = {()=> this.suggestionSelected(item)}
                >{item}</li>)}
            </ul>
        )
    }
    onCodeChange = () => {

        switch (this.state.text) {
            case('Poland'): 
            this.setState({countryCode: "PL"})
            break;
            case('Germany'):
            this.setState({countryCode: "DE"})
            break;
            case('Spain'):
            this.setState({countryCode: "ES"})
            break;
            case('France'):
            this.setState({countryCode: "FR"})
            break;
            default:
                this.setState({contryCode: ''})
        
        }
       }

    
     render()
    {
      console.log(this.state.countryCode)

          let validationError = null;
        if(!this.state.valid) {
            validationError = <p className = {classes.ValidationError}>Please enter a valid value!</p>
        }
       
           const inputClasses = [classes.InputField];
            if(!this.state.valid)
            {
                inputClasses.push(classes.Invalid)
            }


            
        const {text} = this.state;
   
    console.log(this.state)
        return (
            <Aux>
                
                <div className = {classes.container}>
                <h1>Search for 10 most polluted cities in your country</h1>
                <input
                value = {text}
                onChange =  {this.onTextChanged} 
                type="text"
                placeholder= "Enter Country" 
                className = {inputClasses.join(' ')} 
                />
                <button 
                className = {classes.Button}
                onClick = {this.onCodeChange}
                disabled = {!this.state.valid}
                 > See your result</button>
               {this.renderSuggestions()}
              {validationError}
              
                </div>
              
                <Cities countryCode = {this.state.countryCode} />
            </Aux>
            
        )
    }
}

export default InputField;