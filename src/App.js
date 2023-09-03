import './App.scss';
import AddProduct from './pages/AddProduct';
import AddUser from './pages/AddUser';
import Login from './pages/Login';
import ReadProducts from './pages/ReadProducts';
import Register from './pages/Register';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import NewReadProducts from './pages/NewReadProducts';
import UploadFile from 'pages/UploadFile';
function App() {
  return (
    <>

      {/* Yai mainly authentication k hisy ma ata ha is ma sirf aik function firestore k liy use ho raha ha setDocs wala */}
      <Register />

      {/*  Yai authentication k hisy mai ha */}
      <Login />

      {/* Is mai user create ho raha ha (Firestore ka hisa) */}
      <AddUser />

      {/* Is ma product create ho rahi ha (firestore ka hisa ha ) yai bilkul AddUser ki tarah hi ha */}
      <AddProduct />

      {/* Is ma products read ho rhy(table ki form ma) update b ho raha ha or delete bhi  (mtlb main yai file ka code ha) */}
      <ReadProducts />

      {/* Is mai hum file upload kary gy firebase ki stoeage mai (Storage) */}
      <UploadFile />

      {/* <NewReadProducts/> */}



    </>
  );
}

export default App;
