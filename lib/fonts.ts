// fonts.ts
import localFont from "next/font/local";

export const arita = localFont({
  src: [
    {
      path: '../public/fonts/AritaDotumKR-Thin.ttf',
      weight: '200'
    },{
      path: '../public/fonts/AritaDotumKR-Light.ttf',
      weight: '300'
    },{
      path: '../public/fonts/AritaDotumKR-Medium.ttf',
      weight: '400'
    },
    {
      path: '../public/fonts/AritaDotumKR-SemiBold.ttf',
      weight: '600'
    },
    {
      path: '../public/fonts/AritaDotumKR-Bold.ttf',
      weight: '700'
    }
  ],
  variable: '--font-arita'
})

export const maruburis = localFont({
  src: [
    {
      path: '../public/fonts/MaruBuri-ExtraLight.ttf',
      weight: '200'
    },{
      path: '../public/fonts/MaruBuri-Light.ttf',
      weight: '300'
    },{
      path: '../public/fonts/MaruBuri-Regular.ttf',
      weight: '400'
    },
    {
      path: '../public/fonts/MaruBuri-SemiBold.ttf',
      weight: '600'
    },
    {
      path: '../public/fonts/MaruBuri-Bold.ttf',
      weight: '700'
    }
  ],
  variable: '--font-maruburis'
})
