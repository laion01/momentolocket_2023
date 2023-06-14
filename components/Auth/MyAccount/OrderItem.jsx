import { data } from "autoprefixer";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faCheck, faClose, faEye, faTrash, faGem, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";

export default function OrderItem({data, onOpenLabel}) {
    return (
        <tr className="px-[30px] text-[1rem] h-[3rem] border-b-[1px] border-[#D4D4D4] flex items-left w-full">
            <td className="text-[#9E785D] leading-[3rem] w-[80px] text-center"> # { data.id } </td>
            <td className="text-[#9E785D] leading-[3rem] w-[80px] flex items-center">
                <FontAwesomeSvgIcon icon={faGem} width={24} height={24} />
                <p className="ml-[0.5rem]"> { data.SoldProducts.length }</p>
            </td>
            <td className="text-[#9E785D] leading-[3rem] w-[120px] font-bold"> $ { data.totalPrice ? data.totalPrice : 0 } </td>
            <td className="text-[#9E785D] leading-[4rem] w-[150px] grow font-medium"> <Moment date={ data.createdAt } format="ddd, Do MM YYYY"/> </td>
            <td className="text-[#9E785D] leading-[3rem] w-[150px] grow font-medium flex items-center"> 
                <div className="w-[1.5rem] h-[1.5rem] rounded-full flex justify-center items-center" style={{ backgroundColor: data.status > 0? "green" : "red"}}>
                    <FontAwesomeSvgIcon icon={ data.status > 0 ? faCheck : faClose} width={16} height={16} color="white" />
                </div>
                <p className="ml-[0.5rem]"> { data.pid ? String(data.pid).substring(0,10)+'...' : "Not paid" } </p>
            </td>
            <td className="text-[#9E785D] leading-[3rem] w-[80px] grow font-medium flex items-center"> 
                <button onClick={onOpenLabel} className="flex items-center text-primary">
                    <FontAwesomeSvgIcon icon={faNewspaper} width={16} height={16} />
                    <p className="ml-[0.5rem]"> Label</p>
                </button>
            </td>
            <td className="flex items-center w-[100px]">
                <Link href={`/order?id=${data.id}`}>
                    <a target="_blank" className="w-[2rem] h-[2rem] rounded-full bg-[#996D01] text-white flex justify-center items-center mr-[0.5rem]">
                        <FontAwesomeSvgIcon icon={faEye} width={16} height={16}/>
                    </a>
                </Link>
                <Link href={`/order?id=${data.id}`}>
                    <a target="_blank" className="w-[2rem] h-[2rem] rounded-full bg-[#996D01] text-white flex justify-center items-center">
                        <FontAwesomeSvgIcon icon={faTrash} width={16} height={16}/>
                    </a>
                </Link>
            </td>
            {/* <td className="flex justify-start items-center w-[8rem] grow">
                <Image alt="" src="/images/download.svg" width={24} height={24} />
                <button className="ml-[0.5rem] text-primary text-[1rem]"> Download </button>
            </td> */}
        </tr>
    )
}