import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useAccount, useChainId } from 'wagmi';
import Web3 from 'web3';
import { Contract, ContractRunner, ethers } from 'ethers';

import TokenFactoryAbi from '@/abis/TokenFactoryAbi.json';
import { Web3ContextType } from '@/types';
import { useEthersProvider, useEthersSigner } from '@/lib/utils';

declare let window: any;

const Web3Context = createContext<Web3ContextType | null>(null);

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const signer = useEthersSigner();
  const ethersProvider = useEthersProvider();
  const defaultProvider = new ethers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_DEFAULTRPC
  );
  const web3 = new Web3(window?.ethereum);

  const [provider, setProvider] = useState<ContractRunner>(defaultProvider);
  const [tokenFactoryContract, setTokenFactoryContract] =
    useState<Contract>({} as Contract);

  const init = useCallback(async () => {
    try {
      if (!isConnected || !ethersProvider) {
        console.log('Not connected wallet');
      } else {
        setProvider(ethersProvider);
        console.log('Connected wallet');
      }

      const _tokenFactoryeWeb3: any = new web3.eth.Contract(
        TokenFactoryAbi,
        process.env.NEXT_PUBLIC_TOKENFACTORY_CONTRACT_ADDRESS
      );

      setTokenFactoryContract(_tokenFactoryeWeb3);
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, ethersProvider, provider]);

  useEffect(() => {
    init();
  }, [init]);

  const value = useMemo(
    () => ({
      account: address,
      chainId,
      isConnected,
      library: provider ?? signer,
      tokenFactoryContract,
    }),
    [
      address,
      chainId,
      isConnected,
      provider,
      signer,
      tokenFactoryContract,
    ]
  );

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export default Web3Context;
