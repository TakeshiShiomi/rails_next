import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Post {
    id: number;
    title: string;
    content: string;
}

const PostsIndex = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/posts')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    return (
        <div>
            <h1>Posts</h1>
            <Link href="/posts/new">Create New Post</Link>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <Link href={`/posts/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostsIndex;
