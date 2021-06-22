import React, { Component } from 'react';
import { Const } from '../const';

export class CalcForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //exersice object
            exersice: {
                operator: '',
                num1: '',
                num2: '',
                result: '',
            }
        };
    }

    //server calculation
    sum() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.exersice)
        };
        fetch(`${Const.Sum}`, requestOptions)
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    //set state result
                    this.setState(prevState => ({
                        exersice: {
                            ...prevState.exersice,
                            ['result']: res.value
                        }
                    }), () => {
                        //update parent history list 
                        this.props.addOrUpdateExersice(this.state.exersice);
                        //reset id for next exersice
                        this.setState(prevState => ({
                            exersice: {
                                ...prevState.exersice,
                                ['id']: 0
                            }
                        }));

                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    //focus elements when update item of history
    setStateExersice(event) {
        this.setState(_ => ({
            exersice: {
                ...event,
            }
        }));
    }

    //handle changes of state exersice object
    myChangeHandler = (event) => {
        let name = event.target.name;
        let val = event.target.value;
        this.setState(prevState => ({
            exersice: {                   // object that we want to update
                ...prevState.exersice,    // keep all other key-value pairs
                [name]: val       // update the value of specific key
            }
        }));
    }

    render() {
        return (
            <div className='row flex'>
                <div className='col-3'>
                    <input className='form-control'
                        type='number'
                        name='num1'
                        value={this.state.exersice.num1}
                        onChange={this.myChangeHandler}
                    />
                </div>
                <div className='col-2'>
                    <select className='form-control' name='operator' onChange={this.myChangeHandler} value={this.state.exersice.operator} >
                        <option value=""></option>
                        <option value="+">+</option>
                        <option value="-">-</option>
                        <option value="*">*</option>
                        <option value="/">/</option>
                    </select>
                </div>
                <div className='col-3'>
                    <input className='form-control'
                        type='number'
                        name='num2'
                        onChange={this.myChangeHandler}
                        value={this.state.exersice.num2}
                    />
                </div>
                <div className='col-1 text-center'>
                    <button className='sum-btn' disabled={!(this.state.exersice.num1 && this.state.exersice.num2 && this.state.exersice.operator)}
                        onClick={() => this.sum()}>=</button>
                </div>
                <div className='col-3'>
                    <input className='form-control'
                        type='number'
                        readOnly
                        name='result'
                        value={this.state.exersice.result}
                    />

                </div>
            </div>
        );
    }
}