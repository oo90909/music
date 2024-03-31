"use client";

import React from "react";
import { env } from "~/env.mjs";
import { BigNumber } from "ethers";
import abi from "~/config/abi.json";
import { useAccount, useContractRead } from "wagmi";

type GetUserDescribeAlbumListResult = {
  album: `0x${string}` | null;
  price: BigNumber | null;
  singer: `0x${string}` | null;
};

type GetUserDescribeAlbumListValue = {
  input: string;
};

type GetUserDescribeAlbumListProps = {
  address: `0x${string}` | undefined;
  getUserDescribeAlbumList: GetUserDescribeAlbumListResult[];
  getGetUserDescribeAlbumListLoading: boolean;
  getGetUserDescribeAlbumListError: boolean;
};

export const useGetUserDescribeAlbumList = ({
  input,
}: GetUserDescribeAlbumListValue): GetUserDescribeAlbumListProps => {
  const { address } = useAccount();

  const [state, setState] = React.useState<GetUserDescribeAlbumListProps>({
    address: undefined,
    getUserDescribeAlbumList: [],
    getGetUserDescribeAlbumListLoading: true,
    getGetUserDescribeAlbumListError: false,
  });

  const {
    data: getUserDescribeAlbumList,
    isLoading: getGetUserDescribeAlbumListLoading,
    isError: getGetUserDescribeAlbumListError,
  } = useContractRead({
    address: env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    chainId: parseInt(env.NEXT_PUBLIC_CHAIN_ID ?? "5"),
    abi,
    functionName: "getUserDescribeAlbumList",
    args: [input],
  }) as {
    data: GetUserDescribeAlbumListResult[];
    isLoading: boolean;
    isError: boolean;
  };

  React.useEffect(() => {
    setState({
      address,
      getUserDescribeAlbumList,
      getGetUserDescribeAlbumListLoading,
      getGetUserDescribeAlbumListError,
    });
  }, [
    address,
    getUserDescribeAlbumList,
    getGetUserDescribeAlbumListLoading,
    getGetUserDescribeAlbumListError,
  ]);

  return state;
};
