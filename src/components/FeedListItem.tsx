import React from "react";
import { Alert, useWindowDimensions, View } from "react-native";
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
  onPressLike: () => void;
}> = (props) => {
  const { width } = useWindowDimensions();

  return (
    <View style={{ flex: 1 }}>
      <Button onPress={props.onPressFeed}>
        <RemoteImage url={props.image} width={width} height={width} />

        {/* <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icons name="heart" color="red" size={40} />
        </View> */}
      </Button>

      <View style={{ paddingVertical: 10, paddingHorizontal: 10 ,}}>
        <Button onPress={props.onPressLike}>
          <View>
            <Icons
              name={props.isLiked ? "heart" : "heart-outline"}
              size={25}
              color="red"
            />
          </View>
        </Button>
        <Spacer space={5} />

        <Typography fontSize={15}>{`좋아요 ${props.likeCount}개`}</Typography>

        <Spacer space={3} />

        <Typography
          fontSize={15}
        >{`${props.writer}  ${props.comment}`}</Typography>
      </View>
    </View>
  );
};
