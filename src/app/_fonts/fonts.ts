import {  Open_Sans, Roboto_Flex,  } from "next/font/google";
const inter = Open_Sans({ subsets: ["latin"] , variable : "--font-sans"});
import localFont from 'next/font/local';
const hvFont = localFont({
src : [
  {
    path :   "../../assets/Helvetica.woff",
   weight: '400',
   style: 'normal',
   },
   {
    path :   "../../assets/Helvetica-Bold.woff",
   weight: '600',
   style: 'normal',
   },
    
]
})
const fonts = {
  inter,hvFont
};
export default fonts;
