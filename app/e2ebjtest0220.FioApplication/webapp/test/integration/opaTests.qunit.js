sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'e2ebjtest0220/FioApplication/test/integration/FirstJourney',
		'e2ebjtest0220/FioApplication/test/integration/pages/SrvAuthorsList',
		'e2ebjtest0220/FioApplication/test/integration/pages/SrvAuthorsObjectPage'
    ],
    function(JourneyRunner, opaJourney, SrvAuthorsList, SrvAuthorsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('e2ebjtest0220/FioApplication') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheSrvAuthorsList: SrvAuthorsList,
					onTheSrvAuthorsObjectPage: SrvAuthorsObjectPage
                }
            },
            opaJourney.run
        );
    }
);