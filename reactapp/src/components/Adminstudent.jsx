import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

function Adminstudent() {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () =>
    {
        fetch('https://8080-baedadabfababfdabddffdbddfadbecbaeee.project.examly.io/user/logout',
        {method: 'DELETE'})
        .then(res => res.json())
        .then(result => alert(result.value))
    }

  useEffect(() => {
    fetch('https://8080-baedadabfababfdabddffdbddfadbecbaeee.project.examly.io/admin/ViewStudent')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const updatedStudents = data.student.map((student) => ({
            ...student,
            id: student.studentId,
          }));
          setStudents(updatedStudents);
        } else {
          console.error(data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const handleDelete = (studentId) => {
    fetch(`https://8080-baedadabfababfdabddffdbddfadbecbaeee.project.examly.io/admin/deleteStudent/${studentId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Student deleted successfully:', data);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const searchStudent = (event) => {
    event.preventDefault();
    const filteredData = students.filter((item) =>
      item.firstName.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
    setStudents(filteredData);
    if (filteredData.length === 0) {
      alert('No results found.');
      window.location.reload();
    }
  };

  return (
    <div><br/><br/>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="userNavbar">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/Academy" id="adminAcademy">
                Academy
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Course" id="adminCourse">
                Course
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Students" id="adminStudents">
                Students
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link" id="logout" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav><br/>

      <div className="search-bar">
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="Type here student ID to search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn btn-primary btn-sm" id="searchStudent" onClick={searchStudent}>
          Search
        </button>
      </div>
      <br />

      <div className="header-row">
        <div className="header-item">Student ID</div>
        <div className="header-item">Student Name</div>
        <div className="header-item">Enrolled Course</div>
        <div className="header-item">Mobile Number</div>
        <div className="header-item">Actions</div>
      </div>

      {students.map((student) => (
        <div key={student.studentId} className="student-row">
          <div className="student-item">{student.studentId}</div>
          <div className="student-item">{student.firstName}</div>
          <div className="student-item">{student.courseName}</div>
          <div className="student-item">{student.phoneNumber1}</div>
          <div className="student-item">
            <span className="action-icons">
              <Link to={`/editStudent/${student.studentId}`} className="edit-icon">
                <FaEdit />
              </Link>
              <FaTrash className="trash-icon" onClick={() => handleDelete(student.studentId)} />
            </span>
          </div>
        </div>
      ))}

      <div className="add-student-button">
        <Link
          to="/addStudent"
          className="btn btn-primary btn-lg d-block d-lg-inline-block"
          id="addStudent"
        >
          Add Student
        </Link>
      </div>

      

      <style>
        {`
        .body {
          background-color: #f8f4f7;
        }
        #userNavbar {
          background-color: rgb(43, 110, 57);
        }
        .navbar-brand {
          font-size: 40px;
          color: white;
        }
        #adminAcademy {
          font-size: 20px;
          color: white;
        }
        #adminCourse {
          font-size: 20px;
          color: white;
        }
        #adminStudents {
          font-size: 25px;
          color: white;
        }
        #logout {
          font-size: 20px;
          color: white;
        }
        body {
          background: #797979;
        }
        .add-student-button {
          position: fixed;
          bottom: 40px;
          right: 40px;
        }
        .search-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 20px;
        }
        .search-bar input {
          width: 220px;
          margin-right: 10px;
        }
        .header-row {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          background-color: rgb(43, 110, 57);
          color: white;
          padding: 10px;
          align-items: flex-end;
        }
        
        .student-row {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
          background-color: white;
          color: black;
          padding: 10px;
          border: 1px solid rgb(43, 110, 57);
        }
        
        .header-item,
        .student-item {
          text-align: center;
        }
        
        .action-row {
          display: flex;
          align-items: center;
        }
        
        .edit-icon,
        .trash-icon {
          font-size: 20px;
          cursor: pointer;
          margin-right: 10px;
          margin-left: 10px;
        }
        `}
      </style>
    </div>
  );
}

export default Adminstudent;
