import { useContext } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserContext } from "./App";

export default function InventoryTable({
  itemList,
  updateItemList,
  openDialog,
}) {
  const { isUser } = useContext(UserContext);

  function handleEdit(selectedItem) {
    if (!isUser && !selectedItem.isDisabled) {
      openDialog(selectedItem);
    }
  }

  function handleVisibility(selectedItem, value) {
    if (!isUser) {
      selectedItem.isDisabled = value;
      updateItemList([...itemList]);
    }
  }

  function handleDelete(selectedItem) {
    if (!isUser) {
      const newList = itemList.filter((iItem) => iItem.id !== selectedItem.id);
      updateItemList([...newList]);
    }
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#212124",
      color: theme.palette.common.white,
      borderBottom: "1px solid #515151",
    },
    [`&.${tableCellClasses.body}`]: {
      backgroundColor: "#212124",
      color: theme.palette.common.white,
      borderBottom: "1px solid #515151",
    },
  }));

  return (
    <div className="inventory-table">
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, border: "1px solid #515151" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <span className="table-header-cell">Name</span>
              </StyledTableCell>
              <StyledTableCell>
                <span className="table-header-cell">Category</span>
              </StyledTableCell>
              <StyledTableCell>
                <span className="table-header-cell">Price</span>
              </StyledTableCell>
              <StyledTableCell>
                <span className="table-header-cell">Quantity</span>
              </StyledTableCell>
              <StyledTableCell>
                <span className="table-header-cell">Value</span>
              </StyledTableCell>
              <StyledTableCell>
                <span className="table-header-cell">ACTION</span>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itemList.map((item) => (
              <TableRow key={item.name}>
                <StyledTableCell>
                  <span className={item.isDisabled ? "item-disabled" : ""}>
                    {item.name}
                  </span>
                </StyledTableCell>
                <StyledTableCell>
                  <span className={item.isDisabled ? "item-disabled" : ""}>
                    {item.category}
                  </span>
                </StyledTableCell>
                <StyledTableCell>
                  <span className={item.isDisabled ? "item-disabled" : ""}>
                    {item.price}
                  </span>
                </StyledTableCell>
                <StyledTableCell>
                  <span className={item.isDisabled ? "item-disabled" : ""}>
                    {item.quantity}
                  </span>
                </StyledTableCell>
                <StyledTableCell>
                  <span className={item.isDisabled ? "item-disabled" : ""}>
                    {item.value}
                  </span>
                </StyledTableCell>
                <StyledTableCell>
                  <div className="row-action">
                    <EditIcon
                      className={
                        isUser || item.isDisabled
                          ? "is-disable"
                          : "is-active edit-btn"
                      }
                      onClick={() => handleEdit(item)}
                    />
                    {item.isDisabled ? (
                      <VisibilityOffIcon
                        className={isUser ? "is-disable" : "is-active show-btn"}
                        onClick={() => handleVisibility(item, false)}
                      />
                    ) : (
                      <RemoveRedEyeIcon
                        className={isUser ? "is-disable" : "is-active hide-btn"}
                        onClick={() => handleVisibility(item, true)}
                      />
                    )}

                    <DeleteIcon
                      className={isUser ? "is-disable" : "is-active delete-btn"}
                      onClick={() => handleDelete(item)}
                    />
                  </div>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
