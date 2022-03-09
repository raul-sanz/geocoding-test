import Script from "next/script"
import Header from "../components/Header"

const  AppLayout = ({ children }:{children:JSX.Element}) =>{
  return (
    <>
     <Script
        strategy="beforeInteractive"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API}&libraries=places`}
      />
      <Header />
      <main>{children}</main>
    </>
  )
}

export default AppLayout