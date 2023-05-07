import { useEffect } from "react";
import { WorkbookExportRadioLabel } from "./WorkbookModal.style";

interface IProps {
  isDefault?: boolean;
  isDeploy: boolean;
  thisValue: string;
  text: string;
  img: any;
  value: string;
  isOriginal: boolean;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

function WorkbookExportRadio({
  isDefault,
  isDeploy,
  thisValue,
  text,
  img,
  value,
  isOriginal,
  setValue,
}: IProps) {
  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    console.log(thisValue === "release", isDeploy);
  }, []);

  return (
    <WorkbookExportRadioLabel isChecked={thisValue === value} isDisabled={!isOriginal}>
      <input
        type="radio"
        name="export"
        value={thisValue}
        defaultChecked={isDefault}
        onChange={handleChange}
        disabled={!isOriginal || (thisValue === "release" && isDeploy)}
      />
      {img}
      {text}
    </WorkbookExportRadioLabel>
  );
}

export default WorkbookExportRadio;
