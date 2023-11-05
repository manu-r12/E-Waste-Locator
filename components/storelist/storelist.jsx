import Image from 'next/image'
import styles from './storelist.module.css'



import React from 'react'
import { useRouter } from 'next/router'
import { Verified } from '@mui/icons-material'

const StoreList = ({name , address, city , email , imgUrl, pn, postcode , storename , uid}) => {
    const router = useRouter()

    const handleBtnClick = () =>{
        router.push(`/stores/${uid}`)
    }




  return (
    <div className={styles.mainContainer}>
    <div className={styles.infoSection}>
    <p className={styles.verified}>Verified Store<Verified/></p>
        <div className={styles.detailsSection}>
            <p className={styles.infoPTag} >Name : {name} </p>
            <p className={styles.infoPTag} >Store Name : {storename}  </p>
            <p className={styles.infoPTag} >Address : {address} </p>
            <p className={styles.infoPTag} >Post Code : {postcode} </p>
            <p className={styles.infoPTag} >City : {city} </p>
            <p className={styles.infoPTag} >Phone Number : {pn}</p>
            <p className={styles.infoPTag} >Email : {email} </p>
        </div>
    </div>

    <div className={styles.contactSection}>
        <button onClick={handleBtnClick} className={styles.btn}>Dispose Here</button>
       
    </div>
    <div className={styles.imageSection}>
        <Image width={400} height={400} src={imgUrl}/>
    </div>
    </div>
  )
}

export default StoreList