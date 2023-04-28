import { WorkbookExportRadioLabel } from "./WorkbookModal.style";

interface IProps {
  isDefault?: boolean;
  value: string;
  text: string;
  img: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
}

function WorkbookExportRadio({ isDefault, value, text, img, setValue }: IProps) {
  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <WorkbookExportRadioLabel>
      <input
        type="radio"
        name="export"
        value={value}
        defaultChecked={isDefault}
        onChange={handleChange}
      />
      {img}
      {text}
    </WorkbookExportRadioLabel>
  );
}

export default WorkbookExportRadio;
