"use client";
import { useEffect, useState } from "react";
import { Suspense } from "react";
import { useRouter,useSearchParams } from "next/navigation";
import From from "@components/Form";
const EditPrompt = () => {

 const router = useRouter()
  
    const searchParams = useSearchParams()
    const promptId = searchParams.get('id')
  const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
   useEffect(()=>{
            const getPromptDetails = async ()=>{
                const response = await fetch(`/api/prompt/${promptId}`)
                const data = await response.json()

                setPost({
                    prompt:data.prompt,
                    tag:data.tag
                })
            }
            if(promptId) getPromptDetails()
   },[promptId])
  const updateePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if(!promptId) return alert('Prompt ID not found')
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,         
        }),
      });

      if(response.ok){
        router.push("/")
      }
    } catch (error) {
        console.log(error)
    }
    finally{
        setSubmitting(false)
    }
  };

  return (
    <Suspense>
    <From
      type="Edit "
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateePrompt}
      ></From>
  </Suspense>
  );
};

export default EditPrompt;
