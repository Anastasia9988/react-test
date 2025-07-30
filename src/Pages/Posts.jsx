import React, {useEffect, useRef, useState} from "react";
import {usePosts} from "../hooks/usePosts"; // путь до вашего хука
import {useFetching} from "../hooks/useFetching"; // путь до другого хука
import PostService from "../API/PostService"; // путь до API-сервиса
import {getPageCount} from "../Utils/Pages";
import MyButton from "../Components/UI/Button/MyButton"; // путь до утилитарной функции

import PostForm from "../Components/PostForm"; // путь до формы для поста
import PostFilter from "../Components/PostFilter"; // путь до фильтра постов
import PostList from "../Components/PostList"; // путь до списка постов
import Loader from "../Components/UI/Loader/Loader"; // путь до загрузочного компонента
import Pagination from "../Components/UI/Pagination/Pagination";
import MyModal from "../Components/UI/MyModal/MyModal";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../Components/UI/Select/MySelect";


function Posts() {

    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);
    const lastElement = useRef();
    console.log("lastElement", lastElement);

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data]);
        const totalCount = (response.headers['x-total-count'])
        setTotalPages(getPageCount(totalCount, limit));
    })

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1);
    })

    useEffect(() => {
        fetchPosts(limit, page)
    }, [page, limit])


    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    }


    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
    }

    return (
        <div className="App">
            <button onClick={fetchPosts}>GET POSTS</button>
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Создать пост
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>

            <hr/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue="Кол-во элементов на странице"
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'Показать все посты'},
                ]}
            />
            {postError &&
                <h1>Произошла ошибка ${postError} </h1>
            }
            <PostList remove={removePost} posts={sortedAndSearchPosts} title="Посты про JS"/>
            <div ref={lastElement} style={{height: 20, backgroundColor: "pink"}}/>
            {isPostsLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
            }
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />

        </div>
    );
}

export default Posts;