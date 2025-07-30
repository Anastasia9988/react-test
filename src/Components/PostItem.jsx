import React from "react";
import MyButton from "./UI/Button/MyButton";
import {useNavigate} from "react-router-dom";

const PostItem = React.forwardRef(({ post, remove }, ref) => {
    const navigate = useNavigate();

    return (
        <div className="post" ref={ref}>
            <div className="post__content">
                <strong>{post.id}. {post.title}</strong>
                <div>{post.body}</div>
            </div>
            <div className="post__btns">
                <MyButton onClick={() => navigate(`/posts/${post.id}`)}>
                    Открыть
                </MyButton>
                <MyButton onClick={() => remove(post)}>
                    Удалить
                </MyButton>
            </div>
        </div>
    );
});

export default PostItem;
