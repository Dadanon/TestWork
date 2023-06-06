using Microsoft.AspNetCore.Mvc;
using TestWork.Services;
using TestWork.Models;

namespace TestWork.Controllers
{
    public class HomeController : Controller
    {
        public readonly IConfiguration _configuration;
        private readonly DrinksService _drinksService;
        private readonly CoinsService _coinsService;
        public HomeController(IConfiguration configuration,
            DrinksService drinksService,
            CoinsService coinsService)
        {
            _configuration = configuration;
            _drinksService = drinksService;
            _coinsService = coinsService;
        }

        public IActionResult Index(string secretKey)
        {
            if (secretKey != _configuration["AdminSecretKey"])
            {
                return NotFound();
            }
            List<Drink> drinks = _drinksService.GetDrinks();
            List<Coin> coins = _coinsService.GetCoins();
            ViewData["Drinks"] = drinks;
            ViewData["Coins"] = coins;
            return View();
        }

        [Route("/drinks")]
        public IActionResult ShowDrinks()
        {
            ViewData["Coins"] = _coinsService.GetCoins();
            ViewData["Drinks"] = _drinksService.GetDrinks();
            return View("Drinks");
        }

        [HttpPost]
        public IActionResult CreateDrink([FromBody]Drink drink)
        {
            if (drink != null)
            {
                _drinksService.CreateDrink(drink);
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost]
        public IActionResult UpdateDrink([FromBody] Drink drink)
        {
            if (drink != null)
            {
                Drink? oldDrink = _drinksService.GetDrinkById(drink.Id);
                if (oldDrink != null)
                {
                    oldDrink.Price = drink.Price;
                    oldDrink.Quantity = drink.Quantity;
                    _drinksService.UpdateDrink(oldDrink);
                    return Ok();
                }
            }
            return BadRequest();
        }

        [HttpPost]
        public IActionResult DeleteDrink([FromBody]int drinkId)
        {
            Drink? oldDrink = _drinksService.GetDrinkById(drinkId);
            if (oldDrink != null)
            {
                _drinksService.DeleteDrink(oldDrink);
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost]
        public IActionResult UpdateCoin([FromBody]int? coinId)
        {
            if (coinId != null)
            {
                Coin? oldCoin = _coinsService.GetCoinById((int)coinId);
                if (oldCoin != null)
                {
                    bool newState = !oldCoin.IsBlocked;
                    oldCoin.IsBlocked = newState;
                    _coinsService.UpdateCoin(oldCoin);
                    return Ok();
                }
            }
            return BadRequest();
        }

        [HttpPost]
        public IActionResult ChangeDrinkQuantity([FromBody]int? drinkId)
        {
            if (drinkId != null)
            {
                Drink? drink = _drinksService.GetDrinkById((int)drinkId);
                if (drink != null)
                {
                    drink.Quantity--;
                    _drinksService.UpdateDrink(drink);
                    return Ok();
                }
            }
            return BadRequest();
        }
    }
}
