import WorkbookExportRadio from "./WorkbookExportRadio";
import { WorkbookExportRadioBox } from "./WorkbookModal.style";

interface exportType {
  value: string;
  text: string;
  img: React.ReactElement<SetConstructor>;
}
interface IProps {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  exports: exportType[];
}

function WorkbookExportRadioGroup({ setValue, exports }: IProps) {
  return (
    <WorkbookExportRadioBox>
      {exports.map((item, i) => (
        <WorkbookExportRadio
          key={i}
          value={item.value}
          text={item.text}
          img={item.img}
          setValue={setValue}
          isDefault={i === 0} // 첫번째 버튼을 디폴트로
        />
      ))}
    </WorkbookExportRadioBox>
  );
}

export default WorkbookExportRadioGroup;
