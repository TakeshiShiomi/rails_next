import React, { useEffect, useState } from 'react';
import axiosInstance from '@lib/axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Post {
  id: number;
  title: string;
  body: string;
}

const PostsIndex = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    axiosInstance
      .get('/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm('この投稿を削除しますか？');
    if (isConfirmed) {
      try {
        await axiosInstance.delete(`/posts/${id}`);
        setPosts(posts.filter((post) => post.id !== id));
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  return (
    <div>
      <h1>Posts</h1>
      <Link href="/posts/new">Create New Post</Link>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
            <button onClick={() => router.push(`/posts/${post.id}/edit`)}>Edit</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsIndex;
