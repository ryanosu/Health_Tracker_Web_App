using Dapper;
using Health_Tracker_Web_App.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Data.SqlClient;

namespace Health_Tracker_Web_App.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        private readonly IConfiguration _config;

        public UsersController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost]
        public async Task<ActionResult<int>> PostUser(User user)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("AZURE_SQL_SQL_C4957_CONNECTIONSTRING"));
            // see if user's uuid already exists
            var foundUsers = await connection.QueryAsync<User>("SELECT * FROM users WHERE uuid = @uuid", user);
            if (foundUsers.Any())
            {
                var existingUser = foundUsers.First();
                return Ok(existingUser.Users_id);
            }
            // does not exist; create new user
            var postedUser = await connection.ExecuteAsync("insert into users (uuid) values (@uuid)", user);
            return (Ok(postedUser));
        }

        [HttpGet("{users_id}")]
        public async Task<ActionResult<List<Food>>> GetUserFoods(int users_id)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("AZURE_SQL_SQL_C4957_CONNECTIONSTRING"));
            var foundUserFoods = await connection.QueryAsync<Food>("SELECT * FROM food WHERE users_id = @found_users_id", new { found_users_id = users_id });
            return (Ok(foundUserFoods));
        }
    }
}
