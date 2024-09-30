import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Select, { SingleValue } from "react-select";
import {
  restartSabaPlusStore,
  updateVendorOption,
} from "../store/slices/sabaPlusSlice";
import {  Provider, ProviderGameTypes } from "../constant/Provider";

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

  const gameOptions = Object.values(ProviderGameTypes[vendor.name]).map((gameType) => ({
    value: gameType,
    label: gameType.toString(),
  }));

  const handleProviderChange = (selected: SingleValue<Option> | null) => {
    dispatch(
      updateVendorOption({
        name: selected.label,
        gameType: ProviderGameTypes[selected.value][0],
      })
    );
    dispatch(
      restartSabaPlusStore({
        vendorOptions: {
          name: selected.label,
          gameType: ProviderGameTypes[selected.value][0],
        },
      })
    );
  };

  const handleGameTypeChange = (selected: SingleValue<Option> | null) => {
    dispatch(
      updateVendorOption({
        ...vendor,
        gameType: selected.value,
      })
    );
    dispatch(
      restartSabaPlusStore({
        vendorOptions: {
          ...vendor,
          gameType: selected.value,
        },
      })
    );
  };

  return (
    <div className="button-group">
      <h4 className="header-text">{headerText}</h4>
      <div className="options">
        <label>Game Provider:</label>
        <Select
          value={options.find((item) => item.value == vendor.name)}
          defaultValue={options.find((item) => item.value == vendor.name)}
          options={options}
          onChange={handleProviderChange}
        ></Select>
        <div className="gap"/>
        <label>Game Type:</label>
        <Select
          value={gameOptions.find((item) => item.value == vendor.gameType)}
          defaultValue={gameOptions.find((item) => item.value == vendor.gameType)}
          options={gameOptions}
          onChange={handleGameTypeChange}
        ></Select>
      </div>
    </div>
  );
};

export default SabaPlusGroupVendorOption;
