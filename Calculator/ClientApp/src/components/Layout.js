import React, { Component } from 'react';
import { Container } from 'reactstrap';

export class Layout extends Component {

    render() {
        return (
            <div>
                <div className="navbar-expand-sm bgm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" >
                    <h1>CALCULATOR</h1>

                </div>
                <Container>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}
