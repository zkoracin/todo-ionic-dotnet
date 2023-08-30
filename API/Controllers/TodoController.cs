using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class TodoController : ControllerBase
{
    private readonly DataContext _context;

    public TodoController(DataContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<TodoDto>> CreateTodo(CreateTodoDto createTodoDto)
    {
        var newTodo = new Todo
        {
            Title = createTodoDto.Title
        };

        _context.Todos.Add(newTodo);
        if (await _context.SaveChangesAsync() > 0) return Ok(newTodo);
        return BadRequest("Something went wrong saving todo, please try again");
    }

    [HttpGet]
    public async Task<ActionResult> GetTodos()
    {
        return Ok(await _context.Todos.ToListAsync());
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteTodo(int id)
    {
        var todo = await _context.Todos.FindAsync(id);
        if (todo == null) return NotFound();
        _context.Todos.Remove(todo);
        if (await _context.SaveChangesAsync() > 0) return Ok();
        return BadRequest("Something went wrong deleting todo, please try again");
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateTodo(int id, UpdateTodoDto updateTodoDto)
    {
        var todo = await _context.Todos.FindAsync(id);
        if (todo == null) return NotFound();

        todo.Title = updateTodoDto.Title;
        _context.Todos.Update(todo);
        if (await _context.SaveChangesAsync() > 0) return Ok(todo);
        return BadRequest("Something went wrong updating todo, please try again");
    }
}