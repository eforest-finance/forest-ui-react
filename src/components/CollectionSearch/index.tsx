import { InputRef } from 'antd';
import Input, { InputProps } from 'components/Base/Input/index.tsx';

import { ReactComponent as ClockCircleOutlined } from 'assets/search-icon.svg';
import { ReactComponent as Clear } from 'assets/Clear.svg';
import { Ref, forwardRef } from 'react';

function CollectionSearch(params: InputProps & React.RefAttributes<InputRef>, ref: Ref<InputRef> | undefined) {
  return (
    <Input
      placeholder="Search a collection name"
      {...params}
      ref={ref}
      prefix={<ClockCircleOutlined />}
      allowClear={{ clearIcon: <Clear /> }}
    />
  );
}

export default forwardRef(CollectionSearch);
