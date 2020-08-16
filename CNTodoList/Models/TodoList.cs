using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CNTodoList.Models
{
    public class TodoList
    {

        [Key]
        [Required]
        public int Id { get; set; }

        public int UserId { get; set; }

        [MaxLength(2000)]
        [Required]
        public string Description { get; set; }

        public bool IsDone { get; set; }

        public static implicit operator TodoList(List<TodoList> v)
        {
            throw new NotImplementedException();
        }
    }
}
