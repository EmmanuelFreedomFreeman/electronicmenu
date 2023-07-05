import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
function Bottomnavbar(props: any) {
   const lengthOfTheBasket = props?.getit.length
   const lengthFood = props?.getit?.map((val:any,index:any)=>(val.cat.split('/')[1] == 'FOOD'))
   const lengthDrink = props?.getit?.map((val:any,index:any)=>(val.cat.split('/')[1] == 'DRINK'))
   const food = lengthFood.filter((e: any) => e == true) != undefined ? lengthFood.filter((e: any) => e == true).length : 0
   const drink = lengthDrink.filter((e: any) => e == true) != undefined ? lengthDrink.filter((e: any) => e == true).length : 0


   
  return (
    <div className='bg-white pr-3 w-screen '>
        <div className='flex justify-between p-1'>
            <div onClick={()=>props.setPages('Home')} className={props.pages == 'Home'? 'border-2 border-purple-500 p-2 rounded-md':'cursor-pointer '}>
                <img alt='food' src='home.png' className='w-10 h-10 ' />
            </div>
            <div onClick={()=>props.setPages('Food')} className={props.pages == 'Food'? 'border-2 border-purple-500 p-2 rounded-md':'cursor-pointer '}>
                <p className='w-7 h-7 absolute bg-purple-500 rounded-full text-center  ml-4 mt-3'>{food>=0 ? food : 0}</p>
                <img alt='food' src='dinde.png' className='w-10 h-10 ' />
            </div>
            <div onClick={()=>props.setPages('Drink')} className={props.pages == 'Drink'? 'border-2 border-purple-500 p-2 rounded-md':'cursor-pointer '}>
            <p className='w-7 h-7 absolute bg-purple-500 rounded-full text-center  ml-4 mt-3'>{drink>=0 ? drink : 0}</p>
                <img alt='food' src='du-jus-dorange.png' className='w-10 h-10' />
            </div>
            <div onClick={()=>props.setPages('Basket')} className={props.pages == 'Basket'? 'border-2 border-purple-500 p-2 rounded-md':'cursor-pointer '}>
            <p className='w-7 h-7 absolute bg-purple-500 rounded-full text-center  ml-5 mt-3'>{lengthOfTheBasket>=0 ? lengthOfTheBasket : 0 }</p>
                <img alt='food' src='panier.png' className='w-10 h-10' />
            </div>
            
            
        </div>
    </div>
    
  )
}

export default Bottomnavbar
