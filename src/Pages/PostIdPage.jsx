import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../store/postsSlice";
import { Card, Spin, Tag } from "antd";

const PostIdPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { currentPost, status, error } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(fetchPostById(id));
    }, [dispatch, id]);

    if (status === "loading") return <Spin size="large" style={{ display: "block", margin: "50px auto" }} />;
    if (error) return <h2 style={{ color: "red" }}>Ошибка: {error}</h2>;
    if (!currentPost) return null;

    return (
        <Card title={currentPost.title} style={{ margin: 20 }}>
            <p>{currentPost.body}</p>
            <div>
                {currentPost.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                ))}
            </div>
            <div style={{ marginTop: 10 }}>
                ❤️ {currentPost.reactions.likes}
                👎 {currentPost.reactions.dislikes}
            </div>
        </Card>
    );
};

export default PostIdPage;
