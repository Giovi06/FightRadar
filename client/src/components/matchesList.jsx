import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserMatches({}) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  
  const fetchMatches = async () => {
    const response = await axios
    .get(`http://localhost:3001/api/match/${userId}/matches`)
    .catch((error) => {
      console.error("Error fetching matches:", error);
    })
    .then((response) => {
      setMatches(response.data);
      setLoading(false);
    });
  };
  useEffect(() => {
    fetchMatches();
  }, [userId]);
  
  const removeMatch = async (match) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/match/${userId}/deletefight`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          data: match,
        }
      );
    } catch (error) {
      console.error("Error deleting match:", error);
    }
    fetchMatches();
  };
  
  const ListMatches = ({ match, matches, onRemoveClick }) => (
    <div className="flex flex-col m-6 w-full">
      <p className="m-2 text-lg align-top">Opponent</p>
      {matches.Opponent.Username}
      <p className="m-2 text-lg align-top">Winner</p>
      {matches.Result}
      <p className="m-2 text-lg align-top">Date</p>
      {matches.Date}
      <span> </span>
      <button
        class=" h-5 w-100 rounded-md px-8 bg-secondary text-secondary-foreground hover:bg-secondary/80"
        onClick={() => onRemoveClick(match)}
        >
        Delete Match
      </button>
    </div>
  );
  
  
  if (loading) {
    return <h1>Loading...</h1>; // Show a loading indicator while data is being fetched
  }
  
  return (
    <div>
      <div className="flex justify-center mt-6">
        <div>
          <li className="flex flex-col">
            {matches.length === 0 && <p>No matches found</p>}
            {matches.map((match) => (
              <ListMatches
                key={match.Id}
                matches={match}
                match={match}
                onRemoveClick={removeMatch}
              />
            ))}
          </li>
        </div>
      </div>
    </div>
  );
}
