import {CogIcon, EarthGlobeIcon} from '@sanity/icons'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import pluralize from 'pluralize-esm'

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

const DISABLED_TYPES = ['settings', 'assist.instruction.context', 'player', 'nationalTeam', 'club']

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Website Content')
    .items([
      ...S.documentTypeListItems()
        .filter((listItem: any) => !DISABLED_TYPES.includes(listItem.getId()))
        .map((listItem) => {
          return listItem.title(pluralize(listItem.getTitle() as string))
        }),
      S.divider(),
      S.listItem()
        .title('VM 2026')
        .icon(EarthGlobeIcon)
        .child(
          S.list()
            .title('VM 2026')
            .items([
              S.documentTypeListItem('player').title('Players'),
              S.documentTypeListItem('nationalTeam').title('National Teams'),
              S.documentTypeListItem('club').title('Clubs'),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('settings').documentId('siteSettings'))
        .icon(CogIcon),
    ])
