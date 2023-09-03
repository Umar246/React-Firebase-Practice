import React, { useState } from 'react'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore/lite'
import { firestore } from '../config/firebase'
// import {  onAuthStateChanged, } from 'firebase/auth'



const initialState = { fullName: '', age: '', country: '' }

export default function AddUser() {
    // Hooks
    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)


    //   1- HandleChange Function
    //  Handle Submit with add Doc function
    const handleChange = e => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }))
        console.log('state', state)
    }


    // 2- HandleSubmit Function 
    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     console.log('state', state)

    //     const { fullName, age, country } = state


    //     //Adding user start from here 

    //     setIsProcessing(true)
    //     try {
    //         // Yai nichy wali ik line ma sara kam ho rha ha bas
    //         const docRef = await addDoc(collection(firestore, "users"), { fullName, age, country });

    //         console.log("Document written with ID: ", docRef.id);
    //         console.log('User added successfully in Cloud Firestore !!!')
    //     }
    //     catch (err) {
    //         console.error('There is an error in adding user in firestore')
    //         console.error("Error adding document: ", err);
    //     }
    //     setIsProcessing(false)


    // }
    // Handle Submit with set Doc function
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('state', state)

        const { fullName, age, country } = state


        //Adding user start from here 

        setIsProcessing(true)

        const randomId = Math.random().toString(36).slice(2)

        try {
            // Yai nichy wali ik line ma sara kam ho rha ha bas


            //set Doc
            await setDoc(doc(firestore, "users", randomId), { fullName, age, country });

            console.log("Document written with ID: ", randomId);
            console.log('randomId', randomId)
            console.log('User added successfully in Cloud Firestore !!!')
        }
        catch (err) {
            console.error('There is an error in adding user in firestore')
            console.error("Error adding document: ", err);
        }
        setIsProcessing(false)


    }

    return (
        <main>
            <div className="center container py-5 w-100">

                <div className="row">
                    <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">

                        <div className="card p-2 p-md-4 p-lg-5 ">

                            <div className="row">
                                <div className="col text-center">
                                    <h2 className='mb-4'>Add User</h2>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>

                                <div className="row">
                                    <div className="col">
                                        <input type="text" className="form-control mb-3 " placeholder="Fullname" name='fullName' onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <input type="number" className="form-control mb-3 " placeholder="Age" name='age' onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <input type="text" className="form-control mb-3"
                                            name='country' onChange={handleChange} placeholder="Country" />
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col">
                                        {
                                            !isProcessing ?
                                                <button className='btn btn-primary w-100 mt-4 mb-0 '>Add User</button>
                                                :
                                                <button className='btn btn-primary w-100 mt-4 mb-0' disabled={isProcessing}><span className='spinner-border spinner-border-sm'></span></button>
                                        }
                                    </div>
                                </div>
                            </form>

                        </div>


                    </div>
                </div>
            </div>
        </main>
    )
}
