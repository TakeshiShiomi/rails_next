import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axiosInstance from '@lib/axios';

interface Post {
  id: number;
  title: string;
  body: string;
}

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`/posts/${id}`)
        .then((response) => {
          setPost(response.data);
        })
        .catch((error) => {
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
