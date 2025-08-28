import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthcontext";

const TopicForm = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!id) return;

    const fetchTopic = async () => {
      const response = await fetch("/api/topic/" + id, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();
      if (response.ok) {
        setTitle(json.title);
        setBody(json.body);
      }
    };
    fetchTopic();
  }, [id, user.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const topic = { title, body };

    let URL = "/api/topic";
    let METHOD = "POST";
    if (id) {
      URL = "/api/topic/" + id;
      METHOD = "PUT";
    }

    const response = await fetch(URL, {
      method: METHOD,
      body: JSON.stringify(topic),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (response.ok) {
      navigate("/topic");
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSubmit}>
        <h2>{id ? "Edit topic." : "Create new topic."}</h2>
        <label>Topic Title:</label>
        <input
          type="text"
          placeholder="Topic title."
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />

        <label>Topic body:</label>
        <textarea
          placeholder="Topic body."
          name="body"
          onChange={(e) => setBody(e.target.value)}
          value={body}
          required
        />

        <input type="submit" value={id ? "Edit topic." : "Create new topic."} />
      </form>
    </div>
  );
};

export default TopicForm;
