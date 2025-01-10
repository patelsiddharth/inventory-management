import "./styles.css";
import Widget from "./Widget";
import AdminPanel from "./AdminPanel";
import InventoryTable from "./InventoryTable";
import Backdrop from "@mui/material/Backdrop";
import CategoryIcon from "@mui/icons-material/Category";
import CircularProgress from "@mui/material/CircularProgress";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { createContext, useState, useEffect, useMemo } from "react";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

export const UserContext = createContext();
const URL = "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory";

export default function App() {
    const [loading, setLoading] = useState(false);
    const [itemList, setItemList] = useState([]);
    const [isUser, setIsUser] = useState(false);
    const [totalProduct, setTotalProduct] = useState(0);
    const [totalStoreValue, setTotalStoreValue] = useState(0);
    const [totalOutOfStockProduct, setTotalOutOfStockProduct] = useState(0);
    const [totalCategory, setTotalCategory] = useState(0);
    
    const widgetData = useMemo(
        () => ({
            totalProduct,
            totalStoreValue,
            totalOutOfStockProduct,
            totalCategory,
        }),
        [totalProduct, totalStoreValue, totalOutOfStockProduct, totalCategory]
    );

    useEffect(() => {
        (async function fetchData() {
            try 
            {
                setLoading(true);
                // const response = await fetch(URL);
                // const parsedResponse = await response.json();
                const parsedResponse = [
                    {
                        name: "Bluetooth",
                        category: "Electronic",
                        value: "$150",
                        quantity: 5,
                        price: "$30",
                    },
                    {
                        name: "Edifier M43560",
                        category: "Electronic",
                        value: "0",
                        quantity: 0,
                        price: "$0",
                    },
                    {
                        name: "Sony 4k ultra 55 inch TV",
                        category: "Electronic",
                        value: "$1190",
                        quantity: 17,
                        price: "$70",
                    },
                    {
                        name: "Samsumg 55 inch TV",
                        category: "Electronic",
                        value: "$600",
                        quantity: 50,
                        price: "$12",
                    },
                    {
                        name: "samsumg S34 Ultra",
                        category: "phone",
                        value: "$0",
                        quantity: 0,
                        price: "$0",
                    },
                ];
                parsedResponse.forEach((item) => {
                    item.isDisabled = false;
                    const arr = new Uint32Array(1);
                    const uniqID = window.crypto.getRandomValues(arr);
                    item.id = uniqID[0];
                });

                calculateWidgetData(parsedResponse);
                setItemList(parsedResponse);
            } 
            catch (e) 
            {
                console.log(e);
            } 
            finally
            {
                setLoading(false);
            }
        })();
    }, []);

    function calculateWidgetData(data) {
        let totalVal = 0,
            outOfStock = 0,
            categorySet = new Set();

        data.forEach((item) => {
            totalVal += parseFloat(item.value.replace(/\$/g, ""));
            if (item.quantity === 0) {
                outOfStock++;
            }
            categorySet.add(item.category);
        });

        setTotalProduct(parseInt(data.length));
        setTotalStoreValue(totalVal.toLocaleString("en-US"));
        setTotalOutOfStockProduct(outOfStock);
        setTotalCategory(categorySet.size);
    }

    function updateIsUser() {
        setIsUser((prev) => !prev);
    }

    function updateItemList(newList) {
        calculateWidgetData(newList);
        setItemList(newList);
    }

    return (
        <UserContext.Provider value={{ isUser, updateIsUser }}>
            <Backdrop
                sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="App">
                <AdminPanel />
                <h1 className="inventory-header">Inventory stats</h1>
                <div className="widget-container">
                    <Widget
                        icon={ShoppingCartIcon}
                        label="Total product"
                        value={widgetData.totalProduct}
                    />
                    <Widget
                        icon={CurrencyExchangeIcon}
                        label="Total store value"
                        value={widgetData.totalStoreValue}
                    />
                    <Widget
                        icon={RemoveShoppingCartIcon}
                        label="Out of stocks"
                        value={widgetData.totalOutOfStockProduct}
                    />
                    <Widget
                        icon={CategoryIcon}
                        label="No of Category"
                        value={widgetData.totalCategory}
                    />
                </div>
                <InventoryTable
                    itemList={itemList}
                    updateItemList={updateItemList}
                />
            </div>
        </UserContext.Provider>
    );
}
