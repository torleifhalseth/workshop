import {EarthGlobeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const nationalTeam = defineType({
  name: 'nationalTeam',
  title: 'National Team',
  icon: EarthGlobeIcon,
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
      name: 'image',
      title: 'Flag / Image',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
      options: {hotspot: true},
    }),
    defineField({
      name: 'federation',
      title: 'Federation',
      type: 'string',
    }),
    defineField({
      name: 'fifaRanking',
      title: 'FIFA Ranking',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      image: 'image',
    },
    prepare(selection) {
      return {
        title: selection.name,
        subtitle: 'National Team',
        media: selection.image,
      }
    },
  },
})
