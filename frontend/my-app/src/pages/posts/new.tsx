import React, { useState } from 'react';
import axiosInstance from '@lib/axios';
import { useRouter } from 'next/router';

const NewPost = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const router = useRouter();
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await axiosInstance.post('/posts', {
                api_v1_post: {
                    title,
                    body,
                },
            });
            router.push('/posts');
        } catch (error) {
            console.error('There was an error creating the post!', error);
        }
    };
    return (
        <div>
            <h1>Create New Post</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="body">Body:</label>
                    <textarea
                        id="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>
                <button type="submit">Create Post</button>
            </form>
        </div>
    );
};
export default NewPost;
