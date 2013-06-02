(function()
{
    // The CocoonJS must exist before creating the extension.
    if (typeof window.CocoonJS === 'undefined' || window.CocoonJS === null) throw("The CocoonJS object must exist and be valid before creating any extension object.");

    /**
    * This namespace represents the CocoonJS Advertisment extension API.
    * @namespace
    */
    CocoonJS.Ad = {};

    CocoonJS.Ad.nativeExtensionObjectAvailable = CocoonJS.nativeExtensionObjectAvailable && typeof window.ext.IDTK_SRV_AD !== 'undefined';

    /**
    * The predefined possible layouts for a banner ad.
    * @namespace 
    */
	CocoonJS.Ad.BannerLayout = 
	{
		/**
		* Specifies that the banner must be shown in the top of the screen and vertically centered.
		*/
	    TOP_CENTER      : "TOP_CENTER",

		/**
		* Specifies that the banner must be shown in the bottom of the screen and vertically centered.
		*/
	    BOTTOM_CENTER   : "BOTTOM_CENTER"
	};

	/**
    * A rectangle object that contains the banner dimensions
    * @namespace 
    * @constructor
    */
	CocoonJS.Ad.Rectangle = function(x, y, width, height) 
	{
		/**
		* Origin x
		*/
	    this.x = x;

		/**
		* Origin y
		*/
	    this.y = y;

	    /**
	    * Rectangle width
	    */
	    this.width = width;

	    /**
	    * Rectangle height
	    */
	    this.height = height;
	};

	/**
	* Shows a banner ad if available.
	* @function
	* @see CocoonJS.Ad.setBannerLayout
	* @see CocoonJS.Ad.onBannerShown
	*/
	CocoonJS.Ad.showBanner = function()
	{
		if (CocoonJS.Ad.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_AD", "showBanner", arguments);
		}
	};

	/**
	* Hides the banner ad if it was being shown.
	* @function
	*/
	CocoonJS.Ad.hideBanner = function()
	{
		if (CocoonJS.Ad.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_AD", "hideBanner", arguments);
		}
	};

	/**
	* Shows a full screen ad if available.
	* @function
	* @see CocoonJS.Ad.onFullScreenShown
	* @see CocoonJS.Ad.onFullScreenHidden
	*/
	CocoonJS.Ad.showFullScreen = function()
	{
		if (CocoonJS.Ad.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_AD", "showFullScreen", arguments);
		}
	};

	/**
	* Makes a request to preload a banner ad.
	* @function
	*/
	CocoonJS.Ad.preloadBanner = function()
	{
		if (CocoonJS.Ad.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_AD", "preloadBanner", arguments);
		}
	};

	/**
	* Makes a request to preload a full screen ad.
	* @function
	*/
	CocoonJS.Ad.preloadFullScreen = function()
	{
		if (CocoonJS.Ad.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_AD", "preloadFullScreen", arguments);
		}
	};

	/**
	* Sets the rectangle where the banner ad is going to be shown.
	* @function
	* @param {CocoonJS.Ad.Rectangle} rect The rectangle with the banner position and domensions.
	*/
	CocoonJS.Ad.setRectangle = function()
	{
		if (CocoonJS.Ad.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_AD", "setRectangle", arguments);
		}
	};

	/**
	* Gets the rectangle representing the banner screen position.
	* @function
	* @return {CocoonJS.Ad.Rectangle} rectangle The rectangle height.
	*/
	CocoonJS.Ad.getRectangle = function()
	{
		if (CocoonJS.Ad.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_AD", "getRectangle", arguments);
		}
	};

	/**
	* Sets the rectangle where the banner ad is going to be shown.
	* You can use this method if you want to have better control of the banner screen positioning.
	* @function
	* @param {CocoonJS.Ad.BannerLayout} bannerLayout The layout where to set the banner.
	*/
	CocoonJS.Ad.setBannerLayout = function(bannerLayout)
	{
		if (CocoonJS.Ad.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_AD", "setBannerLayout", arguments);
		}
	};

    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when a banner is shown.
    * The callback function does not receive any parameter.
    * @static
    * @event
    */
	CocoonJS.Ad.onBannerShown = new CocoonJS.EventHandler("IDTK_SRV_AD", "Ad", "onbannershow"); 

    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when a full screen ad is shown.
    * The callback function does not receive any parameter.
    * @static
    * @event
    */
	CocoonJS.Ad.onFullScreenShown = new CocoonJS.EventHandler("IDTK_SRV_AD", "Ad", "onfullscreenshow"); 

    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when a full screen ad is hidden.
    * The callback function does not receive any parameter.
    * @static
    * @event
    */
	CocoonJS.Ad.onFullScreenHidden = new CocoonJS.EventHandler("IDTK_SRV_AD", "Ad", "onfullscreenhide");

})();