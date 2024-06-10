import { useState } from 'react';
import { signupFields } from "../constants/formField";
import Input from "./input";
import FormAction from "./formAction";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(signupState);
    
    createAccount();
}

  // Handle Signup API Integration here
  const createAccount = async () => {
    try {
      // Only send one password field to the API
      const { confirmPassword, ...userData } = signupState;
      console.log(userData);
      const response = await axios.post('http://localhost:3001/api/user/register', userData); // Assuming the endpoint is correct
      if (response.status === 201) {
          navigate('/'); // Redirect to '/login' upon successful account creation
      } else {
          console.log('Account creation failed');
      }
      // Handle other response statuses as needed
  } catch (error) {
      console.error(error);
  }
  }

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
        {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
          <FormAction handleSubmit={handleSubmit} text="Signup" />
        </div>

         

      </form>
    )
}