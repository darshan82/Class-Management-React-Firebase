import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { ModalAddStudents } from "../../Components/ModalAddStudents/index.jsx";
import { AuthContext } from "../../Contexts/AuthContext/index.jsx";
import { db } from "../../database/index.js";
import { MyTableStudents } from "../../MyTableStudents/index.jsx";
import { MainContent } from "./styled.js";
import { HeaderPage } from "./styled.js";
//
import { StudentsContainer } from "./styled.js";

export function Students() {
  const [OPEN_MODAL, SET_OPEN_MODAL] = useState(false);
  const [TYPE_HEAD, SET_TYPE_HEAD] = useState("");
  const { userGoogle } = useContext(AuthContext);

  function handleAddStudents(data) {
    data.ref = userGoogle.id;
    db.collection("students")
      .doc(userGoogle.id)
      .collection("student")
      .add(data)
      .then(() => toast.success("Class created successfully"))
      .catch((err) => toast(err));
  }
  
  return (
    <>
      <StudentsContainer>
        <HeaderPage>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => SET_TYPE_HEAD(e.target.value)}
          />
          <button onClick={() => SET_OPEN_MODAL(!OPEN_MODAL)}>Create</button>
        </HeaderPage>
        <MainContent>
          <MyTableStudents
            typeHead={TYPE_HEAD}
            style={{ zIndex: 0, position: "relative" }}
            minWidth={"850px"}
            width={"95%"}
            height={"min-content"}
          />
        </MainContent>
      </StudentsContainer>
      {OPEN_MODAL && (
        <ModalAddStudents
          style={{ zIndex: 99, position: "relative" }}
          isOpen={OPEN_MODAL}
          onClose={() => SET_OPEN_MODAL(!OPEN_MODAL)}
          onCreate={handleAddStudents}
        />
      )}
    </>
  );
}
