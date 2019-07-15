const express = require("express");
const { createServer } = require("http");
const bodyParser = require("body-parser");
const path = require("path");
const compression = require("compression");
const cors = require('cors');
const request = require("request");
const validation = require("./validation.js");

const app = express();

const dev = app.get("env") !== "production";

normalizePort = port => parseInt(port, 10);

const PORT = normalizePort(process.env.PORT) || 3001;


const server = createServer(app);
server.listen(PORT, err => {
  if (err) throw err;

  console.log(`server started on ${PORT}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
let summonerInfo = {
  region:'na1',
  name:"",
  level:0,
  champMastery: [],
  leagueData: {

  }
}

//FORM POST INTERCEPTOR

app.post("/api/summonerlookup", (req, res) => {
  if (validation.summonerValidator(req.body.summonerName)) {
    getInfo(req.body.summonerName, req.body.region).then(
      (value) => {
        res.send(value);
      }
    )
  }
});
// app.post("/api/summonerlookup", (req, res) => {
//   if (validation.summonerValidator(req.body.summonerName)) {
//     summonerInfo.name = req.body.summonerName;
//     summonerInfo.region = req.body.region;
//     res.redirect('/summoner')
//   }
// });
// app.get('/api/summonerlookup', (req,res) => {
//   console.log(req.body)
//   res.send(getInfo(req.body.summonerName,req.body.region))  
// })

// GET SUMMONER BASIC INFO
getBasicInfo = (name, region) => {
  const url = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`;

  const headers = {
    Origin: "https://developer.riotgames.com",
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    "X-Riot-Token": "RGAPI-0eef9c3d-5ada-4d28-b945-4e6b447ed8cc",
    "Accept-Language": "en-US,en;q=0.9",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36"
  };
  return new Promise((resolve, reject) => {
    request({ url, headers }, (error, response) => {
      if (error) console.log(error);
      else {
        resolve(JSON.parse(response.body));
      }
    });
  });
}; //END SUMMONER BASIC INFO

// GET SUMMONER CHAMPION MASTERY

getChampionMastery = (id, region, callback) => {
  const url = `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}`;

  const headers = {
    Origin: "https://developer.riotgames.com",
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    "X-Riot-Token": "RGAPI-0eef9c3d-5ada-4d28-b945-4e6b447ed8cc",
    "Accept-Language": "en-US,en;q=0.9",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36"
  };
  return new Promise((resolve, reject) => {
    request({ url, headers }, (error, response) => {
      if (error) console.log(error);
      else {
        resolve(JSON.parse(response.body));
      }
    });
  });
}; //END SUMMONER CHAMPION MASTERY

//GET SUMMONER LEAGUE DATA

getLeagueData = (id, region) => {
  const url = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`;

  const headers = {
    Origin: "https://developer.riotgames.com",
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    "X-Riot-Token": "RGAPI-0eef9c3d-5ada-4d28-b945-4e6b447ed8cc",
    "Accept-Language": "en-US,en;q=0.9",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36"
  };

  return new Promise((resolve, reject) => {
    request({ url, headers }, (error, response) => {
      if (error) {
        console.log(error);
      } else {
        resolve(JSON.parse(response.body));
      }
    });
  });
}; //END SUMMONER LEAGUE DATA

//START ASYNC FUNCTION TO GET ALL DATA
async function getInfo(name, region) {
  let info = {
    basicInfo: {},
    champMastery: [],
    leagueData: {}
  };

  await getBasicInfo(name, region).then(result => {
    info.basicInfo = result;
  });
  await getChampionMastery(info.basicInfo.id, region).then(result => {
    for (i = 0; i < 3; i++) {
      info.champMastery.push(result[i]);
      
    }
  });
  await getLeagueData(info.basicInfo.id, region).then(result => {
    info.leagueData = result[0];
  });
  return info;
} //END ASYNC FUNCTION

let name;
let region;

// app.post("/api/lookup", (req, res) => {
//   if (validation.summonerValidator(req.body.summonerName)) {
//     name = req.body.summonerName;
//     region = req.body.region;
//     console.log(name);
//     res.redirect("/whatever");
//   }
// });




