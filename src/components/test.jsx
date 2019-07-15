import React, { Component } from "react";
import Summoner from "./summonerPage.jsx";
import '../css/home.css';
import axios from "axios";

class Test extends Component {
  state = {
    submitted: false,
    summonerName: "",
    region: "na1",
    summonerInfo: {}
  };


  summonerValidator = name => {
    const lowercase = name.toLowerCase();
    const check = /^[a-zA-Z1-9]+$/;
    if (lowercase.match(check) || lowercase.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  changeHandler = e => {
    const state = { ...this.state };
    if (this.summonerValidator(e.currentTarget.value)) {
      if (e.currentTarget.name == "regions") {
        e.currentTarget.style.border = "1px solid black";
        console.log(state)
      state.region = e.currentTarget.value;
      this.setState(state);
      } else {
      e.currentTarget.style.border = "1px solid black";
      state.summonerName = e.currentTarget.value;
      this.setState(state);
      console.log(state)
      }
    } else {
      e.currentTarget.style.border = "1px solid red";
    }
  };
  reRender() {
    // Force a render with a simulated state change
    this.setState({ state: this.state });
    console.log(this.state);
}
  //"../../api/summonerlookup/"
  submitHandler = e => {
    e.preventDefault();
    if (this.summonerValidator(this.state.summonerName)) {
      axios.post("../../api/summonerlookup", this.state).then(response => {
      console.log(response);
        if (response.statusText === "OK") {
          let currentState = {...this.state}
          currentState.summonerInfo = response.data;
          currentState.submitted = true;
          this.setState(currentState,() => {this.reRender()});
          
        } else {
        }
      });
  };
  }
 

  //   displaySummonerInfo = name => {
  //     const url = `https://na1.api.riotgames.com/lol/summoner/v4/`;
  //   };

  render() {
   const submitted = this.state.submitted;
   let display;
   if (submitted) {
     display = <Summoner passedState={this.state} />
   } else if (!submitted) {
     display =  <div id="main">
     <form onSubmit={this.submitHandler}>
     <div className="container-fluid home">
        <div className="row">
          <div className="col-4 offset-4">
          <div id="leagueLogo"></div>
          <div className="form-group ">
       <select className="form-control" name="regions" onChange={this.changeHandler}>
         <option value="na1">NA1</option>
         <option value="euw1">EUW1</option>
         <option value="eun1">EUN1</option>
         <option value="kr">KR</option>
         <option value="jp1">JP1</option>
         <option value="ru">RU</option>
         <option value="br1">BR1</option>
         <option value="oc1">OC1</option>
         <option value="tr1">TR1</option>
         <option value="la1">LA1</option>
         <option value="la2">LA2</option>
       </select>
       <input
         type="text"
         className="form-control"
         onChange={this.changeHandler}
         value={this.state.summonerName}
         id="summonerName"
         placeholder="Summoner Name"
       />
       <button type="submit" className="submit-btn btn btn-lg btn-primary"> Submit</button>
       </div>
          </div>
        </div>
     </div>
     </form>
   </div>
   }
   return display;
    //  return(
    //  <div>
    //   <form onSubmit={this.submitHandler}>
    //     <select name="regions" onChange={this.changeHandler}>
    //       <option value="na1">NA1</option>
    //       <option value="euw1">EUW1</option>
    //       <option value="eun1">EUN1</option>
    //       <option value="kr">KR</option>
    //       <option value="jp1">JP1</option>
    //       <option value="ru">RU</option>
    //       <option value="br1">BR1</option>
    //       <option value="oc1">OC1</option>
    //       <option value="tr1">TR1</option>
    //       <option value="la1">LA1</option>
    //       <option value="la2">LA2</option>
    //     </select>
    //     <input
    //       type="text"
    //       onChange={this.changeHandler}
    //       value={this.state.summonerName}
    //       id="summonerName"
    //       placeholder="Summoner Name"
    //     />
    //     <button type="submit"> Submit</button>
    //   </form>
    // </div>
    //  );
    
  }
}

export default Test;
