import { db } from '@/firebase/database'
import { doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import styles from './droute.module.css'
import { GasMeter, NotificationsTwoTone, Person2Outlined } from '@mui/icons-material';
import Link from 'next/link';
import StoreList from '@/components/storelist/storelist';
import StoreInfo from '@/components/storelist/storeInfo';
import { Alert } from '@mui/material';


import {  updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";


export async function getStaticProps(staticProps) {
    const params = staticProps.params;     
    const docRef = doc(db, "stores", params.id);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        return {
            props: {
              store: docSnap.data()
            },
        }
    }else{
        return {
            props: {
              store: {}
            },
        }
    }
    console.log(params) 
   
}

export async function getStaticPaths() {
    return {
      paths: [
        {
          params: {
            id: "ksldlksdfsd",
          },
        }, // See the "paths" section below
      ],
      fallback: true, // false or "blocking"
    }
  }

const Stores = ({store}) => {
    const router = useRouter()
    const id = router.query.id;
    console.log("ssr",store)
    const e  = store
    const [isFormOpen, setFormOpen] = useState(false)

    const  handleSubmit = async (e) =>{
        e.preventDefault()
        const modelName = e.target[0].value
        const anyOtherMaterialNames = e.target[1].value
        const DeviceCategory = e.target[2].value
        const phone = e.target[3].value
        const address = e.target[4].value
        const data = {
            modelName,
            anyOtherMaterialNames,
            DeviceCategory,
            phone,
            address
        }
  

     const storeRef = doc(db, "stores", store.uid);
     await updateDoc(storeRef, {
        upcoming: arrayUnion(data)
    });
    

    }
    // console.log(props)
  return (
    <div className={styles.mainConainer}>

     <nav className={styles.navBar}> 
        <div className={styles.logoSection}>
            <h1 className={styles.logotitle}>Green<span className={styles.spanGreen}>Vision</span></h1>
        </div>
        <div style={{width:"20%"}}>
        <p style={{marginBottom:"10px"}} className={styles.userName}>Your Credits<GasMeter/>56%</p>
        <div style={{height:"10px" , width:"50%", backgroundColor:"green", borderRadius:"10px"}} ></div>

        </div>

        <div className={styles.linksSection}>
             
             <p className={styles.userName}>Hi, Manu <span ><Person2Outlined/></span> <span ><NotificationsTwoTone/></span></p>
            <Link className={styles.link} href={"#"}>About E-Waste</Link>
            <Link className={styles.link}  href={"#"}>Your Disposes</Link>
        </div>

    </nav>

  

    <div className={styles.storeInfoContainer}>
   { e &&  (
    <div className={styles.storeDiv}>
   <StoreInfo address={e.address} name={e.displayName} pn={e.phone} storename={e.storeName}  postcode={e.postcode} email={e.email} city={e.city} imgUrl={e.imageUrl} uid={e.uid}/>             

    </div>
)   
   }
   <button onClick={() => setFormOpen(!isFormOpen)} className={styles.btn}>{ !isFormOpen ? "Enter Information For Your Device or Any E-Waste Material" : "Cancel"}</button>
   {isFormOpen && <section className={styles.bottomConatainer}>
   <form onSubmit={handleSubmit} className={styles.formContainer}>
            {/* <div className={styles.titleCOntianer}>
                    <h1 className={styles.mainTitle}>Register <span className={styles.span}>Yourself</span></h1>
            </div> */}
        
                <label  className={styles.labels} >Model of Your Device</label>
                <input className={styles.inputs} type='text' />
                <label className={styles.labels} >Any Other Materials</label>
                <input className={styles.inputs} type='text'  />
                <label className={styles.labels} >Device Category</label>
                <input className={styles.inputs} type='text' />
                <label className={styles.labels} > Your Phone Number</label>
                <input className={styles.inputs} type='tel' />
                <label className={styles.labels} > Your Address</label>
                <input className={styles.inputs} type='text'/>
           

                <button type='sumbit' className={styles.btn}>Send Details To Know Credits Score By The Store Owner</button>
            </form>
   </section>}
   </div>
 
    </div>
  )
}

export default Stores