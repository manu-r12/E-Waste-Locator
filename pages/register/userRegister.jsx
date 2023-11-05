import React from 'react'
import styles from './userRegister.module.css'
import Image from 'next/image'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '@/firebase/database';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

const UserRegister = () => {

    const router  = useRouter()

    const  handleSubmit = async (e) =>{
        e.preventDefault()
        const name = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        const phone = e.target[3].value
        const address = e.target[4].value
        const city = e.target[5].value
        const postcode = e.target[6].value
        // const name = e.target[0].value
        console.log(name , email , password , phone, address , city , postcode)
        try{
        const res =  await createUserWithEmailAndPassword(auth, email, password)
        await setDoc(doc(db, "users" , res.user.uid),{
            uid: res.user.uid,
            displayName : name,
            email,
            phone,
            address,
            city,
            postcode
          }) 
          console.log("Created SuccessFullt")
          console.log(res.user)
          router.push("")
        }catch(er){
            console.log(er)
        }
     
    }

  return (
    <div className={styles.mainContainer}> 
        <div className={styles.registerContainer}>
          
            <div className={styles.registerForm}>
            
            <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.titleCOntianer}>
                    <h1 className={styles.mainTitle}>Register <span className={styles.span}>Yourself</span></h1>
            </div>
            <hr/>
                <label  className={styles.labels} >Name</label>
                <input className={styles.inputs} type='tex' placeholder='name' />
                <label className={styles.labels} >Email</label>
                <input className={styles.inputs} type='email' placeholder='email' />
                <label className={styles.labels} >Password</label>
                <input className={styles.inputs} type='password' placeholder='password' />
                <label className={styles.labels} >Phone Number</label>
                <input className={styles.inputs} type='tel' placeholder='Phone' />
                <label className={styles.labels} >Address</label>
                <input className={styles.inputs} type='text' placeholder='Address' />
                <label className={styles.labels} >City</label>
                <input className={styles.inputs} type='text' placeholder='City' />
                <label className={styles.labels} >PostCode</label>
                <input className={styles.inputs} type='text' placeholder='PostCode' />

                <button type='sumbit' className={styles.btn}>Register</button>
            </form>

            </div>
        </div>
        <div className={styles.photoandInfoContainer}>
            <div className={styles.logoContainer}>
            <Image width={50} height={50} src={"/images/plant.png"}/>
                <h1 className={styles.logoTitle}>Green<span className={styles.spanWhite}>Vision</span></h1>
            </div>

            <div className={styles.subContainer}>
                <h2 className={styles.signIntitle}>Already An User?</h2>
                <button className={styles.btnSignIn}>Sign In</button>
            </div>  
        </div>
    </div>
  )
}

export default UserRegister