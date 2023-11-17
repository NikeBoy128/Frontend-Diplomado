import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Props = {};

const InstallationPage = (props: Props) => {
  const [autos, setAutos] = useState([]);

  useEffect(() => {
    axios.get('https://backen-diplomado-51d51f42ca0d.herokuapp.com/autos/')
      .then((response) => {
        console.log(response.data);
        setAutos(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <div>
      {autos.map((auto, index) => (
        <div key={index}>
          {}
        </div>
      ))}
    </div>
  );
};

export default InstallationPage;