import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ISquares } from "../types/types";
import Squares from "./Squares";

const ENDPOINT = "https://demo7919674.mockable.io/";

const StyledSquaresWrapper = styled.div`
  max-width: 1200px;
  padding: 20px;
  margin: 0 auto;
`;

const SquaresWrapper: React.FC = () => {
  const [fetchedData, setFetchedData] = useState<ISquares[]>();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${ENDPOINT}`);
      const data = await response.json();
      setFetchedData(data);
    }
    fetchData();
  }, []);

  if (!fetchedData) {
    return null;
  }

  return (
    <StyledSquaresWrapper>
      <Squares fetchedData={fetchedData}></Squares>
    </StyledSquaresWrapper>
  );
};

export default SquaresWrapper;
