import { Box, Avatar, Flex, Spacer, Text } from '@chakra-ui/react';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';
import { baseUrl, fetchApi } from '../../utils/fetchApi';
import ImageScrollBar from '../../components/ImageScrollBar';

const PropertyDetails = ({ propertyDetails: { price, rentFrequency, rooms, title, baths, area, agency, isVerified, description, type, purpose, furnishingStatus, amenities, photos } }) => (

    <Box maxWidth="1000px" margin="auto" p="4">
        {photos && <ImageScrollBar data={photos} />}

        <Box w="full" p="6">
            <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
                <Flex alignItems="center">
                    <Box paddingRight="3" color="green.400">
                        {isVerified && <GoVerified />}
                    </Box>
                    <Text fontWeight="bold" fontSize="lg">BDT {millify(price)} {rentFrequency && `/${rentFrequency}`} </Text>
                </Flex>
                <Box>
                    <Avatar size="sm" src={agency?.logo?.url} />
                </Box>
            </Flex>
            <Flex alignItems="center" p="1" justifyContent="space-between" w="250" color="blue.400">
                {rooms}  <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
            </Flex>
            <Box marginTop="2">
                <Text fontWeight="bold" marginBottom="2" fontSize="lg">
                    {title}
                </Text>
                <Text textAlign="justify" lineHeight="2" color="gray.600">{description}</Text>
            </Box>
            <Flex flexWrap="wrap" justifyContent="space-between" textTransform="uppercase" marginTop="3">
                <Flex w="400px" borderBottom="1px" borderColor="gray.100" justifyContent="space-between" p="3">
                    <Text>Type</Text>
                    <Text fontWeight="bold">{type} </Text>
                </Flex>
                <Flex w="400px" borderBottom="1px" borderColor="gray.100" justifyContent="space-between" p="3">
                    <Text>Purpose</Text>
                    <Text fontWeight="bold">{purpose} </Text>
                </Flex>

                {furnishingStatus && (
                    <Flex w="400px" borderBottom="1px" borderColor="gray.100" justifyContent="space-between" p="3">
                        <Text>Furnishing Status</Text>
                        <Text fontWeight="bold">{furnishingStatus} </Text>
                    </Flex>
                )}
            </Flex>

            <Box>
                {amenities.length && <Text fontSize="2xl" fontWeight="black" marginTop="5">Amenities</Text>}
                <Flex flexWrap="wrap">
                    {amenities.map((item) => (
                        item.amenities.map((amenity) => (
                            <Text
                                fontWeight="bold"
                                color="navy"
                                fontsize="1"
                                p="2"
                                bg="gray.100"
                                margin="1"
                                borderRadius="10"
                                key={amenity.text}>
                                {amenity.text}
                            </Text>
                        ))
                    ))}
                </Flex>
            </Box>
        </Box>
    </Box>
);

export default PropertyDetails;

export async function getServerSideProps({ params: { id } }) {
    const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);

    return {
        props: {
            propertyDetails: data
        }
    }
}
