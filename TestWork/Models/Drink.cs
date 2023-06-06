using System.ComponentModel.DataAnnotations;

namespace TestWork.Models
{
    // Собственно, все поля у нас необходимы, и пустых быть не может
    public class Drink
    {
        [Key]
        public int Id { get; set; }

        // Единственное, для операций внутри проекта сделаем поле Name nullable
        [Required]
        public string? Name { get; set; }

        // Так как у нас монеты целого номинала - обойдемся int
        [Required]
        public int Price { get; set; }

        public int Quantity { get; set; } = 0;
    }
}
