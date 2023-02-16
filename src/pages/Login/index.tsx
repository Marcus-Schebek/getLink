import "./styles.scss";
import React, { useEffect } from "react";
import { UserAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import {FaGoogle} from "react-icons/fa";

interface Props {}

export const Login: React.FC<Props> = (props) => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <div className="login">
        <aside>
          <h1>GetLink😎</h1>
          <div id="textSpace">
          <h2>Organize seus links, simplifique sua vida</h2>
          <p>Em especialmente em um mundo cada vez mais conectado e repleto de informações é importante ter um lugar para deixar salvo.</p>
          </div>
        </aside>
        <main>
          <h1>Faça o Login para continuar</h1>
          <button className="googleButton"onClick={handleGoogleSignIn}><FaGoogle className="googleIcon"/><p>Faça Login com o Google</p></button>
        </main>
      </div>
    </>
  );
};

export default Login;
