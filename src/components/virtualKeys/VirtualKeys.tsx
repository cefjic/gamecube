import React, { FC } from 'react';
import { ReactSVG } from 'react-svg';

import HotKey from '../../assets/icons/hotkey.svg';
import { Key, KeysInstructions } from './VirtualKeys.styles';

interface OwnProps {
  goToLeft(): void;
  goToRight(): void;
  goToUp(): void;
  goToDown(): void;
}

const VirtualKeys: FC<OwnProps> = ({
  goToDown,
  goToLeft,
  goToRight,
  goToUp,
}) => {
  return (
    <KeysInstructions>
      <Key />
      <Key onClick={goToUp}>
        <ReactSVG src={HotKey} />
      </Key>
      <Key />
      <Key rotate={270} onClick={goToLeft}>
        <ReactSVG src={HotKey} />
      </Key>
      <Key rotate={180} onClick={goToDown}>
        <ReactSVG src={HotKey} />
      </Key>
      <Key rotate={90} onClick={goToRight}>
        <ReactSVG src={HotKey} />
      </Key>
    </KeysInstructions>
  );
};

export default VirtualKeys;
