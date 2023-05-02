import { Button, Input, Layout } from "shared";
import styles from "./styles.module.scss";
import { useFormik } from "formik";
import { NumericFormat } from "react-number-format";
import { InputHTMLAttributes, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import { search, selectSearchParams } from "features";
import moment from "moment";

console.log(moment().format("YYYY-MM-DD"));

function DaysInput({
  ...props
}: InputHTMLAttributes<HTMLInputElement>): React.ReactElement {
  return (
    <Input label='Количество дней' id='days' variant='regular' {...props} />
  );
}

type FormValues = {
  location: string;
  date: string;
  days: number;
};

function Search() {
  const dispatch = useAppDispatch();
  const stateSearchParams = useAppSelector(selectSearchParams);

  function searchOnSubmit(values: FormValues) {
    const checkOut = moment(values.date)
      .add(values.days, "day")
      .format("YYYY-MM-DD");

    dispatch(
      search({
        location: values.location,
        checkIn: values.date,
        checkOut: checkOut,
        days: values.days,
      })
    );
  }

  const formik = useFormik({
    initialValues: {
      location: stateSearchParams.location,
      date: stateSearchParams.checkIn,
      days: stateSearchParams.days,
    } as FormValues,
    onSubmit: (values) => {
      searchOnSubmit(values);
    },
  });

  useEffect(() => {
    formik.submitForm();
  }, []);

  return (
    <div className={styles.search}>
      <Layout>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <Input
            label='Локация'
            value={formik.values.location}
            onChange={formik.handleChange}
            id='location'
            name='location'
            type='text'
            variant='regular'
          />
          <Input
            label='Дата заселения'
            value={formik.values.date}
            onChange={formik.handleChange}
            id='date'
            name='date'
            type='date'
            min={moment().format("YYYY-MM-DD")}
            max={moment().add(10, "year").format("YYYY-MM-DD")}
            variant='regular'
          />
          <NumericFormat
            customInput={DaysInput}
            value={formik.values.days}
            allowNegative={false}
            allowLeadingZeros={false}
            onValueChange={(values) => {
              const { formattedValue } = values;
              formik.setFieldValue("days", formattedValue);
            }}
          />
          <Button type='submit' style={{ marginTop: 8 }}>
            Найти
          </Button>
        </form>
      </Layout>
    </div>
  );
}

export default Search;
