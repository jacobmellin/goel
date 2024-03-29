/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            transitionProperty: {
                'width' : 'width'
            },
            screens: {
                'sm': '540px'
            },
            colors: {
                soothe: {
                    '50': '#fbfbfa',
                    '100': '#f5f1f5',
                    '200': '#e9d9e9',
                    '300': '#cfb2cd',
                    '400': '#b786ab',
                    '500': '#9b628b',
                    '600': '#7f476b',
                    '700': '#5e344f',
                    '800': '#402334',
                    '900': '#25151f',
                },
                calm: {
                    '50': '#fafafa',
                    '100': '#f1f1f8',
                    '200': '#dfdbef',
                    '300': '#beb6da',
                    '400': '#9c8cbd',
                    '500': '#8067a2',
                    '600': '#674c84',
                    '700': '#4d3863',
                    '800': '#342643',
                    '900': '#1e1727',
                },
                gaze: {
                    '50': '#f9fafa',
                    '100': '#eff1f8',
                    '200': '#dbdcef',
                    '300': '#b6b8da',
                    '400': '#8f8fbe',
                    '500': '#736ba3',
                    '600': '#5c4f85',
                    '700': '#453b64',
                    '800': '#2f2844',
                    '900': '#1b1829',
                }
            }
        },
    },
    plugins: [],
}

