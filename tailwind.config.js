module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  env:{
    MONGO_URL:'mongodb+srv://Suraj189:Suraj123$@emaily-dev.6uxfl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  }
}
