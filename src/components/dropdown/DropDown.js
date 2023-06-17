import React from "react";
import "./DropDown.css";
import { FiMoreHorizontal } from "react-icons/fi";
const DropDown = ({ children }) => {
  return (
    <div className="dropdown">
      {/* <button onClick={myFunction} className="dropbtn"> */}
      <FiMoreHorizontal className="dropbtn" size="23px" onClick={myFunction} />
      {/* ... */}
      {/* </button> */}
      <div id="myDropdown" className="dropdown-content">
        {children}
        {/* <a>Link 1</a>
        <a>Link 2</a>
        <a>Link 3</a> */}
      </div>
    </div>
  );
};

export default DropDown;

const myFunction = (e) => {
  console.log("triggered button");

  // e.preventDefault();

  document.getElementById("myDropdown").classList.toggle("show");
};

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
