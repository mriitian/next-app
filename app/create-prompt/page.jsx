'use client';

import Form from '@components/Form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React,{ useState } from 'react';


const CreatePrompt = () => {

    const router = useRouter();
    const { data: session } = useSession();

    const [submitting, SetSubmitting] = useState(false);
    const [post, SetPost] = useState({
        prompt: '',
        tag: '',
    });

    const createPrompt = async (e) => {
        e.preventDefault();
        SetSubmitting(true);
        try {
            const response = await fetch('api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag
                })
            })

            if(response.ok){
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        } finally{
            SetSubmitting(false);
        }
    }
  return (
    <Form 
        type="Create"
        post={post}
        SetPost={SetPost}
        submitting={submitting}
        handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt