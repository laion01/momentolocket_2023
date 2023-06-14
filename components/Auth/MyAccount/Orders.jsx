import { useEffect, useState } from "react";
import OrderItem from "./OrderItem";
import UTILS_API from "api/Util";
import { useAuth } from "store/hook";
import Image from "next/image";

export default function Orders({}) {
    const { userId } = useAuth()
    const [orders, setOrders] = useState([]);

    const [isLabelOpen, openLabel] = useState(false);
    const [selectedOrder, selectOrder] = useState({});
    useEffect(() => {
        load();
    }, []);

    const load = async() => {
        const res = await UTILS_API.getOrders(userId);
        setOrders(res);
    }

    return (
        <div className="bg-white rounded-[1rem] px-[1.125rem] py-[1rem] flex flex-col h-fit grow">
            <h6 className="text-[1.5rem] leading-[2.25rem] font-bold text-primary mb-[1rem]"> Orders </h6>

            <div className="flex flex-col px-[0.5625rem] w-full overflow-x-auto">
                <table className="min-h-[calc(100vh-15rem)]">
                    <thead>
                        <tr className="px-[30px] text-[1rem] leading-[1.6875rem] h-[5rem] border-b-[1px] border-[#D4D4D4] flex items-center">
                            <th className="text-left text-[#9E785D] text-[0.875rem] leading-[1.375] w-[80px] text-center"> Order ID </th>
                            <th className="text-left text-[#9E785D] text-[0.875rem] leading-[1.375] w-[80px]"> Items </th>
                            <th className="text-left text-[#9E785D] text-[1rem] leading-[1.375] w-[120px] font-medium"> Total Price </th>
                            <th className="text-left text-[#9E785D] text-[1rem] leading-[1.375] w-[150px] font-medium"> Created </th>
                            <th className="text-left text-[#9E785D] text-[1rem] leading-[1.375] w-[150px] font-medium"> Payment Id </th>
                            <th className="text-left text-[#9E785D] text-[1rem] leading-[1.375] w-[80px] grow font-medium"> Shipment </th>

                            <th className="text-left text-[#9E785D] text-[0.875rem] leading-[1.375] w-[100px]">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { orders.map((item, index) =>
                            <OrderItem data={item} key={index} onOpenLabel={() => {
                                selectOrder(item), openLabel(true)
                            }}/>
                        )}
                    </tbody>
                </table>
                
            </div>
            { isLabelOpen &&
                <div className="fixed top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center bg-[#000000a0] z-30" onClick={(e) => {openLabel(false)}}>
                    <div className="relative bg-transparent w-full h-full overflow-y-auto aspect-video">
                        <Image src={selectedOrder.shippingLabel} layout="fill"/>
                    </div>
                </div>
            }
        </div>
    )
}