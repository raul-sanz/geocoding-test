import Header from "../components/Header";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { AddressData } from "../types/interfaces";

const AddressPage = ()=>{
  const [location, setLocation] = useLocalStorage<AddressData|string>("location",'');
  console.log(location)
  return(
    <Header/>
)}
 
export default AddressPage