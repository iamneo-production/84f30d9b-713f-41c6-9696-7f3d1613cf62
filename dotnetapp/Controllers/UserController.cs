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

    }
}