import React, { useCallback, useContext, useEffect, useState } from "react";
//
import {
  ActionsButtonContainer,
  MyTableContainer,
  NameStudentContainer,
  ClassContainer,
  Contact,
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
import { toast } from "react-toastify";
import Fuse from "fuse.js";
import { ModalEditStudents, ModalEditStudent } from "../Components/ModalEditStudent/index.jsx";
import { db, storage } from "../database/index.js";
import { AuthContext } from "../Contexts/AuthContext";
import moment from "moment";

export function MyTableStudents({
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
  const [STUDENTS, SET_STUDENTS] = React.useState([]);
  const [FUSEJS_LIST, SET_FUSEJS_LIST] = React.useState([]);

  // Effects
  useEffect(() => {
    if (typeHead) {
      const options = {
        keys: [
          "id",
          "avatar",
          "birt",
          "classRegister",
          "grade",
          "nameStudent",
          "nationalNumberId",
          "paymentDues",
          "phone",
          "ref",
        ],
      };
      let fuse = new Fuse(STUDENTS, options);
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
    db.collection("students")
      .doc(userGoogle.id)
      .collection("student")
      .where("ref", "==", userGoogle.id)
      .onSnapshot((doc) => {
        let data = doc.docs.map((x) => {
          let id = x.id;
          return {
            ...x.data(),
            id,
          };
        });
        SET_STUDENTS([...data]);
      });
  };

  function createData(
    code,
    nameStudent,
    contact,
    paymenDue,
    classRegister,
    action
  ) {
    return { code, nameStudent, contact, paymenDue, classRegister, action };
  }

  let rows = () => {
    return FUSEJS_LIST[0]
      ? FUSEJS_LIST.map((x, i) => {
          return createData(
            i,
            <NameStudent x={x} />,
            <Contact>
              <span>{`Phone: ${x.phone}`}</span>
              <span>{`IC Number: ${x.nationalNumberId}`}</span>
            </Contact>,
            <p>{`RM ${x.paymentDues}`}</p>,
            <ClassContainer>
              <span># {x.classRegister}</span>
            </ClassContainer>,
            <ActionsButton content={x} />
          );
        })
      : STUDENTS.map((x, i) => {
          return createData(
            i,
            <NameStudent x={x} />,
            <Contact>
              <span>{`Phone: ${x.phone}`}</span>
              <span>{`IC Number: ${x.nationalNumberId}`}</span>
            </Contact>,
            <p>{`RM ${x.paymentDues}`}</p>,
            <ClassContainer>
              <span># {x.classRegister}</span>
            </ClassContainer>,
            <ActionsButton content={x} />
          );
        });
  };

  // Colums
  const columns = [
    { id: "nameStudent", label: "Student", minWidth: 80,align: "center" },
    { id: "contact", label: "Contact", minWidth: 100, align: "center" },
    {
      id: "paymenDue",
      label: "Payment dues",
      minWidth: 170,
      align: "center",
      format: (value) => Number(value),
    },
    {
      id: "classRegister",
      label: "Class Register",
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

    async function deleteClass() {
      let pic = content.avatar
      await storage.refFromURL(pic).delete()
      const deleted = db
        .collection("students")
        .doc(userGoogle.id)
        .collection("student")
        .doc(content.id)
        .delete()
        .then((e) => toast.success("Student is delete!"))
        .catch((err) => toast.error(err));

      return () => deleted;
    }

    function handleOnEdit(data) {
      const edited = db
        .collection("students")
        .doc(userGoogle.id)
        .collection("student")
        .doc(content.id)
        .update(data)
        .then((e) => toast.success("Student is Edit!"))
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
          <ModalEditStudents
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

  function NameStudent({ x }) {
    let birth = moment(x.birth.toDate()).format().split("T")[0];
    let pic = x?.avatar
    return (
      <NameStudentContainer>
        {pic?<img src={pic} alt="picture" />:(
          <div className="img"></div>
        )}
        <div className="wrap-name">
          <h1>{x.nameStudent} </h1>
          <p>{`birth: ${birth}, Grade: ${x.grade}`}</p>
        </div>
      </NameStudentContainer>
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
          {STUDENTS.length >= 10 && (
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
