import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthcontext";

const Topics = () => {
  const { user } = useAuthContext();
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    if (!user || !user.token) return;

    const fetchTopics = async () => {
      const response = await fetch("/api/topic", {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      if (response.ok) {
        const json = await response.json();
        setTopics(json);
      } else {
        setError("Failed to load topics.");
      }
    };
    fetchTopics();
  }, [user]);

  return (
    <div className="home">
      <div className="Topic">
        {error}
        {topics &&
          topics.map((topic, i) => (
            <a href={"/topic/" + topic._id} key={i}>
              {topic.title}
            </a>
          ))}
      </div>
    </div>
  );
};

export default Topics;
