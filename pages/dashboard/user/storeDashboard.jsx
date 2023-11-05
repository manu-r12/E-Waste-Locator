import React, { useContext, useEffect, useState } from 'react'
import styles from './userDashboard.module.css' 
import { Person2Outlined, Person2Rounded } from '@mui/icons-material'
import Link from 'next/link'
import { UserContext } from '@/context/userContext'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase/database'

const StoreDashBoard = () => {

    const {currentUser}  = useContext(UserContext)
    const [results , setResults] = useState()

    useEffect(() =>{
        async function fetchStore(){
            const docRef = doc(db, "stores", currentUser.uid);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                console.log(docSnap.data())
                setResults((docSnap.data()))
            }else{
                console.log("No Store")
            }
        }
       currentUser.uid && fetchStore();
    }, [currentUser.uid])
   
    console.log("CurrentStoreOwner", currentUser);

  return (
    <div className={styles.mainContainer}>

    <nav className={styles.navBar}> 
        <div className={styles.logoSection}>
            <h1 className={styles.logotitle}>Green <span className={styles.spanGreen}>Vision</span></h1>
        </div>
        <div className={styles.linksSection}>
             <p className={styles.userName}>Hi, Manu <span ><Person2Outlined/></span> </p>
            <Link className={styles.link} href={"#"}>Your Store</Link>
            <Link className={styles.link}  href={"#"}>Your Completed Disposes</Link>
        </div>
    </nav>  
    <h1 className={styles.storeTitle}>Welcome To Your Store</h1>
    <div className={styles.clientRequests}>
        <h3 className={styles.titleCLients}>Your Clients<Person2Rounded fontSize='large'/></h3>
        <div className={styles.clientBox}>
        {results != undefined && results.upcoming.map((d) =>{
            return(
            <div className={styles.box}>
                <p className={styles.clientInfo} >User Namae :  Demo User</p>
                <p className={styles.clientInfo} >Device Category: {d.DeviceCategory} </p>
                <p className={styles.clientInfo} >Address:{d.address} </p>
                <p className={styles.clientInfo} >Another Materials:{d.anyOtherMaterialNames} </p>
                <p className={styles.clientInfo} >Model Name: {d.modelName} </p>
                <p className={styles.clientInfo} >Phone Number: {d.phone}</p>
                <button className={styles.btn}>Check And Give Credits</button>
            </div>
            )
        })}
           
        </div>
    </div>

    </div>
  )
}

export default StoreDashBoard