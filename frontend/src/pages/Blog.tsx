import { useParams } from "react-router-dom"
import { useBlog } from "../Hooks"
import { FullBlog } from "../components/FullBlog"
import { BlogSkeleton } from "../components/BlogSkeleton"

export const Blog = () => {
    const {id} = useParams()
    const {loading, blog} = useBlog({
        id : id || ""
    })

    if(loading) {
        return <div>
            <BlogSkeleton />

        </div>
    }
    return (
        <div>
            <FullBlog blog={blog}/>
        </div>
    )
}