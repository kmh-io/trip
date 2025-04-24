interface StationComboBoxProps {
  cityId: string;
  placeholder: string;
  defaultValue: string;
  onValueChange: (value: string) => void;
}

export default async function StationComboBox({
                                                cityId,
                                                ...props
                                              }: StationComboBoxProps) {
  // const stations = await getStations(cityId);
  console.log('cityId', cityId);
  // console.log('stations', stations);

  return <span />;

  // return <ComboBox placeholder={props.placeholder}
  //                  defaultValue={props.defaultValue} values={stations}
  //                  onValueChange={props.onValueChange} />;
}