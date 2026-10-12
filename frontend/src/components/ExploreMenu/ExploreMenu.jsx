import React from 'react'
const menu_list = [
    { menu_name: "Salad", menu_image: "🥗" },
    { menu_name: "Rolls", menu_image: "🌯" },
    { menu_name: "Deserts", menu_image: "🍰" },
    { menu_name: "Sandwich", menu_image: "🥪" },
    { menu_name: "Cake", menu_image: "🎂" },
    { menu_name: "Pure Veg", menu_image: "🥦" },
    { menu_name: "Pasta", menu_image: "🍝" },
    { menu_name: "Noodles", menu_image: "🍜" }
];

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='flex flex-col gap-5' id='menu'>
      <h1 className='text-[#262626] font-medium text-3xl'>Explore our menu</h1>
      <p className='max-w-[60%] text-[#808080] text-sm md:text-base'>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience.</p>
      <div className='flex justify-between items-center gap-8 text-center my-5 overflow-x-auto mx-auto w-full pb-4 scrollbar-hide'>
        {menu_list.map((item, index) => {
          return (
            <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index} className='cursor-pointer flex flex-col items-center gap-2 flex-shrink-0'>
              <div className={`text-6xl p-4 bg-gray-50 rounded-full w-24 h-24 flex items-center justify-center transition-all shadow-sm ${category===item.menu_name ? 'border-4 border-primary p-2' : ''}`}>
                  {item.menu_image}
              </div>
              <p className='mt-2 text-[#747474] font-medium text-sm md:text-base'>{item.menu_name}</p>
            </div>
          )
        })}
      </div>
      <hr className='my-2 mx-0 h-[2px] bg-[#e2e2e2] border-none' />
    </div>
  )
}
export default ExploreMenu;
