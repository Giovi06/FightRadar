import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
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
import FormAction from "./formAction";

const Home = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate(); // Initialize useNavigate hook

  const getFighter = async () => {
    const response = await axios
      .get(`http://localhost:3001/api/match/${userId}/randomfighter`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .catch((error) => {
        console.error("Error fetching fighter:", error);
        return null;
      });
    return response.data;
  };

  const postFighterChoice = async (fighterId) => {
    console.log(userId, fighterId);

    const response = await axios
      .post("http://localhost:3001/api/match/newfight", {
        UserId: userId,
        FighterId: fighterId,
      })
      .catch((error) => {
        console.error("Error posting fighter choice:", error);
      })
      .then((response) => {
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
    if (data === null) {
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
  const handleProfileNavClick = () => {
    navigate("/profilesettings");
  };

  return (
    <>
      <div>
        {currentFighter && (
          <Card>
            <CardHeader>
              <CardTitle>{currentFighter.Username}</CardTitle>
              <CardDescription>
                <p className=" text-lg">Email</p>
                <p >{currentFighter.Email}</p>
                <p className=" text-lg">Gewicht:</p>
                <p>{currentFighter.Gewicht}</p>
                <p className=" text-lg">Gewichtsklasse</p>
                <p>{currentFighter.Gewichtsklasse}</p>
                <p className=" text-lg">Kampfstil</p>
                <p>{currentFighter.Kampfstil}</p>
                <p className=" text-lg">Erfahrungen</p>
                <p>{currentFighter.Erfahrungen}</p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserMatches fighterId={currentFighter.Id} />
            </CardContent>
            <CardFooter class="flex justify-between">
              <button
                class=" h-11 rounded-md px-8 bg-secondary text-secondary-foreground hover:bg-secondary/80"
                onClick={handleNoClick}
              >
                No
              </button>
              <button
                class=" h-11 rounded-md px-8 bg-secondary text-secondary-foreground hover:bg-secondary/80"
                onClick={handleYesClick}
              >
                Yes
              </button>
            </CardFooter>
          </Card>
        )}
      </div>
      <button
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
        onClick={handleProfileNavClick}
      >
        {" "}
        Update your Profile{" "}
      </button>
    </>
  );
};

export default Home;
