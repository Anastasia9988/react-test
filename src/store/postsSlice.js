import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PostService from "../API/PostService";

// Получение постов
export const fetchPosts = createAsyncThunk(
    "posts/fetchPosts",
    async ({ limit, page }) => await PostService.getAll(limit, page)
);

// Получение поста по ID (для PostIdPage)
export const fetchPostById = createAsyncThunk(
    "posts/fetchPostById",
    async (id) => await PostService.getById(id)
);

const postsSlice = createSlice({
    name: "posts",
    initialState: {
        items: [],
        total: 0,
        page: 1,
        limit: 10,
        currentPost: null,
        status: "idle", // idle | loading | succeeded | failed
        error: null,
    },
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        removePost: (state, action) => {
            state.items = state.items.filter((p) => p.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "succeeded";

                if (state.page === 1) {
                    state.items = action.payload.posts;
                } else {
                    const newPosts = action.payload.posts.filter(
                        (p) => !state.items.some((sp) => sp.id === p.id)
                    );
                    state.items = [...state.items, ...newPosts];
                }

                state.total = action.payload.total;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchPostById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPostById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.currentPost = action.payload;
            })
            .addCase(fetchPostById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const { setPage, removePost } = postsSlice.actions;
export default postsSlice.reducer;
