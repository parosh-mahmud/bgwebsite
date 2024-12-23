import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Collapse
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

type LottoResult = {
  drawName: string;
  date: string;
  winningNumbers: number[];
  bonusNumber: number;
  jackpot: string;
  topPrize?: string;
};

type PrizeData = {
  match: string;
  winners: number;
  prize: string;
};

type ResultsProps = {
  lottoResults: LottoResult[];
  prizeData: PrizeData[];
};

const Results: React.FC<ResultsProps> = ({ lottoResults, prizeData }) => {
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const handleToggle = (id: string) => {
    setOpen(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-4">
      {lottoResults.map((result, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{result.drawName} - {result.date}</h3>
          <div className="flex justify-between items-center bg-white p-4 shadow rounded-lg">
            <div className="flex space-x-3">
              {result.winningNumbers.map((num, idx) => (
                <span key={idx} className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center">{num}</span>
              ))}
              <span className="bg-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center">{result.bonusNumber}</span>
            </div>
            <div>
              <p className="text-lg font-bold">Jackpot: {result.jackpot}</p>
              {result.topPrize && <p className="text-sm">Top prize: {result.topPrize}</p>}
            </div>
            <IconButton onClick={() => handleToggle(`details-${index}`)} size="small">
              {open[`details-${index}`] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </div>
          <Collapse in={open[`details-${index}`]} timeout="auto" unmountOnExit>
            <TableContainer component={Paper} className="mt-4">
              <Table aria-label="prize breakdown">
                <TableHead>
                  <TableRow>
                    <TableCell>Match</TableCell>
                    <TableCell align="right">Winners</TableCell>
                    <TableCell align="right">Prize</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {prizeData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">{row.match}</TableCell>
                      <TableCell align="right">{row.winners}</TableCell>
                      <TableCell align="right">{row.prize}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Collapse>
        </div>
      ))}
    </div>
  );
};

export default Results;
