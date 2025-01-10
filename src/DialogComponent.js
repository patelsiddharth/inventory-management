import { useState, useEffect, memo } from "react";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

const DialogComponent = memo(function DialogComponent({ open, setOpen, item, handleSave }) {
    const [selectedItem, setselectedItem] = useState({
        name: "",
        category: "",
        price: "",
        quantity: "",
        value: "",
    });

    useEffect(() => {
        setselectedItem({ ...item });
    }, [item]);

    function handleDialogSave() {
        if(selectedItem.category !== '' && selectedItem.price >= 0 && selectedItem.quantity >= 0)
        {
            handleSave(selectedItem);
            handleDialogClose();
        }
    }

    function handleDialogClose() {
        setselectedItem({
            name: "",
            category: "",
            price: "",
            quantity: "",
            value: "",
        });
        setOpen(false);
    }

    function handlePriceChange(e) {
        e.preventDefault();
        setselectedItem({
            ...selectedItem,
            price: Number(e.target.value),
            value: selectedItem.quantity * Number(e.target.value),
        });
    }

    function handleQuantityChange(e) {
        e.preventDefault();
        setselectedItem({
            ...selectedItem,
            quantity: Number(e.target.value),
            value: selectedItem.price * Number(e.target.value),
        });
    }

    function handleCategoryChange(e) {
        e.preventDefault();
        setselectedItem({
            ...selectedItem,
            category: e.target.value,
        })
    }

    const CustomDialog = styled(Dialog)(() => ({
        "& .MuiPaper-root": {
            backgroundColor: "#292b27",
        },
    }));

    return (
        <CustomDialog open={open} onClose={handleDialogClose}>
            <div className="edit-dialog">
                <div className="edit-dialog-header">
                    <span className="edit-dialog-header-title">Edit Product</span>
                    <span className="edit-dialog-header-btn" onClick={handleDialogClose}>
                        <CloseIcon />
                    </span>
                </div>
                <div>{selectedItem.name}</div>
                <div className="edit-dialog-content">
                    <span className="edit-dialog-content-item">
                        <span>Category</span>
                        <input
                            type="text"
                            value={selectedItem.category}
                            onChange={handleCategoryChange}
                        />
                    </span>
                    <span className="edit-dialog-content-item">
                        <span>price</span>
                        <input
                            type="number"
                            value={selectedItem.price}
                            onChange={handlePriceChange}
                        />
                    </span>
                    <span className="edit-dialog-content-item">
                        <span>quantity</span>
                        <input
                            type="number"
                            value={selectedItem.quantity}
                            onChange={handleQuantityChange}
                        />
                    </span>
                    <span className="edit-dialog-content-item">
                        <span>value</span>
                        <input type="text" disabled value={selectedItem.value} />
                    </span>
                </div>
                <div className="edit-dialog-footer">
                    <span
                        className="edit-dialog-footer-cancel-btn"
                        onClick={handleDialogClose}
                    >
                        Cancel
                    </span>
                    <span
                        className="edit-dialog-footer-save-btn"
                        onClick={handleDialogSave}
                    >
                        Save
                    </span>
                </div>
            </div>
        </CustomDialog>
    );
})

export default DialogComponent