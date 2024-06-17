import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import UserMatches from "./matches";

const Home = () => {
  const userId = "666fcf4d7029a57983addb12";

  const getFighter = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/match/${userId}/fighter`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const postFighterChoice = async (fighterId) => {
    console.log(userId, fighterId);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/match/newfight",
        {
          UserId: userId,
          FighterId: fighterId,
        }
      );
      console.log(response.status, response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [currentFighter, setCurrentFighter] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFighter();
      setCurrentFighter(data);
    };
    fetchData();
  }, []);

  const handleNoClick = async () => {
    const data = await getFighter();
    setCurrentFighter(data);
  };

  const handleYesClick = () => {
    const fighterId = currentFighter?.Id;
    if (fighterId) {
      postFighterChoice(fighterId);
    }
  };

  return (
    <>
      {currentFighter && (
        <Card>
          <CardHeader>
            <CardTitle>{currentFighter.Username}</CardTitle>
            <CardDescription>{currentFighter.Email}</CardDescription>
          </CardHeader>
          <CardContent>
            <UserMatches fighterId={currentFighter.Id} />
          </CardContent>
          <CardFooter>
            <button onClick={handleNoClick}>Nein</button>
            <button onClick={handleYesClick}>Ja</button>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default Home;
