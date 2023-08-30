using System.ComponentModel.DataAnnotations;

namespace API.Entities;
public class Todo
{
    public int Id { get; set;}
    [Required]
    public string Title { get; set;}
}