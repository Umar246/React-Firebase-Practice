import React, { useState } from 'react'
import { addDoc, collection,  } from 'firebase/firestore/lite'
import { firestore } from '../config/firebase'
// import { toast } from 'react-toastify'
// import {  onAuthStateChanged, } from 'firebase/auth'



const initialState = { title: '', price: '', description: '' }

export default function AddProduct() {
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
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('state', state)

        let { title, price, description } = state

        title = title.trim()
        description = description.trim()
        price = Number(price)

        if (title.length < 3) {
            alert('Titke ki length kam ha ')
            return;
        }
        if (description.length < 10) {
            alert('Description ki length kam ha')
            return;
        }
        if (price < 0) {
            alert('Price kam ha ')
            return;
        }


        //Adding user start from here 

        setIsProcessing(true)

        let formData = { title, price, description }

        try {
            const docRef = await addDoc(collection(firestore, "products"), formData);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        setIsProcessing(false)


    }
    // Handle Submit with set Doc function
    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     console.log('state', state)

    //     const { title, price, description } = state


    //     //Adding user start from here 

    //     setIsProcessing(true)

    //     const randomId = Math.random().toString(36).slice(2)

    //     try {
    //         // Yai nichy wali ik line ma sara kam ho rha ha bas


    //         //set Doc
    //         await setDoc(doc(firestore, "products", randomId), { title, price, description, uid:randomId });

    //         console.log("Document written with ID: ", randomId);
    //         console.log('randomId', randomId)
    //         console.log('Product added successfully in Cloud Firestore !!!')
    //     }
    //     catch (err) {
    //         console.error('There is an error in adding user in firestore')
    //         console.error("Error adding document: ", err);
    //     }
    //     setIsProcessing(false)


    // }

    return (
        <main>
            <div className="center container py-5 w-100">

                <div className="row">
                    <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">

                        <div className="card p-2 p-md-4 p-lg-5 ">

                            <div className="row">
                                <div className="col text-center">
                                    <h2 className='mb-4'>Add Product</h2>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>

                                <div className="row">
                                    <div className="col">
                                        <input type="text" className="form-control mb-3 " placeholder="Title" name='title' onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <input type="number" className="form-control mb-3 " placeholder="Price" name='price' onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <input type="text" className="form-control mb-3"
                                            name='description' onChange={handleChange} placeholder="Description" />
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col">
                                        {
                                            !isProcessing ?
                                                <button className='btn btn-primary w-100 mt-4 mb-0 '>Add Product</button>
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
