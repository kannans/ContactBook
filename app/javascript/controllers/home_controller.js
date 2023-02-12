import { Controller } from "@hotwired/stimulus"
import React from "react";
import { createRoot } from "react-dom/client";
import App from "../components/App";

export default class extends Controller {
    connect() {
      const app = document.getElementById("home");        
      createRoot(app).render(<App/>);    
    }
}