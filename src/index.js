
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
            tmp: 0,
            operator: null,
        };
    }
    clickHandler(e){
        const history = this.state.history;
        const current = history[history.length - 1];
        const operator = this.state.operator;
        let num = e.target.value;
        //console.log(e.target.value);
        //console.log(current);
        //console.log(history);

        // controle dot
        if(num == '.' && history.length == 1  ){
            return;
        }

            let result = '';
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
    // get operator
    clickOperator(e){
        const history = this.state.history;
        const result = this.state.result;
        let operator = e.target.getAttribute('data-operator');
        this.setState({
            history: [{
                number : "",
            }],
            tmp: result,
            operator : operator,
            result : "",
        });
        console.log(this.state);
    }
    // calculate
    clickEqual(){
        let tmp = this.state.tmp;
        let operator = this.state.operator;
        let result = this.state.result;
        console.log(tmp);
        console.log(result);
        let sum;
        switch(operator){
            case 'plus':
                sum = parseFloat(tmp) + parseFloat(result);
            break;
            case 'minus':
                sum = parseFloat(tmp) - parseFloat(result);
            break;
            case 'times':
                sum = parseFloat(tmp) * parseFloat(result);
            break;
            case 'divided':
                sum = parseFloat(tmp) / parseFloat(result);
            break;
        }
        this.setState({
            tmp:0,
            operator : null,
            result : sum,
        });

    }
    // calculate percent
    clickPercent(e){
        let tmp = this.state.tmp;
        let result = this.state.result;
        let sum = parseFloat(result) / 100;
        this.setState({
            tmp:0,
            operator : null,
            result : sum,
        });
    }
    clickReset(e){
        this.setState({
            history: [{
                number : "",
            }],
            result: 0,
            tmp: 0,
            operator: null,
        });
    }
    render() {
       return (
            <div className="container">
                <div className="result">{this.state.result}</div>
                <div className="board-row">
                    <button className="square" onClick={this.clickReset.bind(this)}>AC</button>
                    <button className="square">+/-</button>
                    <button className="square" data-operator="percent" onClick={this.clickPercent.bind(this)}>%</button>
                    <button className="square" data-operator="divided" onClick={this.clickOperator.bind(this)}>÷</button>
                </div>
                <div className="board-row">
                    <button className="square" value="7" onClick={this.clickHandler.bind(this)}>7</button>
                    <button className="square" value="8" onClick={this.clickHandler.bind(this)}>8</button>
                    <button className="square" value="9" onClick={this.clickHandler.bind(this)}>9</button>
                    <button className="square" data-operator="times" onClick={this.clickOperator.bind(this)}>×</button>
                </div>
                <div className="board-row">
                    <button className="square" value="4" onClick={this.clickHandler.bind(this)}>4</button>
                    <button className="square" value="5" onClick={this.clickHandler.bind(this)}>5</button>
                    <button className="square" value="6" onClick={this.clickHandler.bind(this)}>6</button>
                    <button className="square" data-operator="minus" onClick={this.clickOperator.bind(this)}>-</button>
                </div>
                <div className="board-row">
                    <button className="square" value="1" onClick={this.clickHandler.bind(this)}>1</button>
                    <button className="square" value="2" onClick={this.clickHandler.bind(this)}>2</button>
                    <button className="square" value="3" onClick={this.clickHandler.bind(this)}>3</button>
                    <button className="square" data-operator="plus" onClick={this.clickOperator.bind(this)}>+</button>
                </div>
                <div className="board-row">
                    <button className="square zero" value="0" onClick={this.clickHandler.bind(this)}>0</button>
                    <button className="square" value="." onClick={this.clickHandler.bind(this)}>.</button>
                    <button className="square" onClick={this.clickEqual.bind(this)}>=</button>
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

