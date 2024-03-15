"use client";
import { useState, useEffect } from "react";
import PromptCard from "@components/PromptCard";

const PromptCardList = ({data,handleTagClick})=>{
  return (
    <div className="mt-16 prompt_layout">
             {data.map((post)=>(
              <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
             ))}
    </div>
  )
}

const Feed = () => {
   
  const [posts,setPosts] = useState([])
   const [searchText,setSearchText] = useState('')
   const [searchTimeout,setSearchTimeout] = useState(null)
   const [searchedResults,setSearchedResults] = useState([])
   useEffect(()=>{
    const fecthPosts = async ()=>{
      const response = await fetch('/api/prompt')
      const data = await response.json()
      setPosts(data)
    }
    fecthPosts()
 },[])
   const handleSearchTextChange = (e)=>{
          clearTimeout(searchTimeout)
          setSearchText(e.target.value)
          setSearchTimeout(setTimeout(()=>{
            const search = filterPrompts(e.target.value)
            setSearchedResults(search)
          },500))
   }
   
   
     
    const filterPrompts = (searchText) =>{
      const regex = new RegExp(searchText,'i')
      return posts.filter((item)=>(
        regex.test(item.creator.usernamae) || 
        regex.test(item.tag) || 
        regex.test(item.prompt)
      ))
    }
    const handleTagClick = (tagName)=>{
      setSearchText(tagName)
      const search = filterPrompts(tagName);
      setSearchedResults(search)
    }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="search for a tag or a username"
          value={searchText}
          onChange={handleSearchTextChange}
          required
          className="search_input peer"
        />
      </form>
     {searchText ? (
       <PromptCardList data={searchedResults} handleTagClick={handleTagClick}/>

     ):(
      <PromptCardList data={posts} handleTagClick={handleTagClick}/>
     )}
    </section>
  );
};

export default Feed;
