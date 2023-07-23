import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { FaTrash, FaPencilAlt } from 'react-icons/fa';

 

function Adminacademy() {

  const [institutes, setInstitutes] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');

 

  const handleLogout = () =>

    {

        fetch('https://8080-aaccecedbccaaccabfdabddffdbddfadbecbaeee.project.examly.io/user/logout',

        {method: 'DELETE'})

        .then(res => res.json())

        .then(result => alert(result.value))

    }

 

  useEffect(() => {

    fetch('https://8080-aaccecedbccaaccabfdabddffdbddfadbecbaeee.project.examly.io/admin/viewInstitutes')

      .then((response) => response.json())

      .then((data) => {

        if (data.success) {

          setInstitutes(data.institutes);

        } else {

          console.error(data.message);

        }

      })

      .catch((error) => {

        console.error('Error:', error);

      });

  }, []);

 

  const handleDelete = (instituteId) => {

    fetch(`https://8080-aaccecedbccaaccabfdabddffdbddfadbecbaeee.project.examly.io/admin/deleteInstitute/${instituteId}`, {

      method: 'DELETE',

    })

      .then((response) => response.json())

      .then((data) => {

        alert('Institute deleted successfully:', data);

        window.location.reload();

      })

      .catch((error) => {

        console.error('Error:', error);

      });

  };

  const searchAcademy = (event) => {

    event.preventDefault();

    const filteredData = institutes.filter((item) =>

      item.instituteName.toLowerCase().includes(searchQuery.toLowerCase())

    );

    setInstitutes(filteredData);

    if (filteredData.length === 0) {

      alert('No results found.');

      window.location.reload();

    }

  };

 

 

  return (

    <div>

<div className="search-bar">

        <input

          type="text"

          className="form-control form-control-sm"

          placeholder="Type here to search academies"

          value={searchQuery}

          onChange={(e) => setSearchQuery(e.target.value)}

        />

        <button className="btn btn-primary btn-sm" id="searchAcademy" onClick={searchAcademy}>

          Search

        </button>

      </div>

 

      <br />

      <div className="container">

        <div className="row">

          {institutes.map((institute) => (

            <div className="col-md-4" key={institute.instituteId}>

              <div className="card mb-3">

                <img

                  src={institute.photoFileName}

                  className="card-img-top"

                  alt="Invalid url"

                  style={{ height: '180px' }}

                />

                <div className="card-body">

                  <h3 className="card-title" style={{ marginBottom: '5px' }}>

                    {institute.instituteName}

                  </h3>

                  <p className="card-text" style={{ marginBottom: '5px' }}>

                    Contact: {institute.mobile}

                  </p>

                  <p className="card-text" style={{ marginBottom: '5px' }}>

                    Email: {institute.email}

                  </p>

                  <p className="card-text" style={{ marginBottom: '5px' }}>

                    Location: {institute.instituteAddress}

                  </p>

                </div>

                <div className="card-actions">

                  <div className="d-flex justify-content-between">

                  <Link to={`/editInstitute/${institute.instituteId}`}>

                      <FaPencilAlt size={20} />

                    </Link>

                    <button

                      onClick={() => handleDelete(institute.instituteId)}

                      className="delete-button"

                    >

                      <FaTrash size={20} />

                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

 

      <div className="add-academy-button">

        <Link

          to="/addAcademy"

          className="btn btn-primary btn-lg d-block d-lg-inline-block"

          id="addAcademy"

        >

          Add Academy

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

          font-size: 25px;

          color: white;

         

        }

        #adminCourse {

          font-size: 20px;

          color: white;

       

        }

        #adminStudents {

          font-size: 20px;

          color: white;

       

        }

        #logout {

          font-size: 20px;

          color: white;

        }

        body {

          background: #797979;

        }

        .add-academy-button {

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

         width:220px;

         margin-right:10px;

        }

        .card {

          border: 1px solid #ddd;

          border-radius: 4px;

          margin-bottom: 20px;

          position: relative;

        }

        .card-actions {

          position: absolute;

          bottom: 10px;

          right: 10px;

        }

        .card-actions button {

          background-color: transparent;

          border: none;

          outline: none;

          cursor: pointer;

        }

        `}

      </style>

    </div>

  );

}

 

export default Adminacademy; 