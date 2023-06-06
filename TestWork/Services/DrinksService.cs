using TestWork.Models;

namespace TestWork.Services
{
    public class DrinksService
    {
        private readonly TestWorkContext _context;
        public DrinksService(TestWorkContext context)
        {
            _context = context;
        }

        public List<Drink> GetDrinks()
        {
            return _context.Drinks.ToList();
        }
        public void CreateDrink(Drink drink)
        {
            _context.Drinks.Add(drink);
            _context.SaveChanges();
        }

        public void DeleteDrink(Drink drink)
        {
            _context.Drinks.Remove(drink);
            _context.SaveChanges();
        }

        public Drink? GetDrinkById(int drinkId)
        {
            return _context.Drinks.FirstOrDefault(drink => drink.Id == drinkId);
        }

        public void UpdateDrink(Drink drink)
        {
            _context.Drinks.Update(drink);
            _context.SaveChanges();
        }
    }
}
