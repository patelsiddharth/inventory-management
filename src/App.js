import "./styles.css";
import Widget from "./Widget";
import AdminPanel from "./AdminPanel";
import InventoryTable from "./InventoryTable";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import CategoryIcon from "@mui/icons-material/Category";
import CloseIcon from '@mui/icons-material/Close';
import Dialog, { Dis } from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export default function App() {
  const [itemList, setItemList] = useState([]);
  const [isUser, setIsUser] = useState(false);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalStoreValue, setTotalStoreValue] = useState(0);
  const [totalOutOfStockProduct, setTotalOutOfStockProduct] = useState(0);
  const [totalCategory, setTotalCategory] = useState(0);

  const [open, setOpen] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState({ name: '', category: '', price: '', quantity: '', value: '' });

  const URL = "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory";

  useEffect(() => {
    (async function fetchData() {
      // const response = await fetch(URL);
      // const parsedResponse = await response.json();
      const parsedResponse = [
        {
          "name": "Bluetooth",
          "category": "Electronic",
          "value": "$150",
          "quantity": 5,
          "price": "$30"
        },
        {
          "name": "Edifier M43560",
          "category": "Electronic",
          "value": "0",
          "quantity": 0,
          "price": "$0"
        },
        {
          "name": "Sony 4k ultra 55 inch TV",
          "category": "Electronic",
          "value": "$1190",
          "quantity": 17,
          "price": "$70"
        },
        {
          "name": "Samsumg 55 inch TV",
          "category": "Electronic",
          "value": "$600",
          "quantity": 50,
          "price": "$12"
        },
        {
          "name": "samsumg S34 Ultra",
          "category": "phone",
          "value": "$0",
          "quantity": 0,
          "price": "$0"
        }
      ]
      parsedResponse.forEach((item) => {
        item.isDisabled = false;
        const arr = new Uint32Array(1);
        const uniqID = window.crypto.getRandomValues(arr);
        item.id = uniqID[0];
      });

      calculateWidgetData(parsedResponse);
      setItemList(parsedResponse);
    })();
  }, []);

  function calculateWidgetData(data) {
    let totalVal = 0, outOfStock = 0, categorySet = new Set();

    data.forEach((item) => {
      totalVal += parseFloat(item.value.replace(/\$/g, ''));
      if (item.quantity === 0) {
        outOfStock++;
      }
      categorySet.add(item.category)
    });

    setTotalProduct(parseInt(data.length))
    setTotalStoreValue(totalVal.toLocaleString('en-US'));
    setTotalOutOfStockProduct(outOfStock)
    setTotalCategory(categorySet.size);
  }

  function updateIsUser() {
    setIsUser((prev) => !prev);
  }

  function updateItemList(newList) {
    calculateWidgetData(newList);
    setItemList(newList);
  }

  function handleDialogOpen(item) {
    setSelectedItemForEdit({
      ...item,
      price: parseFloat(item.price.replace(/\$/g, '')),
      value: parseFloat(item.value.replace(/\$/g, ''))
    });
    setOpen(true);
  }
  function handleDialogSave() {
    itemList.forEach(item => {
      if (item.id === selectedItemForEdit.id) {
        item.category = selectedItemForEdit.category;
        item.price = `$${selectedItemForEdit.price}`;
        item.quantity = selectedItemForEdit.quantity;
        item.value = `$${selectedItemForEdit.value}`;
      }
    });
    calculateWidgetData(itemList);
    setItemList([...itemList]);
    setSelectedItemForEdit({ name: '', category: '', price: '', quantity: '', value: '' });
    setOpen(false);
  }
  function handleDialogClose() {
    setSelectedItemForEdit({ name: '', category: '', price: '', quantity: '', value: '' });
    setOpen(false);
  };

  function handlePriceChange(e) {
    setSelectedItemForEdit({
      ...selectedItemForEdit,
      price: e.target.value,
      value: selectedItemForEdit.quantity * e.target.value
    })
  }

  function handleQuantityChange(e) {
    setSelectedItemForEdit({
      ...selectedItemForEdit,
      quantity: e.target.value,
      value: selectedItemForEdit.price * e.target.value
    })
  }

  const CustomDialog = styled(Dialog)(() => ({
    '& .MuiPaper-root': {
      backgroundColor: '#292b27'
    },
  }));

  return (
    <UserContext.Provider value={{ isUser, updateIsUser }}>
      <div className="App">
        <AdminPanel />
        <h1 className="inventory-header">Inventory stats</h1>
        <div className="widget-container">
          <Widget icon={ShoppingCartIcon} label="Total product" value={totalProduct} />
          <Widget
            icon={CurrencyExchangeIcon}
            label="Total store value"
            value={totalStoreValue}
          />
          <Widget
            icon={RemoveShoppingCartIcon}
            label="Out of stocks"
            value={totalOutOfStockProduct}
          />
          <Widget icon={CategoryIcon} label="No of Category" value={totalCategory} />
        </div>
        <InventoryTable itemList={itemList} updateItemList={updateItemList} openDialog={handleDialogOpen} />
        <CustomDialog
          open={open}
          onClose={handleDialogClose}
        >
          <div className="edit-dialog">
            <div className="edit-dialog-header">
              <span className="edit-dialog-header-title">Edit Product</span>
              <span className="edit-dialog-header-btn"><CloseIcon /></span>
            </div>
            <div>
              {selectedItemForEdit.name}
            </div>
            <div className="edit-dialog-content">
              <span className="edit-dialog-content-item">
                <span>Category</span>
                <input
                  type='text'
                  value={selectedItemForEdit.category}
                  onChange={(e) => setSelectedItemForEdit({ ...selectedItemForEdit, category: e.target.value })}
                />
              </span>
              <span className="edit-dialog-content-item">
                <span>price</span>
                <input type='text' value={selectedItemForEdit.price} onChange={handlePriceChange} />
              </span>
              <span className="edit-dialog-content-item">
                <span>quantity</span>
                <input type='text' value={selectedItemForEdit.quantity} onChange={handleQuantityChange} />
              </span>
              <span className="edit-dialog-content-item">
                <span>value</span>
                <input type='text' disabled value={selectedItemForEdit.value} />
              </span>
            </div>
            <div className="edit-dialog-footer">
              <span className="edit-dialog-footer-cancel-btn" onClick={handleDialogClose}>Cancel</span>
              <span className="edit-dialog-footer-save-btn" onClick={handleDialogSave}>Save</span>
            </div>
          </div>
        </CustomDialog>
      </div>
    </UserContext.Provider>
  );
}
