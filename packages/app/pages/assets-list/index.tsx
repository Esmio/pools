import React, { useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { Box, Button } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { asset_list } from "@chain-registry/osmosis";

import AssetsCard from "@/components/assets-card";
import { assetsStore } from "@/stores/Assets";

const AssetsList = observer(() => {
  const router = useRouter();

  const AssetsCardList = useMemo(() => {
    return asset_list.assets.map((asset) => (
      <AssetsCard key={asset.base} asset={asset} assetsStore={assetsStore} />
    ));
  }, []);

  const goHome = useCallback(() => {
    router.push("/");
  }, []);

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Button onClick={goHome}>Active Pools</Button>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, p: 3 }}>
        {AssetsCardList}
      </Box>
    </>
  );
});

export default AssetsList;
