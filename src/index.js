import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "assets/css/input.css";
import 'assets/css/main.css'
import AppRoute from "routes/AppRoute.route";
import {Provider} from 'react-redux'
import store from 'store/store'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 <Provider store={store}>
    <AppRoute />
 </Provider>
);

reportWebVitals();
