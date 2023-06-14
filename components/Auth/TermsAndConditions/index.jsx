export default function TermsAndConditions({ onAccept, onCloseWindow }) {
    return (
        <div className="fixed top-0 left-0 w-[100vw] h-[100vh] md:p-[5rem] p-[1rem] flex justify-center backdrop-blur-sm z-[50]" onScroll={(e) => {e.stopPropagation()}}
            onClick={(e) => {
                onCloseWindow()
            }}
        >
            <div className="w-auto md:w-2/3 xl:w-1/2 bg-white rounded-[0.5rem] flex flex-col max-h-[calc(100vh-10rem)] mt-[5rem] shadow-md"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="h-[4.25rem] flex items-center px-[1rem]">
                    <h4 className="grow text-[#747067] font-bold"> Terms and Conditions </h4>
                </div>
                <div className="grow bg-[#F8F8F8] text-[#747067] leading-[1.6875rem] p-[1.5rem] overflow-y-auto">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fringilla sit amet risus et convallis. Aenean eget dapibus ligula, id convallis nunc. Nam eu aliquam ipsum, sit amet mollis nibh. Cras quis sapien at est gravida tincidunt. In viverra felis at turpis tristique, at gravida leo tincidunt. Proin ac ante finibus, pharetra nunc sed, luctus diam. In porttitor cursus tortor id molestie. Nam nec volutpat dui.<br/>Vestibulum commodo sem iaculis sapien imperdiet congue. Proin et eros eget turpis rhoncus viverra. Quisque bibendum purus vitae lacus commodo ullamcorper. Proin eget consequat mauris. Integer varius sapien quis dui aliquam bibendum. Cras viverra eros at gravida ornare. Cras auctor dapibus nisl sed accumsan. Proin in orci libero.<br/>Aenean commodo pretium ante eu varius. Donec vestibulum lorem sit amet blandit blandit. Proin tempor volutpat metus eu consectetur. Cras tincidunt neque non tempor posuere. Donec vestibulum erat eu gravida egestas. Aenean tincidunt, ligula vel maximus scelerisque, eros ex dapibus lorem, in faucibus velit ex id neque. Morbi purus sem, rhoncus ut auctor non, mollis id quam. Duis velit est, viverra in lorem vitae, egestas aliquam sapien. Integer ut tortor tempus, condimentum augue eget, dapibus sapien.<br/><br/>Cras quis dignissim nisl. Aenean pellentesque cursus varius. In euismod nulla egestas, aliquet justo ut, viverra felis. In bibendum, lorem non faucibus efficitur, felis eros euismod erat, sit amet tincidunt nibh ex quis libero. Suspendisse bibendum bibendum congue. Maecenas malesuada aliquet imperdiet. Morbi convallis in lectus quis porttitor. Vestibulum et molestie</p>
                </div>
                <div className="min-h-[5rem] flex justify-end items-center px-[1rem]">
                    <button className="bg-primary rounded-full h-[3rem] px-[1.5rem] text-white text-[1rem] leading-[1.6875rem]"
                        onClick={onAccept}
                    >
                        Accept Terms
                    </button>
                </div>
            </div>
        </div>
    )
}