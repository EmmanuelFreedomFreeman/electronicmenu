import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {useRecoilValue,useRecoilState} from 'recoil'

function Griditems(props: any) {
    const [qte, setQte] = useState(props?.qte? props?.qte :1)
    const texte = props?.description != undefined ? props?.description : ''
    const prix = props?.amount
    const [calculePrix, setCalculePrix] = useState(new Intl.NumberFormat('en-US',).format((prix)*qte))

    useEffect(() => {
        setCalculePrix(new Intl.NumberFormat('en-US').format((prix*qte)))
    }, [qte,prix])

    const addtobasket = (name:any) =>{
        let cat = ''
        if(props?.cat==''){
            const find = props?.Categories?.find((e:any) => e.category == props?.category)
            
            cat = find ? (find?.category+'/'+find?.type):''
        }else{
            cat = props?.cat

        }
        
        
        const item = {
            name:props?.name,
            cat:cat,
            image:props?.image,
            qte:qte,
            description:props?.description,
            amount:prix,
            category:props?.category
            
        }
        
        const findInItem = props?.basketItems?.find((e:any) => e.name == props?.name)
        if (findInItem != undefined) {
            const findIndexItem = props?.basketItems?.findIndex((e:any) => e.name == props?.name)
            const temp = [...props.basketItems]
            temp.splice(findIndexItem, 1,item)
            props.setbasketItems([...temp])
            
        }else{
            props.setbasketItems((old:any) =>[...old,item])
            
        }

        alert('inserted')

        
    }

    
    
    return (
    <div className='m-1 mt-5 rounded-md '>
         <div className='p-1 bg-gray-200 '>
         
                <img alt='photo' src={props?.image} className='w-screen h-40 rounded-md object-cover' />
                <p className='text-center'>{props?.name}</p>
                <p className='text-xs text-gray-500'>{texte.length>100?`${texte.substring(0, 200)}...` : texte}</p>
                <div className='flex justify-center'>
                    <div className='flex justify-between w-32 mt-4'>
                        <p className='p-1 text-center bg-green-500 rounded-full w-5 h-5' onClick={()=>{qte>0 && setQte(qte+1)
                            
                        }}></p>
                        <input type='number' value={qte} onChange={(event)=>{setQte(parseInt(event.target.value))}} className='w-10' />
                        <p className='p-1 text-center bg-red-500 rounded-full w-5 h-5' onClick={()=>{qte>1 && setQte(qte-1)
                            
                        }}></p>
                        
                    </div>
                </div>
                
                <p className='text-center text-purple-950'>Unite price : FC {new Intl.NumberFormat('en-US',).format((prix))}</p>

                <div key={props?.name} onClick={()=>{addtobasket(props?.name)} } className='flex justify-between bg-purple-500 p-2 mt-3 text-center rounded-md shadow-lg'>
                    <p className=''>IN THE BASKET</p>
                    <p className='text-end'>FC {calculePrix}</p>
                </div>

         </div>
    </div>
  )
}

export default Griditems
