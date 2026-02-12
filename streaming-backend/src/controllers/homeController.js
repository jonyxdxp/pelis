const homeService = require('../services/homeService');
const { asyncHandler } = require('../middleware/errorHandler');

class HomeController {
  // GET /home - Get homepage data
  getHomepage = asyncHandler(async (req, res) => {
    const deviceType = req.query.device_type || 'web';
    
    const data = await homeService.getHomepageData(deviceType);

    res.json({
      success: true,
      data,
      timestamp: new Date().toISOString(),
    });
  });

  // GET /hero - Get hero banner content only
  getHero = asyncHandler(async (req, res) => {
    const heroContent = await homeService.getHeroContent();

    res.json({
      success: true,
      data: {
        title: 'Featured Content',
        items: heroContent,
      },
      timestamp: new Date().toISOString(),
    });
  });

  // GET /carousels - Get carousels only
  getCarousels = asyncHandler(async (req, res) => {
    const deviceType = req.query.device_type || 'web';
    
    const carousels = await homeService.getCarousels(deviceType);

    res.json({
      success: true,
      data: { carousels },
      timestamp: new Date().toISOString(),
    });
  });
}

module.exports = new HomeController();
