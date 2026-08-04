import type { StructureResolver } from 'sanity/structure';
import { SINGLETON_TYPES } from './schemas';

/**
 * Left-hand menu of the Studio.
 *
 * Pages are shown as single editable documents (no "create new" button), while
 * Stories / News / Programmes / Team are lists the client can add to.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Sangati Website')
    .items([
      S.listItem()
        .title('Homepage')
        .id('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage').title('Homepage')),

      S.divider(),

      S.listItem()
        .title('News & Posters')
        .schemaType('newsPoster')
        .child(
          S.documentTypeList('newsPoster')
            .title('News & Posters')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.listItem()
        .title('Stories')
        .schemaType('story')
        .child(
          S.documentTypeList('story')
            .title('Stories')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.listItem()
        .title('Programmes')
        .schemaType('program')
        .child(
          S.documentTypeList('program')
            .title('Programmes')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.listItem()
        .title('Team & Trustees')
        .schemaType('teamMember')
        .child(
          S.documentTypeList('teamMember')
            .title('Team & Trustees')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.divider(),

      S.listItem()
        .title('About Page')
        .id('aboutPage')
        .child(S.document().schemaType('aboutPage').documentId('aboutPage').title('About Page')),

      S.listItem()
        .title('Impact Page')
        .id('impactPage')
        .child(S.document().schemaType('impactPage').documentId('impactPage').title('Impact Page')),

      S.listItem()
        .title('Yatra Page')
        .id('yatraPage')
        .child(S.document().schemaType('yatraPage').documentId('yatraPage').title('Yatra Page')),

      S.listItem()
        .title('Donate Page')
        .id('donatePage')
        .child(S.document().schemaType('donatePage').documentId('donatePage').title('Donate Page')),
    ]);

/** Hide create/delete/duplicate on the one-off page documents. */
export const singletonActions = new Set(['publish', 'discardChanges', 'restore']);
export const singletonTypes = new Set<string>(SINGLETON_TYPES);
