using System.ComponentModel.DataAnnotations;

namespace ITSDemo.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Class { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Comment { get; set; }
    }
}
