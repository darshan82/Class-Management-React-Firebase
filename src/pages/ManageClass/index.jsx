import React, { useContext, useState } from "react";
import { MyTableClass } from "../../Components/MyTableClass/index";
//
import { HeaderPage, MainContent, ManageClassContainer } from "./styled.js";
import { ModalManagerClass } from "../../Components/ModalManagerClass";
import { AuthContext } from "../../Contexts/AuthContext/";
import { db } from "../../database";
import { toast } from "react-toastify";

export function ManageClass() {
  const [OPEN_MODAL, SET_OPEN_MODAL] = useState(false);
  const [TYPE_HEAD, SET_TYPE_HEAD] = useState("");
  const { userGoogle } = useContext(AuthContext);

  function handleCreateClass(data) {
    data.ref = userGoogle.id;
    db.collection("classes")
      .doc(userGoogle.id)
      .collection("registered")
      .add(data)
      .then(() => toast.success("Class created successfully"))
      .catch((err) => toast(err));
  }

  return (
    <>
      <ManageClassContainer>
        <HeaderPage>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => SET_TYPE_HEAD(e.target.value)}
          />
          <button onClick={() => SET_OPEN_MODAL(!OPEN_MODAL)}>Create</button>
        </HeaderPage>
        <MainContent>
          <MyTableClass
            typeHead={TYPE_HEAD}
            style={{ zIndex: 0, position: "relative" }}
            minWidth={"850px"}
            width={"95%"}
            height={"min-content"}
          />
        </MainContent>
      </ManageClassContainer>
      {OPEN_MODAL && (
        <ModalManagerClass
          style={{ zIndex: 99, position: "relative" }}
          isOpen={OPEN_MODAL}
          onClose={() => SET_OPEN_MODAL(!OPEN_MODAL)}
          onCreate={handleCreateClass}
        />
      )}
    </>
  );
}
