import { Formik, Form, Field } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";

import MenuList from "./menu-list";

interface IProps {
  onSubmit: (values) => void;
  closeModal: () => void;
}

const CreateForm: React.FC<IProps> = ({ onSubmit, closeModal }) => {
  return (
    <Formik
      initialValues={{
        token1: { name: "", imgSrc: "" },
        token2: { name: "", imgSrc: "" },
      }}
      onSubmit={(values, actions) => {
        onSubmit(values);
        closeModal();
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Form>
          <Field
            name="token1"
            validate={(value) => {
              let error;
              if (!value) {
                error = "token1 is required";
              }
              return error;
            }}
          >
            {({ field, form }) => (
              <FormControl
                margin="2"
                isInvalid={form.errors.name && form.touched.name}
              >
                <FormLabel htmlFor="token1">Token 1</FormLabel>
                <MenuList
                  id="token1"
                  field={field}
                  form={form}
                  formProps={props}
                />
                <FormErrorMessage>{form.errors.token1}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field
            name="token2"
            validate={(value) => {
              let error;
              if (!value) {
                error = "token2 is required";
              }
              return error;
            }}
          >
            {({ field, form }) => (
              <FormControl
                margin="2"
                isInvalid={form.errors.name && form.touched.name}
              >
                <FormLabel htmlFor="token2">Token 2</FormLabel>
                <MenuList
                  id="token2"
                  field={field}
                  form={form}
                  formProps={props}
                />
                <FormErrorMessage>{form.errors.token2}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateForm;
