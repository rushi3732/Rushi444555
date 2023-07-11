
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Make a Network Request 
  const PostData = () => {
    // eslint-disable-next-line
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      alert("Invalid email")
      return
    }
    fetch("/api/creatlogin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password

      })
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        if(data.error) {
          alert("Something went wrong plz try again ")
        } else {
          // M.toast({html: data.message, classes: '#c62828 green darken-1'})
          alert("sucessfully done ")
          localStorage.setItem("userEmail",email)               //******************* */
          console.log(email);
          localStorage.setItem("authToken",data.authToken)
          console.log(localStorage.getItem("authToken"))
          navigate('/');
        }
      }).catch(err => {
           console.log(err)
      })
  }
  return (
    <div className='mycard'>
      <div className='container'>
          <h2>GoFood</h2>

         

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label"> Email address </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>




          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label"> Password </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>


          <button type="submit" className="btn btn-success" onClick={() => PostData()}>  Submit </button>



          <Link to="/creatuser" className='m-3 btn btn-danger'>Don't have Account?</Link>


        </div>
      </div>
  )
}

export default Login