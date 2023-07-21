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
    }
}