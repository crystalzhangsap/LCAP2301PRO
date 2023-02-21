sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'e2ebjtest0220.FioApplication',
            componentId: 'SrvAuthorsList',
            entitySet: 'SrvAuthors'
        },
        CustomPageDefinitions
    );
});