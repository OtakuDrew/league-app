import React, { Component } from "react";
import '../css/summoner.css';

class Summoner extends Component {

  render() {
 
    let region = this.props.passedState.region;
    let summonerName = this.props.passedState.summonerName;
    let level = this.props.passedState.summonerInfo.basicInfo.summonerLevel;
    let champ1 = this.props.passedState.summonerInfo.champMastery[0];
    let champ2 = this.props.passedState.summonerInfo.champMastery[1];
    let champ3 = this.props.passedState.summonerInfo.champMastery[2];
    let tier = this.props.passedState.summonerInfo.leagueData.tier;
    let rank = this.props.passedState.summonerInfo.leagueData.rank;
    return (
      <div id="main">
        <div className="container main-container">
        <div className="row rank">
            <div className="col-8 offset-2">
              <h1>{tier.toUpperCase()}{rank.toUpperCase()}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-2 offset-2">
              <h1>Server: {region.toUpperCase()}</h1>
            </div>
            <div className="col-4">
            <h1>{summonerName.toUpperCase()}</h1>
            </div>
            <div className="col-2">
            <h2>Summoner Level: {level}</h2>
            </div>
          </div>
          <div className="row champions">
            <div className="container">
              <div className="row">
              <div className="col-12">
              <h1>TOP 3 CHAMPIONS</h1>
              </div>
              </div>
            </div>
            <div className="col-4">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                  <div id="champ2"></div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8 offset-2">
                    <div className="mast7"></div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 offset-3">
                    <div className="points">Ahri {champ2.championPoints}points</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                  <div id="champ1"></div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8 offset-2">
                    <div className="mast7"></div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 offset-3">
                  
                    <div className="points"> Vayne {champ1.championPoints}points</div>
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                  <div id="champ3"></div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8 offset-2">
                    <div className="mast7"></div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 offset-3">
                    <div className="points">Draven {champ3.championPoints}points</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Summoner;
