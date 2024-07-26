import { message } from 'antd';
import { getExploreLink } from './unit';
import { shortenString } from './aelf';

export function messageHTML(
  txId: string,
  type: 'success' | 'error' | 'warning' = 'success',
  chainName?: Chain,
  moreMessage = '',
) {
  const isMobile = true;
  const aProps = isMobile ? {} : { target: '_blank', rel: 'noreferrer' };
  const explorerHref = chainName && getExploreLink(txId, 'transaction', chainName);
  const txIdHTML = (
    <span>
      <span>
        Transaction ID: &nbsp;
        <a href={explorerHref} className="break-all" {...aProps}>
          {shortenString(txId || '', 8)}
        </a>
      </span>
      <br />
      {moreMessage && <span>{moreMessage.replace('AElf.Sdk.CSharp.AssertionException:', '')}</span>}
    </span>
  );
  message[type](txIdHTML, 10);
}
