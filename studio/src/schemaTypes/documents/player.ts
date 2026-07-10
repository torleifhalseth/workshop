import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const player = defineType({
  name: 'player',
  title: 'Player',
  icon: UserIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      options: {
        list: [
          {title: 'Keeper', value: 'goalkeeper'},
          {title: 'Høyreback', value: 'right_back'},
          {title: 'Midtstopper', value: 'center_back'},
          {title: 'Venstreback', value: 'left_back'},
          {title: 'Midtbane', value: 'midfielder'},
          {title: 'Kant/midtbane', value: 'winger_midfielder'},
          {title: 'Kantspiller', value: 'winger'},
          {title: 'Spiss', value: 'forward'},
          {title: 'Spiss/kant', value: 'forward_winger'},
        ],
      },
    }),
    defineField({
      name: 'number',
      title: 'Squad Number',
      type: 'number',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        }),
      ],
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'birthDate',
      title: 'Birth Date',
      type: 'date',
    }),
    defineField({
      name: 'birthPlace',
      title: 'Birth Place',
      type: 'string',
    }),
    defineField({
      name: 'caps',
      title: 'International Caps',
      type: 'number',
    }),
    defineField({
      name: 'nationalTeam',
      title: 'National Team',
      type: 'reference',
      to: [{type: 'nationalTeam'}],
    }),
    defineField({
      name: 'club',
      title: 'Club',
      type: 'reference',
      to: [{type: 'club'}],
    }),
  ],
  preview: {
    select: {
      name: 'name',
      position: 'position',
      image: 'image',
    },
    prepare(selection) {
      return {
        title: selection.name,
        subtitle: selection.position || 'Player',
        media: selection.image,
      }
    },
  },
})
