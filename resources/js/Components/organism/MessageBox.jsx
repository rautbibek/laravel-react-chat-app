import React, { useState } from "react";
import { Flex, Input } from "antd";
import axios from "axios";
const { TextArea } = Input;
const MessageBox = ({ selected, setMessages }) => {
    const [message, setMessage] = useState("");
    const handleKeyPress = (e) => {
        //
        if (e.key === "Enter" || e.which === 13) {
            message.trim();
            axios
                .post("/send/message", {
                    message: message,
                    receiver_id: selected,
                })
                .then((res) => {
                    setMessages((prevItems) => [
                        ...prevItems,
                        res.data.message,
                    ]);
                })
                .catch((error) => {
                    console.log(error?.response?.data?.message);
                });
            setMessage("");
        }
    };
    return (
        <div>
            <TextArea
                rows={2}
                disabled={selected ? false : true}
                placeholder="Type your message and hit enter...."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
            />
        </div>
    );
};

export default MessageBox;
