import { Select } from "antd";
import { isEmpty } from "lodash";
import { CSSProperties } from "react";

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

type OptionType = {
  label: string;
  value: any;
  disabled?: boolean;
};

export default function OneSelectItem({
  options,
  placeholder,
  style,
  className,
  rootClassName,
  popupClassName,
  handleChange,
  selected,
}: {
  options: OptionType[];
  placeholder?: string | React.ReactNode;
  style?: CSSProperties | undefined;
  className?: string;
  rootClassName?: string;
  popupClassName?: string;
  handleChange: any;
  selected?: any;
}) {
  return (
    <Select
      placeholder={placeholder}
      className={className ?? undefined}
      rootClassName={rootClassName ?? undefined}
      popupClassName={popupClassName ?? undefined}
      style={style ?? undefined}
      onChange={handleChange}
      options={options}
      value={selected}
      loading={isEmpty(options)}
      allowClear
    />
  );
}
