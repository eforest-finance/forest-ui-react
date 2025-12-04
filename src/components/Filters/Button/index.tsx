import { ReactComponent as CollapsedIcon } from 'assets/collapsed.svg';

import style from './style.css';

interface IFilterButtonProps {
  onClick: () => void;
  badge: number | string;
  showBadge?: boolean;
}

export function FilterButton({ onClick, badge, showBadge }: IFilterButtonProps) {
  return (
    <div className={style['filter-btn']} onClick={onClick}>
      <CollapsedIcon className="w-[24px] h-[24px]" />
      {showBadge ? (
        <span className=" absolute left-8 -top-2 px-1.5 bg-textPrimary text-textWhite text-xs font-medium rounded-3xl">
          {badge}
        </span>
      ) : null}
    </div>
  );
}
