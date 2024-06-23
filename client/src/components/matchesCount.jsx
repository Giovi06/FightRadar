import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export default function UserMatches({ fighterId }) {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/match/${fighterId}/matches`);
        console.log(response.data);
        setMatches(response.data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, [fighterId]);

  return (
    <div>
      <p>Matchcount: {matches.length}</p>
    </div>
  );
}

UserMatches.propTypes = {
  fighterId: PropTypes.string.isRequired,
};
