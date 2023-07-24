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
import Adminacademy from './components/Adminacademy';
import Addacademy from './components/Addacademy';
import Editacademy from './components/Editacademy';
import Admincourse from './components/Admincourse';
import Addcourse from './components/Addcourse';
import Editcourse from './components/Editcourse';
import Adminstudent from './components/Adminstudent';
import Addstudent from './components/Addstudent';
import Editstudent from './components/Editstudent';

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
        <Route path="/Editinstitute/:id" element={<Editacademy />} />
        <Route path="/addAcademy" element={<Addacademy />} />
        <Route path="/Course" element={<Admincourse />} />
        <Route path="/addCourse" element={<Addcourse/>} />
        <Route path="/editCourse/:id" element={<Editcourse />} />
        <Route path="/editStudent/:id" element={<Editstudent/>}/>
        <Route path="/Academy" element={<Adminacademy/>} />
        <Route path="/Students" element={<Adminstudent />} />
        <Route path="/addStudent" element={<Addstudent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
