import {HomeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const club = defineType({
  name: 'club',
  title: 'Club',
  icon: HomeIcon,
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
      title: 'Logo / Image',
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
      name: 'league',
      title: 'League',
      type: 'string',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      league: 'league',
      image: 'image',
    },
    prepare(selection) {
      return {
        title: selection.name,
        subtitle: selection.league || 'Club',
        media: selection.image,
      }
    },
  },
})
