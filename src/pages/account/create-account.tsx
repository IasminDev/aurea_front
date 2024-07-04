import { Header } from "../../components/header/header";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { NavLink } from "../../components/ui/nav-link";
import { InputPassword } from "../../components/ui/input-password";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from '../../lib/server'

export function CreateAccount() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [infoName, setInfoName] = useState<string>("");
  const [infoEmail, setInfoEmail] = useState<string>("");
  const [infoPassword, setInfoPassword] = useState<string>("");
  const [infoConfirmPassword, setInfoConfirmPassword] = useState<string>("");

  const handleInsert = () => {
    if (!name) {
      setInfoName("Please enter a name");
      return;
    } else {
      setInfoName("");
    }
    if (!email) {
      setInfoEmail("Please enter a email");
      return;
    } else {
      setInfoEmail("");
    }
    if (!password) {
      setInfoPassword("Please enter a password");
      return;
    } else {
      setInfoPassword("");
    }
    if (!confirmPassword) {
      setInfoConfirmPassword("Please confirm your password");
      return;
    } else {
      setInfoConfirmPassword("");
    }

    api.post('/users', {
      name,
      email,
      password,
      plan: 'Basic'   
    }).then(function(response) {
      console.log(response)
      navigate("/log-in-account");
    }).catch(function(error) {
      console.log(error)
      setError("Unable to create your account");      
    })
    
    setInfoName("");
    setInfoEmail("");
    setInfoPassword("");
    setInfoConfirmPassword("");
    setError("");
  };
 


  const validate = () => {
    if (password !== confirmPassword) {
      setError("Passwords don't match");
    } else {
      setError("");
    }
  };


  return (
    <div className="flex flex-col gap-5">
      <Header />
      <div className="flex flex-col items-center justify-center py-5 gap-5 mt-24">
        <h2 className="text-2xl">Create new Account</h2>
        <h3 className="flex text-base items-center gap-1">
          {" "}
          Already Registered?{" "}
          <NavLink href="/log-in-account">Log in here.</NavLink>{" "}
        </h3>
        <div className="flex flex-col p-2 items-center">
          <div className="flex flex-col p-2 gap-2">
            <label id="name">
              Name
              <span className="text-xs text-slate-400 ">
                (min 4 characters)
              </span>
            </label>
            <Input
              minLength={4}
              empty={!!infoName}
              type="text"
              id="name"
              placeholder="Name..."
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col p-2 gap-2">
            <label id="email">Email</label>
            <Input
              empty={!!infoEmail}
              type="email"
              id="email"
              placeholder="Email..."
              value={email}
              onChange={(e) => {
                validate();
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col p-2 gap-2">
            <label id="Password">
              Password{" "}
              <span className="text-xs text-slate-400 ">
                (min 8 characters)
              </span>
            </label>
            <InputPassword
              empty={!!infoPassword}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validate();
              }}
              onBlur={() => {
                validate();
              }}
              id="password"
              placeholder="Password..."
            />
          </div>
          <div className="flex flex-col p-2 gap-2">
            <label id="Password">
              Confirm Password{" "}
              <span className="text-xs text-slate-400 ">
                (min 8 characters)
              </span>
            </label>
            <InputPassword
              empty={!!infoConfirmPassword}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                validate();
              }}
              onBlur={() => {
                validate();
              }}
              id="confirm-password"
              placeholder="Confirm Password..."
            />
          </div>
          <p className="text-md text-center text-red-500 drop-shadow-lg">
            {error}
            <br />
            {infoName}
            {infoEmail}
            {infoPassword}
            {infoConfirmPassword}
          </p>
          <div className="flex flex-col w-full items-center p-2 gap-2">
            <Button
              onClick={handleInsert}
              disabled={!!error}
              disable={
                !!infoName ||
                !!infoEmail ||
                !!infoPassword ||
                !!infoConfirmPassword
              }
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
