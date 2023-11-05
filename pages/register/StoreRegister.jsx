import React from 'react'

import Image from 'next/image'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from '@/firebase/database';
import { doc, setDoc } from 'firebase/firestore';
import styles from './StoreRegister.module.css'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const StoreRegister = () => {


    const  handleSubmit = async (e) =>{
        e.preventDefault()
        const name = e.target[0].value
        const storeName = e.target[1].value
        const email = e.target[2].value
        const password = e.target[3].value
        const phone = e.target[4].value
        const address = e.target[5].value
        const city = e.target[6].value
        const postcode = e.target[7].value
        const file = e.target[8].files[0]
        // const name = e.target[0].value
        console.log(name , email , password , phone, address , city , postcode, file)
        try{
        const res =  await createUserWithEmailAndPassword(auth, email, password)
        const storageRef = ref(storage, storeName);

        const uploadTask = uploadBytesResumable(storageRef, file);
        
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', 
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          }, 
          (error) => {
            // Handle unsuccessful uploads
          }, 
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                await setDoc(doc(db, 'stores', res.user.uid), {
                    uid: res.user.uid,
                    displayName : name,
                    storeName : storeName,
                    imageUrl : downloadURL,
                    email,
                    phone,
                    address,
                    city,
                    postcode,
                    upcoming: [],
                    disposed: []
                })
            });
          }
        );

       
          console.log("Created SuccessFullt")
          console.log(res.user)
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
                    <h1 className={styles.mainTitle}>Register <span className={styles.span}>Your E-Waste Faclity</span></h1>
            </div>
            <hr/>
                <label  className={styles.labels} >Name</label>
                <input className={styles.inputs} type='tex' placeholder='name' />
                <label  className={styles.labels} >Store Name</label>
                <input className={styles.inputs} type='tex' placeholder='Store' />
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
                <label className={styles.labels} >Image</label>

                <input className={styles.inputsImage} type='file' placeholder='Image Of your store' />

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

export default StoreRegister