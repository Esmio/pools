import React, { useCallback, useMemo, useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Box,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { Asset } from "@chain-registry/types";
import { FieldProps, FormikProps, FormikValues } from "formik";

import { assetsStore } from "@/stores/Assets";

interface TokenListProps {
  id?: string;
  field: FieldProps;
  form: FormikValues;
  formProps: FormikProps<any>;
}

const TokenList: React.FC<TokenListProps> = observer(
  ({ id, field, form, formProps }) => {
    const assetsList = Object.values(assetsStore.assetsObj);
    const [selected, setSelected] = useState<Asset | undefined>(undefined);

    const otherTokenName = useMemo(() => {
      if (id === "token1") return form.values["token2"].name;
      if (id === "token2") return form.values["token1"].name;
      return "";
    }, [id, form.values]);

    const onSelect = useCallback(
      (value: Asset) => () => {
        setSelected(value);
        formProps.setFieldValue(id, {
          name: value.name,
          imgSrc: value.logo_URIs.svg || value.logo_URIs.png,
        });
      },
      [formProps]
    );

    const renderedList = useMemo(() => {
      return assetsList
        .filter((item) => item.name !== otherTokenName)
        .map((item) => (
          <MenuItem minH="48px" key={item.symbol} onClick={onSelect(item)}>
            <Image
              boxSize="2rem"
              borderRadius="full"
              src={item.logo_URIs["svg"] || item.logo_URIs["png"]}
              alt={item.name}
              mr="12px"
            />
            <span>{item.name}</span>
          </MenuItem>
        ));
    }, [otherTokenName, onSelect]);

    return (
      <Menu id={id}>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {selected && (
              <Image
                boxSize="2rem"
                borderRadius="full"
                src={selected.logo_URIs["svg"] || selected.logo_URIs["png"]}
                alt={selected.name}
                mr="12px"
              />
            )}
            {selected
              ? `${selected.name}(${selected.symbol})`
              : "Please Select an Asset"}
          </Box>
        </MenuButton>
        <MenuList maxHeight={400} overflow="auto">
          {renderedList}
        </MenuList>
      </Menu>
    );
  }
);

export default TokenList;
