import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}
const theme = extendTheme({ 
  config,
  colors: {
    transparent: 'transparent',
    black: '#000',
    white: '#fff',
    brand:{
      100:'#FFCB77',
      200:'#FE6D73'
    }
  },
 })

export default theme