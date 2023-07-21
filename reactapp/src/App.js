import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Signup from './components/Signup';
import Viewacademy from './components/Viewacademy'
import Courses from './components/Courses';
import StudentForm from './components/StudentForm';
import Enrolledcourse from './components/Enrolledcourse';
import Editadmission from './components/Editadmission';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/institutes' element={<Viewacademy/>}></Route>
        <Route path='/courses' element={<Courses/>}></Route>
        <Route path='/studentform' element={<StudentForm/>}></Route>
        <Route path='/enrolledcourses' element={<Enrolledcourse/>}></Route>
        <Route path="/editAdmission/:id" element={<Editadmission/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;