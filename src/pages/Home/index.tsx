import "./styles.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { UserAuth } from "../../Context/AuthContext";
import LatteCard from "../../components/LatteCard";
import { useNavigate } from "react-router-dom";
import linkDataServices from "../../services/link.services";
import { DocumentData } from "@firebase/firestore";

interface Report {
  title: string | undefined;
}

interface Props {
  user: string | undefined;
}

export async function fetchReport(url: string): Promise<Report> {
  try {
    const urlFormated = `https://marcusschebekCorsAnywhere.up.railway.app/${url}`;
    const response = await axios.get(urlFormated);
    if (response.status === 403) {
      return { title: undefined };
    }
    const html = response.data;

    const title = html.match(/<title>(.*?)<\/title>/)?.[1] || "";
    return { title };
  } catch (error) {
    console.error(error);
    return { title: undefined };
  }
}
const Home: React.FC<Props> = (props) => {
  const [url, setUrl] = useState("");
  const [reports, setReports] = useState<Report[]>([]);
  const { logOut, user } = UserAuth();
  const navigate = useNavigate();
  const [allLinks, setAllLinks] = useState<DocumentData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLinks() {
      const links = await linkDataServices.getAllLinks();
      setAllLinks(links);
    }
    fetchLinks();
  }, []);

  useEffect(() => {
    if (user == null) {
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
    console.log(user);
  }, [user, navigate]);

  const handleGoogleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log("error");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await linkDataServices.addLink({ url });
      setUrl("");
      setAllLinks(await linkDataServices.getAllLinks());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="profile">
        <img src={user?.photoURL} />
        <p>{user?.displayName}</p>

        <button onClick={handleGoogleSignOut}>Logout</button>
      </div>
      <form className="getLink" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter report URL"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
        <button type="submit">Adicionar Link</button>
      </form>
      {error && <div className="error">{error}</div>}
      <div className="reports">
        {allLinks.map((link) => (
          <LatteCard
            id={link.id}
            title={link.title}
            url={link.url}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
