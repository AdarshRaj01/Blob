import { useParams } from "react-router-dom"
import { useBlog } from "../Hooks"
import { FullBlog } from "../components/FullBlog"
import { BlogSkeleton } from "../components/BlogSkeleton"

export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog({
        id: id || ""
    });

    if (loading) {
        return (
            <div>
                <BlogSkeleton />
            </div>
        );
    }

    // Check if blog is undefined, and return early if so
    if (!blog) {
        return <div>Blog not found.</div>;
    }

    return (
        <div>
            {/* Now TypeScript knows that blog is not undefined */}
            <FullBlog blog={blog} />
        </div>
    );
};
