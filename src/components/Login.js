import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'

const Login = (props) => {
    const [credenatials, setCredenatials] = useState({email:"",password:""})
    let history = useHistory()
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:credenatials.email, password:credenatials.password})
          });

          const json = await response.json();
          console.log(json);
          if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            props.showAlert("Logged in Successfully","success")
            history.push("/");

        }
        else{
            props.showAlert("Invalid Credenatials","danger")
        }
    }

    const onChange = (e)=>{
        setCredenatials({...credenatials,[e.target.name]:e.target.value})

    }
    return (
        <div className="container mt-2">
            <h2>Login to your Account</h2>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credenatials.email} onChange={onChange}/>
                    <div id="emailHelp" class ="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credenatials.password} onChange={onChange}/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label class ="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
