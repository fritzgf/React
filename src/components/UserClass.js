import React from "react";
class UserClass extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            
        };

    };
    
    render() {
        const {name, location} = this.props;
        const {count1} = this.state;
    
        return (
            <div className="userCard">
                <h2>Count 1: {count1}</h2>

               <button 
                onClick={ () =>{
                    this.setState(
                    {count1: this.state.count1 + 1,

                    });
                 }}>
                Increase button
               </button>
                <h2>Name: {name}</h2>
                <h3>Location:{location}</h3>
                <h2>Contact: john@gmail.com</h2>
            </div>
        );
    }

};
export default UserClass;