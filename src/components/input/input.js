import React, { Component } from 'react';
import services from '../../services/services';
import Output from '../output/output';
import './input.css'

class Input extends Component {
   state = {
      longestPartners: {},
      show: false
   };
   loadData = (event) => {
      event.preventDefault();
      let reader = new FileReader();
      const scope = this;
      reader.onload = function () {
         const text = reader.result;
         const lines = text.split('\n');
         const longestPartners = services.findLongestPartners(lines);
         scope.setState({ longestPartners, show: true });
      }
      reader.readAsText(event.target.files[0]);
   };

   render() {
      return (
         <div>
            <h1>Click the button below to select a file:</h1>
            <div className="upload-btn-wrapper">
               <button className="btn">Upload CSV file</button>
               <input type="file" name="myfile" onChange={(event) => this.loadData(event)}/>
            </div>
            {!this.state.show ? null : <Output data={this.state.longestPartners} />}
         </div>
      );
   }
}

export default Input;