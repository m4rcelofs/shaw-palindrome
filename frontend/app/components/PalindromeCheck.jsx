import React from 'react';

import {Col, Input, Panel, Row} from 'react-bootstrap';

export default class PalindromeCheck extends React.Component {

  constructor(props) {
    super(props);

    this.checkEnter = this.checkEnter.bind(this);
    this.checkPalindrome = this.checkPalindrome.bind(this);

    this.state = {
      word: '',
      isPalindrome: false
    };
  }

  render() {
    return (
      <Row>
        <Col md={12}>
          <Panel>
            <p>Is this word a palindrome?</p>
            <Input type="text"
                   hasFeedback
                   ref={
                    (e) => e ? e.selectionStart = this.state.word.length : null
                   }
                   bsStyle={!this.state.word
                              ? ''
                              : this.state.isPalindrome
                                ? 'success'
                                : 'error'}
                   autoFocus={true}
                   defaultValue={this.state.word}
                   onBlur={this.checkPalindrome}
                   onKeyPress={this.checkEnter} />
            <p>
              {!this.state.word
                ? ''
                : this.state.isPalindrome
                  ? "is a palindrome"
                  : "is NOT a palindrome"}
            </p>
          </Panel>
        </Col>
      </Row>
    );
  }

  checkEnter(e) {
    if(e.key === 'Enter') {
      this.checkPalindrome(e);
    }
  };

  checkPalindrome(e) {
    const value = e.target.value;
    const token = value
                  .replace(/[\.\s]/g, '')
                  .toLowerCase();
    const reverse = token.split('').reverse().join('');
    this.setState({
      word: value,
      isPalindrome: token === reverse
    });
  };
}