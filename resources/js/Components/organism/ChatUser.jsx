import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Avatar, Divider, List, Skeleton, Badge } from "antd";
import axios from "axios";
import { Link } from "@inertiajs/react";

const ChatUser = ({ user }) => {
    const [total, setTotal] = useState(100);
    const [loading, setLoading] = useState(false);
    const [nextPageUrl, setNextPageUrl] = useState("/chat-users");
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const getUsers = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        setPage(page + 1);
        axios
            .get(`/chat-users?page=${page}`)
            .then((res) => {
                setTotal(res.data.total);
                setTotal(res.data.total);
                if (res.data.last_page <= page) {
                    setHasMore(false);
                }
                setData([...data, ...res.data.data]);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
    };
    const goto = () => {};
    useEffect(() => {
        getUsers();
    }, []);
    return (
        <div
            id="scrollableDiv"
            style={{
                height: 630,
                overflow: "auto",
                padding: "0px 0px",
            }}
        >
            <InfiniteScroll
                dataLength={data.length}
                next={getUsers}
                hasMore={hasMore}
                loader={
                    <Skeleton
                        avatar
                        paragraph={{
                            rows: 1,
                        }}
                        active
                    />
                }
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
            >
                {data && (
                    <List
                        dataSource={data}
                        renderItem={(item, index) => (
                            <Link href={route("chat.user", item.id)}>
                                <List.Item
                                    style={{ padding: "10px", gap: "0px" }}
                                    className={
                                        user?.id == item.id ? "selected" : ""
                                    }
                                    key={index}
                                    onClick={goto}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                src={
                                                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZyeylHD5tbJBruH48HgPdoKpmFsNJfBKXjhifVPO3gA&s"
                                                }
                                            />
                                        }
                                        title={item?.name}
                                        description={<small>Online</small>}
                                    />
                                    {/* <Badge count={Math.floor(Math.random() * 5)} /> */}
                                </List.Item>
                            </Link>
                        )}
                    />
                )}
            </InfiniteScroll>
        </div>
    );
};

export default ChatUser;
