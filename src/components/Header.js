import React from "react";

export function Header({title}) {
    return (
        <div
            className="content"
            style={{
                textAlign: "center",
                fontWeight: "bolder", // Makes the text bolder
                fontSize: "28px", // Increases the font size
                margin: "10px 0", // Adds some space above and below the div
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // Sets a custom font family
                color: "#333", // Sets the text color to a dark gray for elegance
                textShadow: "2px 2px 4px rgba(0,0,0,0.2)", // A more pronounced text shadow for depth
            }}
        >
            <h1>{title}</h1>
        </div>
    );
}
