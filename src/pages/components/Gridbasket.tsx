import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { db } from '../../../firebase';
import { doc, onSnapshot,setDoc } from "firebase/firestore";
import { useRouter } from 'next/router';

interface p {
    Categories: any[];
    cat: string;
    basketItems: any[];
    setbasketItems: Dispatch<SetStateAction<any[]>>;

}

function Gridbasket(props:p) {
    const [sum, setSum] = useState(0)
    const [name, setName] = useState('')
    const [order, setOrder] = useState<any[]>([])
    const [button, setbutton] = useState(false)
    const router = useRouter()
    const url = router?.query
    const company = String(router?.query?.email) 
    const [orders, setorders] = useState({})
    
    


    const submitorder = async () => {
        setbutton(true)
        try {
            const orderss = {
                data : [...props?.basketItems],
                name : name,
                ordernumber : order.length,
                date : Date.now(),
                etat : 'new order',
                total : sum,
                url : url
            }
    
            await setDoc(doc(db, company , 'ORDER'), {order : [...order,orderss]})
        } catch (e) {
            console.error(e); // handle your error here
        } finally {
            props?.setbasketItems([]); // cleanup, always executed
            setSum(0);
            setName('');
            alert('the order has been submited')
        }

    
    }
        
        const minusItem = (indexitem:any) => {
                const temp = [...props?.basketItems]
                temp.splice(indexitem, 1)
                props?.setbasketItems([...temp])    
        }

        useEffect(() => {

            const rendering = () => {
                if (company) {
                    const unsubcat = onSnapshot(doc(db,company, "ORDER"), (doc) => {
                        doc.data()?.order? setOrder([...doc.data()?.order]):null;
                      });
                }
                
                let ss = 0
                props?.basketItems?.map((val:any,index:number)=>{
                    const temp = val?.amount * val?.qte
                    ss = ss + temp
                })
                setSum(ss)
            }
            rendering()
            
        }, [company])

  return (
    <div className=''>
        <div>
            <div>
                <input type='text' placeholder='Name : ' className='bg-gray-200 h-10 ml-1' value={name} onChange={(e) => setName(e.target.value)} />
                <p className='text-center underline pt-1'>ORDER NUMER : {order.length}</p>
            </div>
        </div>
        
        <div>
            
        {props?.basketItems?.map((val:any,index:number)=>(
            <div key={index} className='mt-5 p-2 border-2 border-purple-500 rounded-md'>
                
                <p className='text-center underline mb-5'>{val?.name.toUpperCase()}</p>
                <div className='flex justify-between'>
                    <img alt='img' src={val?.image} className='w-10 h-10 rounded-md object-cover '/>
                    <div className='text-right'>
                        <p>amount : FC {new Intl.NumberFormat('en-US',).format((val?.amount))} </p>
                        <p className='underline' > * quantity : {val?.qte} </p>
                    </div>
                </div>
                <div className='flex justify-between mt-2'>
                    <p onClick={()=>minusItem(index)} className='bg-red-800 rounded-md p-2 w-10 text-center'>X</p>
                    <p className='text-right'>Total : FC {new Intl.NumberFormat('en-US',).format((val?.amount)*val?.qte)}</p>
                </div>
            </div>
        ))}
        </div>
        <div onClick={()=> submitorder()} className={(sum == 0 || button == true || name == '') ? 'hidden':'mt-5 p-2 border-2 bg-purple-500 rounded-md'}>
            <p className='text-center'>SUBMIT TOTALE :  FC {new Intl.NumberFormat('en-US',).format((sum))}  </p>
        </div>
    </div>
  )
}

export default Gridbasket