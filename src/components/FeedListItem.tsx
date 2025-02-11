import React from "react";
import { useWindowDimensions, View } from "react-native";
import { Button } from "./Button";
import { RemoteImage } from "./RemoteImage";
import { Icons } from "./Icons";
import Typography from "./Typography";
import { Spacer } from "./Spacer";

export const FeedListItem: React.FC<{
  image: string;
  isLiked: boolean;
  likeCount: number;
  writer: string;
  comment: string;
  onPressFeed: () => void;
}> = (props) => {
  const { width } = useWindowDimensions();
  return (
    <View style={{ flex: 1 ,}}>
      <Button onPress={props.onPressFeed}>
        <RemoteImage url={props.image} width={width} height={width} />
    </Button>

    <View style={{paddingVertical: 10, paddingHorizontal: 10}}>
        <Icons name={props.isLiked ? "heart" : "heart-outline"} size={20} color="red" />

        <Spacer space={5} />

        <Typography fontSize={15}>{`좋아요 ${props.likeCount}개`}</Typography>

        <Spacer space={3} />

        <Typography fontSize={15}>{`${props.writer}  ${props.comment}`}</Typography>

    </View>
      
    </View>
  );
};
