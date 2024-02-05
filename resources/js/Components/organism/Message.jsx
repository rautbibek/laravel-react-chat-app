import React from "react";

const Message = ({ align, message }) => {
    return (
        <div className={align}>
            <div className={`message `}>
                {message}
                <br />
                <p className="date">14 days ago</p>
            </div>
        </div>
    );
};

export default Message;
