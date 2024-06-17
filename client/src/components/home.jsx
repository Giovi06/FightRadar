import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const getFighters = async () => {
  try {
    const fighters = await axios.get("http://localhost:3001/api/user/fighters");
    return fighters.data;
  } catch (error) {
    console.error(error);
  }
};

export default function FormExtra() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </>
  );
}
