import React, { useEffect, useState } from 'react'
import { firestore } from '../config/firebase';
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore/lite';

export default function NewReadProducts() {
    const [products, setProducts] = useState([])
    const [itemForEdit, setItemForEdit] = useState({})

    useEffect(() => {
        fetchDocsFromFirestore()
    }, [])

    const handleChange = (e) => {
        setItemForEdit({ ...itemForEdit, [e.target.name]: e.target.value })
    }

    const fetchDocsFromFirestore = async () => {
        let productsArray = [];

        const querySnapshot = await getDocs(collection(firestore, "products"));

        querySnapshot.forEach((doc) => {
            //   console.log(`${doc.id} => ${doc.data()}`);

            let data = doc.data()
            data.id = doc.id
            productsArray.push(data)
        });
        setProducts(productsArray)
    }

    const handleEdit = (joInputSyProductAaRahiHa) => {
        setItemForEdit(joInputSyProductAaRahiHa)
        console.log('joInputSyProductAaRahiHa', joInputSyProductAaRahiHa)
    }

    const handleUpdate = async (productAfterEdit) => {

        await setDoc(doc(firestore, "products", productAfterEdit.id), productAfterEdit, { merge: true });
        console.log('Product Edited Successfully !!',)

        let editedProducts = products.map((oldProduct) => {
            if (oldProduct.id === productAfterEdit.id) {
                return productAfterEdit
            } else {
                return oldProduct
            }
        })

        setProducts(editedProducts)
        setItemForEdit({})
    }

    const handleDelete = async (productFromInput) => {

        await deleteDoc(doc(firestore, "products", productFromInput.id))

        let productAfterDelete = products.filter((oldProduct) => {
            return oldProduct.id !== productFromInput.id
        })
        setProducts(productAfterDelete)
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
                                            {products.map((product, i) => {
                                                return <tr key={i} >
                                                    <th scope="row">{i + 1}</th>
                                                    <td>{product.title}</td>
                                                    <td>{product.description}</td>
                                                    <td>{product.price}</td>

                                                    <td>

                                                        <button className='btn btn-info btn-sm  me-2' data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => { handleEdit(product) }}>Edit</button>
                                                        <button className='btn btn-danger btn-sm' onClick={() => { handleDelete(product) }}>Delete</button>

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
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit {itemForEdit.title}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">


                            <div className="row">
                                <div className="col">
                                    <input type="text" className="form-control mb-3 " placeholder="Title" name='title' value={itemForEdit.title} onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <input type="number" className="form-control mb-3 " placeholder="Price" name='price' value={itemForEdit.price} onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <input type="text" className="form-control mb-3"
                                        name='description' placeholder="Description" onChange={handleChange} value={itemForEdit.description} />
                                </div>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => { handleUpdate(itemForEdit) }}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
