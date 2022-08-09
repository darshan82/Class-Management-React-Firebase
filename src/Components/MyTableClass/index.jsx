import React, { useCallback, useContext, useEffect, useState } from "react";
//
import {
  ActionsButtonContainer,
  Availability,
  MyTableContainer,
  NameClassesContainer,
  TutorName,
} from "./styled.js";
//
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
//
import { TiEdit } from "react-icons/ti";
import { VscTrash } from "react-icons/vsc";
//
import { AuthContext } from "../../Contexts/AuthContext";
import { db } from "../../database/index.js";
import { toast } from "react-toastify";
import { ModalEditClass } from "../ModalEditClass";
import Fuse from "fuse.js";

export function MyTableClass({
  typeHead,
  content,
  height,
  width,
  minWidth,
  ...rest
}) {
  // Context
  const { userGoogle } = useContext(AuthContext);
  // State
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [CLASSES_LIST, SET_CLASSES_LIST] = React.useState([]);
  const [FUSEJS_LIST, SET_FUSEJS_LIST] = React.useState([]);

  // Effects
  useEffect(() => {
    if (typeHead) {
      const options = {
        keys: [
          "nameClass",
          "tutor",
          "tutorRegister",
          "subject",
          "grade",
          "countStudents",
          "limitStudents",
          "id",
          "ref",
          "isFull",
        ],
      };
      let fuse = new Fuse(CLASSES_LIST, options);
      let search = fuse.search(typeHead);
      let data = search.map((x) => x.item);
      SET_FUSEJS_LIST([...data]);
    } else {
      SET_FUSEJS_LIST([]);
      getInfoFromDb();
    }
  }, [typeHead]);
  useEffect(() => {
    getInfoFromDb();
  }, [userGoogle]);

  const getInfoFromDb = () => {
    db.collection("classes")
      .doc(userGoogle.id)
      .collection("registered")
      .where("ref", "==", userGoogle.id)
      .onSnapshot((doc) => {
        let data = doc.docs.map((x) => {
          let id = x.id;
          return {
            ...x.data(),
            id,
          };
        });
        SET_CLASSES_LIST([...data]);
      });
  };

  function createData(code,numberClass, availability, countStudent, tutor, action) {
    return { code,numberClass, availability, countStudent, tutor, action };
  }

  let rows = () => {
    return FUSEJS_LIST[0]
      ? FUSEJS_LIST.map((x, i) => {
          let isFull = x.isFull;
          return createData(
            i
            ,
            <NameClasses  x={x} />,
            <Availability  className={isFull.toLowerCase()}>
              {isFull}
            </Availability>,
            x.countStudents,
            <TutorName >
              <p>{x.tutor}</p>
              <span># {x.tutorRegister}</span>
            </TutorName>,
            <ActionsButton  content={x} />
          );
        })
      : CLASSES_LIST.map((x, i) => {
          let isFull = x.isFull;
          return createData(
            i,
            <NameClasses x={x} />,
            <Availability className={isFull.toLowerCase()}>
              {isFull}
            </Availability>,
            x.countStudents,
            <TutorName>
              <p>{x.tutor}</p>
              <span># {x.tutorRegister}</span>
            </TutorName>,
            <ActionsButton content={x} />
          );
        });
  };

  // Colums
  const columns = [
    { id: "numberClass", label: "Class", minWidth: 170 },
    { id: "availability", label: "Availability", minWidth: 100 },
    {
      id: "countStudent",
      label: "Count of student",
      minWidth: 170,
      align: "center",
      format: (value) => Number(value),
    },
    {
      id: "tutor",
      label: "Tutor",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "action",
      label: "Action",
      minWidth: 100,
      align: "left",
      format: (value) => value,
    },
  ];

  // Componemts of row table
  function ActionsButton({ content }) {
    const { userGoogle } = useContext(AuthContext);
    const [OPEN_MODAL, SET_OPEN_MODAL] = useState(false);

    function deleteClass() {
      const deleted = db
        .collection("classes")
        .doc(userGoogle.id)
        .collection("registered")
        .doc(content.id)
        .delete()
        .then((e) => toast.success("Class is delete!"))
        .catch((err) => toast.error(err));

      return () => deleted;
    }

    function handleOnEdit(data) {
      const edited = db
        .collection("classes")
        .doc(userGoogle.id)
        .collection("registered")
        .doc(content.id)
        .update(data)
        .then((e) => toast.success("Class is Edit!"))
        .catch((err) => toast.error(err));

      return () => edited;
    }

    return (
      <>
        <ActionsButtonContainer>
          <div className="wrap-icon del" onClick={deleteClass}>
            <p className="delete-hover">Delete</p>
            <VscTrash />
          </div>
          <div
            className="wrap-icon edit"
            onClick={() => SET_OPEN_MODAL(!OPEN_MODAL)}
          >
            <p className="edit-hover">Edit</p>
            <TiEdit />
          </div>
        </ActionsButtonContainer>
        {OPEN_MODAL && (
          <ModalEditClass
            content={content}
            isOpen={OPEN_MODAL}
            onClose={() => SET_OPEN_MODAL(!OPEN_MODAL)}
            onEdit={handleOnEdit}
            style={{ zIndex: 999, position: "relative" }}
          />
        )}
      </>
    );
  }

  function NameClasses({ x }) {
    return (
      <NameClassesContainer>
        <h1>{x.nameClass} </h1>
        <p>{`${x.subject}, ${x.grade}`}</p>
      </NameClassesContainer>
    );
  }
  // Componemts of row table ^

  // Handle Functions
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Main Component
  return (
    <>
      <MyTableContainer {...rest} width={width} height={height}>
        <Paper
          sx={{
            width: "100%",
            minHeight: "750px",
            height: "100%",
            overflow: "unset",
          }}
        >
          <TableContainer
            sx={{ height: `calc(${height} - 10px)`, borderRadius: "12px" }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows()
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          {CLASSES_LIST.length >= 10 && (
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows().length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Paper>
      </MyTableContainer>
    </>
  );
}
