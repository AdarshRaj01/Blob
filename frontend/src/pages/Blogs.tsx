import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton"
import { useBlogs } from "../Hooks"



export const Blogs = () => {
    const {loading, blogs} = useBlogs()

    if(loading){
        return <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
        </div>
    }


    return (
        <div>
            <Appbar />
            <div className="flex justify-center max-w-screen my-2">
                <div className="">
                    {blogs.map(blog=>
                        <BlogCard 
                            id={blog.id}
                            authorName={blog.author.name || "Anonymous"}
                            title={blog.title}
                            content={blog.content}
                            publishedAt={""}                        />
                    )}
                    
                </div>
            </div>
        </div>
    )
}

