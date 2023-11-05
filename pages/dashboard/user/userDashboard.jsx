import { UserContext } from '@/context/userContext'
import React, { useContext, useState } from 'react'
import styles from './userDashboard.module.css'
import Link from 'next/link'
import { LocationSearching, Person2Outlined, Search, SearchOffRounded } from '@mui/icons-material'
import { db } from '@/firebase/database'
import firebase from 'firebase/app';
import 'firebase/firestore';
import { collection, query, where, getDocs } from "firebase/firestore";
import StoreList from '@/components/storelist/storelist'

const UserDashboard = () => {

    const [areStoresLoaded, setStoreList]= useState(false)
    const [results, setResults]= useState()
    const {currentUser} = useContext(UserContext)
    console.log("User:",currentUser)
    const [postCode , setPostCode] = useState()
    const storeArray = [];


    const q = query(collection(db, "stores"), where("postcode", "==", `${postCode}`));
     const  handleSearch = async (e) => {
        console.log(":askks")
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
      
        doc.data() &&  setStoreList(true);
         storeArray.push(doc.data())
         setResults(storeArray)
        });
     }
     console.log("array",results)

  return (
    <div className={styles.mainContainer}>
    <nav className={styles.navBar}> 
        <div className={styles.logoSection}>
            <h1 className={styles.logotitle}>Green<span className={styles.spanGreen}>Vision</span></h1>
        </div>
        <div className={styles.linksSection}>
             <p className={styles.userName}>Hi, Manu <span ><Person2Outlined/></span> </p>
            <Link className={styles.link} href={"#"}>About E-Waste</Link>
            <Link className={styles.link}  href={"#"}>Your Disposes</Link>
        </div>
    </nav>
    <section className={styles.searchSection}>
        <div className={styles.searchInputSection}>
            <div className={styles.inputAndLabel}>
                <label className={styles.labelForSearch}>Post Code</label>
                <input onChange={(e) => setPostCode(e.target.value)} className={styles.inputforSeacrh} type='text'/>
            </div>
            <div className={styles.inputAndLabel}>
                <label  className={styles.labelForSearch}>City</label>
                <input className={styles.inputforSeacrh}  type='text'/>
            </div>
            <div className={styles.inputAndLabel}>
                <label  className={styles.labelForSearch}>State</label>
                <input className={styles.inputforSeacrh}  type='text'/>
              
            </div>
            <div onClick={handleSearch}>
            <Search  className={styles.searchBar} fontSize='large'/>
                
            </div>
        </div>
    </section>
    <section className={styles.storesSection}>
    <hr/>

</section>
  {areStoresLoaded &&  <section className={styles.storeListSection}>
        {results && results.map(e =>{
          return   <StoreList address={e.address} name={e.displayName} pn={e.phone} storename={e.storeName}  postcode={e.postcode} email={e.email} city={e.city} imgUrl={e.imageUrl} uid={e.uid}/>
        })}

  
    </section>}


    </div>
  )
}

export default UserDashboard