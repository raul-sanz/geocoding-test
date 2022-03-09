import { Container } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { GetServerSideProps } from "next/types"
import AddressForm from "../../components/AddressForm"
import prisma from "../../lib/prisma"
import { ActionType, AddressDataResponseProps } from "../../types/interfaces"

const AddressIdPage = ({address}:AddressDataResponseProps)=>{
  return(
    <Container>
      <AddressForm afterAction={()=>{}} idForUpdate={address.id.toString()} action={ActionType.Update} data={address} buttonText="Actualizar informacion"/>
    </Container>
)}
 
export default AddressIdPage

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const address = await prisma.address.findUnique({
    where:{
      id:Number(params?.id)
    }
  });
  return {
    props: { address },
  };
}