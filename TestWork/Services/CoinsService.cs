using TestWork.Models;

namespace TestWork.Services
{
    public class CoinsService
    {
        private readonly TestWorkContext _context;
        public CoinsService(TestWorkContext context)
        {
            _context = context;
        }
        public List<Coin> GetCoins()
        {
            return _context.Coins.ToList();
        }
        public Coin? GetCoinById(int coinId)
        {
            return _context.Coins.FirstOrDefault(coin => coin.Id == coinId);
        }

        public void UpdateCoin(Coin coin)
        {
            _context.Coins.Update(coin);
            _context.SaveChanges();
        }
    }
}
