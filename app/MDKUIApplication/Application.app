{
	"_Name": "MDKUIApplication",
	"Version": "/MDKUIApplication/Globals/AppDefinition_Version.global",
	"MainPage": "/MDKUIApplication/Pages/Main.page",
	"OnLaunch": [
		"/MDKUIApplication/Actions/Service/InitializeOnline.action"
	],
	"OnWillUpdate": "/MDKUIApplication/Rules/OnWillUpdate.js",
	"OnDidUpdate": "/MDKUIApplication/Actions/Service/InitializeOnline.action",
	"Styles": "/MDKUIApplication/Styles/Styles.less",
	"Localization": "/MDKUIApplication/i18n/i18n.properties",
	"_SchemaVersion": "6.3"
}