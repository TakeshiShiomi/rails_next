import React, { useState, useEffect } from 'react';
import axiosInstance from '@lib/axios';
import { useRouter } from 'next/router';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`/posts/${id}`)
        .then((response) => {
          setTitle(response.data.title);
          setBody(response.data.body);
        })
        .catch((error) => {
          console.error('Error fetching post:', error);
        });
    }
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axiosInstance.put(`/posts/${id}`, {
        api_v1_post: {
          title,
          body,
        },
      });
      router.push('/posts');
    } catch (error) {
      console.error('There was an error updating the post!', error);
    }
  };

  return (
    <div>
      <h1>Edit Post</h1>
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
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
