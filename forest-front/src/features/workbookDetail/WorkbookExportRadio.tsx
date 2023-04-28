import { WorkbookExportRadioLabel } from "./WorkbookModal.style";

interface IProps {
  isDefault?: boolean;
  thisValue: string;
  text: string;
  img: any;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

function WorkbookExportRadio({ isDefault, thisValue, text, img, value, setValue }: IProps) {
  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <WorkbookExportRadioLabel isChecked={thisValue === value}>
      <input
        type="radio"
        name="export"
        value={thisValue}
        defaultChecked={isDefault}
        onChange={handleChange}
      />
      {img}
      {text}
    </WorkbookExportRadioLabel>
  );
}

export default WorkbookExportRadio;
