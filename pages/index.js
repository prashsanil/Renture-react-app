import Link from 'next/link';
import Image from 'next/image';
import {Flex, Box, Text, Button} from '@chakra-ui/react';

import { baseUrl, fetchApi } from '../utils/fetchApi';
import Property from '../components/Property';

const Banner = ({purpose, title1, title2, desc1, desc2, buttonText, linkName, imgUrl}) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imgUrl} width={500} height={300} alt="banner" />
    <Box p="5">
      <Text color="gray.500" fontSize="sm" fontWeight="medium"> 
        {purpose} 
      </Text>
      <Text fontSize="3xl" fontWeight="bold"> 
        {title1} 
      </Text>
      <Text fontSize="lg" paddingTop={3} paddingBottom="3" color="gray.500"> 
        {desc1} 
      </Text>
      <Button fontSize="xl">
        <Link href={linkName}> {buttonText} </Link>
      </Button>
    </Box> 
  </Flex>
)

export default function Home({propertiesForSale, propertiesForRent}) {
  return (
    <Box>
      <h1>Hello World!</h1>
      <Banner purpose="Rent a Home"
        title1="Rental Homes for"
        title2="Everyone!"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Renting"
        linkName="/search?purpose=for-rent"
        imgUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008" 

      />

      <Flex flex-wrap="wrap">
        {/* {propertiesForRent.map((property) => <Property property={property} key={property.id} />)} */}
      </Flex>

      <Banner purpose="Buy a Home"
        title1="Find, Buy & Own your"
        title2="Dream Home!"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Buying"
        linkName="/search?purpose=for-sale"
        imgUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />

      <Flex flex-wrap="wrap">
      {/* {propertiesForSale.map((property) => <Property property={property} key={property.id} />)} */}
      </Flex>
    </Box>
  )
}

export async function getStaticProps() {
  const propertiesForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
  const propertiesForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);

  return {
    props: {
      propertiesForSale: propertiesForSale?.hits || null,
      propertiesForRent: propertiesForRent?.hits || null,
    },
  };

}