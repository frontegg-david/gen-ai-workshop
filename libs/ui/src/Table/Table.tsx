import { FC, PropsWithChildren, ReactNode } from 'react';
import MuiTable from '@mui/joy/Table';


interface TableColumn {
  name: string;
  label: string;
  width?: string;
}

export interface TableProps<T = any> {
  columns: TableColumn[];
  data: T[];
  children: (row: T, index: number) => ReactNode;
}

export const Table: FC<TableProps> = (props) => {


  return <MuiTable sx={{
    '--TableCell-headBackground': 'rgb(244, 246, 248)',
    '--unstable_TableCell-height': '54px',
    '--Table-headerUnderlineThickness': '0',
    '--TableCell-borderColor': 'rgb(241, 243, 244)',
    '--TableCell-paddingX': '24px',

  }}>
    <thead>
    <tr>
      {props.columns.map((column) => {
        return <th style={{ verticalAlign: 'middle', width: column.width }} key={column.name}>{column.label}</th>
      })}
    </tr>
    </thead>
    <tbody>
    {props.data.map(props.children)}
    </tbody>
  </MuiTable>
}
