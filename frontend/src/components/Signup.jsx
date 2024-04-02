import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {setUser, fetchHighscore } from "../redux/slices/userSlice"
import "./authStyle.css"
import { useNavigate} from "react-router-dom";

function Signup() {
    const [email, setEmail] = useState('');
    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/kittenapp/v1/user/signup`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email,fname,lname, password })
        })

        const json = await response.json();

        if (response.ok) {
            //Save user and token to local storage
            localStorage.setItem('user', JSON.stringify(json));

            //Set user in authcontext i.e dispatch action
            dispatch(setUser(json))
            dispatch(fetchHighscore())
        }
    }

    return (
        <div className='signup-container' >
                        <div className="signup-content">
                            <h1>Signup</h1>
                            <form onSubmit={handleSubmit} >
                                <div>
                                    <label>Email : </label> <br />
                                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
                                </div>
                                
                                <div>
                                    <label>Firstname : </label> <br />
                                    <input type="text" value={fname} onChange={(e) => setfname(e.target.value)} /> <br />
                                </div>
                                 
                                <div>
                                    <label> Lastname : </label> <br />
                                    <input type="text" value={lname} onChange={(e) => setlname(e.target.value)} /> <br />
                                </div>

                                <div>
                                    <label>Password : </label> <br />
                                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
                                </div>
                                <button type="submit">Submit</button>
                            </form>

                            <button onClick={ () => navigate("/login") } >Already a user? Login</button>

                        </div>
        </div>
    )
}

export default Signup
