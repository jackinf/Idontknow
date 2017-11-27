using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Idontknow.DAL.Model
{
    public class Blog
    {
        [Key]
        public int BlogId { get; set; }
        public string Url { get; set; }
        public int Rating { get; set; }
        
        [InverseProperty(nameof(Blog))]
        public List<Post> Posts { get; set; }
    }
}