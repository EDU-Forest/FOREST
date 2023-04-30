import { WorkbookSettingRadioBox, WorkbookSettingRadioLabel } from "./WorkbookModal.style";

interface IProps {
  types: { value: string; text: string }[];
  setType: React.Dispatch<React.SetStateAction<string>>;
}

function WorkbookSettingModalTypeSelect({ types, setType }: IProps) {
  const handleChangeType = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setType(e.target.value);
  };

  return (
    <div>
      <p>출제 유형</p>
      <WorkbookSettingRadioBox>
        {types.map((item, i) => (
          <label key={i}>
            <input
              defaultChecked={i === 0 && true}
              type="radio"
              name="type"
              value={item.value}
              onChange={handleChangeType}
            />
            {item.text}
          </label>
        ))}
      </WorkbookSettingRadioBox>
    </div>
  );
}

export default WorkbookSettingModalTypeSelect;
