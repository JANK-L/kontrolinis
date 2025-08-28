import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthcontext";

const Topic = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [topic, setTopic] = useState();
  const [error, setError] = useState();
  const { user } = useAuthContext();

  const deleteTopic = async () => {
    const response = await fetch("/api/topic/" + id, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (response.ok) {
      navigate("/topic");
    }
  };

  useEffect(() => {
    const fetchTopic = async () => {
      const response = await fetch("/api/topic/" + id, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();
      if (response.ok) {
        setTopic(json);
      } else {
        setError("Failed to load.");
      }
    };

    fetchTopic();
  }, [id, user]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!topic) {
    return <p>Loading...</p>;
  }

  return (
    <div className="home">
      <div>
        <Link to={"/topic/edit/" + id}>Edit</Link>
        <button onClick={deleteTopic}>Delete</button>
        <h2>{topic.title}</h2>
        <p>{topic.body}</p>
      </div>
    </div>
  );
};

export default Topic;
