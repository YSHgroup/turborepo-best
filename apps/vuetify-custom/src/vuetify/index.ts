import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { lightTheme } from './theme'

export const vuetify = createVuetify({
	components,
	directives,
	theme: {
		defaultTheme: 'lightTheme',
		themes: { lightTheme },
	},
})
