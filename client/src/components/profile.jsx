import { useState } from "react";
import { profileFields } from "../constants/formField";
import Input from "./input";
import FormAction from "./formAction";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const fields = profileFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

export default function UpdateProfile() {
  const userId = localStorage.getItem("userId");
  const [profileState, setProfileState] = useState(fieldsState);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setProfileState({ ...profileState, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(profileState);

    updateAccount();
  };

  const updateAccount = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/user/update?id=${userId}`,
        profileState
      );

      if (response.status === 204) {
        navigate("/home");
      } else {
        console.log("Account update failed");
      }
      // Handle other response statuses as needed
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div>
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={profileState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <FormAction handleSubmit={handleSubmit} text="Update" />
      </div>
    </form>
  );
}
