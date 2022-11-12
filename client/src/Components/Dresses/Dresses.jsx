import {
  Box,
  Spacer,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  FormControl,
  Input,
  Button,
  Center,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DressesInfo from "./DressesInfo";
import { getDressesProducts } from "../../Redux/Product/action";
import Filter from "./Filter";
import SearchBar from "../SearchBar";

const Dresses = () => {
  const params = useParams();
  // console.log(params)

  const [shoes, setShoes] = useState([]);

  const productsData = useSelector(
    (state) => state?.ProductReducer?.filteredItems
  );
  // console.log(productsData);

  const dispatch = useDispatch();

  // getting data
  useEffect(() => {
    dispatch(getDressesProducts());
  }, []);

  // const [list, setList] = useState(productsData);
  // const [resultsFound, setResultsFound] = useState(true);
  // const [searchInput, setSearchInput] = useState("");

  //Apply search functionality
  // const applyFilters = () => {
  //   let updatedList = productsData;

  //   if (searchInput) {
  //     console.log(searchInput);
  //     updatedList = updatedList.filter(
  //       (item) =>
  //         item.name.toLowerCase().search(searchInput.toLowerCase().trim()) !==
  //         -1
  //     );
  //   }
  //   setList(updatedList);
  //   !updatedList ? setResultsFound(false) : setResultsFound(true);
  // };

  // useEffect(() => {
  //   applyFilters();
  // }, [searchInput]);

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentpages = productsData?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const pageCount = Math.ceil(productsData?.length / productsPerPage);

  let pageNumberArray = [];
  for (let i = 0; i < pageCount; i++) {
    pageNumberArray[i] = (
      <Box className={currentPage == i + 1 ? "page-item active" : "page-item"}>
        <Button className="page-link" onClick={() => setCurrentPage(i + 1)}>
          {i + 1}
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Center>
        <Flex marginBottom={5} mt={4} justifyContent="center" gap={4}>
          <Box
            className={currentPage == 1 ? "page-item disabled" : "page-item "}
          >
            <Button
              onClick={() => setCurrentPage(currentPage - 1)}
              backgroundColor="teal.200"
              disabled={currentPage == 1}
            >
              Prev
            </Button>
          </Box>

          <Text gap={2} display="flex">
            {pageNumberArray.map((li) => li)}
          </Text>
          <Box
            className={
              currentPage == pageCount ? "page-item disabled" : "page-item "
            }
          >
            <Button
              onClick={() => setCurrentPage(currentPage + 1)}
              backgroundColor="teal.200"
              disabled={currentPage == pageCount}
            >
              Next
            </Button>
          </Box>
        </Flex>
      </Center>
      <Flex spacing="20px" marginBottom={4} width="90%" marginLeft={37}>
        <Box direction={["column", "row"]}>
          <Heading as="h4" size="md">
            Womens's Dresses
          </Heading>
        </Box>
        <Spacer />
        {/* <Box direction={["column", "row"]}>
          <Text>{productsData?.length} Products</Text>
        </Box> */}

        {/* <Box direction={["column", "row"]}>
          <SearchBar
            value={searchInput}
            changeInput={(e) => setSearchInput(e.target.value)}
          />
        </Box> */}

        <Spacer />
        <Box direction={["column", "row"]}>
          <Filter></Filter>
        </Box>
      </Flex>

      <SimpleGrid columns={[1, 1, 2, 3]} gap={5}>
        {
          currentpages?.map((item) => {
            // console.log(item);
            return (
              <DressesInfo
                key={item.id}
                item={item}
                // location={products}
              />
            );
          })}
      </SimpleGrid>
    </Box>
  );
};

export default Dresses;
