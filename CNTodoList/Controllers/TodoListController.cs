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
    public class TodoListController : Controller
    {
        private readonly ApplicationDbContext _context;

        private static string[] Summaries = new[]
       {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        public TodoListController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public async Task<List<TodoList>> GetTodoList(int userId)
        {
            if (userId != 0)
            {
                List<TodoList> todos = await _context.TodoList.Where(a => a.UserId == userId).ToListAsync();
                return todos;
            }
            else
                return new List<TodoList>();
        }

        [HttpGet("[action]")]
        public async Task<TodoList> GetTodoListById(int id)
        {
            if (id != 0)
            {
                TodoList todos = await _context.TodoList.FirstAsync(a => a.Id == id);
                return todos;
            }
            else
                return new TodoList();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> PostTodoList([FromBody] TodoList data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            _context.TodoList.Add(data);
            await _context.SaveChangesAsync();
            return Ok(data);
            //return null;
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> PutTodoList([FromBody] TodoList data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Entry(data).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(data);
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }            
        }

        [HttpDelete("[action]")]
        //public async Task<ActionResult> GetTodoList([FromRoute] string id)
        public async Task<ActionResult> DeleteTodoList(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var todo = await _context.TodoList.FindAsync(id);
            if (todo == null)
            {
                return NotFound();
            }

            _context.TodoList.Remove(todo);
            await _context.SaveChangesAsync();

            return Ok(todo);
        }

        private bool TodoListExists(int id)
        {
            return _context.TodoList.Any(e => e.Id == id);
        }
    }
}
