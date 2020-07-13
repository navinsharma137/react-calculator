import React, { Component } from 'react';
import calButtonsShared from '../shared/calButtonsShared';
import operatorButtonShared from '../shared/operatorButtonShared';
import { Input, Container, InputGroup, Col, Row } from 'reactstrap';



class CalButtons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            calNumberString: '0',
            operatorValue: null,
            firstNumber: null,
            ansString: null,
            operatorButtons: operatorButtonShared,
            numberButtons: calButtonsShared,
        };
    }

    onNumberButtonClick(calNumber) {
        if (calNumber.label === 'C') {
            console.log("Pressed");
            this.clearValue();
            return;
        }
        if (calNumber.label === '.') {
            var string1 = this.state.calNumberString;
            if (string1.includes('.')) {
                return;
            }
            else {
                console.log(this.state.calNumberString);
                this.setState({ calNumberString: this.state.calNumberString + '' + calNumber.label });
            }

        }

        if (this.state.calNumberString === '0' && calNumber.id === 0) {
            return;
        }
        if (this.state.calNumberString === '0') {
            this.setState({ calNumberString: calNumber.label });
            return;
        }
        this.setState({ calNumberString: this.state.calNumberString + '' + calNumber.label });
    }

    onOperatorButtonClick(operator) {
        if (operator.id === 15) {
            this.setState({
                ansString: eval(this.state.calNumberString)
            });
            this.clearValue();
            return;
        }

        //this.setState({ : operator.label });
        this.setState({ firstNumber: this.state.calNumberString });
        this.setState({ calNumberString: this.state.calNumberString + '' + operator.label });


    }

    clearValue() {
        this.setState({ operatorValue: null, firstNumber: null, calNumberString: '0' });
    }

    render() {
        const calButton = this.state.numberButtons.map((singleButton) => {
            return (
                <button onClick={() => this.onNumberButtonClick(singleButton)} key={singleButton.id} className="calculatorButton">{singleButton.label}</button>
            );
        });

        const operatorButton = this.state.operatorButtons.map((singleButton) => {
            return (
                <button onClick={() => this.onOperatorButtonClick(singleButton)} key={singleButton.id} className="operatorButton">{singleButton.label}</button>
            );
        });


        return (
            <Container>
                <div className="calculatorBox">
                    <Container className="themed-container" fluid="sm">

                        <span>{this.state.ansString != null ? "Ans : " + this.state.ansString : this.state.calNumberString}</span>
                        <Col md={7}>
                            <InputGroup size="lg" >
                                <Input size="sm" text readOnly value={this.state.calNumberString == null ? this.state.ansString : this.state.calNumberString} />
                            </InputGroup>

                        </Col>

                    </Container>
                   
                    <Row>
                        <div className="buttonBox col-*">
                            {calButton}
                        </div>
                        <div className="operatorBox col-2">
                            {operatorButton}
                        </div>

                    </Row>

                </div>

            </Container>

        );
    }

    appendValue(num) {
        console.log(num);
    }

}

export default CalButtons;