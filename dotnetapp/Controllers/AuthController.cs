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
	[Route("")]
    public class AuthController : ControllerBase
	{
		private readonly IConfiguration _configuration;
		public AuthController(IConfiguration configuration)
		{
			_configuration = configuration;
		}

		[HttpPost]
        [Route("user/signup")]
        public IActionResult saveUser(UserModel users)
        {
			string check = @"select email from UserModel where email=@email";
			DataTable table = new DataTable();
			string sqlDataSource = _configuration.GetConnectionString("myconnstring");
			SqlDataReader myReader;
			using (SqlConnection myCon = new SqlConnection(sqlDataSource))
			{
				myCon.Open();
				using (SqlCommand myCommand = new SqlCommand(check, myCon)) {
                    myCommand.Parameters.AddWithValue("@email", users.email);
					myReader = myCommand.ExecuteReader();
					table.Load(myReader);
					myReader.Close();
					myCon.Close();
				}
			}
			if(table != null && table.Rows.Count>0){
				return Created(new Uri(Request.Path),new {value=false});
			}
			string query = @"insert into dbo.UserModel (username,email,mobileNumber,password,userRole) values (@username,@email,@mobileNumber,@password,@userRole)";
			DataTable table2 = new DataTable();
			using (SqlConnection myCon = new SqlConnection(sqlDataSource))
			{
				myCon.Open();
				using (SqlCommand myCommand = new SqlCommand(query, myCon))
				{
					myCommand.Parameters.AddWithValue("@username", users.username);
					myCommand.Parameters.AddWithValue("@email", users.email);
                    myCommand.Parameters.AddWithValue("@mobileNumber", users.mobileNumber);
					myCommand.Parameters.AddWithValue("@password", users.password);
                    myCommand.Parameters.AddWithValue("@userRole", users.userRole);
					myReader = myCommand.ExecuteReader();
					table2.Load(myReader);
					myReader.Close();
                    myCon.Close();
				}
			}
			return Created(new Uri(Request.Path),new {value=true,message="Registered Successfully"});
        }

    }
}