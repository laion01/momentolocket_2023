import Image from "next/image"
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon"
import { faPlay } from "@fortawesome/free-solid-svg-icons"
import Item from "./Item"

export default function HowSection() {
    return (
        <div className="mx-[20px] md:mx-[40px] w-[calc(100vw-40px)] md:w-[calc(100vw-80px)] bg-[#F5F5F5] flex flex-col justify-center relative pt-[20px]">
            <h2 className="text-[2.5rem] md:text-[4rem] lg:text-[5rem] text-[#AC8118] text-center mt-[100px] mb-[40px]">
                How does it work?
            </h2>
            <div className="flex flex-col md:flex-row justify-center px-[1.5rem]">
                <div className="mr-[0px] md:mr-[146px]">
                    <Image alt="" width={591} height={590} src="/images/howwork.png"/>
                </div>
                <div className="w-full max-w-[591px] flex flex-col justify-center">
                    <h3 className="text-[#747067] text-[1.5rem] font-bold mb-[10px]">It&apos;s easy to create a Momento Photo Locket and save your cherished memories in 3 steps.</h3>
                    <div className="flex items-start mb-[16px]">
                        <p className="min-w-[27px] h-[27px] mr-[10px] leading-[27px] text-center rounded-full bg-[#996D01] text-white"> 1 </p>
                        <p className="text-[#747067] text-[1rem] leading-[27px]">
                            Choose a pendant
                        </p>
                    </div>
                    <div className="flex items-start mb-[16px]">
                        <p className="min-w-[27px] h-[27px] mr-[10px] leading-[27px] text-center rounded-full bg-[#996D01] text-white"> 2 </p>
                        <p className="text-[#747067] text-[1rem] leading-[27px]">
                            Create an account
                        </p>
                    </div>
                    <div className="flex items-start mb-[16px]">
                        <p className="min-w-[27px] h-[27px] mr-[10px] leading-[27px] text-center rounded-full bg-[#996D01] text-white"> 3 </p>
                        <p className="text-[#747067] text-[1rem] leading-[27px]">
                            Upload photos after you receive the jewelry by importing from Google Photos, iCloud, or your phone.
                        </p>
                    </div>
                    <div className="flex items-start mb-[16px]">
                        <p className="min-w-[27px] h-[27px] mr-[10px] leading-[27px] text-center rounded-full bg-[#996D01] text-white"> 4 </p>
                        <p className="text-[#747067] text-[1rem] leading-[27px]">
                            Tap your Locket to to your phone to see all your memories.
                        </p>
                    </div>
                    <p className="text-[#747067] text-[1.125rem] mt-[10px]">
                        To learn more on how to use Momento App, <span className="font-bold">click here.</span>
                    </p>
                </div>
            </div>
            <div className="flex flex-wrap justify-center items-center mt-[20px]">
                <Item image="/images/sharing.svg" title="Private Data" context="Access your memories anytime and anywhere with our free app, which comes with a limited amount of data storage. If you need more space, you can upgrade to 100gGB or more storage, just like you would with Dropbox. It is secure, private and  your personal family album."/>
                <Item image="/images/nobatteries.svg" title="No Batteries Needed" context="The NFC chip in your Momento® Digital locket runs without any type of battery and will work with any NFC-enabled smartphone." />
                <Item image="/images/waterproof.svg" title="Waterproof" context="Momento Lockets are waterproof. Care for it as  you would any piece of fine jewelry." />
                <Item image="/images/pearl.svg" title="Unique" context="Momento Digital Locket is a patented device and the first of its kind in the world. Don't settle for imitations; choose the original and trusted Momento Digital Locket." />
            </div>
        </div>
    )
}