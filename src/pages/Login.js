import React, { useState, useEffect } from 'react'
import { auth } from '../config/firebase'
import { deleteUser, onAuthStateChanged, reauthenticateWithCredential, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, updateProfile } from 'firebase/auth'



const initialState = { email: '', password: '', }

export default function Login() {
    // Hooks
    const [state, setState] = useState(initialState)
    const [user, setUser] = useState({})

    //UseEffect

    useEffect(() => {

        // 1- On Auth Changed Function ( Yai check karny k liy k user sign in ha ya nai )
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                //   const uid = user.uid;

                console.log('onAuth state changed =>', user)
                setUser(user)

                // ...
            } else {
                // User is signed out
                // ...

            }
        });
    }, [])

    //   2- HandleChange Function
    const handleChange = e => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }))

        console.log('state', state)
    }

    // 3- Handle Logout

    const handleLogout = () => {
        console.log('Logout Button Clicked')
        signOut(auth)
            .then(() => {
                console.log("user is signed out")
                setUser({})
            })
            .catch((err) => {
                console.error(err)
            })
    }



    // 4- HandleSubmit Function 
    const handleSubmit = e => {
        e.preventDefault()


        const { email, password } = state

        //Signing In the Existing User
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                //Sign in hoa tou yai chly ga mtlb then ka code
                const user = userCredential.user;
                console.log('userCredential', userCredential)
                console.log('user', user)
            })
            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // ..

                //Error hoa tou yai chly ga mtlb catch chly ga

                console.error('error', error)
            });


    }

    //5- Auth User Function

    const showAuthUser = () => {
        const user = auth.currentUser
        console.log('user', user)
    }

    // 6- Update user function 
    const handleUpdate = () => {

        // 7- update user function (yai firebase ha)
        updateProfile(auth.currentUser, {
            displayName: "Umar Hayaat",

        }).then(() => {
            console.log('profile updated successfully !!!')
        }).catch((err) => {
            // An error occurred
            // ...
            console.error(err)
        });

    }
    // 8- update user current email function
    const updateUserEmail = () => {
        updateEmail(auth.currentUser, "uj2849@gmail.com").then(() => {
            // Email updated!
            console.log('email updated successfully !!!')
            // ...
        }).catch((err) => {
            // An error occurred
            console.error(err)
            // ...
        });
    }

    //   9- Send An Email For verification

    const emailVerification = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                // Email verification sent!

                console.log('Email sent successfully !!!')

            });
    }

    // 10-  Password Updateed function
    const handleUpdatePassword = () => {
        const newPassword = 12345678;
        updatePassword(auth.currentUser, newPassword).then(() => {
            // Update successful.
            console.log('Password Update successful !!!')

        }).catch((err) => {
            // An error ocurred
            console.error(err)
        });
    }

    // 11- Send Email for Password Reset Function

    const resetPasswordEmail = () => {
        sendPasswordResetEmail(auth, 'uj2849@gmail.com')
            .then(() => {
                console.log('Password Reset Email Sent Successfully !!!')
            })
            .catch((err) => {
                console.error("There is an error in resetPassword email function ")
                console.error(err)
                // ..
            });
    }

    // 12- Delete Existing User 

    const deleteExistingUser = () => {
        deleteUser(auth.currentUser).then(() => {
            console.log('User Deleted !!!')
        }).catch((err) => {
            // An error ocurred
            console.error(err)
            console.error('There is an error in deleteUser Function')
        });
    }

    //is ka pchna ha kisi sy 
    
    //13- Re-authenticate a user (is code mai error yai h k wo kh raha ha k ap ny 'promptForCredentials' is function ko define nai kia lkin mjy pta nai h k is ko define kasy krna h is liy filhal asy hi chor do) 

    // const reAuthenticateUser = () => {
    //     // TODO(you): prompt the user to re-provide their sign-in credentials
    //     const credential = promptForCredentials();

    //     reauthenticateWithCredential(auth.currentUser, credential).then(() => {
    //         // User re-authenticated.
    //     }).catch((error) => {
    //         // An error ocurred
    //         // ...
    //     });
    // }

    return (
        <main>
            <div className="center container py-5 w-100">

                <div className="row">
                    <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">

                        {
                            user.email ? <div className="row">
                                <div className="col text-center">
                                    <h3 className=' mb-3 text-white'>
                                        If Sign In: <br />
                                        <br />
                                        User Email : {user.email} <br />
                                        <br />
                                        User ID : {user.uid}
                                        <br />
                                        <br />
                                        User Display Name : {user.displayName}

                                    </h3>
                                    <button onClick={handleLogout} className='btn btn-danger mt-3'>Logout</button>
                                    <br />
                                    <button onClick={showAuthUser} className='btn btn-primary mt-3'>Show Auth User</button>
                                    <br />
                                    <button onClick={handleUpdate} className='btn btn-warning mt-3'>Update User</button>
                                    <br />
                                    <button onClick={updateUserEmail} className='btn btn-info mt-3'>Update User Email Address</button>
                                    <br />
                                    <button onClick={emailVerification} className='btn btn-success mt-3'>Send Email for Verification</button>
                                    <br />
                                    <button onClick={handleUpdatePassword} className='btn btn-secondary mt-3'>Update User Password</button>
                                    <br />
                                    <button onClick={resetPasswordEmail} className='btn btn-primary mt-3'>Send Email for Password Reset</button>
                                    <br />
                                    <button onClick={deleteExistingUser} className='btn btn-danger mt-3'>Delete Existing User From Firebase</button>

                                    {/* Is button k function mai error h jo mai ny function k upr comment ma likha ha k kya error ha  */}
                                    {/* <br />
                                    <button onClick={reAuthenticateUser} className='btn btn-warning mt-3'>Re-Authenticate User</button> */}
                                </div>
                            </div>
                                :
                                <div className="card p-2 p-md-4 p-lg-5 ">

                                    <div className="row">
                                        <div className="col text-center">
                                            <h2 className='mb-4'>Login</h2>
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
                                                <input type="password" className="form-control mb-3"
                                                    name='password' onChange={handleChange} placeholder="Password" />
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col">
                                                <button className='btn btn-primary w-100 mt-4 mb-0 '>Login</button>
                                            </div>
                                        </div>
                                    </form>

                                </div>

                        }
                    </div>
                </div>
            </div>
        </main>
    )
}
