using System.ComponentModel.DataAnnotations;

namespace ITSDemo.ViewModels
{
    public class CustomerViwModel
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
