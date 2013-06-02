(function()
{
    // The CocoonJS must exist before creating the extension.
    if (typeof window.CocoonJS === 'undefined' || window.CocoonJS === null) throw("The CocoonJS object must exist and be valid before creating any extension object.");

    /**
    * This namespace represents the CocoonJS In-App Purchase extension.
    * @namespace
    */
    CocoonJS.Store = {};

    CocoonJS.Store.nativeExtensionObjectAvailable = CocoonJS.nativeExtensionObjectAvailable && typeof window.ext.IDTK_SRV_STORE !== 'undefined';

	/**
	* The data structure that represents the information of a product in the store.
	* @namespace
	* @constructor
	*/
	CocoonJS.Store.ProductInfo = function(productAlias, productId, productType, title, description, price, localizedPrice, downloadURL)
	{
		/**
		* The id of the prodcut.
		* @field
		* @type string
		*/
		this.productId = productId;

		/**
		* The product alias.
		* @field
		* @type string
		*/
		this.productAlias = productAlias;

		/**
		* The product type @see CocoonJS.Store.ProductType
		* @field
		* @type CocoonJS.Store.ProductType
		*/
		this.productType = productType;

		/**
		* The title of the product.
		* @field
		* @type string
		*/
		this.title = title;

		/**
		* The description of the product.
		* @field
		* @type string
		*/
		this.description = description;

		/**
		* The price of the product.
		* @field
		* @type string
		*/
		this.price = price;

		/**
		* The price of the product.
		* @field
		* @type string
		*/
		this.localizedPrice = localizedPrice;

		/**
		* The URL of the asset to be downloaded for this purchase.
		* @field
		* @type string
		*/
		this.downloadURL = downloadURL;

		return this;
	};

	/**
    * The predefined possible states of a purchase.
    * @namespace 
    */
	CocoonJS.Store.ProductType = 
	{
		/**
		* A consumable product. See platform documentation for further information.
		*/
	    CONSUMABLE : 0,

		/**
		* A non-cunsumable product. . See platform documentation for further information.
		*/
	    NON_CONSUMABLE : 1,

	    /**
		* An auto-renewable subscription. See platform documentation for further information.
		*/
	    AUTO_RENEWABLE_SUBSCRIPTION : 2,

	    /**
		* A free subscription. See platform documentation for further information.
		*/
	    FREE_SUBSCRIPTION : 3,

	    /**
		* A non-renewable subscription. See platform documentation for further information.
		*/
	    NON_RENEWABLE_SUBSCRIPTION : 4
	};

	/**
	* The data structure that represents the information of a purchase.
	* @namespace
	* @constructor
	*/
	CocoonJS.Store.PurchaseInfo = function(transactionId, purchaseTime, purchaseState, productId, quantity)
	{
		/**
		* The transaction id of a purchase.
		* @field
		* @type string
		*/
		this.transactionId = transactionId;

		/**
		* The time when the purchase was done in seconds since 1970.
		* @field
		* @type string
		*/
		this.purchaseTime = purchaseTime;

		/**
		* The state of the purchase. @see CocoonJS.Store.PurchaseState
		* @field
		* @type CocoonJS.Store.PurchaseState
		*/
		this.purchaseState = purchaseState;

		/**
		* The product id related to this purchase.
		* @field
		* @type string
		*/
		this.productId = productId;

		/**
		* The number of products of the productId kind purchased in this transaction.
		* @field
		* @type int
		*/
		this.quantity = quantity;

		return this;
	};

	/**
    * The predefined possible states of a purchase.
    * @namespace 
    */
	CocoonJS.Store.PurchaseState = 
	{
		/**
		* The product has been successfully purchased. The transaction has ended successfully.
		*/
	    PURCHASED : 0,

		/**
		* The purchase has been canceled.
		*/
	    CANCELED : 1,

	    /**
		* The purchase has been refunded.
		*/
	    REFUNDED : 2,

	    /**
		* The purchase (subscriptions only) has expired and is no longer valid.
		*/
	    EXPIRED : 3
	};

	/**
	* Starts the Store Service. 
	* This will make the system to initialize the Store Service and probably Store callbacks will start to be received after calling this method so you should have set your event handler before calling this method so don't lose any callback.
	* @function
	*/ 
	CocoonJS.Store.start = function()
	{
		if (CocoonJS.Store.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_STORE", "start", arguments);
		}
	};

	/**
	* This method allows you to check is the  Store service is available in this platform. 
	* Not all iOS and Android devices will have the Store service available so you should check if it is before calling any other method.
	* @function
	* @return true if the service is available and false otherwise.
	*/ 
	CocoonJS.Store.canPurchase = function()
	{
		if (CocoonJS.Store.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_STORE", "canPurchase", arguments);
		}
	};

	/**
	* Fetches the products from the CocoonJS Cloud Compiling service store configuration. 
	* The request is monitored using the {@link CocoonJS.Store.onProductsFetchStarted}, {@link CocoonJS.Store.onProductsFetchCompleted} and {@link CocoonJS.Store.onProductsFetchFailed} event handlers.
	* @function
	* @see CocoonJS.Store.onProductsFetchStarted
	* @see CocoonJS.Store.onProductsFetchCompleted
	* @see CocoonJS.Store.onProductsFetchFailed
	*/ 
	CocoonJS.Store.fetchProductsFromServer = function()
	{
		if (CocoonJS.Store.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_STORE", "fetchProductsFromServer", arguments);
		}
	};

	/**
	* Removes a purchase from the local purchases database given it's transaction id. 
	* If the transaction id does not exist or cannot be removed from the local database this method will return false.
	* @function
	* @param {string} transactionId The id of the transaction to be removed.
	* @returns {boolean} A flag that indicates whether the purchase has been successfully removed from the local purchases database (true) or not (false).
	*/ 
	CocoonJS.Store.removePurchase = function(transactionId)
	{
		if (CocoonJS.Store.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_STORE", "removePurchase", arguments);
		}
	};

	/**
	* Finish a purchase transaction and removes the transaction from the transaction queue. 
	* This method must be called after a purchase finishes successfully and the  {@link CocoonJS.Store.onProductPurchaseCompleted} callback has been received. 
	* If the purchase includes some asset to download from an external server this method must be called after the asset has been successfully downloaded. 
	* If you do not finish the transaction because the asset has not been correctly downloaded the {@link CocoonJS.Store.onProductPurchaseStarted} method will be called again later on.
	* @function
	* @param {string} transactionId The transactionId of the purchase to finish.
	*/ 
	CocoonJS.Store.finishPurchase = function(productId)
	{
		if (CocoonJS.Store.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_STORE", "finishPurchase", arguments);
		}
	};

	/**
	* Request a product purchase given it's product id. 
	* The request is monitored using the {@link CocoonJS.Store.onPurchaseProductStarted}, {@link CocoonJS.Store.onProductPurchaseStarted} and {@link CocoonJS.Store.onProductPurchaseFailed} event handlers.
	* @function
	* @param {string} productId The id of the product to be purchased.
	* @see CocoonJS.Store.onProductPurchaseStarted
	* @see CocoonJS.Store.onProductPurchaseCompleted
	* @see CocoonJS.Store.onProductPurchaseFailed
	*/ 
	CocoonJS.Store.purchaseProduct = function(productId)
	{
		if (CocoonJS.Store.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_STORE", "purchaseFeature", arguments);
		}
	};

	/**
	* Request a product purchase given it's product id showing a modal progress dialog. 
	* The request is monitored using the {@link CocoonJS.Store.onProductPurchaseStarted}, {@link CocoonJS.Store.onProductPurchaseCompleted} and {@link CocoonJS.Store.onProductPurchaseFailed} event handlers.
	* @function
	* @param {string} productId The id of the product to be purchased.
	* @see CocoonJS.Store.onProductPurchaseStarted
	* @see CocoonJS.Store.onProductPurchaseCompleted
	* @see CocoonJS.Store.onProductPurchaseFailed
	*/ 
	CocoonJS.Store.puchaseProductModal = function(productId)
	{
		if (CocoonJS.Store.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_STORE", "purchaseFeatureModal", arguments);
		}
	};

	/**
	* Request the purchase of a product given it's product id showing a dialog with a preview of the product (title and description). 
	* The request is monitored using the {@link CocoonJS.Store.onProductPurchaseStarted}, {@link CocoonJS.Store.onProductPurchaseCompleted} and {@link CocoonJS.Store.onProductPurchaseFailed} event handlers.
	* @function
	* @param {string} productId The id of the product to be purchased.
	* @see CocoonJS.Store.onProductPurchaseStarted
	* @see CocoonJS.Store.onProductPurchaseCompleted
	* @see CocoonJS.Store.onProductPurchaseFailed
	*/ 
	CocoonJS.Store.purchaseProductModalWithPreview = function(productId)
	{
		if (CocoonJS.Store.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_STORE", "purchaseFeatureModalWithPreview", arguments);
		}
	};

	/**
	* Returns if a product has been already purchased or not. 
	* @function
	* @param {string} productId The product id of the product to be checked.
	* @returns {boolean} A flag that indicates whether the product has been already purchased (true) or not (false).
	*/
	CocoonJS.Store.isProductPurchased = function(productId)
	{
		if (CocoonJS.Store.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_STORE", "isFeaturePurchased", arguments);
		}
	};

	/**
	* Returns all the products available to be purchased.
	* @function
	* @returns {array} An array with  all the {@link CocoonJS.Store.ProductInfo} objects available for purchase.
	*/
	CocoonJS.Store.getProducts = function()
	{
		if (CocoonJS.Store.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_STORE", "getProducts", arguments);
		}
	};

	/**
	* Returns all the locally stored purchases.
	* @function
	* @returns {array} An array with all the {@link CocoonJS.Store.PurchaseInfo} completed purchases.
	*/
	CocoonJS.Store.getPurchases = function()
	{
		if (CocoonJS.Store.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_STORE", "getPurchases", arguments);
		}
	};

	/**
	* Restores all the purchases from the platform's market. 
	* For each already purchased product {@link CocoonJS.Store.onPurchaseProductStarted}, {@link CocoonJS.Store.onPurchaseProductCompleted} and {@link CocoonJS.Store.onPurchaseProductFailed} event handlers are called again
	* @function
	* @returns {boolean} 
	* @see CocoonJS.Store.onRestorePurchasesStarted
	* @see CocoonJS.Store.onRestorePurchasesCompleted
	* @see CocoonJS.Store.onRestorePurchasesFailed
	*/
	CocoonJS.Store.restorePurchases = function()
	{
		if (CocoonJS.Store.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_STORE", "restorePurchases", arguments);
		}
	};

	/**
	* Restores all the purchases from the platform's market showing a modal progress dialog. 
	* For each already purchased product {@link CocoonJS.Store.onPurchaseProductStarted}, {@link CocoonJS.Store.onPurchaseProductCompleted} and {@link CocoonJS.Store.onPurchaseProductFailed} event handlers are called again
	* @function
	* @returns {boolean} 
	* @see CocoonJS.Store.onRestorePurchasesStarted
	* @see CocoonJS.Store.onRestorePurchasesCompleted
	* @see CocoonJS.Store.onRestorePurchasesFailed
	*/
	CocoonJS.Store.restorePurchasesModal = function()
	{
		if (CocoonJS.Store.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_STORE", "restorePurchasesModal", arguments);
		}
	};

	/**
	* (TEST ONLY) Adds a product to the products local DB. 
	* This method is not allowed in production services and will only work in Mocks.
	* @function
	* @param {CocoonJS.Store.ProductInfo} product The product to be added to the local products DB.
	*/
	CocoonJS.Store.addProduct = function(product)
	{
		if (CocoonJS.Store.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_STORE", "addProduct", arguments);
		}
	};

	/**
	* (TEST ONLY) Removes a product from the products local DB. 
	* This method is not allowed in production services and will only work in Mocks. 
	* The request is monitored using the {@link CocoonJS.Store.onPurchaseProductStarted}, {@link CocoonJS.Store.onProductPurchaseStarted} and {@link CocoonJS.Store.onProductPurchaseFailed} event handlers.
	* @function
	* @param {string} productId The productId of the product to be removed from the local products DB.
	*/
	CocoonJS.Store.removeProduct = function(productId)
	{
		if (CocoonJS.Store.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_STORE", "removeProduct", arguments);
		}
	};

	/**
	* (TEST ONLY) Simulate a purchase cancel. 
	* This method is not allowed in production services and will only work in Mocks. 
	* The request is monitored using the {@link CocoonJS.Store.onPurchaseProductStarted}, {@link CocoonJS.Store.onProductPurchaseStarted} and {@link CocoonJS.Store.onProductPurchaseFailed} event handlers.
	* @function
	* @param {string} transactionId The transactionId of the purchase to be canceled.
	*/
	CocoonJS.Store.cancelPurchase = function(transactionId)
	{
		if (CocoonJS.Store.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_STORE", "cancelPurchase", arguments);
		}
	};

	/**
	* (TEST ONLY) Simulate a purchase refundment. 
	* This method is not allowed in production services and will only work in Mocks. 
	* The request is monitored using the {@link CocoonJS.Store.onPurchaseProductStarted}, {@link CocoonJS.Store.onProductPurchaseStarted} and {@link CocoonJS.Store.onProductPurchaseFailed} event handlers.
	* @function
	* @param {string} transactionId The transactionId of the purchase to be refunded.
	*/
	CocoonJS.Store.refundPurchase = function(transactionId)
	{
		if (CocoonJS.Store.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_STORE", "refundPurchase", arguments);
		}
	};

	/**
	* (TEST ONLY) Simulate a purchase expiration. 
	* This method is not allowed in production services and will only work in Mocks. 
	* The request is monitored using the {@link CocoonJS.Store.onPurchaseProductStarted}, {@link CocoonJS.Store.onProductPurchaseStarted} and {@link CocoonJS.Store.onProductPurchaseFailed} event handlers.
	* @function
	* @param {string} transactionId The transactionId of the purchase to be expired.
	*/
	CocoonJS.Store.expirePurchase = function(transactionId)
	{
		if (CocoonJS.Store.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_STORE", "expirePurchase", arguments);
		}
	};

    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when the purchase of a product starts.
    * The callback function receives a parameters with the information of the purchased product @see CocoonJS.Store.ProductInfo.
    * @static
	* @event
    * @param {CocoonJS.Store.ProductInfo} productInfo The product info.
    */
	CocoonJS.Store.onProductPurchaseStarted = new CocoonJS.EventHandler("IDTK_SRV_STORE", "Store", "onProductPurchaseStarted"); 

    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when the purchase of a product succeeds.
    * The callback function receives two parameters, one with the product information of the purchased product {@see CocoonJS.Store.ProductInfo} and another one with the information of the purchase {@see CocoonJS.Store.PurchaseInfo}.
    * @static
    * @event
    * @param {CocoonJS.Store.ProductInfo} productInfo The product info.
    * @param {CocoonJS.Store.PurchaseInfo} purchaseInfo The purchase info.
    */
	CocoonJS.Store.onProductPurchaseCompleted = new CocoonJS.EventHandler("IDTK_SRV_STORE", "Store", "onProductPurchaseCompleted"); 

    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when the purchase of a product fails.
    * The callback function receives a parameters with the product id and an error message.
    * @static
    * @event
    * @param {string} productID The product id.
    * @param {string} msg The error message.
    */
	CocoonJS.Store.onProductPurchaseFailed = new CocoonJS.EventHandler("IDTK_SRV_STORE", "Store", "onProductPurchaseFailed"); 

    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when the products fetch has started.
    * The callback function receives no parameters.
    * @static
    * @event
    */
	CocoonJS.Store.onProductsFetchStarted = new CocoonJS.EventHandler("IDTK_SRV_STORE", "Store", "onProductsFetchStarted");

    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when the products fetch has completed.
    * The callback function receives a parameter with an the valid products array.
    * @static
    * @event
    * @param {array} validProducts An array of {@link CocoonJS.Store.ProductInfo} objects representing all the valid fetched products.
    */
	CocoonJS.Store.onProductsFetchCompleted = new CocoonJS.EventHandler("IDTK_SRV_STORE", "Store", "onProductsFetchCompleted"); 

    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when the products fetch has failed.
    * The callback function receives an error message as a parameter.
    * @static
    * @event
    * @param {string} errorMessage The error message.
    */
	CocoonJS.Store.onProductsFetchFailed = new CocoonJS.EventHandler("IDTK_SRV_STORE", "Store", "onProductsFetchFailed"); 

    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when the restore purchases operation has started.
    * The callback function receives no parameters.
    * @static
    * @event
    */
	CocoonJS.Store.onRestorePurchasesStarted = new CocoonJS.EventHandler("IDTK_SRV_STORE", "Store", "onRestorePurchasesStarted"); 

    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when the restore purchases operation has completed.
    * The callback function receives no parameters.
    * @static
    * @event
    */
	CocoonJS.Store.onRestorePurchasesCompleted = new CocoonJS.EventHandler("IDTK_SRV_STORE", "Store", "onRestorePurchasesCompleted"); 

	/**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when the restore purchases operation has failed.
    * The callback function receives an error message as a parameter.
    * @static
    * @event
    * @param {string} errorMessage The error message.
    */
	CocoonJS.Store.onRestorePurchasesFailed = new CocoonJS.EventHandler("IDTK_SRV_STORE", "Store", "onRestorePurchasesFailed");

})();