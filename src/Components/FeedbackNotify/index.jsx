import React from "react";
import { BsPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext/index.jsx";
import { db } from "../../database/index.js";
import { CardFeedbackContainer, FeedbackNotifyContainer } from "./styled.js";

function CardFeedback({ content }) {
  const avatar = content?.from?.avatar;
  // console.log(content.from.name);
  const name = content?.from?.name;
  const text = content.content;
  const limitText = 40;

  return (
    <CardFeedbackContainer>
      <div className="wrap-img">
        {avatar ? <img src={avatar} alt="" /> : <BsPersonFill />}
      </div>
      <div className="wrap-content">
        <h1>{name ? name : "Anonymous"}</h1>
        <p>
          {text.length >= limitText ? text.slice(0, limitText) + "..." : text}
        </p>
      </div>
    </CardFeedbackContainer>
  );
}

export function FeedbackNotify() {
  // Hooks
  // Context
  const { userGoogle } = React.useContext(AuthContext);
  // States
  const [LIST_FEED, SET_LIST_FEED] = React.useState([]);
  // Effects
  React.useEffect(() => {
    (async () => {
      db.collection("feedbacks").onSnapshot((ref) => {
        let query = ref.docs.filter(
          (x) => x.data().to === userGoogle.id && !x.data().read
        );
        let data = query.map((x) => x.data());
        SET_LIST_FEED([...data.slice(0, 4)]);
      });
    })();
  }, [userGoogle]);
  // Handle Functions

  return (
    <FeedbackNotifyContainer>
      <div className="main-content">
        {LIST_FEED[0] ? (
          LIST_FEED.map((x, i) => <CardFeedback key={i} content={x} />)
        ) : (
          <h1 className="empty-field">You have not feedback yet!</h1>
        )}
      </div>
      <div className="wrap-button">
        <Link to={"feedback"}>View Feedback</Link>
      </div>
    </FeedbackNotifyContainer>
  );
}
