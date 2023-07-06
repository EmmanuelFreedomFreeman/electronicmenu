
import Bottomnavbar from '../components/Bottomnavbar';
import Griditems from '../components/Griditems';
import { useEffect, useState } from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { useRouter } from 'next/router';
import { db } from '../../../firebase';
import {useRecoilState,useRecoilValue} from 'recoil';
import { Items } from '../../../recoil/atoms/Items';
import Gridbasket from '../components/Gridbasket';

interface val {
  amount: number;
  category: string;
  description: string;
  image: string;
  name: string;
}

export default function Homescreen() {
  
  let it = {
    amount:0,
    category:'empty',
    description:'empty',
    image:'pic',
    name:'empty'
  }
  const item = {
    name:'',
    cat:'',
    image:'',
    qte:1,
    description:'',
    amount:'',
    category:''
    
}
  const [recoilItems, setRecoilItems] = useRecoilState(Items);
  const [Category, setCategory] = useState('')
  const [items, setItems] = useState<any[]>([it])
  const [Categories, setCategories] = useState<any[]>([{category:'legume',type:'food'}])
  const Recoileitems =  useRecoilValue(Items);
  const [basketItems, setbasketItems] = useState<any[]>([item])
  const [pages, setPages] = useState('Home') 
  const router = useRouter()
  let categorytype = ''
  let url = String(router?.query?.email)  
  useEffect(() => {

    

    if (url) {
        const unsub = onSnapshot(doc(db,url, "ITEMS"), (doc) => {
            doc.data()?.items? setItems([...doc.data()?.items]):'';
            doc.data()?.items? setRecoilItems([...doc.data()?.items]):'';
          });
          const unsubcat = onSnapshot(doc(db,url, "CATEGORIES"), (doc) => {
            doc.data()?.category? setCategories([...doc.data()?.category]):'';
          });

        

          
    }

    
    
  }, [url])

  
  useEffect(() => {
      // select items by category

      const arr = Recoileitems.filter(val => val.category == (Category.split('/')[0]));
      setItems(arr.length>0 ? arr : Recoileitems)
      

    
  }, [Category])




  return (
    <div className='p-1'>
      <div className='flex justify-center'><img src='logo.png' alt='logo' className='h-11' /></div>

      <div>
      
      {pages == 'Home' && (
        <select id="countries" onChange={(e)=>{setCategory(e.target.value)}} className={(Categories.length<0)?"hidden":"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}>
        {(String(Categories)=='') ? (<option value={'/'} >Choose a category</option>):(<option value={'/'} >Choose a category</option>)}
        {Categories && (
            Categories.map((val,index)=>(
                <option value={val.category+'/'+val.type} key={index}>
                  {val.category}
                </option>
            ))
        )}
        
      </select>
      )}
      </div>

      <div className='mt-3'>
          <div className=''>
            
            {pages == 'Home' && (
              <div className='h-[40rem] overflow-y-auto z-10'>
                <div className=''>
                    {items.map((val,index)=>(
                        <div key={index}>
                          <Griditems {...val} Categories={Categories} cat={Category} basketItems={basketItems} setbasketItems={setbasketItems} />
                        </div>
                    ))} 
                    <img alt='photo' src='https://i.pinimg.com/originals/82/be/d4/82bed479344270067e3d2171379949b3.png' className='w-screen h-40 rounded-md object-cover mb-40' />
                </div>   
              </div>
            )}
            {pages == 'Food' && (
              <div className='h-[40rem] overflow-y-auto z-10'>
                  {basketItems.map((val,index)=>(
                      <div key={index}>
                        {(val.cat.split('/')[1] == 'FOOD')? (<Griditems {...val} Categories={Categories} cat={Category} basketItems={basketItems} setbasketItems={setbasketItems} />):(<p></p>)}
                      </div>
                  ))} 
                  <img alt='photo' src='https://i.pinimg.com/originals/82/be/d4/82bed479344270067e3d2171379949b3.png' className='w-screen h-40 rounded-md object-cover mb-40' /> 
              </div>
            )}
            {pages == 'Drink' && (
              <div className='h-[40rem] overflow-y-auto z-10'>
                  {basketItems.map((val,index)=>(
                      <div key={index}>
                        {(val.cat.split('/')[1] == 'DRINK')? (<Griditems {...val} Categories={Categories} cat={Category} basketItems={basketItems} setbasketItems={setbasketItems} />):(<p></p>)}
                      </div>
                  ))}  
                  <img alt='photo' src='https://png.pngtree.com/png-clipart/20200727/original/pngtree-bubble-drink-outline-logo-png-image_5430159.jpg' className='w-screen h-40 rounded-md object-cover mb-40' />
              </div>
            )}
            {pages == 'Basket' && (
              <div className='h-[40rem] overflow-y-auto z-10'>
                  {true? (<Gridbasket Categories={Categories} cat={Category} basketItems={basketItems} setbasketItems={setbasketItems} />):(<p></p>)}   
              </div>
            )}
          </div>
          
          <div className='absolute bottom-0 z-0'>
              <Bottomnavbar {...basketItems} getit={basketItems} setbasketItems={setbasketItems} pages={pages} setPages={setPages} />
          </div>
      </div>
      
    </div>
  )
}
