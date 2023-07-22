using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using dotnetapp.Models;
using System.Data.SqlClient;
using System.Data;
using System.Runtime.Intrinsics.Arm;
using System.Diagnostics;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("admin/[action]")]
    public class AdminController : ControllerBase
    {
        private readonly string _connectionString;

        public AdminController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("myconnstring");
        }

        [HttpPost]
        public IActionResult addInstitute([FromBody] InstituteModel institute)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    connection.Open();

                    SqlCommand command = new SqlCommand("INSERT INTO Institute (instituteName, instituteDescription, instituteAddress,mobile,email, photoFileName ) VALUES (@academyName, @academyDescription, @academyLocation, @contactNumber, @emailId, @imageUrl)", connection);

                    command.Parameters.AddWithValue("@academyName", institute.instituteName);
                    command.Parameters.AddWithValue("@academyDescription", institute.instituteDescription);
                    command.Parameters.AddWithValue("@academyLocation", institute.instituteAddress);
                    command.Parameters.AddWithValue("@contactNumber", institute.mobile);
                    command.Parameters.AddWithValue("@emailId", institute.email);
                    command.Parameters.AddWithValue("@imageUrl", institute.photoFileName);

                    command.ExecuteNonQuery();
                }

                return Ok(new { success = true, message = "Institute added" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }

     

        [HttpPut]
        [Route("{id}")]
        public IActionResult editInstitute(int id, [FromBody] InstituteModel institute)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    connection.Open();

                    SqlCommand command = new SqlCommand("UPDATE Institute SET instituteName = @academyName, instituteDescription = @academyDescription, instituteAddress = @academyLocation, mobile = @contactNumber,email = @emailId, photoFileName = @imageUrl WHERE instituteId = @Id", connection);

                    command.Parameters.AddWithValue("@Id", id);
                    command.Parameters.AddWithValue("@academyName", institute.instituteName);
                    command.Parameters.AddWithValue("@academyDescription", institute.instituteDescription);
                    command.Parameters.AddWithValue("@academyLocation", institute.instituteAddress);
                    command.Parameters.AddWithValue("@contactNumber", institute.mobile);
                    command.Parameters.AddWithValue("@emailId", institute.email);
                    command.Parameters.AddWithValue("@imageUrl", institute.photoFileName);

                    int rowsAffected = command.ExecuteNonQuery();

                    if (rowsAffected == 0)
                    {
                        return NotFound("Institute not found");
                    }
                }

                return Ok(new { success = true, message = "Institute edited" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetInstitute(int id)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    connection.Open();

                    SqlCommand command = new SqlCommand("SELECT * FROM Institute WHERE instituteId = @Id", connection);
                    command.Parameters.AddWithValue("@Id", id);

                    SqlDataReader reader = command.ExecuteReader();

                    if (reader.Read())
                    {
                        InstituteModel institute = new InstituteModel
                        {
                            instituteId = (int)reader["instituteId"],
                            instituteName = (string)reader["instituteName"],
                            instituteDescription = (string)reader["instituteDescription"],
                            instituteAddress = (string)reader["instituteAddress"],
                            mobile = (string)reader["mobile"],
                            email = (string)reader["email"],
                            photoFileName = (string)reader["photoFileName"]
                        };

                        return Ok(new { success = true, institute });
                    }

                    return NotFound("Institute not found");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }

        [HttpGet]
        public IActionResult viewInstitutes()
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    connection.Open();

                    SqlCommand command = new SqlCommand("SELECT * FROM Institute", connection);
                    SqlDataReader reader = command.ExecuteReader();

                    List<InstituteModel> institutes = new List<InstituteModel>();

                    while (reader.Read())
                    {
                        InstituteModel institute = new InstituteModel
                        {
                            instituteId = (int)reader["instituteId"],
                            instituteName = (string)reader["instituteName"],
                            instituteDescription = (string)reader["instituteDescription"],
                            instituteAddress = (string)reader["instituteAddress"],
                            mobile = (string)reader["mobile"],
                            email = (string)reader["email"],
                            photoFileName = (string)reader["photoFileName"]
                        };

                        institutes.Add(institute);
                    }

                    return Ok(new { success = true, institutes });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult deleteInstitute(int id)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    connection.Open();

                    SqlCommand command = new SqlCommand("DELETE FROM Institute WHERE instituteId = @Id", connection);
                    command.Parameters.AddWithValue("@Id", id);

                    int rowsAffected = command.ExecuteNonQuery();

                    if (rowsAffected == 0)
                    {
                        return NotFound("Institute not found");
                    }
                }

                return Ok(new { success = true, message = "Institute deleted" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }

        [HttpPost]
        public IActionResult addStudent([FromBody] StudentModel student)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    connection.Open();

                    SqlCommand command = new SqlCommand("INSERT INTO student (firstName, phoneNumber1, lastName, gender, fatherName, motherName, emailId,phoneNumber2, age, houseNo, streetName, areaName, state, pincode, nationality) VALUES (@firstName,@phoneNumber1, @lastName, @gender, @fatherName, @motherName, @emailId,@phoneNumber2, @age, @houseNo, @streetName, @areaName, @state, @pincode, @nationality)", connection);

                    command.Parameters.AddWithValue("@firstName", student.firstName);
                    command.Parameters.AddWithValue("@phoneNumber1", student.phoneNumber1);
                    command.Parameters.AddWithValue("@lastName", student.lastName);
                    command.Parameters.AddWithValue("@gender", student.gender);
                    command.Parameters.AddWithValue("@fatherName", student.fatherName);
                    command.Parameters.AddWithValue("@motherName", student.motherName);
                    command.Parameters.AddWithValue("@emailId", student.emailId);
                    command.Parameters.AddWithValue("@phoneNumber2", student.phoneNumber2);
                    command.Parameters.AddWithValue("@age", student.age);
                    command.Parameters.AddWithValue("@houseNo", student.houseNo);
                    command.Parameters.AddWithValue("@streetName", student.streetName);
                    command.Parameters.AddWithValue("@areaName", student.areaName);
                    command.Parameters.AddWithValue("@state", student.state);
                    command.Parameters.AddWithValue("@pincode", student.pincode);
                    command.Parameters.AddWithValue("@nationality", student.nationality);

                    command.ExecuteNonQuery();
                }

                return Ok(new { success = true, message = "Student added" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }

        [HttpPut]
        [Route("{id}")]
        public IActionResult editStudent(int id, [FromBody] StudentModel student)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    connection.Open();

                    SqlCommand command = new SqlCommand("UPDATE student SET firstName = @firstName, lastName = @lastName, gender = @gender, fatherName = @fatherName, phoneNumber1=@phoneNumber1, phoneNumber2=@phoneNumber2,motherName = @motherName, emailId = @emailId, age = @age, houseNo = @houseNo, streetName = @streetName, areaName = @areaName, pincode = @pincode, state = @state, nationality = @nationality WHERE studentId = @Id", connection);

                    command.Parameters.AddWithValue("@Id", id);
                    command.Parameters.AddWithValue("@firstName", student.firstName);
                    command.Parameters.AddWithValue("@phoneNumber1", student.phoneNumber1);
                    command.Parameters.AddWithValue("@lastName", student.lastName);
                    command.Parameters.AddWithValue("@gender", student.gender);
                    command.Parameters.AddWithValue("@fatherName", student.fatherName);
                    command.Parameters.AddWithValue("@motherName", student.motherName);
                    command.Parameters.AddWithValue("@emailId", student.emailId);
                    command.Parameters.AddWithValue("@phoneNumber2", student.phoneNumber2);
                    command.Parameters.AddWithValue("@age", student.age);
                    command.Parameters.AddWithValue("@houseNo", student.houseNo);
                    command.Parameters.AddWithValue("@streetName", student.streetName);
                    command.Parameters.AddWithValue("@areaName", student.areaName);
                    command.Parameters.AddWithValue("@state", student.state);
                    command.Parameters.AddWithValue("@pincode", student.pincode);
                    command.Parameters.AddWithValue("@nationality", student.nationality);

                    int rowsAffected = command.ExecuteNonQuery();

                    if (rowsAffected == 0)
                    {
                        return NotFound("Student not found");
                    }
                }

                return Ok(new { success = true, message = "Student details edited" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetStudent(int id)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    connection.Open();

                    SqlCommand command = new SqlCommand("SELECT * FROM student WHERE studentId = @Id", connection);
                    command.Parameters.AddWithValue("@Id", id);

                    SqlDataReader reader = command.ExecuteReader();

                    if (reader.Read())
                    {
                        StudentModel student = new StudentModel
                        {
                            studentId = (int)reader["studentId"],
                            firstName = (string)reader["firstName"],
                            phoneNumber1 = (string)reader["phoneNumber1"],
                            lastName = (string)reader["lastName"],
                            gender = (string)reader["gender"],
                            fatherName = (string)reader["fatherName"],
                            motherName = (string)reader["motherName"],
                            emailId = (string)reader["emailId"],
                            phoneNumber2 = (string)reader["phoneNumber2"],
                            age = (int)reader["age"],
                            houseNo = (string)reader["houseNo"],
                            streetName = (string)reader["streetName"],
                            areaName = (string)reader["areaName"],
                            state = (string)reader["state"],
                            pincode = (int)reader["pincode"],
                            nationality = (string)reader["nationality"]
                        };

                        return Ok(new { success = true, student });
                    }

                    return NotFound("Student not found");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }

        [HttpGet]
        public IActionResult ViewStudent()
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    connection.Open();
                    SqlCommand command = new SqlCommand("SELECT student.studentId,student.firstName,course.courseName,student.phoneNumber1 FROM student INNER JOIN dbo.Admission on student.studentId=Admission.studentId INNER JOIN course on Admission.CourseId=course.CourseId", connection);
                    SqlDataReader reader = command.ExecuteReader();
                    DataTable student = new DataTable();
                    student.Load(reader);

                    return Ok(new { success = true, student });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }
        [HttpDelete]
        [Route("{id}")]
        public IActionResult deleteStudent(int id)
        {
            try
            {
                // Code to delete a student from the database
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    connection.Open();

                    SqlCommand command = new SqlCommand("DELETE FROM student WHERE studentId = @Id", connection);
                    command.Parameters.AddWithValue("@Id", id);

                    int rowsAffected = command.ExecuteNonQuery();

                    if (rowsAffected == 0)
                    {
                        return NotFound("Student not found");
                    }
                }

                return Ok(new { success = true, message = "Student details deleted" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }
                [HttpPost]
        public IActionResult addCourse([FromBody] CourseModel course)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    connection.Open();

                    SqlCommand command = new SqlCommand("INSERT INTO course (courseName, instituteId, studentsEnrolled, courseTiming, courseDuration, courseDescription) VALUES (@courseName, @instituteId, @studentsEnrolled,@courseTiming, @courseDuration, @courseDescription)", connection);

                    command.Parameters.AddWithValue("@courseName", course.courseName);
                    command.Parameters.AddWithValue("@studentsEnrolled", course.studentsEnrolled);
                    command.Parameters.AddWithValue("@courseTiming", course.courseTiming);
                    command.Parameters.AddWithValue("@courseDuration", course.courseDuration);
                    command.Parameters.AddWithValue("@courseDescription", course.courseDescription);
                    command.Parameters.AddWithValue("@instituteId",course.instituteId);

                    command.ExecuteNonQuery();
                }

                return Ok(new { success = true, message = "Course added" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }
    [HttpPut]
    [Route("{id}")]
    public IActionResult editCourse(int id, [FromBody] CourseModel course)
    {
        try
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                SqlCommand command = new SqlCommand("UPDATE course SET courseName = @courseName, instituteId=@instituteId, studentsEnrolled= @studentsEnrolled, courseTiming = @courseTiming, courseDuration = @courseDuration, courseDescription = @courseDescription WHERE courseId = @Id", connection);

                command.Parameters.AddWithValue("@Id", id);
                command.Parameters.AddWithValue("@courseName", course.courseName);
                command.Parameters.AddWithValue("@instituteId", course.instituteId);
                command.Parameters.AddWithValue("@studentsEnrolled", course.studentsEnrolled);
                command.Parameters.AddWithValue("@courseTiming", course.courseTiming);
                command.Parameters.AddWithValue("@courseDuration", course.courseDuration);
                command.Parameters.AddWithValue("@courseDescription", course.courseDescription);

                int rowsAffected = command.ExecuteNonQuery();

                if (rowsAffected == 0)
                {
                    return NotFound("Course edited");
                }
            }

            return Ok(new { success = true, message = "Course updated successfully" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { success = false, message = ex.Message });
        }
    }
      [HttpGet]
      [Route("{id}")]
    public IActionResult GetCourse(int id)
    {
        try
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                SqlCommand command = new SqlCommand("SELECT * FROM course WHERE courseId = @Id", connection);
                command.Parameters.AddWithValue("@Id", id);

                SqlDataReader reader = command.ExecuteReader();

                if (reader.Read())
                {
                    CourseModel course = new CourseModel
                    {
                        courseId = (int)reader["courseId"],
                        courseName = (string)reader["courseName"],
                        instituteId = (int)reader["instituteId"],
                        studentsEnrolled = (int)reader["studentsEnrolled"],
                        courseTiming = (string)reader["courseTiming"],
                        courseDuration = (int)reader["courseDuration"],
                        courseDescription = (string)reader["courseDescription"]
                    };

                    return Ok(new { success = true, course });
                }

                return NotFound("Course not found");
            }
        }
        catch (Exception ex)
        {
            return BadRequest(new { success = false, message = ex.Message });
        }
    }
     [HttpGet]
    public IActionResult viewCourse()
    {
        try
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                SqlCommand command = new SqlCommand("SELECT * FROM course", connection);
                SqlDataReader reader = command.ExecuteReader();

                List<CourseModel> courses = new List<CourseModel>();

                while (reader.Read())
                {
                    CourseModel course = new CourseModel
                    {
                        courseId = (int)reader["courseId"],
                        courseName = (string)reader["courseName"],
                        instituteId = (int)reader["instituteId"],
                        studentsEnrolled = (int)reader["studentsEnrolled"],
                        courseTiming = (string)reader["courseTiming"],
                        courseDuration = (int)reader["courseDuration"],
                        courseDescription = (string)reader["courseDescription"]
                    };

                    courses.Add(course);
                }

                return Ok(new { success = true, courses });
            }
        }
        catch (Exception ex)
        {
            return BadRequest(new { success = false, message = ex.Message });
        }
    }

    [HttpDelete]
    [Route("{id}")]
    public IActionResult deleteCourse(int id)
    {
        try
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                SqlCommand command = new SqlCommand("DELETE FROM course WHERE courseId = @Id", connection);
                command.Parameters.AddWithValue("@Id", id);

                int rowsAffected = command.ExecuteNonQuery();

                if (rowsAffected == 0)
                {
                    return NotFound("Course not found");
                }
            }

            return Ok(new { success = true, message = "Course deleted" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { success = false, message = ex.Message });
        }
    }

    }
}
