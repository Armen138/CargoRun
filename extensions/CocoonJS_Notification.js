(function()
{
    // The CocoonJS must exist before creating the extension.
    if (typeof window.CocoonJS === 'undefined' || window.CocoonJS === null) throw("The CocoonJS object must exist and be valid before creating any extension object.");

    /**
    * This namespace represents the CocoonJS Notification extension.
    * @namespace
    */
    CocoonJS.Notification = {};

    CocoonJS.Notification.nativeExtensionObjectAvailable = CocoonJS.nativeExtensionObjectAvailable && typeof window.ext.IDTK_SRV_NOTIFICATION !== 'undefined';

	/**
	* The data structure that represents the information of a local notification.
	* @namespace
	* @constructor
	*/
	CocoonJS.Notification.LocalNotification = function()
	{
		/**
		* The notification message.
		* @field
		* @type string
		*/
		this.message = "";

		/**
		* A flag that indicates if the sound should be enabled for the notification.
		* @field
		* @type boolean
		*/
		this.soundEnabled = false;

		/**
		* The number that will appear in the badge of the application icon in the home screen.
		* @field
		* @type number
		*/
		this.badgeNumber = 0;

		/**
		* The JSON data to attached to the notification.
		* @field
		* @type object
		*/
		this.userData = {};

		/**
		* (Android only) The body content to be showed in the expanded notification information.
		* @field
		* @type string
		*/
		this.contentBody = "";

		/**
		* (Android only) The title to be showed in the expanded notification information.
		* @field
		* @type string
		*/
		this.contentTitle = "";
	};

	/**
	* The data structure that represents the information of a push notification.
	* @namespace
	* @constructor
	*/
	CocoonJS.Notification.PushNotification = function()
	{
		/**
		* The notification message.
		* @field
		* @type string
		*/
		this.message = "";

		/**
		* A flag that indicates if the sound should be enabled for the notification.
		* @field
		* @type boolean
		*/
		this.soundEnabled = false;

		/**
		* The number that will appear in the badge of the application icon in the home screen.
		* @field
		* @type number
		*/
		this.badgeNumber = 0;

		/**
		* The JSON data to attached to the notification.
		* @field
		* @type object
		*/
		this.userData = {};

		/**
		* An array of strings representing the channels this notification will be delivered to.
		* @field
		* @type array
		*/
		this.channels = [];

		/**
		* A time in seconds from 1970 when the notification is no longer valid and will not be delivered in case it has not already been delivered.
		* @field
		* @type number
		*/
		this.expirationTime = 0;

		/**
		* An incremental ammount of time in from now when the notification is no longer valid and will not be delivered in case it has not already been delivered.
		* @field
		* @type number
		*/
		this.expirationTimeInterval = 0;
	};

	/**
	* Register to be able to receive push notifications. 
	* The registration process is controlled using the {@link CocoonJS.Notification.onRegisterForPushNotificationsSucceed} and {@link CocoonJS.Notification.onRegisterForPushNotificationsFailed} event handlers.
	* @function
	* @see {CocoonJS.Notification.onRegisterForPushNotificationsSucceed}
	* @see {CocoonJS.Notification.onRegisterForPushNotificationsFailed}
	*/ 
	CocoonJS.Notification.registerForPushNotifications = function()
	{
		if (CocoonJS.Notification.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_NOTIFICATION", "registerForPushNotifications", arguments);
		}
	};

	/**
	* Unregister from receiving push notifications.
	* The unregistration process is controlled using the {@link CocoonJS.Notification.onUnregisterForPushNotificationsSucceed} event handler.
	* @function
	* @see CocoonJS.Notification.onUnregisterForPushNotificationsSucceed
	*/ 
	CocoonJS.Notification.unregisterForPushNotifications = function()
	{
		if (CocoonJS.Notification.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_NOTIFICATION", "unregisterForPushNotifications", arguments);
		}
	};

	/**
	* Cancel the last sent local notification. 
	* The last sent local notification will be remove from the notifications bar.
	* @function
	*/ 
	CocoonJS.Notification.cancelLastSentLocalNotificiation = function()
	{
		if (CocoonJS.Notification.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_NOTIFICATION", "cancelLocalNotification", arguments);
		}
	};

	/**
	* Cancel all sent local notifications. 
	* All the notifications will ve removed from the notifications bar.
	* @function
	*/ 
	CocoonJS.Notification.cancelAllLocalNotifications = function()
	{
		if (CocoonJS.Notification.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_NOTIFICATION", "cancelAllLocalNotifications", arguments);
		}
	};

	/**
	* Send a local notification.
	* @function
	* @param {CocoonJS.Notification.LocalNotification} localNotification The local notification to be sent.
	*/ 
	CocoonJS.Notification.sendLocalNotification = function(localNotification)
	{
		if (CocoonJS.Notification.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_NOTIFICATION", "sendLocalNotification", arguments);
		}
	};

	/**
	* Subscribe to a channel in order to receive notifications targeted to that channel.
	* @function
	* @param {string} channel The channel id to subscribe to.
	*/ 
	CocoonJS.Notification.subscribeToChannel = function(channel)
	{
		if (CocoonJS.Notification.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_NOTIFICATION", "subscribe", arguments);
		}
	};

	/**
	* Unsubscribe from a channel in order to stop receiving notifications targeted to it.
	* @function
	* @param {string} channel The channel id to unsubscribe from.
	*/ 
	CocoonJS.Notification.unsubscribeFromChannel = function(channel)
	{
		if (CocoonJS.Notification.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_NOTIFICATION", "unsubscribe", arguments);
		}
	};

	/**
	* Send a push notification.
	* @function
	* @param {CocoonJS.Notification.PushNotification} pushNotification The push notification object to be sent.
	* @see CocoonJS.Notification.onPushNotificationDeliverySucceed
	* @see CocoonJS.Notification.onPushNotificationDeliveryFailed
	*/ 
	CocoonJS.Notification.sendPushNotification = function(pushNotification)
	{
		if (CocoonJS.Notification.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_NOTIFICATION", "sendPushNotification", arguments);
		}
	};

	/**
	* (iOS only) Set the badge number for this application. 
	* This is useful if you want to modify the badge number set by a notification.
	* @function
	* @param {number} badgeNumber The number of the badge.
	*/ 
	CocoonJS.Notification.setBadgeNumber = function(badgeNumber)
	{
		if (CocoonJS.Notification.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_NOTIFICATION", "setBadgeNumber", arguments);
		}
	};

	/**
	* (iOS only) Returns the current badge number.
	* @function
	* @returns {number} The badge number.
	*/ 
	CocoonJS.Notification.getBadgeNumber = function()
	{
		if (CocoonJS.Notification.nativeExtensionObjectAvailable)
		{
			return CocoonJS.makeNativeExtensionObjectFunctionCall("IDTK_SRV_NOTIFICATION", "getBadgeNumber", arguments);
		}
	};

    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when the registration for push notification succeeds.
    * The callback function does not receive any parameter.
    * @static
    * @event
    * @memberOf CocoonJS.Notification
    */
	CocoonJS.Notification.onRegisterForPushNotificationsSucceed = new CocoonJS.EventHandler("IDTK_SRV_NOTIFICATION", "Notification", "pushNotificationServiceRegistered"); 

    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when the unregistration for push notifications succeeds.
    * The callback function does not receive any parameter.
    * @static
    * @event
    * @memberOf CocoonJS.Notification
    */
	CocoonJS.Notification.onUnregisterForPushNotificationsSucceed = new CocoonJS.EventHandler("IDTK_SRV_NOTIFICATION", "Notification", "pushNotificationServiceUnregistered"); 

    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when the registration for push notifications fails.
    * The callback function receives a parameter with error information.
    * @static
    * @event
    * @param {string} msg The error message.
    */
	CocoonJS.Notification.onRegisterForPushNotificationsFailed = new CocoonJS.EventHandler("IDTK_SRV_NOTIFICATION", "Notification", "pushNotificationServiceFailedToRegister"); 

    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when a push notification is received.
    * The callback function receives a parameter with the userData of the received notification.
    * @static
    * @event
    * @param {string} userData A string with the notification userData information.
    */
	CocoonJS.Notification.onPushNotificationReceived = new CocoonJS.EventHandler("IDTK_SRV_NOTIFICATION", "Notification", "pushNotificationReceived"); 

    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when a local notification is received.
    * The callback function receives a parameter with the userData of the received notification.
    * @static
    * @event
    * @param {string} userData A string with the notification userData information.
    */
	CocoonJS.Notification.onLocalNotificationReceived = new CocoonJS.EventHandler("IDTK_SRV_NOTIFICATION", "Notification", "localNotificationReceived"); 

    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when a notification is successfully delivered.
    * The callback function receives a parameter with the notificationId of the delivered notification.
    * @static
    * @event
    * @param {string} userData A string with the notification userData information.
    */
	CocoonJS.Notification.onPushNotificationDeliverySucceed = new CocoonJS.EventHandler("IDTK_SRV_NOTIFICATION", "Notification", "pushNotificationSuccessfullyDelivered"); 

    /**
    * This {@link CocoonJS.EventHandler} object allows listening to events called when the delivery of push a notification fails.
    * The callback function receives a parameter with error information.
    * @static
    * @event
    * @param {string} msg The error message.
    */
	CocoonJS.Notification.onPushNotificationDeliveryFailed = new CocoonJS.EventHandler("IDTK_SRV_NOTIFICATION", "Notification", "pushNotificationDeliveryError"); 

})();