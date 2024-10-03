import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./index.css";
function Header() {
  const location = useLocation();
  return (
    <div
      className="container-fluid p-3 d-flex flex-row justify-content-between align-items-center text-white"
      style={{ backgroundColor: "#FF5B5B", zIndex: 10, position: "relative" }}
    >
      <img src="/src/assets/Group 3.png" alt="" />
      <div className="d-flex flex-row align-items-center gap-4 ">
        <div className="d-flex flex-column align-items-center">
          <span style={{ fontWeight: 600, fontSize: 25 }}>Deyvid</span>
          <span style={{ fontWeight: 300 }}>Premium</span>
        </div>
        <div
          style={{ width: 60, height: 60, borderRadius: "50%" }}
          className="bg-white"
        ></div>

        <div className="dropdown no-outline">
          <button
            className="btn no-outline dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          ></button>
          <ul className="dropdown-menu">
            <Link className="" to={"/Salao/Deyvid-Barber"}>
              <li className="dropdown-item">
                {/* <a className={location.pathname === "/Salao/Deyvid-Barber" ? "active" : ""}> */}
                Salão
                {/* </a> */}
              </li>
            </Link>
            <li className="dropdown-item">Another action</li>
            <li className="dropdown-item">Something else here</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
