
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                number : "",
            }],
            result: 0,
        };
    }
    clickHandler(e){
        const history = this.state.history;
        const current = history[history.length - 1];
        let num = e.target.value;
        //console.log(e.target.value);
        //console.log(current);
        //console.log(history);

        let result = '';
        if( num == 0   ){
            result = 0;
            this.setState({result : result});
        } else {
            for(let key in history){
                result += history[key].number;
            }
            result += num;
            this.setState({
                history: history.concat([{
                    number: num,
                }]),
                result : result,
            });
        }

    }
    render() {
       return (
            <div className="container">
                <div className="result">{this.state.result}</div>
                <div className="board-row">
                    <button className="square">AC</button>
                    <button className="square">+/-</button>
                    <button className="square">%</button>
                    <button className="square">÷</button>
                </div>
                <div className="board-row">
                    <button className="square" value="7" onClick={this.clickHandler.bind(this)}>7</button>
                    <button className="square" value="8" onClick={this.clickHandler.bind(this)}>8</button>
                    <button className="square" value="9" onClick={this.clickHandler.bind(this)}>9</button>
                    <button className="square">×</button>
                </div>
                <div className="board-row">
                    <button className="square" value="4" onClick={this.clickHandler.bind(this)}>4</button>
                    <button className="square" value="5" onClick={this.clickHandler.bind(this)}>5</button>
                    <button className="square" value="6" onClick={this.clickHandler.bind(this)}>6</button>
                    <button className="square">-</button>
                </div>
                <div className="board-row">
                    <button className="square" value="1" onClick={this.clickHandler.bind(this)}>1</button>
                    <button className="square" value="2" onClick={this.clickHandler.bind(this)}>2</button>
                    <button className="square" value="3" onClick={this.clickHandler.bind(this)}>3</button>
                    <button className="square">+</button>
                </div>
                <div className="board-row">
                    <button className="square zero" value="0" onClick={this.clickHandler.bind(this)}>0</button>
                    <button className="square">.</button>
                    <button className="square">=</button>
                </div>
            </div>
        );
    }
}

class Main extends React.Component {
   render() {
       return (
            <Board />
        );
    }
}

// =====================================
ReactDOM.render(
    <Main />,
    document.getElementById('root')
);

