import React, { useEffect, useRef, useState } from "react";
import { Input, Avatar, Empty, message } from "antd";
import {
    MenuUnfoldOutlined,
    AudioOutlined,
    InfoCircleOutlined,
} from "@ant-design/icons";
import "./Messanger.css";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ChatUser from "@/Components/organism/ChatUser";
import MessageBox from "@/Components/organism/MessageBox";
import Message from "@/Components/organism/Message";
import { subscribeToChannel } from "@/pusher/pusher";
const { Search } = Input;

const Messanger = ({ auth, mustVerifyEmail, status, user, chats }) => {
    const onSearch = (e) => {
        // console.log(e.target.value);
        // console.log(appName);
    };
    const containerRef = useRef(null);
    const [messages, setMessages] = useState([]);
    // console.log(auth, "test");
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
    useEffect(() => {
        setMessages(chats);
        window.Echo.private(`chat.${auth.user.id}`).listen(
            "MessageSent",
            (event) => {
                containerRef.current.scrollTop = 0;
                console.log(event.message);
                setMessages((prevItems) => [...prevItems, event.message]);
            }
        );
        //
    }, []);

    useEffect(() => {
        containerRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Messanger" />
            <div className="chatContainer">
                <div className="chatUserList">
                    {/* <h4>Users</h4> */}
                    <Input
                        placeholder="Search User"
                        allowClear
                        onChange={onSearch}
                    />
                    <ChatUser user={user} />
                </div>

                <div className="chatBody">
                    <div className="chatHeader">
                        <div className="chat-title">
                            {user ? (
                                <>
                                    <Avatar
                                        src={
                                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZyeylHD5tbJBruH48HgPdoKpmFsNJfBKXjhifVPO3gA&s"
                                        }
                                    />
                                    {user?.name}
                                </>
                            ) : (
                                <>
                                    <MenuUnfoldOutlined />
                                    Messages
                                </>
                            )}
                        </div>
                        <InfoCircleOutlined />
                    </div>

                    <div className="messages">
                        {user ? (
                            messages?.map((item) => {
                                return (
                                    <Message
                                        key={item?.id}
                                        align={
                                            item?.from == auth?.user?.id
                                                ? "left"
                                                : "right"
                                        }
                                        message={item?.message}
                                    ></Message>
                                );
                            })
                        ) : (
                            <div className="empty">
                                <Empty
                                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                    imageStyle={{ height: 100 }}
                                    description={
                                        <span>
                                            No user <a href="#API">selected</a>
                                        </span>
                                    }
                                >
                                    {/* <Button type="primary">Create Now</Button> */}
                                </Empty>
                            </div>
                        )}
                        <div ref={containerRef}></div>
                    </div>
                    <div className="messageBox">
                        <MessageBox
                            setMessages={setMessages}
                            selected={user?.id}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Messanger;
