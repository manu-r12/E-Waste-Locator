import React from 'react'
import styles from './home.module.css'
import { ArrowRightAltRounded } from '@mui/icons-material';
import { useRouter } from 'next/router';
import Image from 'next/image';

 const HomePage = () => {

    const router = useRouter()

    const handleClick = () =>{
        router.push("/home/your-notes")
    }


  return (
    <div className={styles.container}>
        <Image className={styles.Image1} src={"/images/plant.png"} height={80} width={80}/>
        <div className={styles.mainTitle}>
            <h1 className={styles.greenNotesTitle}>Welcome to Green<span className={styles.noteSpan}>Vision</span></h1>
            <p className={styles.para1}>Discover Smart Ways To Dispose</p>

            <p className={styles.para}>Only 12.5% of E-Waste is recycled. 85% of our E-Waste are sent to landfills and incinerators are mostly burned, and release harmful toxins in the air!</p>
        </div>
        <div className={styles.btnContainer}>
            <button onClick={handleClick}  className={styles.btn}>Save the Nature <ArrowRightAltRounded/></button>
        </div>
        <div className={styles.circle}/>
    </div>
  )
}

export default HomePage;