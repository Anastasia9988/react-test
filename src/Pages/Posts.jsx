import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchPosts, setPage, removePost } from "../store/postsSlice";
import { Card, Button, Spin, Tag } from "antd";
import { useObserver } from "../hooks/useObserver";
import { usePosts } from "../hooks/usePosts";
import PostFilter from "../Components/PostFilter";

const Posts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, total, page, limit, status } = useSelector((state) => state.posts);
    const lastElement = useRef();
    const [filter, setFilter] = useState({ sort: "", query: "" });
    const isLoading = status === "loading";

    const sortedAndSearchPosts = usePosts(items, filter.sort, filter.query);

    useEffect(() => {
        dispatch(fetchPosts({ limit, page }));
    }, [dispatch, page, limit]);

    useObserver(
        lastElement,
        sortedAndSearchPosts.length > 0 && page < Math.ceil(total / limit) && !isLoading,
        isLoading,
        () => dispatch(setPage(page + 1))
    );

    return (
        <div style={{ padding: 20 }}>
            <PostFilter filter={filter} setFilter={setFilter} />

            <div className="posts-container">
                {sortedAndSearchPosts.length ? (
                    sortedAndSearchPosts.map((post) => (
                        <Card
                            key={post.id}
                            title={post.title}
                            style={{ marginBottom: 20 }}
                            extra={
                                <>
                                    <Button
                                        type="primary"
                                        onClick={() => navigate(`/posts/${post.id}`)}
                                        style={{ marginRight: 8 }}
                                    >
                                        Открыть
                                    </Button>
                                    <Button danger onClick={() => dispatch(removePost(post.id))}>
                                        Удалить
                                    </Button>
                                </>
                            }
                        >
                            <p
                                style={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                }}
                            >
                                {post.body}
                            </p>
                            <div style={{ marginBottom: 10 }}>
                                {post.tags?.map((tag) => (
                                    <Tag key={tag}>{tag}</Tag>
                                ))}
                            </div>
                            <div>
                                ❤️ {post.reactions.likes} &nbsp;&nbsp; 👎 {post.reactions.dislikes}
                            </div>
                        </Card>
                    ))
                ) : (
                    <h2 style={{ textAlign: "center", marginTop: "50px" }}>Посты не найдены</h2>
                )}
            </div>

            <div ref={lastElement} style={{ height: 20 }} />

            {isLoading && <Spin style={{ display: "block", margin: "20px auto" }} />}
        </div>
    );
};

export default Posts;
