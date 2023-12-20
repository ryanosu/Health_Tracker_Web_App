using Dapper;
using Health_Tracker_Web_App.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Net;

namespace Health_Tracker_Web_App.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodController : ControllerBase
    {
        private readonly IConfiguration _config;

        public FoodController(IConfiguration config)
        {
            _config = config;
        }

        [HttpGet]
        public async Task<ActionResult<List<Food>>> GetAllFood()
        {
            using var connection = new SqlConnection(_config.GetConnectionString("AZURE_SQL_CONNECTIONSTRING"));
            var foundFoods = await connection.QueryAsync<Food>("select * from food");
            return (Ok(foundFoods));
        }

        [HttpGet("food_id")]
        public async Task<ActionResult<Food>> GetFood(int food_id)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("AZURE_SQL_CONNECTIONSTRING"));
            var foundFood = await connection.QueryFirstAsync<Food>("select * from food where food_id = @found_food_id", new { found_food_id = food_id });
            return (Ok(foundFood));
        }

        [HttpPost]
        public async Task<ActionResult<Food>> PostFood(Food food)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("AZURE_SQL_CONNECTIONSTRING"));
            var postedFood = await connection.ExecuteAsync("insert into food (name, fat, carbs, protein, calories, users_id) values (@name, @fat, @carbs, @protein, @calories, @users_id)", food);
            return (Ok(postedFood));
        }

        [HttpPut]
        public async Task<ActionResult<Food>> UpdateFood(Food food)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("AZURE_SQL_CONNECTIONSTRING"));
            var updatedFood = await connection.ExecuteAsync("update food set name = @name, fat = @fat, carbs = @carbs, protein = @protein, calories = @calories, users_id = @users_id where food_id = @food_id", food);
            return (Ok(updatedFood));
        }

        [HttpDelete("{food_id}")]
        public async Task<ActionResult<Food>> DeleteFood(int food_id)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("AZURE_SQL_CONNECTIONSTRING"));
            var deletedFood = await connection.QueryFirstAsync<Food>("delete from food where food_id = @found_food_id", new { found_food_id = food_id });
            return Ok("Completed!");
        }
    }

}
