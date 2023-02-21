using e2ebjtest0220Service as service from '../../srv/service';

annotate service.SrvAuthors with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'createdAt',
            Value : createdAt,
        },
        {
            $Type : 'UI.DataField',
            Label : 'createdBy',
            Value : createdBy,
        },
        {
            $Type : 'UI.DataField',
            Label : 'modifiedAt',
            Value : modifiedAt,
        },
        {
            $Type : 'UI.DataField',
            Label : 'modifiedBy',
            Value : modifiedBy,
        },
    ]
);
annotate service.SrvAuthors with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'createdAt',
                Value : createdAt,
            },
            {
                $Type : 'UI.DataField',
                Label : 'createdBy',
                Value : createdBy,
            },
            {
                $Type : 'UI.DataField',
                Label : 'modifiedAt',
                Value : modifiedAt,
            },
            {
                $Type : 'UI.DataField',
                Label : 'modifiedBy',
                Value : modifiedBy,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup1',
        },
    ]
);
