import React, { Component } from 'react';

import './ConvertBar.scss';
import Button from '../../components/Button/Button';
import InputSelect from '../../components/InputSelect/InputSelect';

class ConvertBar extends Component {

  render() {
    return (
      <div className={this.props.className}>
        <div className="convert-bar__left-container">
          <input
            id="standard-name"
            className="input-amount"
            placeholder={'0'}
      
          />
          <InputSelect direction="from"></InputSelect>
          <span className="convert-bar__span">to</span>
          <InputSelect direction="to"></InputSelect>
        </div>

        <Button>Convert</Button>
      </div>
    );
  }
}

export default ConvertBar