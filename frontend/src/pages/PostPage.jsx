import { getPostTerbaru, getPostTerlama } from "../modules/fetch";
import { useState, useContext } from "react";
import { PostContext } from "../contexts/PostContext";
import DetailPost from "../components/PostPage/DetailPost";
import ListPost from "../components/PostPage/ListPost";
import Partner from "../components/Partner";

function PostPage() {
  const { postState, postDetailState, setPostState } = useContext(PostContext); // list semua post
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTags, setSelectedTags] = useState(null);

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const filterByTags = (category) => {
    setSelectedTags(category);
    setCurrentPage(1);
  };

  const filterByTime = async (category) => {
    if (category == 'terbaru') {
      try {
        const response = await getPostTerbaru(); // Fetch data
        if (response.status[1] === "Success") {
          setPostState(response.data); // Set state if the response is successful
        }
      } catch (err) {
        console.log(err)
      }
    } else if (category == 'terlama') {
      try {
        const response = await getPostTerlama(); // Fetch data
        if (response.status[1] === "Success") {
          setPostState(response.data); // Set state if the response is successful
        }
      } catch (err) {
        console.log(err)
      }
    }
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(postState)
    ? postState
      .filter((post) => selectedCategory === null || post.post_category === selectedCategory)
      .filter((post) => selectedTags === null || post.post_tags === selectedTags)
      .slice(indexOfFirstItem, indexOfLastItem)
    : [];

  return (
    <>
    
      <div className="bg-base-100 mt-5 flex justify-center p-5 gap-3">
        <select 
          className="select select-bordered w-full max-w-xs"
          onChange={(e) => filterByCategory(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled hidden>Categories</option>
          {Array.isArray(postState) &&
          postState.map((post) => (
            <option key={post.id} value={post.post_category}>{post.post_category}</option>
          ))}
        </select>
        <select 
          className="select select-bordered w-full max-w-xs"
          onChange={(e) => filterByTags(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled hidden>Tags</option>
          {Array.isArray(postState) &&
          postState.map((post) => (
            <option key={post.id} value={post.post_tags}>{post.post_tags}</option>
          ))}
        </select>
        <select 
          className="select select-bordered w-full max-w-xs"
          onChange={(e) => filterByTime(e.target.value)}
          defaultValue=""
        >
          <option value="terbaru">Terbaru</option>
          <option value="terlama">Terlama</option>
        </select>
      </div>

      <div className="w-screen ms-0 mt-5 mx-0 max-w-fit">
        <div className="strips w-100 py-2 relative text-2xl">
          <b className="strips-text">POSTINGAN / DEMAND / KEINGINAN / JOB PORTAL / PROBLEM / WISHES / ISSUES / </b>
          <b className="strips-text">POSTINGAN / DEMAND / KEINGINAN / JOB PORTAL / PROBLEM / WISHES / ISSUES / </b>
          <b className="strips-text">POSTINGAN / DEMAND / KEINGINAN / JOB PORTAL / PROBLEM / WISHES / ISSUES / </b>
          <b className="strips-text">POSTINGAN / DEMAND / KEINGINAN / JOB PORTAL / PROBLEM / WISHES / ISSUES / </b>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-6 mb-16 mx-5 xl:mx-32">
        <div className="row-span-2 flex flex-col text-xl items-center pt-6 pb-10 h-fit">

          <div className="flex-auto grid grid-cols gap-4 card w-full mb-5">
            {currentItems.map((post, id) => (
              <div key={id}>
                <ListPost post={post} id={id} />
              </div>
            ))}
          </div>

          <div className="join grid grid-cols-2 mt-5">
            <button className="join-item btn btn-outline" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              Previous page
            </button>
            <button className="join-item btn btn-outline" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentItems.length < itemsPerPage}>
              Next
            </button>
          </div>

        </div>

        <div className="col-span-2 p-10 bg-base-100 card shadow-md mt-6 min-w-40 h-fit sticky top-5 hidden lg:block">
          <DetailPost data={postDetailState} />
        </div>
        
      </div>
      <Partner />
    </>
  )
}

export default PostPage;
