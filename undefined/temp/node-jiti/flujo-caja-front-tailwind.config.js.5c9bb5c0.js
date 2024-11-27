"use strict";Object.defineProperty(exports, "__esModule", {value: true});/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

exports. default = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        animationDelay: {
            475: '475ms',
            2000: '2s'
        },
        animationDuration: {
            4000: '4s',
            slow: '10s'
        }
    },
    fontFamily: {
        'sans': ['Parkinsans','sans-serif'],
        'serif': ['serif'],
        'mono': ['monospace'],
    },
  },
  plugins: [require('tailwindcss-primeui')]
}

 /* v7-97962068ef80a187 */