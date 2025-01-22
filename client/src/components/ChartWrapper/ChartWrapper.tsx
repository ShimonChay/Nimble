import { FC, memo, useMemo, useState } from "react";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import GenericChart from "../../components/GenericChart/GenericChart";
import {
  ChartConfig,
  ChartTypes,
  FilterType,
} from "../../components/GenericChart/GenericChart.interfaces";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./ChartWrapper.style.css";
import { Moment } from "moment";

interface ChartWrapperProps {
  config: ChartConfig;
  onChartTypeChange: (id: string, newChartType: ChartTypes) => void;
  onFilterChange: (filters: Record<string, any>) => void;
}

const ChartWrapper: FC<ChartWrapperProps> = memo(
  ({ config, onChartTypeChange, onFilterChange }) => {
    const { id, title, supportedTypes, chartType, data, filterType } = config;
    const [beginDate, setBeginDate] = useState<Moment | null>(null);
    const [endDate, setEndDate] = useState<Moment | null>(null);
    const [selectedItems, setSelectedItems] = useState<string[]>(
      data.map((item) => item.name)
    );

    const handleCheckboxChange = (itemName: string) => {
      setSelectedItems((prevSelected) =>
        prevSelected.includes(itemName)
          ? prevSelected.filter((item) => item !== itemName)
          : [...prevSelected, itemName]
      );
    };

    const applyFilters = () => {
      onFilterChange({ beginDate, endDate });
    };

    const filteredData = useMemo(() => {
      return filterType !== FilterType.CHECKBOX
        ? data
        : data.filter((item) => selectedItems.includes(item.name));
    }, [chartType, data, selectedItems]);

    return (
      <div className="chart-container">
        <div className="chartFilters ">
          {filterType === FilterType.CHECKBOX ? (
            <div className="pieCheckbox">
              {data.map((item, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      color="secondary"
                      checked={selectedItems.includes(item.name)}
                      onChange={() => handleCheckboxChange(item.name)}
                    />
                  }
                  label={item.name}
                />
              ))}
            </div>
          ) : (
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <div className="filters">
                <DatePicker
                  className="datePicker"
                  onChange={(date) => setBeginDate(date)}
                  label="Begin Date"
                />
                <DatePicker
                  onChange={(date) => setEndDate(date)}
                  label="End Date"
                  className="datePicker"
                />
                <Button
                  className="datePickerButton"
                  onClick={() => {
                    applyFilters();
                  }}
                  variant="contained"
                  color="info"
                >
                  Apply Filters
                </Button>
              </div>
            </LocalizationProvider>
          )}
        </div>
        <div className="chart-controls">
          {supportedTypes.map((type) => (
            <Button
              key={`${id}-${type}`}
              style={{ textTransform: "none" }}
              color="primary"
              variant={chartType === type ? "contained" : "outlined"}
              onClick={() => onChartTypeChange(id, type)}
            >
              {type}
            </Button>
          ))}
        </div>
        <GenericChart
          chartTitle={title}
          chartType={chartType}
          chartData={filteredData}
        />
      </div>
    );
  }
);

export default ChartWrapper;
