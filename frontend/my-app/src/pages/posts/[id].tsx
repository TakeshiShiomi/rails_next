import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface Post {
    id: number;
    title: string;
    body: string;
}

const PostPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3000/api/v1/posts/${id}`)
                .then(response => {
                    setPost(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the post!', error);
                });
        }
    }, [id]);

    if (!post) return <div>Loading...</div>;

    return (
        <div>
            <h1>id:{post.id}</h1>
            <h2>title:{post.title}</h2>
            <p>body:{post.body}</p>
        </div>
    );
};

export default PostPage;
