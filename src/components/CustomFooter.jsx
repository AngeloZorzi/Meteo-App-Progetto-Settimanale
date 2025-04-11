import React from "react";

function CustomFooter() {
  return (
    <footer className="text-center py-3 mt-5">
      <p>&copy; {new Date().getFullYear()} - Meteo App</p>
    </footer>
  );
}

export default CustomFooter;
