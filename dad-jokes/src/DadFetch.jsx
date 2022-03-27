import React, { Component } from 'react'
import axios from 'axios';
import './JokesList.css';
import Joke from './Joke'
import { v4 as uuidv4 } from 'uuid';
export default class DadFetch extends Component {
    static defaultProps = {
        max:10
    }
    constructor(props) {
        super(props);
        this.state={
            jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]") , 
            loading: false,
        };
        this.handleClick=this.handleClick.bind(this)
    }
    componentDidMount() {
        if(this.state.jokes.length ===0){
            this.getJokes();
        }

}
async getJokes() {
            let j=[];
        while(j.length<this.props.max)
        {
        let data=await axios.get('https://icanhazdadjoke.com/',{
            headers:
        {Accept: 'application/json'}
    });
        // console.log(data.data.joke);
        j.push({id: uuidv4() ,joke:data.data.joke,votes:0}); 
}
this.setState(oldState=>({
    loading:false,
    jokes: [...oldState.jokes,...j]
}),
()=> window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
)
}


    handleClick()
    {
        this.setState({loading: true},this.getJokes);
        
    
    }

    handleVotes(id,delta){
        this.setState(oldState=>({
            jokes: oldState.jokes.map(j=> j.id===id ? {...j, votes:j.votes + delta} : j)
        }),()=>{
        window.localStorage.setItem('jokes',JSON.stringify(this.state.jokes)) 
        })
    }

render() {
    if(this.state.loading) {
        return <div className="JokeList-spinner">
        <i className="far fa-8x fa-laugh fa-spin"/>
        <h1  className="JokeList-title">Loading...</h1>
        </div>
    }
    return <div className="JokeList">
    <div className="JokeList-sidebar">
        <h1><span>Dad </span>Jokes</h1>
        <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" alt="laughingEmoji"/>
        <button className="JokeList-getmore" onClick={this.handleClick}>New Jokes</button>
    </div>
    <div className="JokeList-jokes">
                {this.state.jokes.map(j=>{
            return <Joke key={j.id} joke={j.joke} votes={j.votes} upVote={()=>this.handleVotes(j.id,1)} downVote={()=>this.handleVotes(j.id,-1)}/>;
        })}
    </div>

    </div>
}
}
