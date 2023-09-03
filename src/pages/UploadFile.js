import React, { useState } from 'react'
import { filesize } from 'filesize'
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import { storage } from 'config/firebase'

export default function UploadFile() {
    // Input wali file set krwany k liy 
    const [uploadFile, setUploadFile] = useState({})
    // Loader k liy
    const [isUploading, setIsUploading] = useState(false)
    // For progress bar
    const [progressBar, setProgressBar] = useState(0)
    // Download URL
    const [fileDownloadURL, setFileDownloadURL] = useState("")



    // Firestore mai store karwany k liy file ko
    const handleUpload = () => {

        // File na ho tou (input ma )
        if (!uploadFile.size) {
            alert("File isn't Found !!")
            return
        }

        //Path hmari file ka jo store ho ga firebase ki storage mai (Refrence)
        const randomId = Math.random().toString(36).slice(2)
        console.log('randomId', randomId)
        const fileExt = uploadFile.name.split('.').pop()
        console.log('fileExt', fileExt)

        const imagesRef = ref(storage, `images/${randomId}.${fileExt}`);
        const uploadTask = uploadBytesResumable(imagesRef, uploadFile);

        // Uploading File in firebase storage

        setFileDownloadURL("")
        setIsUploading(true)
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded

                // floating point remove karny k liy math.round use kia ha 
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                console.log('Upload is ' + progress + '% done');
                setProgressBar(progress)

                if (progress == 100) {
                    setTimeout(() => {
                        setIsUploading(false)
                    }, 500)
                }
            }, (e) => {
                console.error('The error is : ', e)
                setIsUploading(false)
            }, () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setFileDownloadURL(downloadURL)
                });
            })
        setProgressBar(0)



    }



    return (
        <>
            <main>


                <div className="py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h3 className='text-center'>Upload File</h3>


                            </div>
                        </div>


                        <div className="row">
                            <div className="col">
                                <input type="file" className='form-control' accept='images/*' onChange={e => { setUploadFile(e.target.files[0]) }} />
                                {uploadFile.name && <p className='mt-2'>File Name : {uploadFile.name} | File Size : {filesize(uploadFile.size)}  </p>}

                            </div>
                        </div>



                        {isUploading ?
                            <div className="row">
                                <div className="col mt-3">

                                    <div className="progress" role="progressbar" aria-label="Example with high" aria-valuenow={progressBar} aria-valuemin="0" aria-valuemax="100">
                                        <div className="progress-bar" style={{ width: `${progressBar}%` }} >{progressBar}%</div>
                                    </div>

                                </div>
                            </div>
                            : ""
                        }



                        <div className="row">
                            <div className="col text-end">
                                {!isUploading ?

                                    <button className='btn btn-primary mt-4 ' onClick={handleUpload}>Upload File</button>
                                    :
                                    <button className='btn btn-primary mt-4 ' disabled={isUploading}> <div className='spinner-border spinner-border-sm'></div></button>


                                }
                            </div>
                        </div>

                        {fileDownloadURL &&
                            <div className="row">
                                <div className="col text-center">
                                    <a className='btn btn-primary mt-4' href={fileDownloadURL} target='_blank' >File DownloadURL</a>

                                </div>
                            </div>
                        }

                        {fileDownloadURL &&

                            <div className="row">
                                <div className="col col-md-8 offset-md-2 my-5 text-center">
                                    <img src={fileDownloadURL} className='img-fluid' alt="Image which you upload on firebase" />
                                </div>
                            </div>
                        }

                    </div>
                </div>


            </main>
        </>
    )
}
