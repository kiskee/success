import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import {motion} from 'framer-motion'

const Sumoner = () => {
  //const { tokenRiot } = require("./config.json");
  const [id, setId] = useState("");
  const [accountId, setAccountId] = useState("");
  const [puuid, setPuuid] = useState("");
  const [name, setName] = useState("");
  const [profileIconId, setProfileIconId] = useState("");
  const [revisionDate, setRevisionDate] = useState("");
  const [summonerLevel, setSummonerLevel] = useState("");
  const [searchText, setSearchText] = useState("");
  const [region, setRegion] = useState("");
  const [leaguePoints, setLeaguePoints] = useState("");

const token = 'RGAPI-bb0d9f98-7aad-4c1e-b82f-b1c40c30cc72'

  function searchSumoner(event) {
    event.preventDefault();
    const callSumoner =
      "https://" +
      region +
      "/lol/summoner/v4/summoners/by-name/" +
      searchText +
      "?api_key=" +
      token;

     

    axios
      .get(callSumoner)
      .then(function (response) {
        setId(response.data.id);
        setAccountId(response.data.accountId);
        setPuuid(response.data.puuid);
        setName(response.data.name);
        setProfileIconId(response.data.profileIconId);
        setRevisionDate(response.data.revisionDate);
        setSummonerLevel(response.data.summonerLevel);
      })
      .catch(function (error) {
        console.log(error);
      });

     

      
  }

 

  function render() {

    const urlImg = 'http://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/'+profileIconId+'.png'
    if(id){
        const callLeague = 
        "https://" +
        region +
        "/lol/league/v4/entries/by-summoner/" +
        id +
        "?api_key=" +
        token;
    
         //call to account
         axios
         .get(callLeague)
         .then(function (response) {
           setLeaguePoints(response.data[0].leaguePoints)
          
         })
         .catch(function (error) {
           console.log(error);
         });  
    }

    return (
      <motion.div className="row mt-3 mr-2 ml-1" 
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      >
        
        {/*}
        <ul className="list-group ">
          <li className="list-group-item bg-info text-white">Id:</li>
          <li className="list-group-item ">{id}</li>
          <li className="list-group-item bg-info text-white">accountId:</li>
          <li className="list-group-item ">{accountId}</li>
          <li className="list-group-item bg-info text-white">puuid:</li>
          <li className="list-group-item ">{puuid}</li>
          <li className="list-group-item bg-info text-white">name:</li>
          <li className="list-group-item ">{name}</li>
          <li className="list-group-item bg-info text-white">profileIconId:</li>
          <li className="list-group-item ">{profileIconId}</li>
          <li className="list-group-item bg-info text-white">revisionDate:</li>
          <li className="list-group-item ">{revisionDate}</li>
          <li className="list-group-item bg-info text-white">summonerLevel:</li>
          <li className="list-group-item ">{summonerLevel}</li>
        </ul>
    {*/}
        <div className="card col-sm-3  align-items-center">
          <h3 className="card-header">{name}</h3>
          <div className="card-body">
            <h5 className="card-title">LVL:</h5>
            <h6 className="card-subtitle text-muted">{summonerLevel}</h6>
          </div>
          <img src={urlImg} className="img-fluid rounded-top" alt="" height='100px' width='100px' />
        </div>
        <div className="card col-sm-3  align-items-left ml-2">
          <h3 className="card-header">Basic Info:</h3>
          <div className="card-body">
            <h5 className="card-title">LVL:</h5>
            <h6 className="card-subtitle text-muted">{summonerLevel}</h6>
          </div>
        </div>
        <div className="card col-sm-5    align-items-left ml-2">
          <h3 className="card-header">Basic Info:</h3>
          <div className="card-body">
            <h5 className="card-title">League Points:</h5>
            <h6 className="card-subtitle text-muted">{leaguePoints}</h6>
          </div>
        </div>
      </motion.div>
    );
  }

  const options = [
    { value: "br1.api.riotgames.com", label: "BR1" },
    { value: "eun1.api.riotgames.com", label: "EUN1" },
    { value: "euw1.api.riotgames.com", label: "EUW1" },
    { value: "jp1.api.riotgames.com", label: "JP1" },
    { value: "kr.api.riotgames.com", label: "KR" },
    { value: "la1.api.riotgames.com", label: "LA1" },
    { value: "la2.api.riotgames.com", label: "LA2" },
    { value: "na1.api.riotgames.com", label: "NA1" },
    { value: "oc1.api.riotgames.com", label: "OC1" },
    { value: "tr1.api.riotgames.com", label: "TR1" },
    { value: "ru.api.riotgames.com", label: "RU" },
  ];

  const selectChange = (value) => {
    setRegion(value.value);
  };

  return (
    <motion.div 
    className=""
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8 }}
      
    >
        <div className="container">
      <h1 className="text-danger">Sumoner Name</h1>
      <form className="col-sm-6 offset-3">
        <Select options={options} onChange={selectChange} />
        <label htmlFor="name" className="form-label text-danger">
          Sumoner Name
        </label>
        <input
          className="form-control"
          type="text"
          name="sumonerName"
          placeholder="Sumoner Name"
          onChange={(e) => setSearchText(e.target.value)}
          required
        ></input>

        <button
          onClick={(e) => searchSumoner(e)}
          className="btn btn-danger mt-3"
        >
          Search
        </button>
      </form>
      </div>
      {id.length > 0 && render()}
      
    </motion.div>
  );
};

export default Sumoner;
