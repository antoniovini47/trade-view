import React from "react";

import { Image, ScrollView, View } from "react-native";

import { ThemedTouchableOpacity } from "@/components/ThemedTouchableOpacity";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { styles } from "./styles";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CoinTradeStats from "@/components/CoinTradeStats";
import { allCoinsDB, yourFollowedCoins } from "@/constants/Coins";

export default function HomeScreen() {
  const [followedCoins, setFollowedCoins] = React.useState(yourFollowedCoins);
  const [typedSearch, setTypedSearch] = React.useState("");

  function handleRemoveCoin(coin: string) {
    setFollowedCoins(followedCoins.filter((c) => c !== coin));
    console.log(`Followed coins: ${followedCoins}`);
  }

  function handleAddSearch(coinCode: string) {
    if (followedCoins.includes(coinCode)) {
      console.log("Coin already followed");
      return;
    }
    setFollowedCoins([...followedCoins, coinCode]);
    setTypedSearch("");
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome, Tom!</ThemedText>
        <HelloWave />
      </ThemedView>

      <View style={styles.searchViewContainer}>
        <ThemedTextInput
          onChange={(e) => setTypedSearch(e.nativeEvent.text)}
          key={"textInputSearch"}
          type="search"
        />
      </View>
      {typedSearch.length > 0
        ? allCoinsDB.map((coin) => {
            if (
              coin.name.toLowerCase().includes(typedSearch.toLowerCase()) ||
              coin.symbol.toLowerCase().includes(typedSearch.toLowerCase())
            ) {
              return (
                <ThemedTouchableOpacity onPress={handleAddSearch.bind(null, coin.code)}>
                  <ThemedText type="invertedThemeColors">{coin.name}</ThemedText>
                </ThemedTouchableOpacity>
              );
            }
          })
        : null}

      <ThemedText type="title">Your followed coins:</ThemedText>
      <ScrollView>
        {followedCoins.map((coin) => (
          <View key={"viewCoin" + coin} style={styles.coinTradeStatsViewContainer}>
            <CoinTradeStats coin={coin} key={coin} />
            <ThemedTouchableOpacity onPress={handleRemoveCoin.bind(null, coin)}>
              <ThemedText type="invertedThemeColors">Remover</ThemedText>
            </ThemedTouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </ParallaxScrollView>
  );
}
