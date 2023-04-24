interface PropsType {
  classTitle: string;
}

function ClassLabel(props: PropsType) {
  const { classTitle } = props;

  return (
    <div>
      <span>{classTitle}</span>
    </div>
  );
}

export default ClassLabel;
