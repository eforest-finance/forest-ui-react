import { Tabs, TabsProps } from 'antd';
import './ExploreTab.css';
import styles from './ExploreTab.css';

function ExploreTab(tabProps: TabsProps) {
  return <Tabs {...tabProps} className={styles['custom__tabs']} />;
}

export default ExploreTab;
