import { Link } from "react-router-dom"


export default function Price({key, item, name}) {
    console.log(item);
    return (
        <Link to={`../home/price/${item?.id}`}>
            <button className="flex justify-center items-center py-8 px-10 text-center bg-gray-300 border-1 border-gray-500 rounded-lg w-full"
            >
                <div className="flex flex-col">
                    <div className="flex space-x-2 mb-4">
                        <div class="text-2xl font-semibold">${item?.unit_price}</div>
                        <div class="text-2xl font-semibold">/</div>
                        <div class="text-xl leading-8 font-semibold">{item?.unit}</div>
                    </div>
                    
                    <div class="text-xl">{item?.store}</div>
                </div>
                
            </button>
        </Link>
        
        
    );
}