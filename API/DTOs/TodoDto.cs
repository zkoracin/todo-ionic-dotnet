using System.ComponentModel.DataAnnotations;

namespace API.DTOs;
public class TodoDto
{
    public int Id { get; set;}
    [Required] public string Title { get; set;}
}

public class CreateTodoDto
{
    [Required] public string Title { get; set;}
}

public class UpdateTodoDto
{
    [Required] public string Title { get; set;}
}