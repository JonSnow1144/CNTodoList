using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CNTodoList.Data;
using CNTodoList.Models;

namespace CNTodoList.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        //Get current user
        [HttpGet("[action]")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var id = HttpContext.Session.GetString("userid");
            //id = "11";
            if (!String.IsNullOrWhiteSpace(id)) {
                Users users = await _context.Users.FindAsync(int.Parse(id));
                if (users == null)
                {
                    users = new Users();
                }
                return Ok(users);
            }
            else
            {
                return Ok(new Users());
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Login([FromBody] Users data)
        {
            Users user = await _context.Users.FirstOrDefaultAsync(a => a.Email == data.Email && a.Password == data.Password);
            if (user == null)
            {
                user = new Users();
                return Ok(user);
            }
            else
            {
                HttpContext.Session.SetString("userid", Convert.ToString(user.Id));
              //  HttpContext.Session.SetString("username", data.FirstName);
                return Ok(user);
            }            
        }

        [HttpPost("[action]")]
        public void Logout()
        {            
            HttpContext.Session.SetString("userid", "");
            //return new EmptyResult();
        }

        // GET: api/Users
        [HttpGet("[action]")]
        public IEnumerable<Users> GetUsers()
        {
            return _context.Users;
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUsers([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var users = await _context.Users.FindAsync(id);

            if (users == null)
            {
                return NotFound();
            }

            return Ok(users);
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsers([FromRoute] int id, Users users)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != users.Id)
            {
                return BadRequest();
            }

            _context.Entry(users).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        [HttpPost("[action]")]
        public async Task<IActionResult> PostUsers([FromBody] Users data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = _context.Users.FirstOrDefault(a => a.Email == data.Email);
            if(user != null)
            {
                //return new ConflictResult();
                return NoContent();
            }

            _context.Users.Add(data);
            await _context.SaveChangesAsync();
            HttpContext.Session.SetString("userid", Convert.ToString(data.Id));
            HttpContext.Session.SetString("username", data.FirstName);
            return CreatedAtAction("PostUsers", new { id = data.Id }, data);
            //return null;
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsers([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var users = await _context.Users.FindAsync(id);
            if (users == null)
            {
                return NotFound();
            }

            _context.Users.Remove(users);
            await _context.SaveChangesAsync();

            return Ok(users);
        }

        private bool UsersExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}