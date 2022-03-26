import React, { Component } from 'react'
import axios from 'axios';

export default class DadFetch extends Component {
    static defaultProps = {
        max:10
    }
    constructor(props) {
        super(props);
        this.state={
            jokes: [],
        };
    }
    async componentDidMount() {
        let j=[];
        while(j.length<this.props.max)
        {
        let data=await axios.get('https://icanhazdadjoke.com/',{
            headers:
        {Accept: 'application/json'}
    });
        console.log(data.data.joke);
        j.push(data.data.joke); 
}
this.setState({jokes:j})
    }
  render() {
    return <div>
        {this.state.jokes.map(j=>{
            return <li>{j}</li>
        })}
    </div>
  }
}
