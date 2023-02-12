import { Controller } from "@hotwired/stimulus"
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "../components/App";
import { store } from "./store"


export default class extends Controller {
    connect() {
      const app = document.getElementById("home");        
      createRoot(app).render(
        <Provider store={store}>
          <App/>
        </Provider>
      );    
    }
}