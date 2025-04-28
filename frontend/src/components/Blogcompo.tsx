interface BlogProps {
    post?: {
      title: string;
      content: string;
      media: string;
      createdAt: string;
    };
    loading: boolean;
  }
  
  const Blogcompo: React.FC<BlogProps> = ({ post, loading }) => {
    if (loading) {
        return <div role="status" className="animate-pulse">
        <div className="p-4 border-b  border-slate-200 flex justify-between items-center pb-4 w-screen max-w-screen-md cursor-pointer">
         <div className=" w-1/2 h-full">
         <div className="flex">
                <div className="h-4  bg-gray-200 rounded-full w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                <div className="flex justify-center flex-col pl-2 ">
                    {/* <Circle /> */}
                </div>
                <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                </div>
            </div>
            <div className="text-xl font-semibold pt-2">
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
            <div className="text-md font-thin">
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
            <div className="text-slate-500 text-sm font-thin pt-4">
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
         </div>
         <div className=" rounded-md bg-gray-200 p-1 scale-75">
          <img className="w-full h-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhbdwKtAL7RoUzHGmBEWjg-cm6zNWwYl3Y7Q&s" alt="Blog Image" />
         </div>
            
        </div>
      <span className="sr-only">Loading...</span>
      </div>
    }
  
    if (!post) {
      return null; // If no post is available, don't render anything.
    }
  
    return (
      <div className="p-4 border-b border-slate-200 flex justify-between items-center pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="w-1/2 h-full">
          <div className="text-xl font-semibold pt-2">{post.title}</div>
          <div className="text-md font-thin">{post.content.slice(0,100)}</div>
          <div className="text-slate-500 text-sm font-thin pt-4">{post.createdAt}</div>
        </div>
        <div className="rounded-xl p-1 scale-50 overflow-hidden  ">
          <img className="w-full h-full object-cover" src={post.media} alt="Blog Image" />
        </div>
      </div>
    );
  };
  
  export default Blogcompo;
  