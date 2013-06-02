(function()
{
    // The CocoonJS must exist before creating the extension.
    if (typeof window.CocoonJS === 'undefined' || window.CocoonJS === null) throw("The CocoonJS object must exist and be valid before creating any extension object.");

	/**
	* This type represents the access to a native Social extension API. As there can be more than
	* one service of this type, more than one instance can be created.
	* @param {string} nativeExtensionName The name of the native ext object extension property name.
	* @param {string} extensionName The name of the CocoonJS object extension property name.
	*/
	CocoonJS.Social = function(nativeExtensionName, extensionName)
	{
		if (typeof nativeExtensionName !== 'string') throw "The given native extension name '" + nativeExtensionName + "' is not a string.";
		if (typeof extensionName !== 'string') throw "The given extension name '" + extensionName + "' is not a string.";

		this.nativeExtensionName = nativeExtensionName;
		this.extensionName = extensionName;
	    this.nativeExtensionObjectAvailable = CocoonJS.nativeExtensionObjectAvailable && typeof window.ext[nativeExtensionName] !== 'undefined';

	    console.log("CocoonJS.Social.nativeExtensionObjectAvailable = " + this.nativeExtensionObjectAvailable);

	    /**
	    * FOR DOCUMENTATION PURPOSE ONLY! The documentation of the function callback for the {@link CocoonJS.Social.onRequestInitializationSucceed} event calls.
	    * @name OnRequestInitializationSucceedListener
	    * @function
	    * @static
	    * @memberOf CocoonJS.Social
	    * @param {string} applicationID The id of the application that has been initialized.
	    */
	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when the user information request suceeds.
	    * The callback function's documentation is represented by {@link CocoonJS.Social.OnRequestInitializationSucceedListener}
	    * @static
	    */
	    this.onRequestInitializationSucceed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onRequestInitializationSucceed");

	    /**
	    * FOR DOCUMENTATION PURPOSE ONLY! The documentation of the function callback for the {@link CocoonJS.Social.onRequestInitializationFailed} event calls.
	    * @name OnRequestInitializationFailedListener
	    * @function
	    * @static
	    * @memberOf CocoonJS.Social
	    * @param {string} applicationID The id of the application that was trying to be initialized
	    * @param {string} errorMessage The error message.
	    */
	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when the user information request fails.
	    * The callback function's documentation is represented by {@link CocoonJS.Social.OnRequestInitializationFailedListener}
	    * @static
	    */
	    this.onRequestInitializationFailed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onRequestInitializationFailed");

	    /**
	    * FOR DOCUMENTATION PURPOSE ONLY! The documentation of the function callback for the {@link CocoonJS.Social.onRequestLoginSucceed} event calls.
	    * @name OnRequestLoginSucceedListener
	    * @function
	    * @static
	    * @memberOf CocoonJS.Social
	    * @param {CocoonJS.Social.UserInfo} userInfo The information of the user that has been logged in.
	    */
	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when the user login request succeeds.
	    * The callback function's documentation is represented by {@link CocoonJS.Social.OnRequestLoginSucceedListener}
	    * @static
	    */
		this.onRequestLoginSucceed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onRequestLoginSucceed");

	    /**
	    * FOR DOCUMENTATION PURPOSE ONLY! The documentation of the function callback for the {@link CocoonJS.Social.onRequestLoginFailed} event calls.
	    * @name OnRequestLoginFailedListener
	    * @function
	    * @static
	    * @memberOf CocoonJS.Social
	    * @param {string} errorMessage The error message.
	    */
	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when the user login request fails.
	    * The callback function's documentation is represented by {@link CocoonJS.Social.OnRequestLoginFailedListener}
	    * @static
	    */
		this.onRequestLoginFailed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onRequestLoginFailed");

	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when the user logs out.
	    * The callback function does not receive any parameter.
	    * @static
	    */
		this.onLogout = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onLogout");

	    /**
	    * FOR DOCUMENTATION PURPOSE ONLY! The documentation of the function callback for the {@link CocoonJS.Social.onRequestUserInfoSucceed} event calls.
	    * @name OnRequestUserInfoSucceedListener
	    * @function
	    * @static
	    * @memberOf CocoonJS.Social
	    * @param {CocoonJS.Social.UserInfo} userInfo The info of the user.
	    */
	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when the user information request suceeds.
	    * The callback function's documentation is represented by {@link CocoonJS.Social.OnUserInfoRequestSucceedListener}
	    * @static
	    */
		this.onRequestUserInfoSucceed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onRequestUserInfoSucceed");

	    /**
	    * FOR DOCUMENTATION PURPOSE ONLY! The documentation of the function callback for the {@link CocoonJS.Social.onRequestUserInfoFailed} event calls.
	    * @name OnRequestUserInfoFailedListener
	    * @function
	    * @static
	    * @memberOf CocoonJS.Social
	    * @param {string} userID The id of the user for whom the info was requested.
	    * @param {string} errorMessage The error message.
	    */
	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when the user information request fails.
	    * The callback function's documentation is represented by {@link CocoonJS.Social.OnUserInfoRequestFailedListener}
	    * @static
	    */
		this.onRequestUserInfoFailed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onRequestUserInfoFailed");

		/**
	    * FOR DOCUMENTATION PURPOSE ONLY! The documentation of the function callback for the {@link CocoonJS.Social.onRequestUserImageURLSucceed} event calls.
	    * @name OnRequestUserImageURLSucceedListener
	    * @function
	    * @static
	    * @memberOf CocoonJS.Social
	    * @param {string} userID The id of the user the image was request for.
	    * @param {string} imageURL The url of the image of the user.
	    */
	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when the user image URL request succeeds.
	    * The callback function's documentation is represented by {@link CocoonJS.Social.OnRequestUserImageURLSucceedListener}
	    * @static
	    */
		this.onRequestUserImageURLSucceed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onRequestUserImageURLSucceed");

	    /**
	    * FOR DOCUMENTATION PURPOSE ONLY! The documentation of the function callback for the {@link CocoonJS.Social.onRequestUserImageURLFailed} event calls.
	    * @name OnRequestUserImageURLFailedListener
	    * @function
	    * @static
	    * @memberOf CocoonJS.Social
	    * @param {string} userID The id of the user for whom the info was requested.
	    * @param {string} msg The error message.
	    */
	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when the user image URL request fails.
	    * The callback function's documentation is represented by {@link CocoonJS.Social.OnRequestUserImageURLFailedListener}
	    * @static
	    */
		this.onRequestUserImageURLFailed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onRequestUserImageURLFailed");

	    /**
	    * FOR DOCUMENTATION PURPOSE ONLY! The documentation of the function callback for the {@link CocoonJS.Social.onRequestUserFriendsUserInfosSucceed} event calls.
	    * @name OnRequestUserFriendsUserInfosSucceedListener
	    * @function
	    * @static
	    * @memberOf CocoonJS.Social
	    * @param {string} userID The id of the user for whom the friend user infos where requested.
	    * @param {array} friendsInfo An array of {@link CocoonJS.Social.UserInfo} objects representing the information of the friends of the user.
	    */
	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when the user's friends info is successfully retrieved.
	    * The callback function's documentation is represented by {@link CocoonJS.Social.OnRequestUserFriendsUserInfosSucceedListener}
	    * @static
	    */
		this.onRequestUserFriendsUserInfosSucceed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onRequestUserFriendsUserInfosSucceed");

	    /**
	    * FOR DOCUMENTATION PURPOSE ONLY! The documentation of the function callback for the {@link CocoonJS.Social.onRequestUserFriendsUserInfosFailed} event calls.
	    * @name OnRequestUserFriendsUserInfosFailedListener
	    * @function
	    * @static
	    * @memberOf CocoonJS.Social
	    * @param {string} userID The id of the user fro whom the friends infos were requested.
	    * @param {string} errorMessage The error message.
	    */
	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when the user's friends info fails to be retrieved.
	    * The callback function's documentation is represented by {@link CocoonJS.Social.OnRequestUserFriendsUserInfosFailedListener}
	    * @static
	    */
		this.onRequestUserFriendsUserInfosFailed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onRequestUserFriendsUserInfosFailed");

	    /**
	    * FOR DOCUMENTATION PURPOSE ONLY! The documentation of the function callback for the {@link CocoonJS.Social.onRequestMessagePublicationSucceed} event calls.
	    * @name OnRequestMessagePublicationSucceedListener
	    * @function
	    * @static
	    * @memberOf CocoonJS.Social
	    * @param {CocoonJS.Social.Message} message The message that has been published.
	    */
	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when the user message publication request succeeds.
	    * The callback function's documentation is represented by {@link CocoonJS.Social.OnRequestMessagePublicationSucceedListener}
	    * @static
	    */
		this.onRequestMessagePublicationSucceed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onRequestMessagePublicationSucceed");

	    /**
	    * FOR DOCUMENTATION PURPOSE ONLY! The documentation of the function callback for the {@link CocoonJS.Social.onRequestMessagePublicationFailed} event calls.
	    * @name OnRequestMessagePublicationFailedListener
	    * @function
	    * @static
	    * @memberOf CocoonJS.Social
	    * @param {CocoonJS.Social.Message} message The message that was supposed to be published.
	    * @param {string} errorMessage The error message.
	    */
	    /**
	    * This {@link CocoonJS.EventHandler} object allows listening to events called when the user message publication request fails.
	    * The callback function's documentation is represented by {@link CocoonJS.Social.OnRequestMessagePublicationFailedListener}
	    * @static
	    */
		this.onRequestMessagePublicationFailed = new CocoonJS.EventHandler(this.nativeExtensionName, this.extensionName, "onRequestMessagePublicationFailed");

        this.on= function(event, callback) {
            event= "on"+event[0].toUpperCase()+event.substr(1);
            var signal= this[event];
            if (signal) {
                signal.addEventListener(callback);
            } else {
                console.error("SocialGaming service: '"+this.extensionName+"' does not understand '"+event+' signal.');
            }

            return this;
        };

	    return this;
	};

	CocoonJS.Social.prototype = {
        userInfo : null,
        userInfoCocoonJS : null,

        getUserInfo : function() {
            return this.userInfo;
        },

        getLoggedInUserInfo : function() {
//            return this.userInfoCocoonJS;
            if (this.nativeExtensionObjectAvailable) {
                return CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "getLoggedInUserInfo", arguments);
            }
            else {
                return this.userInfoCocoonJS;
            }
        },

        setUserInfo : function( userInfo) {
            this.userInfo= userInfo;
        },

        setUserInfoCocoonJS : function( userInfoCocoonJS ) {
            this.userInfoCocoonJS = userInfoCocoonJS;
        },

		/**
		 * 
		 */
		requestInitialization : function(paramsObject) 
		{
			if (this.nativeExtensionObjectAvailable)
			{
				return CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "requestInitialization", arguments);
			}
		},

		isInitialized : function()
		{
			if (this.nativeExtensionObjectAvailable)
			{
				return CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "isInitialized", arguments);
			}
			else
			{
				return false;
			}
		},

		/**
		* Request to log in the social gaming application.
		* @see CocoonJS.Social.onRequestLoginSucceed
		* @see CocoonJS.Socual.onRequestLoginFailed
		*/
		requestLogin : function()
		{
			if (this.nativeExtensionObjectAvailable)
			{
				return CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "requestLogin", arguments);
			}
		},

		/**
		* Request to log out of the social gaming application.
		* @see CocoonJS.Social.onRequestLoginSucceed
		* @see CocoonJS.Social.onRequestLoginFailed
		* @see CocoonJS.Social.onLogout
		*/
		requestLogout : function()
		{
			if (this.nativeExtensionObjectAvailable)
			{
				return CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "requestLogout", arguments);
			}
		},

		/**
		* Check if the user is logged in.
		* @return true if the user is still logged in, false otherwise.
		*/
		isLoggedIn : function()
		{
			if (this.nativeExtensionObjectAvailable)
			{
				return CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "isLoggedIn", arguments);
			}
		},

		/**
		* Request to retrieve the current or a specific user's id. The request can be monitored using the {@link CocoonJS.Social.onUserInfoRequestSucceed} and {@link CocoonJS.Social.onUserInfoRequestFailed} event handlers.
		* @param {string} [userId] The id of the user to retireve the information from. If no userID is specified, the currently logged in user is assumed.
		* @see CocoonJS.Social.onRequestUserInfoSucceed
		* @see CocoonJS.Social.onRequestUserInfoFailed
		*/
		requestUserInfo : function(userID)
		{
			if (this.nativeExtensionObjectAvailable)
			{
				return CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "requestUserInfo", arguments);
			}
		},

		/**
		* Request to retrieve the Image of a user
		* @param {string} [userID] The id of the user to get the image for. If no userID is specified, the currently logged user is used.
		* @param {CocoonJS.Social.ImageSizeType} [imageSizeType] The size of the image. One of the possible values among the ones in the {@link CocoonJS.Social.ImageSizeType}. If no value is specified, SMALL is used.
		* @see CocoonJS.Social.onRequestUserImageURLSucceed;
		* @see CocoonJS.Social.onRequestUserImageURLFailed;
		*/
		requestUserImageURL : function( imageSizeType, userID)
		{
			if (this.nativeExtensionObjectAvailable)
			{
				return CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "requestUserImageURL", arguments);
			}
		},

		/**
		* Request for the information of all the friends of the currently logged user.
		* @param {string} [userID] The id of the user to get the friends infos for. If no userID is specified, the currently logged user is used.
		* @see CocoonJS.Social.onRequestUserFriendsUserInfosSucceed;
		* @see CocoonJS.Social.onRequestUserFriendsUserInfosFailed;
		*/
		requestUserFriendsUserInfos : function(userID)
		{
			if (this.nativeExtensionObjectAvailable)
			{
				return CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "requestUserFriendsUserInfos", arguments);
			}
		},

		/**
		* Request the publication of a message using a dialog.
		* @param {CocoonJS.Social.Message} message A object representing the information to be published.
		* @see CocoonJS.Social.onRequestMessagePublicationSucceed
		* @see CocoonJS.Social.onRequestMessagePublicationFailed
		*/
		requestMessagePublicationWithDialog : function(message)
		{
			if (this.nativeExtensionObjectAvailable)
			{
				return CocoonJS.makeNativeExtensionObjectFunctionCall(this.nativeExtensionName, "requestMessagePublicationWithDialog", arguments);
			}
		}
	};

	/**
	* This structure represents the possible images to be obtained for a user in the social gaming extension.
	* @namespace
	*/
	CocoonJS.Social.ImageSizeType = 
	{
		/**
		* Represent a thumbnail like image size.
		*/
	    THUMB : "thumb",

		/**
		*/
	    SMALL : "small",

		/**
		*/
	    MEDIUM : "medium",

		/**
		*/
	    LARGE : "large"
	};

	/**
	* The data structure that represents the information of a user inside the social gaming extension.
	* @namespace
	*/
	CocoonJS.Social.UserInfo = function(userID, userName)
	{
		/**
		* The id of the user.
		* @type string
		*/
		this.userID = userID;

		/**
		* The user name of the user.
		* @type string
		*/
		this.userName = userName;
	};

	/**
	* This type represents a message to be published.
	* @param {string} message The message to be published.
	* @param {string} [mediaURL] A URL to a media (image, video, ...)
	* @param {string} linkText
	*/
	CocoonJS.Social.Message = function(message, mediaURL, linkURL, linkText, linkCaption)
	{
		this.message = message;
		this.mediaURL = mediaURL;
		this.linkURL = linkURL;
		this.linkText = linkText;
		this.linkCaption = linkCaption;
		return this;
	};

})();