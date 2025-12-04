import CheckBoxGroups from '../CheckBoxGroups';
import RangeSelect from '../RangeSelect';
import SearchBoxGroups from '../SearchCheckBoxGroups';
// import { FilterType, FilterKeyEnum, SymbolTypeEnum, CollectionsStatus } from '../../constant';
import { CheckboxChoiceProps, FilterType, RangeSelectProps } from 'constants/collection.ts';

export const getComponentByType = (type: FilterType) => {
  const map: {
    [FilterType.Checkbox]: React.FC<CheckboxChoiceProps>;
    [FilterType.Range]: React.FC<RangeSelectProps>;
    [FilterType.SearchCheckbox]: React.FC<CheckboxChoiceProps>;
  } = {
    [FilterType.Checkbox]: CheckBoxGroups,
    [FilterType.Range]: RangeSelect,
    [FilterType.SearchCheckbox]: SearchBoxGroups,
  };

  const cmp = map[type] as any;
  return cmp;
};
