
import User from "./User";
import UserClass from "./UserClass";
import React from "react";


class About extends React.Component {
    constructor(props) {
        super(props);

        this.state ={
            userInfo:{
                login: "bigo",
                
            }
        };
    };

    async componentDidMount() {
        const data = await fetch("https://api.github.com/users/fritzgf");
        const json = await data.json();
        this.setState(
            {
                userInfo: json,
            }
        )
        
        console.log(json);

    };
 
    render () { 
        const {login} = this.state.userInfo;
    return(
        <div> 
            <h1> About Us</h1>
            <h2> Login: {login}</h2>
        
            
            <UserClass name={"John (Class component)"} location={"Oak Harbor Washington"}/>
        </div>
    )}
};

export default About;