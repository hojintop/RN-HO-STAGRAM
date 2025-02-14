import React, { useEffect } from "react";
import { Header } from "../components/Header/Header";
import { HeaderTitle } from "../components/Header/HeaderTitle";
import { useTotalFeedList } from "../selectors/feed";
import { FlatList, View } from "react-native";
import { FeedInfo } from "../@types/FeedInfo";
import { FeedListItem } from "../components/FeedListItem";
import { useDispatch } from "react-redux";
import { getFeedList, TypeFeedListDispatch } from "../actions/feed";
import { Spacer } from "../components/Spacer";

export const HomeScreen: React.FC<{}> = (props) => {
  const feedTotalList = useTotalFeedList();

  //Thunk Action 발행
  const dispatch = useDispatch<TypeFeedListDispatch>();

  useEffect(() => {
    dispatch(getFeedList());
  }, []);

  function onPressFeed() {
    console.log(111);
  }

  function renderFeedItem({ item }: { item: FeedInfo }) {
    return (
      <FeedListItem
        image={item.imageUrl}
        isLiked={false}
        likeCount={item.likeHistory.length}
        writer={item.writer.name}
        comment={item.content}
        onPressFeed={onPressFeed}
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <HeaderTitle title="HOME"></HeaderTitle>
      </Header>

      <FlatList
        data={feedTotalList}
        renderItem={renderFeedItem}
        ItemSeparatorComponent={() => <Spacer space={15} />}
      />
    </View>
  );
};
