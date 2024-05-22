import React from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";

export default function CoinTradeStats(props: { coin: string; type: string }) {
  const socketUrl = "wss://fstream.binance.com/";

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    socketUrl + "ws/" + props.coin + "@aggTrade"
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const formattedCoin = `${props.coin.slice(0, 3).toUpperCase()}/${props.coin
    .slice(3, 6)
    .toUpperCase()}`;

  return (
    <View>
      <ThemedText type="title">{formattedCoin}</ThemedText>
      <ThemedText>
        Price:
        {connectionStatus == "Open" && lastMessage && lastMessage.data != null ? (
          <ThemedText> {JSON.parse(lastMessage.data).p}</ThemedText>
        ) : (
          <ThemedText> Loading...</ThemedText>
        )}
      </ThemedText>
      <ThemedText>
        Quantity:
        {connectionStatus == "Open" && lastMessage && lastMessage.data != null ? (
          <ThemedText> {JSON.parse(lastMessage.data).q}</ThemedText>
        ) : (
          <ThemedText> Loading...</ThemedText>
        )}
      </ThemedText>
      {props.type === "full" ? (
        <ThemedText>
          Quantidade:
          {connectionStatus == "Open" && lastMessage && lastMessage.data != null ? (
            <ThemedText> {JSON.parse(lastMessage.data).q}</ThemedText>
          ) : (
            <ThemedText> Loading...</ThemedText>
          )}
        </ThemedText>
      ) : null}
    </View>
  );
}
