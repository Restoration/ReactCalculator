
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Board extends React.Component {
    constructor(props) {
        super(props);
/*
        this.state = {
            history: [{
                number : "",
                prev:"",
            }],
            result: 0,
            tmp: 0,
            operator: null,
            minusFlg: true,
        };
*/
        this.state = {
            history: [{
                number : "",
            }],
            result: "",
            left: 0,
            right: 0,
            operator: null,
            minusFlg: true,
            firstFlg: true,
        };


    }
    clickHandler(e){
        const history = this.state.history;
        const current = history[history.length - 1];
        const operator = this.state.operator;
        const firstFlg = this.state.firstFlg;
        let num = e.target.value;

        // controle dot
        if((num == '.' && history.length == 1 )
        || (num == 0 && history.length == 1 )){
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
        if(firstFlg){
            this.setState({left: result});
        } else {
            this.setState({right: result});
        }

        // minus option check
        /*
        let option = e.target.getAttribute('data-option');
        if(option){
            this.setState({minusFlg:false});
            result = -(result);
            result = String(result);
        } else {
            this.setState({minusFlg:true});
        }
        // set view
        this.setState({
            history: history.concat([{
                number: num,
            }]),
            tmp : result,
            result : result,
        });
        */
    }
    // get operator
    clickOperator(e){
        const history = this.state.history;
        const result = this.state.history;
        let operator = e.target.getAttribute('data-operator');
        this.setState({
            history: [{
                number : "",
            }],
            operator : operator,
            result : "",
            firstFlg: false,
        });
    }
    // calculate
    clickEqual(){
        const history = this.state.history;
        let left = this.state.left;
        let right = this.state.right;
        let operator = this.state.operator;
        console.log(operator);
        let sum;
        switch(operator){
            case 'plus':
                sum = parseFloat(left) + parseFloat(right);
            break;
            case 'minus':
                sum = parseFloat(left) - parseFloat(right);
            break;
            case 'times':
                sum = parseFloat(left) * parseFloat(right);
            break;
            case 'divided':
                sum = parseFloat(left) / parseFloat(right);
            break;
        }
        this.setState({
            history: history.concat([{
                number: "",
            }]),
            left: sum,
            right: 0,
            operator : null,
            result : String(sum),
        });
        console.log(this.state);


    }
    // calculate percent
    clickPercent(e){
        let result = this.state.result;
        const history = this.state.history;
        let sum = parseFloat(result) / 100;
        this.setState({
            history: [{
                number : "",
            }],
            left: sum,
            operator : 'times',
            result : String(sum),
            firstFlg: false,
        });
    }
    // Reset
    clickReset(e){
        this.setState({
            history: [{
                number : "",
            }],
            result: 0,
            left: 0,
            right: 0,
            operator: null,
            minusFlg: true,
            firstFlg: true,
        });
    }
    render() {
       return (
            <div className="container">
                <div className="result">{this.state.result}</div>
                <div className="board-row">
                    <button className="square" onClick={this.clickReset.bind(this)}>AC</button>
                    <button className="square" data-option={this.state.minusFlg} onClick={this.clickHandler.bind(this)}>+/-</button>
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

