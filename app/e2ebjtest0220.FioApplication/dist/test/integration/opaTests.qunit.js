sap.ui.require(["sap/fe/test/JourneyRunner","e2ebjtest0220/FioApplication/test/integration/FirstJourney","e2ebjtest0220/FioApplication/test/integration/pages/SrvAuthorsList","e2ebjtest0220/FioApplication/test/integration/pages/SrvAuthorsObjectPage"],function(t,e,i,r){"use strict";var t=new t({launchUrl:sap.ui.require.toUrl("e2ebjtest0220/FioApplication")+"/index.html"});t.run({pages:{onTheSrvAuthorsList:i,onTheSrvAuthorsObjectPage:r}},e.run)});