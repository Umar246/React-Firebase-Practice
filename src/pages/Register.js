import React, { useState } from 'react'
import { auth, firestore } from '../config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore/lite'



const initialState = { email: '', password: '', }

export default function Register() {
    // Hooks
    const [state, setState] = useState(initialState)

    //    HandleChange Function
    const handleChange = e => {
        setState({ ...state, [e.target.name]: e.target.value })
    }


    // HandleSubmit Function 
    const handleSubmit = e => {
        e.preventDefault()
        // console.log('state', state)

        const { email, password } = state

        //Creating User (authentication ka hisa)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                //Sign in hoa tou yai chly ga mtlb then ka code
                const user = userCredential.user;

                console.log('user registered')
                console.log('userCredential', userCredential)
                console.log('user', user)

                console.log('user.uid', user.uid)
                try {
                    // Setting user (firestore ka hisa)
                    setDoc(doc(firestore, "users", user.uid), { firstName: "", uid: user.uid })
                } catch (e) {
                    console.error(e)
                }

            })
            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // ..

                //Error hoa tou yai chly ga mtlb catch chly ga

                console.error('error', error)
            });
    }


    return (
        <main>
            <div className="center container py-5 w-100">

                <div className="row">
                    <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                        <div className="card p-2 p-md-4 p-lg-5 ">

                            <div className="row">
                                <div className="col text-center">
                                    <h2 className='mb-4'>Register</h2>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>

                                <div className="row">
                                    <div className="col">
                                        <input type="text"
                                            className="form-control mb-3 "
                                            placeholder="Email"
                                            name='email'
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <input type="text" className="form-control mb-3"
                                            name='password' onChange={handleChange} placeholder="Password" />
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col">
                                        <button className='btn btn-primary w-100 mt-4 mb-0 '>Register</button>
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
