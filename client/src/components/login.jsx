import { useState } from 'react';
import { loginFields } from "../constants/formField";
import { Navigate, useNavigate } from 'react-router-dom';
import Input from "./input";
import FormAction from "./formAction";
import FormExtra from "./formExtra";
import axios from 'axios';

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login() {
    const [loginState, setLoginState] = useState(fieldsState);
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        authenticateUser();
    }

    // Handle Login API Integration here
    const authenticateUser = async () => {
        try {
            console.log(loginState);
            const response = await axios.post('http://localhost:3001/api/user/login', loginState);
            if (response.status === 200) {
                console.log(response.data)
                const { userId } = response.data;
                localStorage.setItem('userId', userId);
                navigate('/home'); // Redirect to '/home' upon successful login
            } else if (response.status === 401) {
                console.log('Unauthorized');
            }
            // e.g., set a loggedIn state, redirect to a protected route, etc.
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
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
        </div>

        <FormExtra/>
        <FormAction handleSubmit={handleSubmit} text="Login"/>

      </form>
    )
}