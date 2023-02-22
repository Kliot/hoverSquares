import React, { useState, useEffect } from "react";
import { ISquares } from "../types/types";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "styled-components";
import { InputLabel } from "@mui/material";
import Button from "@mui/material/Button";

const StyledSquares = styled.div<{ width: number }>`
  .select {
    max-width: 250px;
    margin: 20px;
  }

  .view {
    display: flex;
    justify-content: space-evenly;

    ul {
      list-style: none;
      li {
        max-width: 100px;
        padding: 5px;
        margin: 0 auto;
        background-color: ${({ theme }): string => theme.bcWhite};
        &:hover,
        &.active-cell {
          background-color: ${({ theme }): string => theme.bcBlue};
        }
      }
    }
  }

  .table {
    display: grid;
    grid-template-columns: ${(props) =>
      `repeat(${props.width}, minmax(0, 1fr))`};

    .cell {
      width: 20px;
      height: 20px;
      border: 1px solid;
      background-color: ${({ theme }): string => theme.bcWhite};

      &.active,
      &:hover {
        background-color: ${({ theme }): string => theme.bcBlue};
      }

      &.active:hover {
        background-color: ${({ theme }): string => theme.bcWhite};
      }
    }
  }
`;

interface IProps {
  fetchedData: ISquares[];
}

const Squares: React.FC<IProps> = ({ fetchedData }) => {
  const [table, setTable] = useState({
    row: 0,
    cell: 0,
    tableLength: 0,
  });

  const [toggleState, setToggleState] = useState(0);

  const [randomCell, setRandomCell] = useState<number[]>([]);

  const [mode, setMode] = useState<ISquares>({
    field: 0,
    name: "",
  });

  useEffect(() => {
    setTable({
      row: mode.field,
      cell: mode.field,
      tableLength: mode.field * mode.field,
    });
  }, [mode]);

  const toggleTab = (index: number) => {
    setToggleState(index);
  };

  const getActiveClass = (index: number, className: string) =>
    toggleState === index ? className : "";

  const changeMode = (event: any) => {
    setMode({
      ...mode,
      field: event.target.value,
    });
    setRandomCell([]);
  };

  const getRow = (number: number) => {
    return Math.ceil(number / table.cell);
  };

  const getCell = (number: number) => {
    return number - (getRow(number) - 1) * table.cell;
  };

  const getRandomCell = (e: any) => {
    const array = Array.from({ length: table.tableLength }, (v, i) => i + 1)
      .sort((a, b) => 0.5 - Math.random())
      .slice(0, 5);
    setRandomCell(array);
  };

  return (
    <>
      <StyledSquares width={mode.field}>
        <FormControl fullWidth className="select">
          <InputLabel>Pick Mode</InputLabel>
          <Select value={mode.field} onChange={changeMode}>
            {fetchedData &&
              fetchedData.map((item) => (
                <MenuItem key={item.field} value={item.field}>
                  {item.name}
                </MenuItem>
              ))}
          </Select>
          <Button onClick={getRandomCell} disabled={Boolean(!mode.field)}>
            Get Random 5 cells
          </Button>
        </FormControl>
        <div className="view">
          <div>
            <div className="table">
              {Array.from({ length: table.tableLength }).map((_, index) => (
                <div
                  key={index + 1}
                  className={`cell ${
                    randomCell.includes(index + 1) ? "active" : ""
                  }`}
                  onMouseEnter={() => toggleTab(index + 1)}
                  onMouseLeave={() => toggleTab(0)}
                ></div>
              ))}
            </div>
          </div>
          <div className="squares">
            <h1>Hover squares</h1>
            <ul>
              {randomCell.map((item, index) => (
                <li key={item} className="cell">
                  row {getRow(item)} col {getCell(item)}
                </li>
              ))}
              {!!toggleState && !randomCell.includes(toggleState) && (
                <li
                  className={`cell ${getActiveClass(
                    toggleState,
                    "active-cell"
                  )}`}
                >
                  row {getRow(toggleState)} col {getCell(toggleState)}
                </li>
              )}
            </ul>
          </div>
        </div>
      </StyledSquares>
    </>
  );
};

export default Squares;
