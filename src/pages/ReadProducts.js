import React, { useEffect, useState } from 'react'
import { firestore } from '../config/firebase';
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore/lite';

export default function ReadProducts() {
    const [products, setProducts] = useState([])
    const [productForEdit, setProductForEdit] = useState({})

    useEffect(() => {
        fetchDocs()
    }, [])

    const handleChange = (e) => {
        setProductForEdit({ ...productForEdit, [e.target.name]: e.target.value })
    }

    //1- Product fetching (mangwana) from firestore 
    const fetchDocs = async () => {
        let productArray = []

        const querySnapshot = await getDocs(collection(firestore, "products"));

        querySnapshot.forEach((doc) => {
            let data = doc.data()
            data.id = doc.id
            productArray.push(data)
            // console.log(`${doc.id} => ${doc.data()}`);
            // console.log('doc', doc)
            // console.log('doc.id =>', doc.id)
            // console.log('doc.data() =>', doc.data())
        });
        setProducts(productArray)
        console.log('productArray => ', productArray)
    }

    // 2- Handle Edit Function (Mtlb jis ko click kary to modal open ho)
    const handleEdit = (item) => {
        setProductForEdit(item)
        console.log('item', item)
    }
    // 3- Handle Update Function (Mat;b is ko clicky kary to edit ho jy )
    const handleUpdate = async (productForEdit) => {

        await setDoc(doc(firestore, 'products', productForEdit.id), productForEdit, { merge: true })
        console.log('Product updated !!!')

        let newProducts = products.map((oldProduct) => {
            if (oldProduct.id === productForEdit.id) {
                return productForEdit
            } else {
                return oldProduct
            }



        })
        setProducts(newProducts)

        setProductForEdit({})

    }
    // 4- Handle Delete Function
    const handleDelete = async (item) => {

        await deleteDoc(doc(firestore, "products", item.id));
        console.log('item.id', item.id)

        let afterDeleteProducts = products.filter((firebaseComingProduct) => {
            return firebaseComingProduct.id !== item.id

        })
        setProducts(afterDeleteProducts)

    }

    return (

        <>
            <main>
                <div className="py-5 w-100">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h1 className="text-center text-white">Products</h1>
                                <hr />

                                <div className="table-responsive">

                                    <table className="table table-striped table-hover table-dark">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Title</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {products.map((item, i) => {
                                                return <tr key={i}>
                                                    <th scope="row">{i + 1}</th>
                                                    <td>{item.title}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.price}</td>
                                                    <td>

                                                        <button className='btn btn-info btn-sm  me-2' data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => { handleEdit(item) }}>Edit</button>
                                                        <button className='btn btn-danger btn-sm' onClick={() => { handleDelete(item) }}>Delete</button>

                                                    </td>
                                                </tr>

                                            })}

                                        </tbody>
                                    </table>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </main>


            {/* <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button> */}


            {/* <!-- Modal --> */}
            <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog  modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit {productForEdit.title}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">


                            <div className="row">
                                <div className="col">
                                    <input type="text" value={productForEdit.title} className="form-control mb-3 " placeholder="Title" name='title' onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <input type="number" value={productForEdit.price} className="form-control mb-3 " placeholder="Price" name='price' onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <input type="text" value={productForEdit.description} className="form-control mb-3"
                                        name='description' onChange={handleChange} placeholder="Description" />
                                </div>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => handleUpdate(productForEdit)}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
