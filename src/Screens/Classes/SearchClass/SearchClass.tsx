import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LoadingButton from "@mui/lab/LoadingButton";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import MobileTimePicker from "@mui/lab/MobileTimePicker";
import { Box, FormControl, InputLabel, MenuItem, Select, Chip } from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { ClassTypeService } from "../../../Services/ClassTypeService";
import { ClassType } from "../../../types/types";

type Props = {
  chosenDate: Date;
  startTime: Date;
  endTime: Date;
  chosenClassTypeId: number;
  handleSearchClasses: (startDate: Date, endDate: Date) => void;
  setChosenClassTypeId: (classId: number) => void;
  setStartTime: (startTime: Date) => void;
  setEndTime: (endTime: Date) => void;
  setChosenDate: (chosenDate: Date) => void;
};

export const ResponsiveDatePickers = (props: Props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [classTypes, setClassTypes] = React.useState < ClassType[] > ([]);

  React.useEffect(() => {
    const fetch = async () => {
      const fetchedClassTypes = await ClassTypeService.getAll();
      setClassTypes(fetchedClassTypes);
    };

    fetch();
  }, []);
  const onSearch = () => {
    setIsLoading((currentState: boolean) => !currentState);
    const startDate = new Date(props.chosenDate.valueOf());
    const endDate = new Date(props.chosenDate.valueOf());

    startDate.setHours(props.startTime.getHours());
    startDate.setMinutes(props.startTime.getHours());
    startDate.setSeconds(props.startTime.getHours());

    endDate.setHours(props.endTime.getHours());
    endDate.setMinutes(props.endTime.getHours());
    endDate.setSeconds(props.endTime.getHours());

    props.handleSearchClasses(startDate, endDate);
  };

  return (
    <Box style={{ margin: "3%" }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3} alignItems="center">
          <Typography variant="h6" component="div">
            יום האירוע
          </Typography>
          <MobileDatePicker
            label="יום אירוע"
            minDate={new Date()}
            value={props.chosenDate}
            onChange={(newDate) => {
              props.setChosenDate(newDate!);
            }}
            renderInput={(params) => <TextField {...params} />}
            inputFormat={"dd/MM/yyyy"}
          />
          <Typography variant="h6" component="div">
            שעת התחלה
          </Typography>
          <MobileTimePicker
            label="שעת התחלה"
            value={props.startTime}
            onChange={(newTime) => {
              props.setStartTime(newTime!);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <Typography variant="h6" component="div">
            שעת סיום
          </Typography>
          <MobileTimePicker
            label="שעת סיום"
            minTime={props.startTime}
            value={props.endTime}
            onChange={(newTime) => props.setEndTime(newTime!)}
            renderInput={(params) => <TextField {...params} />}
          />
          <Typography variant="h6" component="div">
            סוג כיתה
          </Typography>
          <Stack
            direction={"row"}
            spacing={3}
          >
            {classTypes.map((classType) => (
              <Chip
                id={classType.id.toString()}
                label={classType.name}
                color={"primary"}
                variant={"outlined"}
                onClick={() => props.setChosenClassTypeId(classType.id)}
              />
            ))}
          </Stack>
          <LoadingButton
            onClick={onSearch}
            loading={isLoading}
            sx={{
              width: "60%",
            }}
            variant="contained"
            fullWidth
          >
            חפש
          </LoadingButton>
        </Stack>
      </LocalizationProvider >
    </Box >
  );
};
