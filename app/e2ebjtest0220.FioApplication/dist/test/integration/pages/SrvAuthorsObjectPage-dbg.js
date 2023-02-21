sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'e2ebjtest0220.FioApplication',
            componentId: 'SrvAuthorsObjectPage',
            entitySet: 'SrvAuthors'
        },
        CustomPageDefinitions
    );
});