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
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [Route("user/viewInstitutes")]
        public IActionResult viewInstitutes()
        {
            string query = @"
                            select * from
                            dbo.Institute
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("myconnstring");
            SqlDataReader myReader;
            using(SqlConnection myCon=new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using(SqlCommand myCommand=new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return Ok(new {value= (new JsonResult(table)).Value});
        }

        [HttpGet]
        [Route("user/viewStatus")]
        public IActionResult viewStatus(int id)
        {
            string query = @"
                            select * from
                            dbo.course where instituteId = @instituteId;
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("myconnstring");
            SqlDataReader myReader;
            using(SqlConnection myCon=new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using(SqlCommand myCommand=new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@instituteId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            string q0 = @"select email from dbo.LoginModel where id=(select max(id) from dbo.LoginModel)";
            string email = "";
            int studentId=0;
            bool login=false;
            using(SqlConnection myCon=new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using(SqlCommand myCommand=new SqlCommand(q0, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    if(myReader.Read())
                    {
                        email = myReader[0].ToString();
                        myReader.Close();
                        login=true;
                        string s=@"select studentId from student where emailId=@email";
                        using(SqlCommand sc = new SqlCommand(s,myCon))
                        {
                            sc.Parameters.AddWithValue("@email",email);
                            myReader = sc.ExecuteReader();
                            if(myReader.Read()){
                                studentId = (int)myReader[0];
                            }
                            myReader.Close();
                        }
                    }
                    myCon.Close();
                }
            }
            
            DataTable t = new DataTable();
            t.Columns.Add(new DataColumn("courseId",typeof(int)));
            t.Columns.Add("courseName");
            t.Columns.Add(new DataColumn("instituteId",typeof(int)));
            t.Columns.Add(new DataColumn("studentsEnrolled",typeof(int)));
            t.Columns.Add("courseTiming");
            t.Columns.Add(new DataColumn("courseDuration",typeof(int)));
            t.Columns.Add("courseDescription");
            t.Columns.Add(new DataColumn("status", typeof(bool)));
            DataRow dr;
            DataTable t1 = new DataTable();
            for(int i=0; i<table.Rows.Count ;i++)
            {
                dr = t.NewRow();
                dr["courseId"]=(int)table.Rows[i]["courseId"];
                dr["courseName"]=table.Rows[i]["courseName"];
                dr["instituteId"]=(int)table.Rows[i]["instituteId"];
                dr["studentsEnrolled"]=(int)table.Rows[i]["studentsEnrolled"];
                dr["courseTiming"]=table.Rows[i]["courseTiming"];
                dr["courseDuration"]=(int)table.Rows[i]["courseDuration"];
                dr["courseDescription"]=table.Rows[i]["courseDescription"];

                if(login && studentId!=0)
                {
                    
                    string q2 = @"select * from Admission where courseId=@id and studentId=@studentId";
                    using(SqlConnection myCon=new SqlConnection(sqlDataSource))
                    {
                        myCon.Open();
                        using(SqlCommand myCommand=new SqlCommand(q2, myCon))
                        {
                            myCommand.Parameters.AddWithValue("@id",(int)table.Rows[i]["courseId"]);
                            myCommand.Parameters.AddWithValue("@studentId",studentId);

                            myReader = myCommand.ExecuteReader();
                            if(myReader.HasRows)
                            {
                                dr["status"] = true; 
                            }
                            else
                            {
                                dr["status"] = false;
                            }
                            t1.Load(myReader);
                            myReader.Close();
                            myCon.Close();
                        }
                    }
                }
                else
                    dr["status"] = false;
                t.Rows.Add(dr);
            }
            if(!login)
            {
                return Ok(new {login=false,value= (new JsonResult(t)).Value});
            }
            return Ok(new {login=true,value= (new JsonResult(t)).Value});
        }
        [HttpPost]
        [Route("user/addAdmission/{id}")]
        public IActionResult addAdmission(StudentModel student,int id)
        {
            string q = @"select email from dbo.LoginModel where id=(select max(id) from dbo.LoginModel)";
            string sqlDataSource = _configuration.GetConnectionString("myconnstring");
            SqlDataReader myReader;
            string e = "";
            using(SqlConnection myCon=new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using(SqlCommand myCommand=new SqlCommand(q, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    if(myReader.Read())
                    {
                        e = myReader[0].ToString();
                    }
                    myReader.Close();
                    myCon.Close();
                }
            }
            if(student.emailId!=e)
            {
                return Ok(new {value=false,message="email should be Registered email"});
            }

            string s=@"select * from student where emailId=@email";
            bool f=false;
            using(SqlConnection myCon=new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using(SqlCommand myCommand=new SqlCommand(s, myCon))
                {
                    myCommand.Parameters.AddWithValue("@email",e);
                    myReader = myCommand.ExecuteReader();
                    if(myReader.HasRows)
                    {
                        f=true;
                    }
                    myReader.Close();
                    myCon.Close();
                }
            }
            string query = @"insert into dbo.student (firstName,lastName,gender,fatherName,phoneNumber1,phoneNumber2,motherName,emailId,age,houseNo,streetName,areaName,pincode,state,nationality) values (@firstName,@lastName,@gender,@fatherName,@phoneNumber1,@phoneNumber2,@motherName,@emailId,@age,@houseNo,@streetName,@areaName,@pincode,@state,@nationality)";
            if(f)
            {
                query = @"update dbo.student set firstName=@firstName,lastName=@lastName,gender=@gender,fatherName=@fatherName,phoneNumber1=@phoneNumber1,phoneNumber2=@phoneNumber2,motherName=@motherName,emailId=@emailId,age=@age,houseNo=@houseNo,streetName=@streetName,areaName=@areaName,pincode=@pincode,state=@state,nationality=@nationality where emailId=@emailId"; 
            }
            DataTable table = new DataTable();
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@firstName", student.firstName);
                    myCommand.Parameters.AddWithValue("@lastName", student.lastName);
                    myCommand.Parameters.AddWithValue("@gender", student.gender);
                    myCommand.Parameters.AddWithValue("@fatherName", student.fatherName);
                    myCommand.Parameters.AddWithValue("@phoneNumber1", student.phoneNumber1);
                    myCommand.Parameters.AddWithValue("@phoneNumber2", student.phoneNumber2);
                    myCommand.Parameters.AddWithValue("@motherName", student.motherName);
                    myCommand.Parameters.AddWithValue("@emailId", student.emailId);
                    myCommand.Parameters.AddWithValue("@age", student.age);
                    myCommand.Parameters.AddWithValue("@houseNo",student.houseNo);
                    myCommand.Parameters.AddWithValue("@streetName", student.streetName);
                    myCommand.Parameters.AddWithValue("@areaName", student.areaName);
                    myCommand.Parameters.AddWithValue("@pincode", student.pincode);
                    myCommand.Parameters.AddWithValue("@state", student.state);
                    myCommand.Parameters.AddWithValue("@nationality", student.nationality);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            string q0 = @"select studentId from dbo.student where emailId=@email";
            int studentId=0;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource)){
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(q0, myCon))
                {
                    myCommand.Parameters.AddWithValue("@email",student.emailId);
                    myReader = myCommand.ExecuteReader();
                    if(myReader.Read()){
                        studentId = (int)myReader[0];
                    }
                    myReader.Close();
                    myCon.Close();
                }
            }
            string q1 = @"select courseDuration from dbo.course where courseId=@id";
            int courseDuration=0;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource)){
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(q1, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id",id);
                    myReader = myCommand.ExecuteReader();
                    if(myReader.Read()){
                        courseDuration = (int)myReader[0];
                    }
                    myReader.Close();
                    myCon.Close();
                }
            }
            string q2 = @"insert into dbo.Admission (studentId,courseId,startDate,endDate) values (@studentId,@courseId,GetDate(),DATEADD(MONTH,@duration,GETDATE()))";

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(q2, myCon)){
                    myCommand.Parameters.AddWithValue("@studentId",studentId);
                    myCommand.Parameters.AddWithValue("@courseId",id);
                    myCommand.Parameters.AddWithValue("@duration",courseDuration);
                    myReader = myCommand.ExecuteReader();
                    myReader.Close();
                    myCon.Close();
                }
            }
            return Created(new Uri(Request.Path),new {value=true,message="Course Enrolled"});
        }
        [HttpGet]
        [Route("user/ViewAdmission")]
        public IActionResult viewAdmission()
        {
            string q = @"select email from dbo.LoginModel where id=(select max(id) from dbo.LoginModel)";
            string sqlDataSource = _configuration.GetConnectionString("myconnstring");
            SqlDataReader myReader;
            string email = "";
            using(SqlConnection myCon=new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using(SqlCommand myCommand=new SqlCommand(q, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    if(myReader.Read())
                    {
                        email = myReader[0].ToString();
                    }
                    myReader.Close();
                    myCon.Close();
                }
            }
            string q1 = @"select studentId from dbo.student where emailId=@email";
            int studentId=0;
            using(SqlConnection myCon=new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using(SqlCommand myCommand=new SqlCommand(q1, myCon))
                {
                    myCommand.Parameters.AddWithValue("@email",email);
                    myReader = myCommand.ExecuteReader();
                    if(myReader.Read())
                    {
                        studentId = (int)myReader[0];
                    }
                    myReader.Close();
                    myCon.Close();
                }
            }
            string query = @"
                            select * from
                            dbo.Admission where studentId = @studentId
                            ";
            DataTable table = new DataTable();
            using(SqlConnection myCon=new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using(SqlCommand myCommand=new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@studentId",studentId);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            string q0= @"select courseName from dbo.Course where courseId=@id";
            DataTable t = new DataTable();
            t.Columns.Add("admissionId");
            t.Columns.Add("studentId");
            t.Columns.Add("course_name");
            t.Columns.Add("startDate");
            t.Columns.Add("endDate");
            DataRow dr = null;
            for(int i=0; i<table.Rows.Count ;i++){
                dr = t.NewRow();
                using(SqlConnection myCon=new SqlConnection(sqlDataSource))
                {
                myCon.Open();
                using(SqlCommand myCommand=new SqlCommand(q0, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id",(int)table.Rows[i]["courseId"]);
                    myReader = myCommand.ExecuteReader();
                    if(myReader.Read())
                    {
                        dr["course_name"] = myReader[0].ToString(); 
                    } 
                    myReader.Close();
                    myCon.Close();
                }
                }
                DateTime d = (DateTime)table.Rows[i]["startDate"];
                DateTime d1 = (DateTime)table.Rows[i]["endDate"];
                string s1 = d.ToString("dd/MM/yyyy");
                string s2 = d1.ToString("dd/MM/yyyy");
                s1=s1.Replace("-","/");
                s2=s2.Replace("-","/");
                dr["admissionId"] = table.Rows[i]["admissionId"];
                dr["studentId"] = table.Rows[i]["studentId"];
                dr["startDate"] = s1;
                dr["endDate"] = s2;
                t.Rows.Add(dr);
            }

            return Ok(new {value=t});
        }

        [HttpDelete]
        [Route("user/deleteAdmission/{id}")]
        public IActionResult deleteAdmission(int id)
        {
            try
            {

                string sqlDataSource = _configuration.GetConnectionString("myconnstring");
                using (SqlConnection connection = new SqlConnection(sqlDataSource))
                {
                    connection.Open();

                    SqlCommand command = new SqlCommand("DELETE FROM Admission WHERE admissionId = @Id", connection);
                    command.Parameters.AddWithValue("@Id", id);

                    int rowsAffected = command.ExecuteNonQuery();

                    if (rowsAffected == 0)
                    {
                        return NotFound("Admission not found");
                    }
                }

                return Ok(new { success = true, message = "Admission details deleted" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }
        [HttpGet]
        [Route("user/getAdmission/{id}")]
        public IActionResult GetAdmission(int id)
        {
            try
            {
                string sqlDataSource = _configuration.GetConnectionString("myconnstring");

                using (SqlConnection connection = new SqlConnection(sqlDataSource))
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

        [HttpPut]
        [Route("user/editAdmission/{id}")]
        public IActionResult editAdmission(int id, [FromBody] StudentModel student)
        {
            try
            {
                string sqlDataSource = _configuration.GetConnectionString("myconnstring");
                using (SqlConnection connection = new SqlConnection(sqlDataSource))
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
    }
}