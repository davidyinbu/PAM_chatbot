import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function GetAllTeams({ steps, triggerNextStep, cookies }) {
  const config = {
    headers: { Authorization: `Bearer ${cookies.access_token}` }
  };
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/api/v1/team`, config)
      .then((res) => {
        //console.log(res.status, res.data); // log the status code and response data
        if (res.status === 200 || res.status === 201) {
          const data = res.data.allTeams;
          setTeams(data.map((team) => team.teamName));

          //triggerNextStep({ trigger: 'login-success' }); // set the trigger for next step
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);
  console.log(teams);
  return (
    <>
      <div>
        team names:
        {teams.map((team) => (
          <li key={team}>{team}</li>
        ))}
      </div>
    </>
  );
}
