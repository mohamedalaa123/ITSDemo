using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ITSDemo.Dtos
{
    public class CustomerDto
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        [Required]
        public string Class { get; set; }

        [EmailAddress]
        [Required]
        public string Email { get; set; }
        [Required]
        public string Phone { get; set; }

        [Required]
        public string Comment { get; set; }
    }
}
