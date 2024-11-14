import { Link } from "react-router-dom";

interface BlogCardProps{
    authorName: string;
    title: string;
    content: string;
    publishedAt: string;
    id: string;
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedAt,
    id,

}:BlogCardProps) => {
    return(
        <Link to={`/blog/${id}`}>
            <div className="border-slate-400 border-b-2 pb-4 my-2 max-w-screen cursor-pointer">
                <div className="flex">
                    <div className="flex justify-center flex-col">
                        <Avatar authorName={authorName}/>
                    </div> 
                    <div className="font-extralight px-1 py-1">{authorName}</div>
                    <div className="flex justify-center flex-col pl-1">
                        <Circle />
                    </div>
                    <div className="font-extralight text-slate-400 px-1 py-1">{publishedAt}</div>
                </div>
                <div className="text-xl font-bold pt-1 pl-1">{title}</div>
                <div className="text-md font-thin pt-1 pl-1">{content.slice(0,100)+"..."}</div>
                <div className="text-slate-400 text-xs py-1 pl-1">
                    {`${Math.ceil(content.length/100)} minute(s) read`}
                </div>

            </div>
        </Link>
    )
}


export function Avatar({authorName}:{authorName:string}){
    return (

        <div className="relative inline-flex items-center justify-center w-7 h-7 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mr-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">{authorName[0]}</span>
        </div>

    )
}

function Circle(){
    return (
        <div className="justify-center items-center  w-1 h-1 bg-slate-400 rounded-full">

        </div>

    )
}