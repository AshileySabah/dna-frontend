import React, { createContext, useContext, useMemo, useState } from "react";

import { AlertDialog } from "../components/AlertDialog";

interface IModalMessage {
  component?: React.ReactNode | JSX.Element | React.ReactElement;
  close?: boolean;
}
interface IModalOptions {
  message: IModalMessage;
  setOption?: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

interface IModalContextData {
  createModal(message: IModalOptions): void;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalContext = createContext<IModalContextData>({} as IModalContextData);

const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [modal, setModal] = useState<boolean>(false);
  const [options, setOptions] = useState<IModalOptions>({} as IModalOptions);

  const createModal = ({ message, setOption }: IModalOptions) => {
    if (setOption !== undefined) {
      setOption(undefined); // * refresh options
    }
    setOptions({ message, setOption }); // * register message
    setModal(true);
  };

  const modalProviderValue = useMemo(
    () => ({
      createModal,
      setModal,
    }),
    [modal, options],
  );

  return (
    <ModalContext.Provider value={modalProviderValue}>
      {children}
      {modal && options && (
        <AlertDialog
          openState={{ open: modal, setOpen: setModal }}
          setOption={options.setOption}
          component={options.message.component}
          close={options.message.close}
        />
      )}
    </ModalContext.Provider>
  );
};

const useModal = (): IModalContextData => useContext(ModalContext);

export { ModalProvider, useModal };
