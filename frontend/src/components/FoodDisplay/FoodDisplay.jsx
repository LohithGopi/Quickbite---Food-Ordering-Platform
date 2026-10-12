import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className='mt-8 flex flex-col gap-6' id='food-display'>
      <h2 className='text-2xl font-semibold'>Top dishes near you</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return <FoodItem key={index} id={item.id} name={item.name} description={item.description} price={item.price} image={item.image} />
          }
          return null;
        })}
      </div>
    </div>
  )
}
export default FoodDisplay;
