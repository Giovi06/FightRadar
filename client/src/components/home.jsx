import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import UserMatches from "./matchesCount";

const Home = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate(); // Initialize useNavigate hook

  const getFighter = async () => {
    
      const response = await axios.get(
        `http://localhost:3001/api/match/${userId}/randomfighter`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          }
        }
      ).catch((error) => {
        console.error("Error fetching fighter:", error);
        return null;
      });
      return response.data;
  };

  const postFighterChoice = async (fighterId) => {
    console.log(userId, fighterId);
    
      const response = await axios.post(
        "http://localhost:3001/api/match/newfight",
        {
          UserId: userId,
          FighterId: fighterId,
        }
      ).catch((error) => {
        console.error("Error posting fighter choice:", error);
      }).then((response) => {
        console.log(response);
      });
      
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
    if(data === null)
      {
        console.log("No more fighters");
      }
    setCurrentFighter(data);
  };

  const handleYesClick = () => {
    const fighterId = currentFighter?.Id;
    if (fighterId) {
      postFighterChoice(fighterId);
    }
    navigate("/matches");
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
          <CardFooter class="flex justify-between">
            <button class=" h-11 rounded-md px-8 bg-secondary text-secondary-foreground hover:bg-secondary/80" onClick={handleNoClick}>No</button>
            <button class=" h-11 rounded-md px-8 bg-secondary text-secondary-foreground hover:bg-secondary/80" onClick={handleYesClick}>Yes</button>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default Home;
