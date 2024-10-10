import { Link } from "react-router-dom"


export default function Item({key, item}) {
    return (
        <Link to={`home/${item?.id}`}>
            <button className="flex justify-center items-center py-8 px-10 text-center bg-gray-300 border-1 border-gray-500 rounded-lg w-full"
            >
                <h1 class="text-2xl font-semibold">{item?.name}</h1>
            </button>
        </Link>
        
        
    );
}