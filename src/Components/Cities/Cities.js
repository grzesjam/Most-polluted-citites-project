import React, {Component}from 'react';
// import Aux from '../../hoc/Plik/Plik'

class Cities extends Component {

    
    constructor(props) {

        super(props);

        this.state = {
            items: [],
            isLoaded: false
        }

    }

    componentDidMount() {

        fetch('https://api.openaq.org/v1/cities?limit=10')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    items: json,
                    isLoaded: true, 

                })
                console.log(json)
            }).catch((err) => {
                console.log(err);
            });

    }

   
    render() {

        const { isLoaded, items } = this.state;

        if (!isLoaded)
            return <div>Loading...</div>;

        return (
            
                 <div className="App">
                <ul>
                    {items.map(item => (
                         <li key={item.name}>
                        Coutry: {item.country}
                      </li>
                    ))}
                       
                   
                </ul>
            </div>
            
           
        );

    }

}

export default Cities;