import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select, { SingleValue } from "react-select";
import {
  restartSabaPlusStore,
  updateVendorOption,
} from "../store/slices/sabaPlusSlice";
import { Provider, ProviderGameTypes } from "../constant/Provider";

type Option = {
  value: Provider;
  label: string;
};

const options = Object.values(Provider).map((provider) => ({
  value: provider,
  label: provider.toString(),
}));

type Props = {
  headerText: string;
};

const SabaPlusGroupVendorOption = ({ headerText }: Props) => {
  const dispatch = useDispatch();
  const vendor = useSelector((state) => state.sabaPlus.vendorOptions);

  const handleChange = (selected: SingleValue<Option> | null) => {
    dispatch(
      updateVendorOption({
        name: selected.label,
        gameTypes: ProviderGameTypes[selected.value],
      })
    );
    dispatch(
      restartSabaPlusStore({
        vendorOptions: {
          name: selected.label,
          gameTypes: ProviderGameTypes[selected.value],
        },
      })
    );
  };

  return (
    <div className="button-group">
      <h4 className="header-text">{headerText}</h4>
      <div className="options">
        <Select
          value={options.find((item) => item.value == vendor.name)}
          defaultValue={options.find((item) => item.value == vendor.name)}
          options={options}
          onChange={handleChange}
        ></Select>
      </div>
    </div>
  );
};

export default SabaPlusGroupVendorOption;
