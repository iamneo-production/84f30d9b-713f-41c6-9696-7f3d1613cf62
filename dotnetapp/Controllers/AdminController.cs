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
    }
}
