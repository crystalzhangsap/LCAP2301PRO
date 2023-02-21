using { e2ebjtest0220 as my } from '../db/schema';

using e2ebjtest0220 from '../db/schema';

@path : 'service/e2ebjtest0220'
service e2ebjtest0220Service
{
    entity SrvAuthors as
        projection on my.Authors;

    entity SrvBooks as
        projection on my.Books;
}

annotate e2ebjtest0220Service with @requires :
[
    'authenticated-user'
];
