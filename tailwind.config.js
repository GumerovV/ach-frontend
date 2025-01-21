/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1536px',
				'3xl': '1900px',
				'4xl': '2000px',
			},
			colors: {
				background: '#F8F8F8',
				font: '#30444B',
				primary: '#01A5CF',
				divider: '#D4DEE3',
				success: '#2DAF0D',
				error: '#C90E0E',
				other: '#D4DEE3',
			},
		},
		fontFamily: {
			sans: ['Oswald', 'sans-serif'],
			oswald: ['Oswald', 'sans-serif'],
			inter: ['Inter', 'sans-serif'],
		},
	},
	plugins: [],
}
