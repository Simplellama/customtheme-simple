module.exports = {
  prefix: '',
  content: [
    './layout/*.liquid',
    './templates/*.liquid',
    './templates/customers/*.liquid',
    './sections/*.liquid',
    './snippets/*.liquid',
  ],
  theme: { 
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xlg: '1280px',
        x2lg: '1536px', 
        pageMaxWidth: '1440px',
      },
      colors: {
        'primary-bg': '#fcfbf6',
        'secondary-bg': '#f1efe9',
        'secondary-bg-400': '#e6e4db',
        "tertiary-bg": '#423A0D',
        "white": '#fffcfc',
        "light-green": '#D3C996',
        "medium-green": '#586052',
        "dark-green": '#352F0A',
        "primary-red": '#EA6B41',
        "primary-orange": '#EA6B41',
        "button-primary": '#EA6B41',
        "btn-secondary-bg": '#F7F4EC',
        "btn-secondary": '#423A0D',
        "primary-text": '#423A0D',
        'primary-black': '#252521',
        'secondary-text': '#444444',
        'link': '#242424',  
        'sale-price': '#ed0000',
        'border': '#D9D9D9',
      }, 

      fontSize: {
        'xs': ['0.625rem', '0.75rem'],
        'sm': ['0.8rem', '0.75rem'],
        'base': ['0.879rem', '1.1rem'],
        'lg': ['1rem', '1.5rem'],
        'xl': ['1.125rem', '1.125rem'],
        '2xl': ['1.25rem', '1.5rem'],
        '3xl': ['1.375rem', '1.6rem'],
        '4xl': ['1.625rem', '1.8rem'],
        '5xl': ['2rem', '2.5rem'],
        '6xl': ['2.25rem', '2.7rem'],
        '7xl': ['2.5rem', '2.5rem'],
        '8xl': ['4.5rem', '3.5rem'],
        '9xl': ['6rem', '5rem']
      },      
    }, 
  
  }
 
};
