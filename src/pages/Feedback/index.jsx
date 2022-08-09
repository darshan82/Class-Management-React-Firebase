import "@emotion/styled";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
//
import { BsPersonFill, BsTrash } from "react-icons/bs";
import { HiOutlineMail, HiOutlineMailOpen } from "react-icons/hi";
import { AuthContext } from "../../Contexts/AuthContext";
import { db } from "../../database";
import {
  CardMessagesContainer,
  FeedbackPageContainer,
  MainContent,
  PaginationContainer,
} from "./styled.js";

export function FeedbackPage() {
  // Context
  const { userGoogle } = useContext(AuthContext);
  // States
  const [FEEDBACKS, SET_FEEDBACKS] = useState([]);
  const [CURRENT_PAGE, SET_CURRENT_PAGE] = useState(0);
  // Pagination
  let MAIL_PER_PAGE = 4;
  let TOTAL_MAILS = FEEDBACKS.length;
  let TOTAL_PAGES = Math.ceil(TOTAL_MAILS / MAIL_PER_PAGE);
  let START_INDEX = CURRENT_PAGE * MAIL_PER_PAGE;
  let END_INDEX = START_INDEX + MAIL_PER_PAGE;
  let LIST_MAILS = FEEDBACKS.slice(START_INDEX, END_INDEX);

  // Effects
  useEffect(() => {
    const feedbacks = db
      .collection("feedbacks")
      .where("to", "==", userGoogle.id)
      .orderBy("createdAt")
      .onSnapshot((snap) => {
        let data = snap.docs.map((x) => {
          let doc = x.data();
          let date = doc.createdAt.toDate();
          doc.createdAt = moment(date, "YYYYMMDD").fromNow();
          doc.id = x.id;
          return doc;
        });
        SET_FEEDBACKS([...data.reverse()]);
      });
    return () => feedbacks;
  }, []);

  return (
    <FeedbackPageContainer>
      <MainContent>
        {FEEDBACKS[0] ? (
          LIST_MAILS.map((x, i) => <CardMessages key={i} x={x} />)
        ) : (
          <h1 className="empty-field">No feedbacks yet!</h1>
        )}
      </MainContent>
      {TOTAL_MAILS > MAIL_PER_PAGE && (
        <PaginationContainer>
          <Stack spacing={2}>
            <Pagination
              count={TOTAL_PAGES}
              defaultPage={1}
              onChange={(e, newPage) => {
                let page = newPage - 1;
                SET_CURRENT_PAGE(page);
              }}
            />
          </Stack>
        </PaginationContainer>
      )}
    </FeedbackPageContainer>
  );
}

function CardMessages({ x }) {
  // State
  const [SHOW_MORE, SET_SHOW_MORE] = useState(false);
  let name = x.from?.name ? x.from?.name : "Anonymous";
  let content = x.content;
  let contentSlice = content.slice(0, 150);
  let isShoMore = content.length > 150;
  let isRead = x.read;
  let id = x.id;

  async function handleReadMail() {
    await db.collection("feedbacks").doc(id).update({
      read: !isRead,
    });
  }
  async function handleDeleteMail() {
    await db.collection("feedbacks").doc(id).delete();
  }

  return (
    <CardMessagesContainer isRead={isRead}>
      <div className="img-container">
        {x.from?.avatar ? (
          <img src={x.from?.avatar} alt={x.from?.name} />
        ) : (
          <BsPersonFill />
        )}
      </div>
      <div className="feedback-container">
        <div className="main-feedback">
          <h2>{name}</h2>
          {isShoMore ? (
            <p>
              {!SHOW_MORE ? contentSlice : content}
              <a
                className="show-more"
                onClick={() => SET_SHOW_MORE(!SHOW_MORE)}
              >
                {!SHOW_MORE ? "Show more" : "Hide"}
              </a>
            </p>
          ) : (
            <p>{contentSlice}</p>
          )}
        </div>
        <div className="timestamp">{x.createdAt}</div>
      </div>
      <div className="options">
        {!isRead ? (
          <div className="mail" onClick={handleReadMail}>
            <HiOutlineMail />
            <p className="descrip">Mark as read</p>
          </div>
        ) : (
          <div className="mail" onClick={handleReadMail}>
            <HiOutlineMailOpen />
            <p className="descrip">Mark as unread</p>
          </div>
        )}
        <div className="mail" onClick={handleDeleteMail}>
          <BsTrash />
          <p className="descrip">Delete feedback</p>
        </div>
      </div>
    </CardMessagesContainer>
  );
}
