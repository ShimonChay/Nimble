import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { FC, Fragment, useEffect, useState } from "react";
import SupplierService from "../../services/SupplierService";
import InvoiceService from "../../services/InvoiceService";
import { dateToFormattedMonth } from "../../utils/utils";
import GenericChart from "../../components/GenericChart/GenericChart";
import {
  ChartData,
  ChartSize,
  ChartTypes,
} from "../../components/GenericChart/GenericChart.interfaces";
import { Invoice, Supplier } from "./SupplierDetails.interfaces";
import SearchBar from "../../components/SearchBar/SearchBar";
import { ChartRecord } from "../../components/HorizontalChart/HorizontalChart.interfaces";
import HorizontalBarChart from "../../components/HorizontalChart/HorizontalChart";

const Row = ({ row }: { row: Supplier }) => {
  const [open, setOpen] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    if (open) {
      loadInvoicesData();
    }
  }, [open]);

  const loadInvoicesData = async () => {
    const data = await InvoiceService.getInvoicesBySupplier(
      row.supplier_internal_id
    );
    setInvoices(data);
  };

  const buildChartData = () => {
    const invoicesByMonth = invoices.reduce((acc: any, invoice: Invoice) => {
      const month = dateToFormattedMonth(invoice.date);
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month]++;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(invoicesByMonth).map(([label, value]) => ({
      label,
      value,
    })) as ChartRecord[];
  };

  const getChartData = () => {
    const invo = invoices.reduce((acc: any, invoice: Invoice) => {
      const status = invoice.status;
      if (!acc[status]) {
        acc[status] = 0;
      }
      acc[status]++;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(invo).map(([name, value]) => ({
      name,
      value,
    })) as ChartData[];
  };

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.supplier_company_name}
        </TableCell>
        <TableCell>{`${row.supplier_city} - ${row.supplier_address}`}</TableCell>
        <TableCell>{row.supplier_email}</TableCell>
        <TableCell>{row.supplier_phone}</TableCell>
        <TableCell>{row.supplier_status}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {invoices.length > 0 ? (
              <Box sx={{ margin: 1 }}>
                <div style={{ display: "flex" }}>
                  <HorizontalBarChart
                    chartData={buildChartData()}
                  ></HorizontalBarChart>
                  {invoices.length > 1 && (
                    <GenericChart
                      chartType={ChartTypes.PIE}
                      chartData={getChartData()}
                      size={ChartSize.SMALL}
                    ></GenericChart>
                  )}
                </div>
              </Box>
            ) : (
              <div>No data found</div>
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

const SupplierDetails: FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getSuppliersData(searchInput);
  }, [searchInput]);

  const getSuppliersData = async (searchInput: string) => {
    try {
      const suppliersDetails = await SupplierService.getSuppliersData(
        searchInput
      );
      setSuppliers(suppliersDetails);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  return (
    <>
      <SearchBar
        updateData={(input) => {
          setSearchInput(input);
        }}
        delay={500}
      ></SearchBar>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Supplier</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone number</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers.map((supplier) => (
              <Row key={supplier.supplier_internal_id} row={supplier} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default SupplierDetails;
