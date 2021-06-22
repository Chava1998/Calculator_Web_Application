import React, { Component } from 'react';
import { Const } from '../const';
import { CalcForm } from './CalcForm';

export class ExersiceHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            exersiceHistory: [],
        };

        //to call child calcForm component function, focus when update
        this.updateCurrentExersice = React.createRef();
    }

    //get history list from server at init 
    componentDidMount() {
        const requestOptions = {
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`${Const.Base_Url}`, requestOptions)
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    this.setState({ ['exersiceHistory']: res.value });
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    //add or update server side
    addOrUpdateExersice(event) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event)
        };
        var url = "";
        if (event.id) {
            url = Const.Base_Url;
        } else {
            url = Const.Base_Url;
        }
        fetch(`${url}`, requestOptions)
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    if (event.id) {
                        //update state when update
                        var array = [...this.state.exersiceHistory];
                        var item = array.find(a => a.id == event.id);
                        Object.assign(item, event);
                        this.setState({ exersiceHistory: array });
                    }
                    else {
                        //update state when add
                        event.id = res.value
                        this.setState({
                            exersiceHistory: [...this.state.exersiceHistory, event]
                        })
                    }
                }
            })
            .catch(error => {
                console.log(error);
            });
    }


    deleteExersice(id) {
        const requestOptions = {
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`${Const.Base_Url}?id=${id}`, requestOptions)
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    //delete in client side list
                    var array = [...this.state.exersiceHistory];
                    var index = this.state.exersiceHistory.findIndex(e => e.id == id);
                    if (index !== -1) {
                        array.splice(index, 1);
                        this.setState({ exersiceHistory: array });
                    }
                }
            })
            .catch(error => {
                console.log(error);
            });
    }


    render() {
        return (
            <div className="wrapper">
                <CalcForm ref={this.updateCurrentExersice} addOrUpdateExersice={(event) => this.addOrUpdateExersice(event)} />
                <div className="history-wrapper">
                    <ul className={this.state.exersiceHistory.length>0 ? 'full-array' : null}>
                        {this.state.exersiceHistory.map((exersice) =>
                            <li key={exersice.id} >
                                <div className="exersice">{exersice.num1 + exersice.operator + exersice.num2}={exersice.result}</div>
                                <div className="btn-wrapper">
                                    <button className="action-btn update-btn" onClick={() => this.updateCurrentExersice.current.setStateExersice(exersice)}>
                                    </button>
                                    <button className="action-btn delete-btn" onClick={(e) => this.deleteExersice(exersice.id)}>
                                    </button>
                                </div>
                            </li>
                        )}
                    </ul>

                </div>
            </div>
        );
    }
}

