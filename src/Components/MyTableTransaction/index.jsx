import React, { useCallback, useContext, useEffect, useState } from "react";
//
import {
  ActionsButtonContainer,
  Amount,
  MyTableContainer,
  TransactionsContainer,
  Date,
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
import Fuse from "fuse.js";
import moment from "moment";
import { ModalEditExpense } from "../ModalEditExpense/index.jsx";

export function MyTableTransaction({
  typeHead,
  JSON,
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
  const [TRANSACTION_LIST, SET_TRANSACTION_LIST] = React.useState([]);
  const [FUSEJS_LIST, SET_FUSEJS_LIST] = React.useState([]);
  

  // Effects
  useEffect(()=>{
    JSON(TRANSACTION_LIST)
  },[TRANSACTION_LIST])
  useEffect(() => {
    if (typeHead) {
      const options = {
        keys: ["type", "expense", "dateExpense", "id", "ref"],
      };
      let fuse = new Fuse(TRANSACTION_LIST, options);
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
    db.collection("finances")
      .doc(userGoogle.id)
      .collection("expense")
      .where("ref", "==", userGoogle.id)
      .onSnapshot((doc) => {
        let data = doc.docs.map((x) => {
          let data = x.data();
          let date = moment(data.dateExpense.toDate()).format().split("T")[0];
          data.dateExpense = date;
          let id = x.id;
          return {
            ...data,
            id,
          };
        });
        SET_TRANSACTION_LIST([...data]);
      });
  };

  function createData(code, type, expense, date,action) {
    return { code, type, expense, date, action };
  }

  let rows = () => {
    return FUSEJS_LIST[0]
      ? FUSEJS_LIST.map((x, i) => {
          return createData(
            i,
            <Transactions x={x} />,
            <Amount>{`RM ${x.expense}`}</Amount>,
            <DateContainer x={x} />,
            <ActionsButton content={x} />
          );
        })
      : TRANSACTION_LIST.map((x, i) => {
          return createData(
            i,
            <Transactions x={x} />,
            <Amount>{`RM ${x.expense}`}</Amount>,
            <DateContainer x={x} />,
            <ActionsButton content={x} />
          );
        });
  };

  // Colums
  const columns = [
    // { id: "code", label: "id", minWidth: 20 },
    { id: "type", label: "Transactions", minWidth: 100 },
    {
      id: "expense",
      label: "Amount",
      minWidth: 100,
      format: (value) => Number(value),
    },
    {
      id: "date",
      label: "Date",
      minWidth: 150,
      align: "center",
      format: (value) => value,
    },
    {
      id: "action",
      label: "Action",
      minWidth: 100,
      align: "center",
      format: (value) => value,
    },
  ];

  // Componemts of row table
  function ActionsButton({ content }) {
    const { userGoogle } = useContext(AuthContext);
    const [OPEN_MODAL, SET_OPEN_MODAL] = useState(false);

    function deleteClass() {
      const deleted = db
        .collection("finances")
        .doc(userGoogle.id)
        .collection("expense")
        .doc(content.id)
        .delete()
        .then((e) => toast.success("Expense is delete!"))
        .catch((err) => toast.error(err));

      return () => deleted;
    }

    function handleOnEdit(data) {
      const edited = db
        .collection("finances")
        .doc(userGoogle.id)
        .collection("expense")
        .doc(content.id)
        .update(data)
        .then((e) => toast.success("Expense is Edit!"))
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
          <ModalEditExpense
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

  function Transactions({ x }) {
    return (
      <TransactionsContainer>
        <h1>{x.type} </h1>
      </TransactionsContainer>
    );
  }
  function DateContainer({ x }) {
    let date = moment(x.dateExpense).format("LL");
    return <Date>{date}</Date>;
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
            // minHeight: "750px",
            height: "100%",
            overflow: "unset",
            border: "none",
          }}
        >
          <TableContainer
            sx={{ height: `calc(${height} - 50px)`, border: "none" }}
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
          {TRANSACTION_LIST.length >= 5 && (
            <TablePagination
              rowsPerPageOptions={[5, 15, 30]}
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
