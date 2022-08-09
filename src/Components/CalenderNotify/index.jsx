import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import { listeningDocInDb } from "../../database/index.js";
//
import { CardCalenderNotify } from "./CardCalenderNotify/index.jsx";
//
import { CalenderNotifyContainer } from "./styled.js";

export default function CalenderNotify() {
  const { userGoogle } = React.useContext(AuthContext);
  // State
  let dateNow = new moment().format("LLLL").split(",").slice(0, 2);
  const [LIST_NOTIFY, SET_LIST_NOTIFY] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      let snap = listeningDocInDb("schedule", userGoogle?.id, "events");
      snap.onSnapshot((data) => {
        let filter = data.docs.filter((x) => {
          let data = x.data();
          let start = new moment(data.start).format("");
          let s = start.split("T")[0];
          let now = new moment().format("YYYY-MM-DD");
          return now === s;
        });
        filter.sort((a, b) => {
          let data_a = new Date(a.data().start);
          let data_b = new Date(b.data().start);
          return data_a - data_b;
        });
        let doc = filter.map((x) => {
          let data = x.data();
          let s = data.start;
          let e = data.end;
          data.start = new moment(s).format("LT");
          data.end = new moment(e).format("LT");
          return data;
        });
        SET_LIST_NOTIFY(doc);
      });
    })();
  }, [userGoogle]);

  return (
    <CalenderNotifyContainer>
      <div className="head-c_notify">
        <h1>{dateNow}</h1>
      </div>
      <div className="content-c_notify">
        {/* ... */}
        {LIST_NOTIFY[0] ? (
          LIST_NOTIFY.map((x, i) => <CardCalenderNotify key={i} x={x} />)
        ) : (
          <h1 className="empty-field">No event today!</h1>
        )}
        {/* ... */}
      </div>
      <div className="shade" />
      <div className="view-all">
        <Link to="schedule">View All</Link>
      </div>
    </CalenderNotifyContainer>
  );
}
