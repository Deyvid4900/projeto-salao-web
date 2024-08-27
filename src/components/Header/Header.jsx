import React from "react";

function Header() {
  return (
    <div

      className="container-fluid p-3 d-flex flex-row justify-content-between align-items-center text-white"
      style={{ backgroundColor: "#FF5B5B",zIndex:1,position:'relative' }}
    >
      <img src="/src/assets/Group 3.png" alt="" />
      <div className="d-flex flex-row align-items-center gap-4 ">
        <div className="d-flex flex-column align-items-center">
          <span style={{fontWeight:600,fontSize:25}}>Deyvid</span>
          <span style={{fontWeight:300}}>Premium</span>
        </div>
        <div
          style={{ width: 60, height: 60, borderRadius: "50%" }}
          className="bg-white"
        ></div>
        <button className="btn btn-outline">
          <span class="material-symbols-outlined text-white">
            keyboard_arrow_down
          </span>
        </button>
      </div>
    </div>
  );
}

export default Header;
