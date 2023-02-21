(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/MDKUIApplication/i18n/i18n.properties":
/*!*****************************************************************!*\
  !*** ./build.definitions/MDKUIApplication/i18n/i18n.properties ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ "./build.definitions/MDKUIApplication/Rules/AppUpdateFailure.js":
/*!**********************************************************************!*\
  !*** ./build.definitions/MDKUIApplication/Rules/AppUpdateFailure.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AppUpdateFailure(clientAPI) {
    let result = clientAPI.actionResults.AppUpdate.error.toString();
    var message;
    console.log(result);
    if (result.startsWith('Error: Uncaught app extraction failure:')) {
        result = 'Error: Uncaught app extraction failure:';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body: 404 Not Found: Requested route')) {
        result = 'Application instance is not up or running';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body')) {
        result = 'Service instance not found.';
    }

    switch (result) {
        case 'Service instance not found.':
            message = 'Mobile App Update feature is not assigned or not running for your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response Error Response Status: 404 | Body: Failed to find a matched endpoint':
            message = 'Mobile App Update feature is not assigned to your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response failed: Error: Optional(OAuth2Error.tokenRejected: The newly acquired or refreshed token got rejected.)':
            message = 'The Mobile App Update feature is not assigned to your application or there is no Application metadata deployed. Please check your application in Mobile Services and try again.';
            break;
        case 'Error: Uncaught app extraction failure:':
            message = 'Error extracting metadata. Please redeploy and try again.';
            break;
        case 'Application instance is not up or running':
            message = 'Communication failure. Verify that the BindMobileApplicationRoutesToME Application route is running in your BTP space cockpit.';
            break;
        default:
            message = result;
            break;
    }
    return clientAPI.getPageProxy().executeAction({
        "Name": "/MDKUIApplication/Actions/AppUpdateFailureMessage.action",
        "Properties": {
            "Duration": 0,
            "Message": message
        }
    });
}

/***/ }),

/***/ "./build.definitions/MDKUIApplication/Rules/AppUpdateSuccess.js":
/*!**********************************************************************!*\
  !*** ./build.definitions/MDKUIApplication/Rules/AppUpdateSuccess.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function sleep(ms) {
    return (new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, ms);
    }));
}
function AppUpdateSuccess(clientAPI) {
    var message;
    // Force a small pause to let the progress banner show in case there is no new version available
    return sleep(500).then(function() {
        let result = clientAPI.actionResults.AppUpdate.data;
        console.log(result);

        let versionNum = result.split(': ')[1];
        if (result.startsWith('Current version is already up to date')) {
            return clientAPI.getPageProxy().executeAction({
                "Name": "/MDKUIApplication/Actions/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Message": `You are already using the latest version: ${versionNum}`,
                    "NumberOfLines": 2
                }
            });
        } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
            message = 'No Application metadata found. Please deploy your application and try again.';
            return clientAPI.getPageProxy().executeAction({
                "Name": "/MDKUIApplication/Actions/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Duration": 5,
                    "Message": message,
                    "NumberOfLines": 2
                }
            });
        }
    });
}

/***/ }),

/***/ "./build.definitions/MDKUIApplication/Rules/OnWillUpdate.js":
/*!******************************************************************!*\
  !*** ./build.definitions/MDKUIApplication/Rules/OnWillUpdate.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnWillUpdate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnWillUpdate(clientAPI) {
    return clientAPI.executeAction('/MDKUIApplication/Actions/OnWillUpdate.action').then((result) => {
        if (result.data) {
            return Promise.resolve();
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/MDKUIApplication/Rules/ResetAppSettingsAndLogout.js":
/*!*******************************************************************************!*\
  !*** ./build.definitions/MDKUIApplication/Rules/ResetAppSettingsAndLogout.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetAppSettingsAndLogout)
/* harmony export */ });
function ResetAppSettingsAndLogout(context) {
    let logger = context.getLogger();
    let platform = context.nativescript.platformModule;
    let appSettings = context.nativescript.appSettingsModule;
    var appId;
    if (platform && (platform.isIOS || platform.isAndroid)) {
        appId = context.evaluateTargetPath('#Application/#AppData/MobileServiceAppId');
    } else {
        appId = 'WindowsClient';
    }
    try {
        // Remove any other app specific settings
        appSettings.getAllKeys().forEach(key => {
            if (key.substring(0, appId.length) === appId) {
                appSettings.remove(key);
            }
        });
    } catch (err) {
        logger.log(`ERROR: AppSettings cleanup failure - ${err}`, 'ERROR');
    } finally {
        // Logout 
        return context.getPageProxy().executeAction('/MDKUIApplication/Actions/Logout.action');
    }
}

/***/ }),

/***/ "./build.definitions/MDKUIApplication/Styles/Styles.json":
/*!***************************************************************!*\
  !*** ./build.definitions/MDKUIApplication/Styles/Styles.json ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/MDKUIApplication/jsconfig.json":
/*!**********************************************************!*\
  !*** ./build.definitions/MDKUIApplication/jsconfig.json ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
let mdkuiapplication_actions_appupdate_action = __webpack_require__(/*! ./MDKUIApplication/Actions/AppUpdate.action */ "./build.definitions/MDKUIApplication/Actions/AppUpdate.action")
let mdkuiapplication_actions_appupdatefailuremessage_action = __webpack_require__(/*! ./MDKUIApplication/Actions/AppUpdateFailureMessage.action */ "./build.definitions/MDKUIApplication/Actions/AppUpdateFailureMessage.action")
let mdkuiapplication_actions_appupdateprogressbanner_action = __webpack_require__(/*! ./MDKUIApplication/Actions/AppUpdateProgressBanner.action */ "./build.definitions/MDKUIApplication/Actions/AppUpdateProgressBanner.action")
let mdkuiapplication_actions_appupdatesuccessmessage_action = __webpack_require__(/*! ./MDKUIApplication/Actions/AppUpdateSuccessMessage.action */ "./build.definitions/MDKUIApplication/Actions/AppUpdateSuccessMessage.action")
let mdkuiapplication_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./MDKUIApplication/Actions/CloseModalPage_Cancel.action */ "./build.definitions/MDKUIApplication/Actions/CloseModalPage_Cancel.action")
let mdkuiapplication_actions_closemodalpage_complete_action = __webpack_require__(/*! ./MDKUIApplication/Actions/CloseModalPage_Complete.action */ "./build.definitions/MDKUIApplication/Actions/CloseModalPage_Complete.action")
let mdkuiapplication_actions_closepage_action = __webpack_require__(/*! ./MDKUIApplication/Actions/ClosePage.action */ "./build.definitions/MDKUIApplication/Actions/ClosePage.action")
let mdkuiapplication_actions_logout_action = __webpack_require__(/*! ./MDKUIApplication/Actions/Logout.action */ "./build.definitions/MDKUIApplication/Actions/Logout.action")
let mdkuiapplication_actions_logoutmessage_action = __webpack_require__(/*! ./MDKUIApplication/Actions/LogoutMessage.action */ "./build.definitions/MDKUIApplication/Actions/LogoutMessage.action")
let mdkuiapplication_actions_onwillupdate_action = __webpack_require__(/*! ./MDKUIApplication/Actions/OnWillUpdate.action */ "./build.definitions/MDKUIApplication/Actions/OnWillUpdate.action")
let mdkuiapplication_actions_service_initializeonline_action = __webpack_require__(/*! ./MDKUIApplication/Actions/Service/InitializeOnline.action */ "./build.definitions/MDKUIApplication/Actions/Service/InitializeOnline.action")
let mdkuiapplication_actions_service_initializeonlinefailuremessage_action = __webpack_require__(/*! ./MDKUIApplication/Actions/Service/InitializeOnlineFailureMessage.action */ "./build.definitions/MDKUIApplication/Actions/Service/InitializeOnlineFailureMessage.action")
let mdkuiapplication_actions_service_initializeonlinesuccessmessage_action = __webpack_require__(/*! ./MDKUIApplication/Actions/Service/InitializeOnlineSuccessMessage.action */ "./build.definitions/MDKUIApplication/Actions/Service/InitializeOnlineSuccessMessage.action")
let mdkuiapplication_actions_srvauthors_navtosrvauthors_detail_action = __webpack_require__(/*! ./MDKUIApplication/Actions/SrvAuthors/NavToSrvAuthors_Detail.action */ "./build.definitions/MDKUIApplication/Actions/SrvAuthors/NavToSrvAuthors_Detail.action")
let mdkuiapplication_actions_srvauthors_navtosrvauthors_list_action = __webpack_require__(/*! ./MDKUIApplication/Actions/SrvAuthors/NavToSrvAuthors_List.action */ "./build.definitions/MDKUIApplication/Actions/SrvAuthors/NavToSrvAuthors_List.action")
let mdkuiapplication_actions_srvbooks_navtosrvbooks_detail_action = __webpack_require__(/*! ./MDKUIApplication/Actions/SrvBooks/NavToSrvBooks_Detail.action */ "./build.definitions/MDKUIApplication/Actions/SrvBooks/NavToSrvBooks_Detail.action")
let mdkuiapplication_actions_srvbooks_navtosrvbooks_list_action = __webpack_require__(/*! ./MDKUIApplication/Actions/SrvBooks/NavToSrvBooks_List.action */ "./build.definitions/MDKUIApplication/Actions/SrvBooks/NavToSrvBooks_List.action")
let mdkuiapplication_globals_appdefinition_version_global = __webpack_require__(/*! ./MDKUIApplication/Globals/AppDefinition_Version.global */ "./build.definitions/MDKUIApplication/Globals/AppDefinition_Version.global")
let mdkuiapplication_i18n_i18n_properties = __webpack_require__(/*! ./MDKUIApplication/i18n/i18n.properties */ "./build.definitions/MDKUIApplication/i18n/i18n.properties")
let mdkuiapplication_jsconfig_json = __webpack_require__(/*! ./MDKUIApplication/jsconfig.json */ "./build.definitions/MDKUIApplication/jsconfig.json")
let mdkuiapplication_pages_main_page = __webpack_require__(/*! ./MDKUIApplication/Pages/Main.page */ "./build.definitions/MDKUIApplication/Pages/Main.page")
let mdkuiapplication_pages_srvauthors_srvauthors_detail_page = __webpack_require__(/*! ./MDKUIApplication/Pages/SrvAuthors/SrvAuthors_Detail.page */ "./build.definitions/MDKUIApplication/Pages/SrvAuthors/SrvAuthors_Detail.page")
let mdkuiapplication_pages_srvauthors_srvauthors_list_page = __webpack_require__(/*! ./MDKUIApplication/Pages/SrvAuthors/SrvAuthors_List.page */ "./build.definitions/MDKUIApplication/Pages/SrvAuthors/SrvAuthors_List.page")
let mdkuiapplication_pages_srvbooks_srvbooks_detail_page = __webpack_require__(/*! ./MDKUIApplication/Pages/SrvBooks/SrvBooks_Detail.page */ "./build.definitions/MDKUIApplication/Pages/SrvBooks/SrvBooks_Detail.page")
let mdkuiapplication_pages_srvbooks_srvbooks_list_page = __webpack_require__(/*! ./MDKUIApplication/Pages/SrvBooks/SrvBooks_List.page */ "./build.definitions/MDKUIApplication/Pages/SrvBooks/SrvBooks_List.page")
let mdkuiapplication_rules_appupdatefailure_js = __webpack_require__(/*! ./MDKUIApplication/Rules/AppUpdateFailure.js */ "./build.definitions/MDKUIApplication/Rules/AppUpdateFailure.js")
let mdkuiapplication_rules_appupdatesuccess_js = __webpack_require__(/*! ./MDKUIApplication/Rules/AppUpdateSuccess.js */ "./build.definitions/MDKUIApplication/Rules/AppUpdateSuccess.js")
let mdkuiapplication_rules_onwillupdate_js = __webpack_require__(/*! ./MDKUIApplication/Rules/OnWillUpdate.js */ "./build.definitions/MDKUIApplication/Rules/OnWillUpdate.js")
let mdkuiapplication_rules_resetappsettingsandlogout_js = __webpack_require__(/*! ./MDKUIApplication/Rules/ResetAppSettingsAndLogout.js */ "./build.definitions/MDKUIApplication/Rules/ResetAppSettingsAndLogout.js")
let mdkuiapplication_services_service1_service = __webpack_require__(/*! ./MDKUIApplication/Services/service1.service */ "./build.definitions/MDKUIApplication/Services/service1.service")
let mdkuiapplication_styles_styles_css = __webpack_require__(/*! ./MDKUIApplication/Styles/Styles.css */ "./build.definitions/MDKUIApplication/Styles/Styles.css")
let mdkuiapplication_styles_styles_json = __webpack_require__(/*! ./MDKUIApplication/Styles/Styles.json */ "./build.definitions/MDKUIApplication/Styles/Styles.json")
let mdkuiapplication_styles_styles_less = __webpack_require__(/*! ./MDKUIApplication/Styles/Styles.less */ "./build.definitions/MDKUIApplication/Styles/Styles.less")
let mdkuiapplication_styles_styles_nss = __webpack_require__(/*! ./MDKUIApplication/Styles/Styles.nss */ "./build.definitions/MDKUIApplication/Styles/Styles.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	mdkuiapplication_actions_appupdate_action : mdkuiapplication_actions_appupdate_action,
	mdkuiapplication_actions_appupdatefailuremessage_action : mdkuiapplication_actions_appupdatefailuremessage_action,
	mdkuiapplication_actions_appupdateprogressbanner_action : mdkuiapplication_actions_appupdateprogressbanner_action,
	mdkuiapplication_actions_appupdatesuccessmessage_action : mdkuiapplication_actions_appupdatesuccessmessage_action,
	mdkuiapplication_actions_closemodalpage_cancel_action : mdkuiapplication_actions_closemodalpage_cancel_action,
	mdkuiapplication_actions_closemodalpage_complete_action : mdkuiapplication_actions_closemodalpage_complete_action,
	mdkuiapplication_actions_closepage_action : mdkuiapplication_actions_closepage_action,
	mdkuiapplication_actions_logout_action : mdkuiapplication_actions_logout_action,
	mdkuiapplication_actions_logoutmessage_action : mdkuiapplication_actions_logoutmessage_action,
	mdkuiapplication_actions_onwillupdate_action : mdkuiapplication_actions_onwillupdate_action,
	mdkuiapplication_actions_service_initializeonline_action : mdkuiapplication_actions_service_initializeonline_action,
	mdkuiapplication_actions_service_initializeonlinefailuremessage_action : mdkuiapplication_actions_service_initializeonlinefailuremessage_action,
	mdkuiapplication_actions_service_initializeonlinesuccessmessage_action : mdkuiapplication_actions_service_initializeonlinesuccessmessage_action,
	mdkuiapplication_actions_srvauthors_navtosrvauthors_detail_action : mdkuiapplication_actions_srvauthors_navtosrvauthors_detail_action,
	mdkuiapplication_actions_srvauthors_navtosrvauthors_list_action : mdkuiapplication_actions_srvauthors_navtosrvauthors_list_action,
	mdkuiapplication_actions_srvbooks_navtosrvbooks_detail_action : mdkuiapplication_actions_srvbooks_navtosrvbooks_detail_action,
	mdkuiapplication_actions_srvbooks_navtosrvbooks_list_action : mdkuiapplication_actions_srvbooks_navtosrvbooks_list_action,
	mdkuiapplication_globals_appdefinition_version_global : mdkuiapplication_globals_appdefinition_version_global,
	mdkuiapplication_i18n_i18n_properties : mdkuiapplication_i18n_i18n_properties,
	mdkuiapplication_jsconfig_json : mdkuiapplication_jsconfig_json,
	mdkuiapplication_pages_main_page : mdkuiapplication_pages_main_page,
	mdkuiapplication_pages_srvauthors_srvauthors_detail_page : mdkuiapplication_pages_srvauthors_srvauthors_detail_page,
	mdkuiapplication_pages_srvauthors_srvauthors_list_page : mdkuiapplication_pages_srvauthors_srvauthors_list_page,
	mdkuiapplication_pages_srvbooks_srvbooks_detail_page : mdkuiapplication_pages_srvbooks_srvbooks_detail_page,
	mdkuiapplication_pages_srvbooks_srvbooks_list_page : mdkuiapplication_pages_srvbooks_srvbooks_list_page,
	mdkuiapplication_rules_appupdatefailure_js : mdkuiapplication_rules_appupdatefailure_js,
	mdkuiapplication_rules_appupdatesuccess_js : mdkuiapplication_rules_appupdatesuccess_js,
	mdkuiapplication_rules_onwillupdate_js : mdkuiapplication_rules_onwillupdate_js,
	mdkuiapplication_rules_resetappsettingsandlogout_js : mdkuiapplication_rules_resetappsettingsandlogout_js,
	mdkuiapplication_services_service1_service : mdkuiapplication_services_service1_service,
	mdkuiapplication_styles_styles_css : mdkuiapplication_styles_styles_css,
	mdkuiapplication_styles_styles_json : mdkuiapplication_styles_styles_json,
	mdkuiapplication_styles_styles_less : mdkuiapplication_styles_styles_less,
	mdkuiapplication_styles_styles_nss : mdkuiapplication_styles_styles_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/tsconfig.json":
/*!*****************************************!*\
  !*** ./build.definitions/tsconfig.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"compilerOptions":{"target":"es2015","module":"esnext","moduleResolution":"node","lib":["es2018","dom"],"experimentalDecorators":true,"emitDecoratorMetadata":true,"removeComments":true,"inlineSourceMap":true,"noEmitOnError":false,"noEmitHelpers":true,"baseUrl":".","plugins":[{"transform":"@nativescript/webpack/dist/transformers/NativeClass","type":"raw"}]},"exclude":["node_modules"]}');

/***/ }),

/***/ "./build.definitions/MDKUIApplication/Styles/Styles.css":
/*!**************************************************************!*\
  !*** ./build.definitions/MDKUIApplication/Styles/Styles.css ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/cssWithMappingToString.js */ "../../../../css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n", "",{"version":3,"sources":["webpack://./build.definitions/MDKUIApplication/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/MDKUIApplication/Styles/Styles.less":
/*!***************************************************************!*\
  !*** ./build.definitions/MDKUIApplication/Styles/Styles.less ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/cssWithMappingToString.js */ "../../../../css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/", "",{"version":3,"sources":["webpack://./build.definitions/MDKUIApplication/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/MDKUIApplication/Styles/Styles.nss":
/*!**************************************************************!*\
  !*** ./build.definitions/MDKUIApplication/Styles/Styles.nss ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/cssWithMappingToString.js */ "../../../../css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "../../../../css-loader/dist/runtime/api.js":
/*!**************************************************!*\
  !*** ../../../../css-loader/dist/runtime/api.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "../../../../css-loader/dist/runtime/cssWithMappingToString.js":
/*!*********************************************************************!*\
  !*** ../../../../css-loader/dist/runtime/cssWithMappingToString.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./build.definitions/MDKUIApplication/Pages/Main.page":
/*!************************************************************!*\
  !*** ./build.definitions/MDKUIApplication/Pages/Main.page ***!
  \************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Main","Controls":[{"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable","Sections":[{"Buttons":[{"OnPress":"/MDKUIApplication/Actions/SrvAuthors/NavToSrvAuthors_List.action","Alignment":"Center","Title":"SrvAuthors","ButtonType":"Text","Semantic":"Tint"},{"OnPress":"/MDKUIApplication/Actions/SrvBooks/NavToSrvBooks_List.action","Alignment":"Center","Title":"SrvBooks","ButtonType":"Text","Semantic":"Tint"}],"_Name":"SectionButtonTable0","_Type":"Section.Type.ButtonTable"}]}],"_Name":"Main","_Type":"Page","ToolBar":{"Items":[{"_Name":"LogoutToolbarItem","_Type":"Control.Type.ToolbarItem","Caption":"Logout","OnPress":"/MDKUIApplication/Actions/LogoutMessage.action"},{"_Name":"UpdateToolbarItem","_Type":"Control.Type.ToolbarItem","Caption":"Update","Enabled":true,"Clickable":true,"OnPress":"/MDKUIApplication/Actions/AppUpdateProgressBanner.action","Visible":"$(PLT,true,true,false)"}]},"PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKUIApplication/Pages/SrvAuthors/SrvAuthors_Detail.page":
/*!************************************************************************************!*\
  !*** ./build.definitions/MDKUIApplication/Pages/SrvAuthors/SrvAuthors_Detail.page ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"SrvAuthors Detail","DesignTimeTarget":{"Service":"/MDKUIApplication/Services/service1.service","EntitySet":"SrvAuthors","QueryOptions":""},"ActionBar":{"Items":[]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ID}","Subhead":"{createdAt}","BodyText":"","Footnote":"{modifiedAt}","Description":"{createdBy}","StatusText":"{modifiedBy}","StatusImage":"","SubstatusImage":"","SubstatusText":""},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"createdAt","Value":"{createdAt}"},{"KeyName":"createdBy","Value":"{createdBy}"},{"KeyName":"modifiedAt","Value":"{modifiedAt}"},{"KeyName":"modifiedBy","Value":"{modifiedBy}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"books"},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{price}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{title}","Footnote":"{currency}","PreserveIconStackSpacing":false,"StatusText":"","Subhead":"{stock}","SubstatusText":"","OnPress":"/MDKUIApplication/Actions/SrvBooks/NavToSrvBooks_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/books","Service":"/MDKUIApplication/Services/service1.service"},"_Type":"Section.Type.ObjectTable"}],"DataSubscriptions":["SrvBooks"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"SrvAuthors_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKUIApplication/Pages/SrvAuthors/SrvAuthors_List.page":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MDKUIApplication/Pages/SrvAuthors/SrvAuthors_List.page ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"SrvAuthors","ActionBar":{"Items":[]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{createdBy}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MDKUIApplication/Actions/SrvAuthors/NavToSrvAuthors_Detail.action","StatusImage":"","Title":"{ID}","Footnote":"{modifiedAt}","PreserveIconStackSpacing":false,"StatusText":"{modifiedBy}","Subhead":"{createdAt}","SubstatusText":""},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"SrvAuthors","Service":"/MDKUIApplication/Services/service1.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"SrvAuthors_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKUIApplication/Pages/SrvBooks/SrvBooks_Detail.page":
/*!********************************************************************************!*\
  !*** ./build.definitions/MDKUIApplication/Pages/SrvBooks/SrvBooks_Detail.page ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"SrvBooks Detail","DesignTimeTarget":{"Service":"/MDKUIApplication/Services/service1.service","EntitySet":"SrvBooks","QueryOptions":""},"ActionBar":{"Items":[]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{title}","Subhead":"{stock}","BodyText":"","Footnote":"{currency}","Description":"{price}","StatusText":"","StatusImage":"","SubstatusImage":"","SubstatusText":""},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"title","Value":"{title}"},{"KeyName":"stock","Value":"{stock}"},{"KeyName":"price","Value":"{price}"},{"KeyName":"currency","Value":"{currency}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"SrvBooks_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKUIApplication/Pages/SrvBooks/SrvBooks_List.page":
/*!******************************************************************************!*\
  !*** ./build.definitions/MDKUIApplication/Pages/SrvBooks/SrvBooks_List.page ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"SrvBooks","ActionBar":{"Items":[]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{price}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MDKUIApplication/Actions/SrvBooks/NavToSrvBooks_Detail.action","StatusImage":"","Title":"{title}","Footnote":"{currency}","PreserveIconStackSpacing":false,"StatusText":"","Subhead":"{stock}","SubstatusText":""},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"SrvBooks","Service":"/MDKUIApplication/Services/service1.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"SrvBooks_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"MDKUIApplication","Version":"/MDKUIApplication/Globals/AppDefinition_Version.global","MainPage":"/MDKUIApplication/Pages/Main.page","OnLaunch":["/MDKUIApplication/Actions/Service/InitializeOnline.action"],"OnWillUpdate":"/MDKUIApplication/Rules/OnWillUpdate.js","OnDidUpdate":"/MDKUIApplication/Actions/Service/InitializeOnline.action","Styles":"/MDKUIApplication/Styles/Styles.less","Localization":"/MDKUIApplication/i18n/i18n.properties","_SchemaVersion":"6.3","StyleSheets":{"Styles":{"css":"/MDKUIApplication/Styles/Styles.css","ios":"/MDKUIApplication/Styles/Styles.nss","android":"/MDKUIApplication/Styles/Styles.json"}}}

/***/ }),

/***/ "./build.definitions/MDKUIApplication/Actions/AppUpdate.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/MDKUIApplication/Actions/AppUpdate.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/MDKUIApplication/Rules/AppUpdateFailure.js","OnSuccess":"/MDKUIApplication/Rules/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/MDKUIApplication/Actions/AppUpdateFailureMessage.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/MDKUIApplication/Actions/AppUpdateFailureMessage.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDKUIApplication/Actions/AppUpdateProgressBanner.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/MDKUIApplication/Actions/AppUpdateProgressBanner.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/MDKUIApplication/Actions/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/MDKUIApplication/Actions/AppUpdateSuccessMessage.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/MDKUIApplication/Actions/AppUpdateSuccessMessage.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDKUIApplication/Actions/CloseModalPage_Cancel.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/MDKUIApplication/Actions/CloseModalPage_Cancel.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MDKUIApplication/Actions/CloseModalPage_Complete.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/MDKUIApplication/Actions/CloseModalPage_Complete.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MDKUIApplication/Actions/ClosePage.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/MDKUIApplication/Actions/ClosePage.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MDKUIApplication/Actions/Logout.action":
/*!******************************************************************!*\
  !*** ./build.definitions/MDKUIApplication/Actions/Logout.action ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = {"SkipReset":false,"_Type":"Action.Type.Logout"}

/***/ }),

/***/ "./build.definitions/MDKUIApplication/Actions/LogoutMessage.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/MDKUIApplication/Actions/LogoutMessage.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"CancelCaption":"No","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","OKCaption":"Yes","OnOK":"/MDKUIApplication/Rules/ResetAppSettingsAndLogout.js","Title":"Logout","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/MDKUIApplication/Actions/OnWillUpdate.action":
/*!************************************************************************!*\
  !*** ./build.definitions/MDKUIApplication/Actions/OnWillUpdate.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/MDKUIApplication/Actions/Service/InitializeOnline.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/MDKUIApplication/Actions/Service/InitializeOnline.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDKUIApplication/Services/service1.service","_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"OnSuccess":"/MDKUIApplication/Actions/Service/InitializeOnlineSuccessMessage.action","OnFailure":"/MDKUIApplication/Actions/Service/InitializeOnlineFailureMessage.action","ActionResult":{"_Name":"init"}}

/***/ }),

/***/ "./build.definitions/MDKUIApplication/Actions/Service/InitializeOnlineFailureMessage.action":
/*!**************************************************************************************************!*\
  !*** ./build.definitions/MDKUIApplication/Actions/Service/InitializeOnlineFailureMessage.action ***!
  \**************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDKUIApplication/Actions/Service/InitializeOnlineSuccessMessage.action":
/*!**************************************************************************************************!*\
  !*** ./build.definitions/MDKUIApplication/Actions/Service/InitializeOnlineSuccessMessage.action ***!
  \**************************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Application data service initialized","IsIconHidden":true,"NumberOfLines":2,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDKUIApplication/Actions/SrvAuthors/NavToSrvAuthors_Detail.action":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/MDKUIApplication/Actions/SrvAuthors/NavToSrvAuthors_Detail.action ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDKUIApplication/Pages/SrvAuthors/SrvAuthors_Detail.page"}

/***/ }),

/***/ "./build.definitions/MDKUIApplication/Actions/SrvAuthors/NavToSrvAuthors_List.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/MDKUIApplication/Actions/SrvAuthors/NavToSrvAuthors_List.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDKUIApplication/Pages/SrvAuthors/SrvAuthors_List.page"}

/***/ }),

/***/ "./build.definitions/MDKUIApplication/Actions/SrvBooks/NavToSrvBooks_Detail.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/MDKUIApplication/Actions/SrvBooks/NavToSrvBooks_Detail.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDKUIApplication/Pages/SrvBooks/SrvBooks_Detail.page"}

/***/ }),

/***/ "./build.definitions/MDKUIApplication/Actions/SrvBooks/NavToSrvBooks_List.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/MDKUIApplication/Actions/SrvBooks/NavToSrvBooks_List.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDKUIApplication/Pages/SrvBooks/SrvBooks_List.page"}

/***/ }),

/***/ "./build.definitions/MDKUIApplication/Globals/AppDefinition_Version.global":
/*!*********************************************************************************!*\
  !*** ./build.definitions/MDKUIApplication/Globals/AppDefinition_Version.global ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/MDKUIApplication/Services/service1.service":
/*!**********************************************************************!*\
  !*** ./build.definitions/MDKUIApplication/Services/service1.service ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"../service/e2ebjtest0220/","OfflineEnabled":false,"LanguageURLParam":"","OnlineOptions":{},"PathSuffix":"","SourceType":"Cloud","ServiceUrl":""}

/***/ }),

/***/ "./build.definitions/version.mdkbundlerversion":
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = "1.1\n"

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./build.definitions/application-index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bundle.js.map