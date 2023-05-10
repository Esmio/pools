import React, { memo, useCallback, useMemo } from "react";
import { Image, Text, Box, Tooltip, IconButton } from "@chakra-ui/react";
import { CheckCircleIcon, EditIcon } from "@chakra-ui/icons";
import { observer } from "mobx-react-lite";
import { Asset as RegistryAsset } from "@chain-registry/types";

import { AssetsStore } from "@/stores/Assets";

interface IAssetsCard {
  asset: RegistryAsset;
  assetsStore: AssetsStore;
}

const AssetsCard: React.FC<IAssetsCard> = observer(({ asset, assetsStore }) => {
  const isAdded = useMemo(() => {
    return !!assetsStore.assetsObj[asset.symbol];
  }, [asset.symbol, assetsStore.assetsObj]);

  const handleAssetClicked = useCallback(() => {
    isAdded
      ? assetsStore.removeAsset(asset.symbol)
      : assetsStore.addAsset(asset);
  }, [asset, assetsStore, isAdded]);

  return (
    <Box
      key={asset.symbol}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "4px",
        px: 4,
        py: 3,
        w: "300px",
        h: "74px",
        border: "1px solid",
        borderColor: isAdded ? "green" : "skyblue",
        position: "relative",
        cursor: "pointer",
      }}
      onClick={handleAssetClicked}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Image
          boxSize="2rem"
          borderRadius="full"
          src={asset.logo_URIs.svg || asset.logo_URIs.png}
          alt={asset.name}
        />
        <Tooltip label={asset.description}>
          <Text ml={2}>
            {asset.name}({asset.symbol})
          </Text>
        </Tooltip>
      </Box>

      <IconButton borderRadius={"full"} aria-label="edit icon">
        <EditIcon />
      </IconButton>
      {isAdded && (
        <CheckCircleIcon
          fontSize={18}
          color="green"
          sx={{ position: "absolute", right: "-5px", top: "-5px" }}
        />
      )}
    </Box>
  );
});

export default memo(AssetsCard);
